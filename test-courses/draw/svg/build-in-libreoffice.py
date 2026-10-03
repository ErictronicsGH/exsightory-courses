# The three imported drawings of the draw course (M59b), made in LibreOffice Draw.
#
# Run with LibreOffice's own Python, which carries the UNO bridge:
#
#     "C:/Program Files/LibreOffice/program/python.exe" build-in-libreoffice.py
#
# It starts a headless LibreOffice on a throwaway profile, builds each drawing
# shape by shape through Draw's own API, saves it as `<name>.odg` (open it in
# Draw to change it) and exports `<name>.svg` with Draw's SVG filter. The SVG is
# what `insight-draw import` reads, so the importer meets the file a third-party
# editor really writes: shapes as unnamed paths in a named group, fill and line
# as two paths, an arrow as a trimmed line and a triangle, text in three nested
# tspans, a DOCTYPE, embedded SVG fonts and a page clip.
#
# Why LibreOffice: it is the vector editor installed on the machine this was
# made on (2026-10-03). Inkscape and Illustrator are not, and their dialects are
# held in `insight-core/test/drawingSvg.test.ts` as files written in their style.
#
# Units are Draw's: hundredths of a millimetre. The page is 160 x 90 mm, so the
# artboard is 16000 x 9000. On the smallest wall that is 0.064 px a unit, so an
# outline (4 px) is 63 units wide, a thin line (2.5 px) 40, and a label (16 px)
# 250 units tall, which is 7.1 pt.

import math
import os
import subprocess
import time

import uno
from com.sun.star.awt import Point, Size
from com.sun.star.beans import PropertyValue

HERE = os.path.dirname(os.path.abspath(__file__))
SOFFICE = r'C:\Program Files\LibreOffice\program\soffice.exe'
PORT = 2099

OUTLINE = 63
THIN = 40
SKETCH = 35  # construction, drawn solid and grey; the drawing's layers say what it is
LABEL_PT = 7.1
TITLE_PT = 10.6

BLACK = 0x000000
GREY = 0xB2B2B2  # Draw's "Light Gray 2"
IRON = 0xDDDDDD  # Draw's "Light Gray 4"
RED = 0xC9211E  # Draw's "Red"
BLUE = 0x2A6099  # Draw's "Blue"
COPPER = 0xB47804  # Draw's "Dark Gold 1"
TEAL = 0x00A3A3
MAGENTA = 0xBF0041  # Draw's "Dark Magenta 1"


def prop(name, value):
    p = PropertyValue()
    p.Name = name
    p.Value = value
    return p


def enum(kind, value):
    return uno.Enum('com.sun.star.drawing.' + kind, value)


class Sheet:
    """One Draw page, and the shapes put on it."""

    def __init__(self, desktop):
        self.doc = desktop.loadComponentFromURL('private:factory/sdraw', '_blank', 0, (prop('Hidden', True),))
        self.page = self.doc.DrawPages.getByIndex(0)
        self.page.Width = 16000
        self.page.Height = 9000
        for side in ('BorderLeft', 'BorderRight', 'BorderTop', 'BorderBottom'):
            setattr(self.page, side, 0)

    def shape(self, kind):
        s = self.doc.createInstance('com.sun.star.drawing.' + kind)
        self.page.add(s)
        return s

    @staticmethod
    def paint(s, line=BLACK, width=OUTLINE, fill=None, start=None, end=None):
        if line is None:
            s.LineStyle = enum('LineStyle', 'NONE')
        else:
            s.LineStyle = enum('LineStyle', 'SOLID')
            s.LineColor = line
            s.LineWidth = width
        if fill is None:
            s.FillStyle = enum('FillStyle', 'NONE')
        else:
            s.FillStyle = enum('FillStyle', 'SOLID')
            s.FillColor = fill
        if start:
            s.LineStartName = start
            s.LineStartWidth = 5 * width
        if end:
            s.LineEndName = end
            s.LineEndWidth = 5 * width
        return s

    def lines(self, runs, **paint):
        """Open polylines, one shape however many runs."""
        s = self.shape('PolyLineShape')
        s.PolyPolygon = tuple(tuple(Point(int(x), int(y)) for x, y in run) for run in runs)
        return self.paint(s, **paint)

    def polygon(self, points, **paint):
        s = self.shape('PolyPolygonShape')
        s.PolyPolygon = (tuple(Point(int(x), int(y)) for x, y in points),)
        return self.paint(s, **paint)

    def line(self, a, b, **paint):
        return self.lines([[a, b]], **paint)

    def rect(self, x, y, w, h, corner=0, **paint):
        s = self.shape('RectangleShape')
        s.Position = Point(int(x), int(y))
        s.Size = Size(int(w), int(h))
        s.CornerRadius = int(corner)
        return self.paint(s, **paint)

    def circle(self, cx, cy, r, **paint):
        s = self.shape('EllipseShape')
        s.Position = Point(int(cx - r), int(cy - r))
        s.Size = Size(int(2 * r), int(2 * r))
        return self.paint(s, **paint)

    def arc(self, cx, cy, r, start_deg, end_deg, **paint):
        """Counter-clockwise from three o'clock, as Draw measures, y up."""
        s = self.circle(cx, cy, r, **paint)
        s.CircleKind = uno.Enum('com.sun.star.drawing.CircleKind', 'ARC')
        s.CircleStartAngle = int(start_deg * 100)
        s.CircleEndAngle = int(end_deg * 100)
        return s

    def bezier(self, anchors, closed=False, **paint):
        """Anchors with their handles: [(point, handle_in, handle_out)], cubic between each pair."""
        coords, flags = [], []
        normal = uno.Enum('com.sun.star.drawing.PolygonFlags', 'NORMAL')
        control = uno.Enum('com.sun.star.drawing.PolygonFlags', 'CONTROL')
        for i, (point, _, out) in enumerate(anchors):
            coords.append(Point(int(point[0]), int(point[1])))
            flags.append(normal)
            if i + 1 < len(anchors):
                coords.append(Point(int(out[0]), int(out[1])))
                flags.append(control)
                coords.append(Point(int(anchors[i + 1][1][0]), int(anchors[i + 1][1][1])))
                flags.append(control)
        s = self.shape('ClosedBezierShape' if closed else 'OpenBezierShape')
        bez = uno.createUnoStruct('com.sun.star.drawing.PolyPolygonBezierCoords')
        bez.Coordinates = (tuple(coords),)
        bez.Flags = (tuple(flags),)
        s.PolyPolygonBezier = bez
        return self.paint(s, **paint)

    def text(self, x, y, words, pt=LABEL_PT, colour=BLACK):
        s = self.shape('TextShape')
        s.Position = Point(int(x), int(y))
        # A box that grows from nothing: Draw centres text in its box, and a wide one moves the words.
        s.Size = Size(10, 10)
        s.TextAutoGrowWidth = True
        s.TextAutoGrowHeight = True
        s.String = words
        s.CharHeight = pt
        s.CharColor = colour
        return s

    def save(self, name):
        base = os.path.join(HERE, name)
        self.doc.storeToURL(uno.systemPathToFileUrl(base + '.odg'), ())
        self.doc.storeToURL(uno.systemPathToFileUrl(base + '.svg'), (prop('FilterName', 'draw_svg_Export'),))
        # Not closed: closing a hidden document after the SVG filter takes headless Draw down
        # (26.2). Each stays open until the one terminate at the end.


def arc_anchors(cx, cy, r, a0, a1, pieces):
    """An arc as Bezier anchors with handles, y down, angles in degrees clockwise on screen."""
    out = []
    step = math.radians(a1 - a0) / pieces
    k = 4 / 3 * math.tan(step / 4) * r
    for i in range(pieces + 1):
        a = math.radians(a0) + i * step
        p = (cx + r * math.cos(a), cy + r * math.sin(a))
        t = (-math.sin(a), math.cos(a))
        out.append((p, (p[0] - k * t[0], p[1] - k * t[1]), (p[0] + k * t[0], p[1] + k * t[1])))
    return out


def meter(sheet):
    """A moving-coil meter in section: magnet, core, coil sides, pointer, scale."""
    cx, cy = 8000, 5000
    # Construction: the centre lines and the circle the pole faces are turned to.
    sheet.line((2600, cy), (13400, cy), line=GREY, width=SKETCH)
    sheet.line((cx, 1000), (cx, 8200), line=GREY, width=SKETCH)
    sheet.circle(cx, cy, 2300, line=GREY, width=SKETCH)
    # The magnet: a yoke and two poles whose faces are arcs about the core.
    sheet.rect(3500, 6800, 9000, 800, line=BLACK, width=OUTLINE, fill=IRON)
    face = 2300
    half = math.degrees(math.asin(1800 / face))
    def corner(x, y):
        return ((x, y), (x, y), (x, y))

    def pole(back, arc, fill):
        # An arc's first and last anchors are corners where it meets the straight edges.
        arc = list(arc)
        arc[0] = (arc[0][0], arc[0][0], arc[0][2])
        arc[-1] = (arc[-1][0], arc[-1][1], arc[-1][0])
        sheet.bezier([corner(back, 3200)] + arc + [corner(back, 6800), corner(back, 3200)],
                     closed=True, line=BLACK, width=OUTLINE, fill=fill)

    pole(3500, arc_anchors(cx, cy, face, 180 + half, 180 - half, 2), RED)
    pole(12500, arc_anchors(cx, cy, face, -half, half, 2), BLUE)
    # The soft-iron core, and the coil's sides in the gap: current in on the left, out on the right.
    sheet.circle(cx, cy, 1500, line=BLACK, width=THIN, fill=IRON)
    crosses, dots = [], []
    for a in (-18, 0, 18):
        for side in (-1, 1):
            x = cx + side * 1900 * math.cos(math.radians(a))
            y = cy + 1900 * math.sin(math.radians(a))
            if side < 0:
                crosses += [[(x - 130, y - 130), (x + 130, y + 130)], [(x - 130, y + 130), (x + 130, y - 130)]]
            else:
                dots.append((x, y))
    for a in (-18, 0, 18):
        for side in (-1, 1):
            x = cx + side * 1900 * math.cos(math.radians(a))
            y = cy + 1900 * math.sin(math.radians(a))
            sheet.circle(x, y, 260, line=COPPER, width=THIN)
    sheet.lines(crosses, line=COPPER, width=THIN)
    for x, y in dots:
        sheet.circle(x, y, 70, line=None, fill=COPPER)
    # The scale: an arc above, and its ticks.
    sheet.arc(cx, cy, 3700, 35, 145, line=BLACK, width=THIN)
    ticks = []
    for i in range(7):
        a = math.radians(145 - i * (110 / 6))
        ticks.append([(cx + 3700 * math.cos(a), cy - 3700 * math.sin(a)), (cx + 3950 * math.cos(a), cy - 3950 * math.sin(a))])
    sheet.lines(ticks, line=BLACK, width=THIN)
    # The pointer, on its pivot.
    a = math.radians(62)
    sheet.line((cx, cy), (cx + 3550 * math.cos(a), cy - 3550 * math.sin(a)), line=BLACK, width=THIN, end='Arrow')
    sheet.circle(cx, cy, 160, line=None, fill=BLACK)
    # Labels.
    sheet.text(4100, 4300, 'N', pt=TITLE_PT)
    sheet.text(11300, 4300, 'S', pt=TITLE_PT)
    sheet.text(7450, 5500, 'core')
    sheet.text(5450, 2750, 'coil')
    sheet.text(11300, 1500, 'scale')
    sheet.text(8700, 650, 'pointer')


def gauge(sheet):
    """A strain gauge bonded to a cantilever, the beam bending under a load at its end."""
    # The wall the beam is fixed in, and its hatching.
    sheet.rect(1500, 1800, 800, 5400, line=BLACK, width=OUTLINE, fill=IRON)
    sheet.lines([[(1500, y), (1000, y + 500)] for y in range(1900, 7200, 500)], line=BLACK, width=THIN)
    # Construction: the neutral axis, and the beam as it bends.
    sheet.line((2300, 4400), (13200, 4400), line=GREY, width=SKETCH)
    sheet.bezier([((2300, 4400), (2300, 4400), (6000, 4400)), ((12500, 5900), (9800, 5500), (12500, 5900))],
                 line=GREY, width=SKETCH)
    # The beam.
    sheet.rect(2300, 4000, 10200, 800, line=BLACK, width=OUTLINE, fill=IRON)
    # The gauge: its backing, its grid, its tabs and leads.
    sheet.rect(3300, 3700, 2900, 280, line=None, fill=COPPER)
    grid = []
    for i in range(8):
        x = 3500 + i * 330
        grid += [(x, 3760), (x, 3920)] if i % 2 == 0 else [(x, 3920), (x, 3760)]
    sheet.lines([grid], line=BLACK, width=THIN)
    sheet.lines([[(3500, 3760), (3500, 2200), (3000, 1300)], [(5810, 3760), (5810, 2200), (6300, 1300)]],
                line=TEAL, width=THIN)
    # The load.
    sheet.line((12100, 1500), (12100, 3950), line=RED, width=OUTLINE, end='Arrow')
    # What the gauge feels: tension on top, compression below.
    sheet.line((3300, 3250), (6200, 3250), line=MAGENTA, width=THIN, start='Arrow', end='Arrow')
    sheet.line((3300, 5300), (4500, 5300), line=BLUE, width=THIN, end='Arrow')
    sheet.line((6200, 5300), (5000, 5300), line=BLUE, width=THIN, end='Arrow')
    # Labels.
    sheet.text(12400, 2100, 'F', pt=TITLE_PT)
    sheet.text(8200, 4130, 'beam')
    sheet.text(6550, 3500, 'gauge')
    sheet.text(4100, 2700, 'tension')
    sheet.text(3700, 5600, 'compression')
    sheet.text(3800, 950, 'to the bridge')


def waveform(sheet):
    """A sine wave drawn from its rotating phasor: the circle, its radii, the projections."""
    px, py, r = 3000, 4500, 2000
    x0, period = 5500, 9600
    # Construction: the phasor circle, its radii every 30 degrees, and the projections across.
    sheet.circle(px, py, r, line=GREY, width=SKETCH)
    radii, across = [], []
    for k in range(12):
        a = math.radians(30 * k)
        tip = (px + r * math.cos(a), py - r * math.sin(a))
        radii.append([(px, py), tip])
        across.append([tip, (x0 + period * k / 12, tip[1])])
    across.append([(px + r, py), (x0 + period, py)])
    sheet.lines(radii, line=GREY, width=SKETCH)
    sheet.lines(across, line=GREY, width=SKETCH)
    # The axes.
    sheet.line((x0, py), (15600, py), line=BLACK, width=THIN, end='Arrow')
    sheet.line((x0, 7200), (x0, 1700), line=BLACK, width=THIN, end='Arrow')
    # The wave, through the projected points: each anchor's handles along its slope.
    anchors = []
    w = 2 * math.pi / period
    third = period / 12 / 3
    for k in range(13):
        t = period * k / 12
        x, y = x0 + t, py - r * math.sin(w * t)
        slope = -r * w * math.cos(w * t)
        anchors.append(((x, y), (x - third, y - slope * third), (x + third, y + slope * third)))
    sheet.bezier(anchors, line=TEAL, width=OUTLINE)
    # The phasor, at 60 degrees.
    a = math.radians(60)
    sheet.line((px, py), (px + r * math.cos(a), py - r * math.sin(a)), line=MAGENTA, width=OUTLINE, end='Arrow')
    # Labels.
    sheet.text(3500, 3700, 'ωt')
    sheet.text(15300, 4650, 't')
    sheet.text(5650, 1500, 'v')
    sheet.text(9600, 1000, 'v = Vm sin ωt', pt=TITLE_PT)


def main():
    profile = uno.systemPathToFileUrl(os.path.join(os.environ.get('TEMP', HERE), 'insight-draw-lo-profile'))
    soffice = subprocess.Popen([SOFFICE, '--headless', '--invisible', '--norestore', '-env:UserInstallation=' + profile,
                                '--accept=socket,host=127.0.0.1,port=%d;urp;' % PORT])
    local = uno.getComponentContext()
    resolver = local.ServiceManager.createInstanceWithContext('com.sun.star.bridge.UnoUrlResolver', local)
    for _ in range(120):
        try:
            ctx = resolver.resolve('uno:socket,host=127.0.0.1,port=%d;urp;StarOffice.ComponentContext' % PORT)
            break
        except Exception:
            time.sleep(0.5)
    desktop = ctx.ServiceManager.createInstanceWithContext('com.sun.star.frame.Desktop', ctx)
    try:
        for name, build in (('meter-section', meter), ('gauge-on-beam', gauge), ('waveform-construction', waveform)):
            sheet = Sheet(desktop)
            build(sheet)
            sheet.save(name)
            print('made', name)
    finally:
        try:
            desktop.terminate()
        except Exception:
            pass  # LibreOffice drops the bridge as it quits
        soffice.wait(timeout=60)


main()
