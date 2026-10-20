"""Write the library.json of D1·020 card 8's units, its sequence (`meter-specification`) and the Figure card's library
(`handheld-meter`) from one place, and copy the kits into each (a library is a self-contained folder: svgkit.js, dinkit.js
and unit.css from libraries/dinkit/, psukit.js from libraries/bench-supply/, speckit.js from here).
Run: python manifests.py (from anywhere). Every visible word is {en, fr}; numbers and units are never translated; markings
printed on the instruments (RANGE, V⎓, COM, VΩ) stay as on the hardware."""
import json, os, shutil

HERE = os.path.dirname(os.path.abspath(__file__))
LIBS = os.path.dirname(HERE)
COURSE = 'PBL2026 · From Sensor to Number'
BENCH = {'type': 'animation', 'contract': 4}
KIT = ['svgkit.js', 'dinkit.js', 'psukit.js', 'speckit.js', 'unit.js']
COPIES = [('dinkit', 'svgkit.js'), ('dinkit', 'dinkit.js'), ('bench-supply', 'psukit.js'), ('spec-kit', 'speckit.js'), ('dinkit', 'unit.css')]

def L(en, fr):
    return {'en': en, 'fr': fr}

def seg(*parts):
    """caption segments: (en, fr) or (en, fr, '#colour')"""
    return {'en': [[p[0]] + ([p[2]] if len(p) > 2 else []) for p in parts], 'fr': [[p[1]] + ([p[2]] if len(p) > 2 else []) for p in parts]}

PCT, CNT, TEAL, CYAN, MCU, WHITE = '#4ADE80', '#FF8C69', '#2EE6C5', '#38D9FF', '#38B6FF', '#FFFFFF'
CARD = 'D1·020 card 8'
VERSION = '0.1.0'

RIG_PARAMS = {
    'supplyV': {'type': 'number', 'min': 0, 'max': 30, 'default': 1.0, 'unit': 'V',
                'label': 'the bench supply’s VOLTAGE knob: what the meter reads'},
    'meterRange': {'type': 'number', 'values': [0.2, 2, 20, 200, 600], 'default': 2, 'unit': 'V',
                   'label': 'the meter’s range: 0.2 is the dial’s mV position (200 mV), the others on RANGE with the dial on V⎓'},
}
RIG = {
    'meterT': L('Multimeter', 'Multimètre'),
    'meterS': L('DC volts · {r} range · {q} a count', 'V continu · calibre {r} · {q} par point'),
    'supplyT': L('Bench supply', 'Alimentation de laboratoire'),
    'supplyS': L('the source: its VOLTAGE knob', 'la source : son bouton VOLTAGE'),
    'tipKnob': L('The supply’s VOLTAGE knob: what the meter reads (wheel: 1 mV a notch; Shift: finer)', 'Le bouton VOLTAGE de l’alimentation : ce que lit le multimètre (molette : 1 mV par cran ; Maj : plus fin)'),
    'tipDial': L('The meter’s dial: V⎓, or mV (the 200 mV range)', 'Le sélecteur du multimètre : V⎓, ou mV (le calibre 200 mV)'),
    'tipRange': L('RANGE: 2 → 20 → 200 → 600 V (the dial on V⎓)', 'RANGE : 2 → 20 → 200 → 600 V (sélecteur sur V⎓)'),
    'wPct': L('0.5 % of reading', '0.5 % de la lecture'),
    'wCnt': L('3 counts', '3 points'),
    'rulerT': L('Round the reading, 1 mV a tick', 'Autour de la lecture, 1 mV par graduation'),
    'ol': L('OL: over range. RANGE takes the meter up a range', 'OL : hors calibre. RANGE fait passer au calibre supérieur'),
    'olMv': L('OL: over range. Turn the dial back to V⎓', 'OL : hors calibre. Ramenez le sélecteur sur V⎓'),
    'capOLmv': seg(('Over the 200 mV range: the display shows OL. ', 'Au-delà du calibre 200 mV : l’affichage montre OL. '), ('Turn the dial back to V⎓', 'Ramenez le sélecteur sur V⎓', CNT)),
    'offScale': L('±{U} mV: past this scale', '±{U} mV : au-delà de cette échelle'),
    'capOL': seg(('Over range: the display shows OL. ', 'Hors calibre : l’affichage montre OL. '), ('RANGE takes the meter up a range', 'RANGE fait passer au calibre supérieur', CNT)),
}
PAGE = {
    'pg_title': L('SPECIFICATIONS', 'CARACTÉRISTIQUES'),
    'pg_page': L('p. 12', 'p. 12'),
    'pg_display': L('Display: 3½ digits, a maximum reading of 1999 (2000 counts)', 'Affichage : 3½ chiffres, lecture maximale 1999 (2000 points)'),
    'pg_accuracy': L('Accuracy: ±(% of reading + counts)', 'Précision : ±(% de la lecture + points)'),
    'pg_cond': L('at 18 … 28 °C, below 75 % RH, for one year after calibration', 'de 18 à 28 °C, sous 75 % HR, pendant un an après l’étalonnage'),
    'pg_dcv': L('DC VOLTAGE', 'TENSION CONTINUE'),
    'pg_colRange': L('Range', 'Calibre'),
    'pg_colRes': L('Resolution', 'Résolution'),
    'pg_colAcc': L('Accuracy', 'Précision'),
    'pg_acc': L('±(0.5 % + 3)', '±(0.5 % + 3)'),
    'pg_notes1': L('Input impedance: 10 MΩ on every DC range', 'Impédance d’entrée : 10 MΩ sur tous les calibres continus'),
    'pg_notes2': L('Overload protection: 600 V DC or AC rms', 'Protection contre les surcharges : 600 V continu ou alternatif efficace'),
}

UNITS = {}

UNITS['spec-question'] = dict(
    name=L('The question: a meter’s specification', 'La question : la spécification d’un multimètre'),
    title=L('A meter’s specification: what does it promise?', 'La spécification d’un multimètre : que promet-elle ?'),
    description=L('The course’s handheld (cards 3–5) on its 2 V range, reading the bench supply: 1.000 V. Its specification page beside it, the 2 V row lit: ±(0.5 % of reading + 3 counts). Play: the supply’s output on, the reading comes up, the row lights, then the question (the numeric: how far either side does the band reach, in mV?). No answer here. The supply’s knob, the meter’s dial and RANGE are the presenter’s.',
                  'Le multimètre de poche du cours (cartes 3–5) sur son calibre 2 V, qui lit l’alimentation : 1.000 V. Sa page de caractéristiques à côté, la ligne 2 V éclairée : ±(0.5 % de la lecture + 3 points). Lecture : la sortie de l’alimentation s’allume, la lecture apparaît, la ligne s’éclaire, puis la question (jusqu’où s’étend la bande, en mV ?). Pas de réponse ici. Le bouton de l’alimentation, le sélecteur et RANGE sont au présentateur.'),
    card=CARD + ' (¶0–1)',
    strings={
        **RIG, **PAGE,
        'section': L('The question', 'La question'),
        'h1': L('A meter’s specification: what does it promise?', 'La spécification d’un multimètre : que promet-elle ?'),
        'pageCap': L('The meter’s manual, open at its specification page', 'Le manuel du multimètre, ouvert à sa page de caractéristiques'),
        'askT': L('THE QUESTION', 'LA QUESTION'),
        'ask1': L('A 3½-digit meter on its {r} range reads {v}.', 'Un multimètre 3½ chiffres sur son calibre {r} lit {v}.'),
        'ask2': L('Its specification is ±(0.5 % of reading + 3 counts).', 'Sa spécification est ±(0.5 % de la lecture + 3 points).'),
        'ask3': L('How far either side of the reading does the band reach, in mV?', 'Jusqu’où la bande s’étend-elle de part et d’autre de la lecture, en mV ?'),
        's1Title': L('The question', 'La question'),
        's1Caption': seg(('A meter’s specification: ', 'La spécification d’un multimètre : '), ('what band does it put round its reading?', 'quelle bande met-elle autour de sa lecture ?', CYAN)),
    },
    params=RIG_PARAMS,
)

UNITS['two-errors'] = dict(
    name=L('Two errors added', 'Deux erreurs additionnées'),
    title=L('Two errors added: one scales, one is fixed', 'Deux erreurs additionnées : l’une suit la lecture, l’autre est fixe'),
    description=L('The specification taken apart on a millivolt ruler round the reading (1 mV a tick, the same scale in every view of the card). 2a: the percentage part grows out from the reading, green: 0.5 % of 1.000 V is 5 mV, and it follows the reading when the supply is turned. 2b: the display enlarged, its last digit ringed (one count: 1 mV on the 2 V range, which runs up to 1.999); three blocks of one count each drop in beyond the green, each side: 3 mV, the same at any reading on the range.',
                  'La spécification démontée sur une règle en millivolts autour de la lecture (1 mV par graduation, la même échelle dans toutes les vues de la carte). 2a : la part en pourcentage s’étend depuis la lecture, en vert : 0.5 % de 1.000 V font 5 mV, et elle suit la lecture quand on tourne l’alimentation. 2b : l’affichage agrandi, son dernier chiffre cerclé (un point : 1 mV sur le calibre 2 V, qui va jusqu’à 1.999) ; trois blocs d’un point chacun s’ajoutent au-delà du vert, de chaque côté : 3 mV, les mêmes à toute lecture sur ce calibre.'),
    card=CARD + ' (¶2–4)',
    strings={
        **RIG,
        'section': L('Two errors', 'Deux erreurs'),
        'h1': L('Two errors added: one scales, one is fixed', 'Deux erreurs additionnées : l’une suit la lecture, l’autre est fixe'),
        'uPct': L('scales with the reading', 'suit la lecture'),
        'uCnt': L('fixed: counts of the last digit', 'fixe : des points du dernier chiffre'),
        'pctT': L('THE PERCENTAGE PART', 'LA PART EN POURCENTAGE'),
        'pctLine': L('0.5 % × {v} = {P} mV', '0.5 % × {v} = {P} mV'),
        'pctS': L('turn the supply: it follows the reading', 'tournez l’alimentation : elle suit la lecture'),
        'cntT': L('THE COUNTS', 'LES POINTS'),
        'cntLine': L('3 × {q} = {C} mV', '3 × {q} = {C} mV'),
        'cntS': L('the same at any reading on the {r} range', 'la même à toute lecture sur le calibre {r}'),
        'maxRd': L('the display runs up to {m}', 'l’affichage va jusqu’à {m}'),
        'oneCount': L('its last digit: one count = {q}', 'son dernier chiffre : un point = {q}'),
        's1Title': L('% of reading', '% de la lecture'),
        's1Caption': seg(('The first scales with the reading: ', 'La première suit la lecture : '), ('0.5 % of {v} is {P} mV', '0.5 % de {v} font {P} mV', PCT)),
        's2Title': L('Counts', 'Points'),
        's2Caption': seg(('The second is fixed: one count is {q}, ', 'La seconde est fixe : un point vaut {q}, '), ('three counts are {C} mV', 'trois points font {C} mV', CNT)),
    },
    params=RIG_PARAMS,
)

UNITS['the-band'] = dict(
    name=L('The band', 'La bande'),
    title=L('The band: ±8 mV either side of the reading', 'La bande : ±8 mV de part et d’autre de la lecture'),
    description=L('The two parts added on the ruler: ±8 mV at 1.000 V. The band bracketed, its edges named (0.992 V and 1.008 V), the stretch between them shaded with nothing marked in it: the true value is somewhere in there and the meter cannot say where. The sum under it: U = 5 mV + 3 mV = ±8 mV; 0.8 % of the reading. This reveals the numeric. Every number follows the supply’s knob and the meter’s range.',
                  'Les deux parts additionnées sur la règle : ±8 mV à 1.000 V. La bande entre crochets, ses bords nommés (0.992 V et 1.008 V), l’intervalle entre eux grisé sans rien y marquer : la valeur vraie s’y trouve et le multimètre ne peut pas dire où. La somme dessous : U = 5 mV + 3 mV = ±8 mV ; 0.8 % de la lecture. Cela dévoile la réponse. Chaque nombre suit le bouton de l’alimentation et le calibre.'),
    card=CARD + ' (¶5)',
    strings={
        **RIG,
        'section': L('The band', 'La bande'),
        'h1': L('The band: ±{U} mV either side of the reading', 'La bande : ±{U} mV de part et d’autre de la lecture'),
        'pm': L('±{U} mV', '±{U} mV'),
        'somewhere': L('The true value lies somewhere from {lo} to {hi}: the meter cannot tell you where.', 'La valeur vraie est quelque part entre {lo} et {hi} : le multimètre ne peut pas dire où.'),
        'sumS': L('{p} × {v}  +  {n} × {q}', '{p} × {v}  +  {n} × {q}'),
        'share': L('{u} % of the reading ({v})', '{u} % de la lecture ({v})'),
        's1Title': L('The band', 'La bande'),
        's1Caption': seg(('Add them: ±{U} mV. ', 'Additionnez : ±{U} mV. '), ('The true value is between {lo} and {hi}', 'La valeur vraie est entre {lo} et {hi}', WHITE), (', and the meter cannot tell you where', ', et le multimètre ne peut pas dire où')),
    },
    params=RIG_PARAMS,
)

UNITS['down-the-range'] = dict(
    name=L('Down the range', 'En bas de la plage'),
    title=L('Down the range: the counts take over', 'En bas de la plage : les points l’emportent'),
    description=L('The ruler above the Equation’s graph: the band as a share of the reading against the reading, u = 0.5 % + 3 counts ÷ V, in two stacked parts (the percentage part flat at 0.5 %, green; the counts’ share coral above it). 4a: the supply turned from 1.000 V down to 0.100 V; the green part shrinks to 0.5 mV, the coral stays at 3 mV: ±3.5 mV, 3.5 %; a pen draws the curve under the reading as it falls (① 1.000 V: 0.8 %; ② 0.100 V: 3.5 %), then the rest of the range, 0.05 … 1.999 V. 4b: the dial turned to mV, the 200 mV range: 100.0 mV, one count 0.1 mV, ±0.8 mV, 0.8 % (③); the 200 mV range’s own curve drawn, the same shape ten times narrower.',
                  'La règle au-dessus du graphique de l’équation : la bande en part de la lecture en fonction de la lecture, u = 0.5 % + 3 points ÷ V, en deux parts empilées (la part en pourcentage plate à 0.5 %, en vert ; la part des points en corail au-dessus). 4a : l’alimentation tournée de 1.000 V à 0.100 V ; le vert se réduit à 0.5 mV, le corail reste à 3 mV : ±3.5 mV, 3.5 % ; un stylo trace la courbe sous la lecture à mesure qu’elle descend (① 1.000 V : 0.8 % ; ② 0.100 V : 3.5 %), puis le reste de la plage, 0.05 … 1.999 V. 4b : le sélecteur sur mV, le calibre 200 mV : 100.0 mV, un point 0.1 mV, ±0.8 mV, 0.8 % (③) ; la courbe propre au calibre 200 mV, la même forme dix fois plus étroite.'),
    card=CARD + ' (¶6)',
    strings={
        **RIG,
        'section': L('Down the range', 'En bas de la plage'),
        'h1a': L('Down the range: the counts take over', 'En bas de la plage : les points l’emportent'),
        'h1b': L('Choose the lowest range: it still holds the reading', 'Choisir le plus petit calibre : il contient encore la lecture'),
        'ghost': L('on 2 V: ±{U} mV', 'sur 2 V : ±{U} mV'),
        'pmU': L('±{U} mV: {u} % of the reading', '±{U} mV : {u} % de la lecture'),
        'xl': L('the reading (V)', 'la lecture (V)'),
        'yl': L('the band, as a share of the reading', 'la bande, en part de la lecture'),
        'floorLab': L('the percentage part: 0.5 % of any reading', 'la part en pourcentage : 0.5 % de toute lecture'),
        'cntLab': L('the counts’ share: 3 counts ÷ the reading', 'la part des points : 3 points ÷ la lecture'),
        'range2': L('2 V range', 'calibre 2 V'),
        'range02': L('200 mV range', 'calibre 200 mV'),
        'keyT': L('THE EXAMPLES', 'LES EXEMPLES'),
        'keyRow': L('{v} on the {r} range: ±{U} mV, {u} %', '{v} sur le calibre {r} : ±{U} mV, {u} %'),
        's1Title': L('Down the range', 'En bas de la plage'),
        's1Caption': seg(('At {v} the counts still give {C} mV: ', 'À {v} les points donnent toujours {C} mV : '), ('±{U} mV, {u} % of the reading', '±{U} mV, {u} % de la lecture', CNT)),
        's2Title': L('Lowest range', 'Plus petit calibre'),
        's2Caption': seg(('On the {r} range one count is {q}: ', 'Sur le calibre {r} un point vaut {q} : '), ('±{U} mV, {u} % of the reading', '±{U} mV, {u} % de la lecture', TEAL)),
    },
    params=RIG_PARAMS,
)

UNITS['whose-band'] = dict(
    name=L('Whose band', 'Quelle bande'),
    title=L('Whose band are you standing in?', 'Dans quelle bande vous tenez-vous ?'),
    description=L('The meter on its 2 V range and its band on the ruler (±8 mV at 1.000 V). A pin for your MCU’s reading, the presenter’s to drag (no MCU’s numbers are made up). Play: the pin lands 5 mV above the meter’s reading (inside the band: the meter cannot tell the two apart), then slides to 12 mV (outside it: if the meter is within its specification, the MCU reads at least 4 mV high). Seed S36: the meter you check your MCU against has a band of its own.',
                  'Le multimètre sur son calibre 2 V et sa bande sur la règle (±8 mV à 1.000 V). Une épingle pour la lecture de votre MCU, que le présentateur fait glisser (aucun nombre de MCU inventé). Lecture : l’épingle se pose 5 mV au-dessus de la lecture du multimètre (dans la bande : le multimètre ne peut pas les départager), puis glisse à 12 mV (hors de la bande : si le multimètre est dans sa spécification, le MCU lit au moins 4 mV trop haut). Graine S36 : le multimètre contre lequel vous vérifiez votre MCU a sa propre bande.'),
    card=CARD + ' (¶7, S36)',
    strings={
        **RIG,
        'meterS': L('DC volts · {r} range', 'V continu · calibre {r}'),
        'section': L('Whose band', 'Quelle bande'),
        'h1': L('Whose band are you standing in?', 'Dans quelle bande vous tenez-vous ?'),
        'seedT': L('THE METER HAS A BAND OF ITS OWN', 'LE MULTIMÈTRE A SA PROPRE BANDE'),
        'seed1': L('It is the instrument you will check your microcontroller against, and you can calculate its band.', 'C’est l’instrument contre lequel vous vérifierez votre microcontrôleur, et vous pouvez calculer sa bande.'),
        'meterBand': L('the meter’s band: ±{U} mV', 'la bande du multimètre : ±{U} mV'),
        'pin': L('your MCU reads {v}', 'votre MCU lit {v}'),
        'gap': L('{d} mV beyond', '{d} mV au-delà'),
        'inT': L('INSIDE THE METER’S BAND', 'DANS LA BANDE DU MULTIMÈTRE'),
        'inS': L('{o} mV apart, inside ±{U} mV: the meter cannot tell the two apart.', '{o} mV d’écart, dans ±{U} mV : le multimètre ne peut pas les départager.'),
        'outT': L('OUTSIDE THE METER’S BAND', 'HORS DE LA BANDE DU MULTIMÈTRE'),
        'outHigh': L('If the meter is within its specification, your MCU reads at least {d} mV high.', 'Si le multimètre est dans sa spécification, votre MCU lit au moins {d} mV trop haut.'),
        'outLow': L('If the meter is within its specification, your MCU reads at least {d} mV low.', 'Si le multimètre est dans sa spécification, votre MCU lit au moins {d} mV trop bas.'),
        'next': L('The next question: your MCU’s own band (its converter has one too).', 'La question suivante : la propre bande de votre MCU (son convertisseur en a une aussi).'),
        'tipPin': L('Your MCU’s reading: drag it along the ruler', 'La lecture de votre MCU : faites-la glisser le long de la règle'),
        's1Title': L('Whose band', 'Quelle bande'),
        's1Caption': seg(('When the two disagree, ', 'Quand les deux ne s’accordent pas, '), ('the first question is whose band you are standing in', 'la première question est : dans quelle bande êtes-vous ?', MCU)),
    },
    params={**RIG_PARAMS, 'mcuOff': {'type': 'number', 'min': -15, 'max': 15, 'default': 12, 'unit': 'mV',
                                     'label': 'your MCU’s reading, as millivolts above (+) or below (−) the meter’s'}},
)

UNITS['handheld-meter'] = dict(
    name=L('The handheld multimeter', 'Le multimètre de poche'),
    title=L('This meter, and its page', 'Ce multimètre, et sa page'),
    description=L('The course’s handheld multimeter (cards 3–8), our own unbranded design, large, reading 1.000 V on its 2 V range, and its specification page beside it (our own layout). Toured in four stops, each feature spotlit and named: the display (its last digit one count, 1 mV), 3½ digits (1999 at most: 2000 counts), the range (the dial on V⎓, RANGE steps 2 · 20 · 200 · 600 V; mV: 200 mV), the specification’s row (±(0.5 % + 3): ±8 mV at 1.000 V). D1·020 card 8’s Figure card.',
                  'Le multimètre de poche du cours (cartes 3–8), notre propre modèle sans marque, en grand, qui lit 1.000 V sur son calibre 2 V, et sa page de caractéristiques à côté (notre mise en page). Parcouru en quatre arrêts, chaque élément mis en lumière et nommé : l’affichage (son dernier chiffre vaut un point, 1 mV), 3½ chiffres (1999 au plus : 2000 points), le calibre (sélecteur sur V⎓, RANGE : 2 · 20 · 200 · 600 V ; mV : 200 mV), la ligne de la spécification (±(0.5 % + 3) : ±8 mV à 1.000 V). La carte Figure de la carte 8 de D1·020.'),
    card='D1·020 card 8 · Figure',
    strings={
        **PAGE,
        'section': L('The meter', 'Le multimètre'),
        'h1': L('This meter, and its page', 'Ce multimètre, et sa page'),
        'dispT': L('The display: 1.000 V', 'L’affichage : 1.000 V'),
        'dispS': L('its last digit is one count: 1 mV on the 2 V range', 'son dernier chiffre est un point : 1 mV sur le calibre 2 V'),
        'cntT': L('3½ digits: 1999 at most', '3½ chiffres : 1999 au plus'),
        'cntS': L('the leading half digit is 0 or 1: 2000 counts', 'le demi-chiffre de tête vaut 0 ou 1 : 2000 points'),
        'rangeT': L('The range: 2 V', 'Le calibre : 2 V'),
        'rangeS': L('the dial on V⎓, RANGE: 2 · 20 · 200 · 600 V; mV: 200 mV', 'sélecteur sur V⎓, RANGE : 2 · 20 · 200 · 600 V ; mV : 200 mV'),
        'specT': L('±(0.5 % + 3) on every DC range', '±(0.5 % + 3) sur tous les calibres continus'),
        'specS': L('the band you computed: ±8 mV at 1.000 V', 'la bande que vous avez calculée : ±8 mV à 1.000 V'),
        's1Title': L('Display', 'Affichage'),
        's1Caption': seg(('The display: ', 'L’affichage : '), ('four digits, the last of them one count', 'quatre chiffres, le dernier vaut un point', TEAL)),
        's2Title': L('Counts', 'Points'),
        's2Caption': seg(('3½ digits: ', '3½ chiffres : '), ('the display runs up to 1999', 'l’affichage va jusqu’à 1999', TEAL)),
        's3Title': L('Range', 'Calibre'),
        's3Caption': seg(('The range: ', 'Le calibre : '), ('the dial and RANGE set what one count is worth', 'le sélecteur et RANGE fixent ce que vaut un point', TEAL)),
        's4Title': L('Specification', 'Spécification'),
        's4Caption': seg(('The specification: ', 'La spécification : '), ('±(0.5 % of reading + 3 counts) on every DC range', '±(0.5 % de la lecture + 3 points) sur tous les calibres continus', TEAL)),
    },
    params={},
)

SEQ = dict(
    id='meter-specification',
    name=L('Reading a meter’s specification', 'Lire la spécification d’un multimètre'),
    title=L('Reading a meter’s specification', 'Lire la spécification d’un multimètre'),
    description=L('D1·020 card 8 as a sequence of five reusable units on the course’s handheld reading the bench supply, one block at a time, each on its Flow paragraph: the question (¶0–1); two errors added, the percentage of the reading and the counts (¶2–4); the band, ±8 mV (¶5); down the range, 0.100 V: ±3.5 mV, and the 200 mV range: ±0.8 mV, with the Equation’s graph (¶6); whose band you are standing in (¶7, S36). The supply’s knob and the meter’s range are shared by every block.',
                  'La carte 8 de D1·020 en une séquence de cinq unités réutilisables sur le multimètre de poche du cours qui lit l’alimentation, un bloc à la fois, chacun sur son paragraphe du Flow : la question (¶0–1) ; deux erreurs additionnées, le pourcentage de la lecture et les points (¶2–4) ; la bande, ±8 mV (¶5) ; en bas de la plage, 0.100 V : ±3.5 mV, et le calibre 200 mV : ±0.8 mV, avec le graphique de l’équation (¶6) ; dans quelle bande vous tenez-vous (¶7, S36). Le bouton de l’alimentation et le calibre sont partagés par tous les blocs.'),
    sequence=[
        ('spec-question', L('The question', 'La question'), '¶0–1', ['1']),
        ('two-errors', L('Two errors', 'Deux erreurs'), '¶2–4', ['2a', '2b']),
        ('the-band', L('The band', 'La bande'), '¶5', ['3']),
        ('down-the-range', L('Down the range', 'En bas de la plage'), '¶6', ['4a', '4b']),
        ('whose-band', L('Whose band', 'Quelle bande'), '¶7', ['5']),
    ],
)

def nbsp(v):
    """French punctuation (? : ; !) bound to the word before it with a no-break space, so it never wraps alone"""
    if isinstance(v, dict):
        return {k: (frfix(x) if k == 'fr' else nbsp(x)) for k, x in v.items()}
    if isinstance(v, list):
        return [nbsp(x) for x in v]
    return v

def frfix(x):
    if isinstance(x, str):
        for p in ' ?', ' :', ' ;', ' !':
            x = x.replace(p, ' ' + p[1])
        return x
    if isinstance(x, list):
        return [frfix(y) for y in x]
    return x

def write(path, d):
    d = nbsp(d)
    with open(path, 'w', encoding='utf-8') as f:
        json.dump(d, f, ensure_ascii=False, indent=2)

for uid, u in UNITS.items():
    d = os.path.join(LIBS, uid)
    os.makedirs(d, exist_ok=True)
    for src, fn in COPIES:
        shutil.copyfile(os.path.join(LIBS, src, fn), os.path.join(d, fn))
    m = {'id': uid, 'name': u['name'], 'title': u['title'], 'description': u['description'], 'card': u['card'], 'course': COURSE,
         'kind': '2D', 'version': VERSION, 'bench': BENCH, 'languages': ['en', 'fr'], 'stage': {'width': 1920, 'height': 1080},
         'features': {'explore': False, 'cards': False}}
    if u['params']:
        m['params'] = u['params']
    m.update({'keys': L('', ''), 'strings': u['strings'], 'css': ['unit.css'], 'scripts': KIT})
    write(os.path.join(d, 'library.json'), m)

d = os.path.join(LIBS, SEQ['id'])
os.makedirs(d, exist_ok=True)
write(os.path.join(d, 'library.json'), {
    'id': SEQ['id'], 'name': SEQ['name'], 'title': SEQ['title'], 'description': SEQ['description'], 'card': CARD, 'course': COURSE,
    'kind': 'sequence', 'version': VERSION, 'bench': BENCH, 'features': {'explore': False, 'cards': False}, 'keys': L('', ''),
    'shared': ['supplyV', 'meterRange'],
    'sequence': [{'unit': f'../{u}/', 'title': t, 'flow': fl, 'keys': k} for u, t, fl, k in SEQ['sequence']],
    'languages': ['en', 'fr']})
print('wrote', len(UNITS), 'units and', SEQ['id'])
