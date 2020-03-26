import * as color from './lib/aesthetique/colorLibrary.js'

import * as options from './lib/mathematique/optionsMathLibrary.js'
import * as stats from './lib/mathematique/outliersLibrary.js'
import * as treasury from './lib/mathematique/treasuryLibrary.js'

import * as request from './lib/utilique/fetchLibrary.js'
import * as structure from './lib/utilique/structuresEditingLibrary.js'

export var aesthetique = {
    color
}

export var mathematique = {
    options,
    stats,
    treasury
}

export var utilique = {
    request,
    structure
}

