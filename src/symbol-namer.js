var UI = require("sketch/ui"),
  DOM = require("sketch/dom");

export function onRename(context) {
  var document = DOM.getSelectedDocument();

  var selectedLayers = document.selectedLayers.map(layer => layer).filter(layer => layer.type === 'SymbolInstance');
  var selectedCount = selectedLayers.length;
  
  if (selectedCount === 0) {
    UI.message('Select one or more symbols');
  } else {
    let renamedCount = 0;
    selectedLayers.forEach(layer => {
      var overrides = layer.overrides.filter(override => override.property === 'stringValue' && override.sketchObject.isEditable());
      var overrideCount = overrides.length;

      if (overrideCount > 0) {
        layer.name = overrides[0].value;
        renamedCount++
      }
    });
    switch (renamedCount) {
      case 0:
      UI.message("None of the selected symbols have text overrides");
      break;
      case 1:
        UI.message("1 symbol renamed");
        break;
      default:
        UI.message(`${renamedCount} symbols renamed`);
    }
  }
}