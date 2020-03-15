import UI from "sketch/ui"
import Settings from "sketch/settings"
import { getSelectedDocument } from "sketch/dom"

const settingKey = "com.gilesperry.symbol-namer.name"
const templateKey = "com.gilesperry.symbol-namer.template"

// Select All Instances on Page
export function onSelectOnPage() {
    const document = getSelectedDocument()
    const master = getMasterFromSelection(document.selectedLayers.layers)
    if (master === undefined) {
        return
    } else {
        const instances = master
            .getAllInstances()
            .filter(
                item => item.getParentPage().id === document.selectedPage.id
            )
        if (instances.length > 0) {
            document.selectedLayers.clear()
            document.selectedLayers.layers = instances
        } else {
            UI.message("This symbol has no instances")
        }
    }
}

// Rename Selection Using Override Text
export function onRenameToOverride() {
    const document = getSelectedDocument()

    const instances = document.selectedLayers.layers.filter(
        layer => layer.type === "SymbolInstance"
    )

    if (instances.length === 0) {
        UI.message("Select one or more symbols")
    } else {
        let renamedCount = 0
        instances.forEach(layer => {
            const overrideText = getOverrideText(layer)
            if (overrideText != null) {
                layer.name = overrideText
                renamedCount++
            }
        })
        switch (renamedCount) {
            case 0:
                UI.message("None of the selected symbols have text overrides")
                break
            case 1:
                UI.message("1 symbol renamed")
                break
            default:
                UI.message(`${renamedCount} symbols renamed`)
        }
    }
}

function getOverrideText(layer) {
    const overrides = layer.overrides.filter(
        override => override.property === "stringValue" && override.editable
    )
    if (overrides.length > 0) {
        return overrides[0].value
    } else {
        return null
    }
}

// Rename Selection Using Default
export function onResetSelection() {
    const document = getSelectedDocument()

    const instances = document.selectedLayers.layers.filter(
        layer => layer.type === "SymbolInstance"
    )

    if (instances.length === 0) {
        UI.message("Select one or more symbols")
    } else {
        instances.forEach(layer => (layer.name = getDefaultName(layer.master)))
        const s = instances.length === 1 ? "" : "s"
        UI.message(`${instances.length} symbol${s} renamed`)
    }
}

// Rename All Instances Using Default
export function onResetAll() {
    const document = getSelectedDocument()
    const master = getMasterFromSelection(document.selectedLayers.layers)
    if (master === undefined) {
        return
    } else {
        const name = getDefaultName(master)
        const instances = master.getAllInstances()
        if (instances.length > 0) {
            instances.forEach(item => (item.name = name))
            const s = instances.length === 1 ? "" : "s"
            UI.message(`${instances.length} symbol${s} renamed`)
        } else {
            UI.message("This symbol has no instances")
        }
    }
}

// Set Default Symbol Name
export function onSetDefault() {
    const document = getSelectedDocument()
    const master = getMasterFromSelection(document.selectedLayers.layers)
    if (master === undefined) {
        return
    } else {
        let name = getDefaultName(master)
        UI.getInputFromUser(
            "Enter a name:",
            {
                initialValue: name,
            },
            (err, value) => {
                if (err) {
                    // most likely the user canceled the input
                    return
                } else {
                    if (value === "") {
                        UI.message("⚠️ You can't leave it blank")
                    } else {
                        Settings.setLayerSettingForKey(
                            master,
                            settingKey,
                            value
                        )
                        UI.message(`Name set to "${value}"`)
                    }
                }
            }
        )
    }
}

// Clear Default Symbol Names
export function onClearDefaults() {
    const document = getSelectedDocument()

    const masters = document.selectedLayers.layers
        .filter(
            layer =>
                layer.type === "SymbolMaster" || layer.type === "SymbolInstance"
        )
        .map(layer => (layer.type === "SymbolMaster" ? layer : layer.master))

    if (masters.length === 0) {
        UI.message("Select one or more symbols")
    } else {
        const uniqueIDs = []
        masters.forEach(master => {
            if (!uniqueIDs.includes(master.id)) {
                Settings.setLayerSettingForKey(master, settingKey, undefined)
                uniqueIDs.push(master.id)
            }
        })
        const s = uniqueIDs.length === 1 ? "" : "s"
        UI.message(`${uniqueIDs.length} symbol master${s} reset`)
    }
}

function getMasterFromSelection(layers) {
    if (layers.length === 1) {
        const layer = layers[0]
        switch (layer.type) {
            case "SymbolMaster":
                return layer
            case "SymbolInstance":
                return layer.master
        }
    }
    UI.message("Try selecting one symbol")
    return
}

function getDefaultName(master) {
    const defaultName = Settings.layerSettingForKey(master, settingKey)
    return defaultName === undefined ? master.name : defaultName
}

// Define Template
export function onSetTemplate() {
    const template = getTemplateFromSettings()

    UI.getInputFromUser(
        "Enter a template:",
        {
            initialValue: template,
        },
        (err, value) => {
            if (err) {
                // most likely the user canceled the input
                return
            } else {
                if (value === "") {
                    UI.message("⚠️ You can't leave it blank")
                } else {
                    Settings.setSettingForKey(templateKey, value)
                    UI.message(`Template set to "${value}"`)
                }
            }
        }
    )
}

function getTemplateFromSettings() {
    let template = Settings.settingForKey(templateKey)
    if (template === undefined) {
        return "%-1" // Default
    } else {
        return template
    }
}

// Rename Selection Using Template
export function onRenameToTemplate() {
    const document = getSelectedDocument()

    const instances = document.selectedLayers.layers.filter(
        layer => layer.type === "SymbolInstance"
    )

    if (instances.length === 0) {
        UI.message("Select one or more symbols")
    } else {
        instances.forEach(layer => (layer.name = getNameFromTemplate(layer)))
        const s = instances.length === 1 ? "" : "s"
        UI.message(`${instances.length} symbol${s} renamed`)
    }
}

function getNameFromTemplate(layer) {
    const name = layer.master.name
    const phrases = name.split("/").map(item => item.trim())
    const template = getTemplateFromSettings()

    let positives = getMatches(template, /%[1-9]/g)
    let negatives = getMatches(template, /%-[1-9]/g)
    let overrides = getMatches(template, /%O/g)

    const indices = positives
        .concat(negatives)
        .map(item => parseInt(item.substring(1)))

    let replacement = template
    indices.forEach(index => {
        const phrase =
            index > 0 ? phrases[index - 1] : phrases[phrases.length + index]
        const substr = `%${index}`

        replacement = replacement.replace(
            substr,
            phrase != undefined ? phrase : ""
        )
    })

    const overrideText = getOverrideText(layer)
    overrides.forEach(() => {
        replacement = replacement.replace(
            "%O",
            overrideText != null ? overrideText : ""
        )
    })

    return replacement.trim()
}

function getMatches(template, regexp) {
    let matches = template.match(regexp)
    if (matches === null) {
        return []
    } else {
        return matches
    }
}
