import UI from "sketch/ui"
import { getSelectedDocument } from "sketch/dom"

export function onRename() {
    const document = getSelectedDocument()

    const selectedLayers = document.selectedLayers
        .map(layer => layer)
        .filter(layer => layer.type === "SymbolInstance")

    if (selectedLayers.length === 0) {
        UI.message("Select one or more symbols")
    } else {
        let renamedCount = 0
        selectedLayers.forEach(layer => {
            const overrides = layer.overrides.filter(
                override =>
                    override.property === "stringValue" &&
                    override.sketchObject.isEditable()
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
