import * as Helpers from "./helpers.js";

export function activateStage(stage, config) {
    stage.style.display = config.active.display;
    Helpers.evaluateAttributes(config.active.attributes, stage, config);
    Helpers.updateClasses(stage, config.inactive.classes, 'remove', config);
    Helpers.updateClasses(stage, config.active.classes, 'add', config);
}

export function deactivateStage(stage, config) {
    stage.style.display = config.inactive.display;
    Helpers.evaluateAttributes(config.inactive.attributes, stage, config);
    Helpers.updateClasses(stage, config.active.classes, 'remove', config);
    Helpers.updateClasses(stage, config.inactive.classes, 'add', config);
}
