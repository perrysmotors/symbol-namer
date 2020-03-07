import UI from "sketch/ui"
import Settings from "sketch/settings"
import { getSelectedDocument } from "sketch/dom"

const settingKey = "com.gilesperry.symbol-namer.name"

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
            const overrides = layer.overrides.filter(
                override =>
                    override.property === "stringValue" && override.editable
            )

            if (overrides.length > 0) {
                layer.name = overrides[0].value
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
