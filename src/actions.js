import * as StageManager from "./stageManager.js"
import * as Helpers from "./helpers.js"

export function handleIncrementAction(action, container, config) {
    let stages = config.stages;
    let pages = action.replace(/^\+/, "");

    let currentStage = config.directChildrenOnly
        ? container.querySelector(":scope > .stage.multistage-active")
        : container.querySelector(":scope .stage.multistage-active");

    if (!currentStage) {
        console.error("The container has no active stage");
        return false;
    }

    let currentIndex = Array.from(stages).indexOf(currentStage);

    if (config.fn.beforeIncrement) {
        config.fn.beforeIncrement(currentIndex, currentStage, action, stages);
    }

    if (!Helpers.isNumeric(pages)) {
        console.error("Invalid action");
        return false;
    }

    if (currentIndex + 2 > stages.length) {
        if (config.loop) {
            StageManager.deactivateStage(currentStage, config);
            StageManager.activateStage(stages[0], config);
            return true;
        }
        console.error("Unable to increment any further");
        if (config.fn.afterIncrement) {
            config.fn.afterIncrement(currentIndex, currentStage, action, stages, false);
        }
        return false;
    } else {
        StageManager.deactivateStage(currentStage, config);
        StageManager.activateStage(stages[currentIndex + 1], config);
        if (config.fn.afterIncrement) {
            config.fn.afterIncrement(currentIndex, currentStage, action, stages, true);
        }
        return true;
    }
}

export function handleDecrementAction(action, container, config) {
    let stages = config.stages;
    let pages = action.replace(/^\+/, "");

    let currentStage = config.directChildrenOnly
        ? container.querySelector(":scope > .stage.multistage-active")
        : container.querySelector(":scope .stage.multistage-active");

    if (!currentStage) {
        console.error("The container has no active stage");
        return false;
    }

    let currentIndex = Array.from(stages).indexOf(currentStage);

    if (config.fn.beforeIncrement) {
        config.fn.beforeIncrement(currentIndex, currentStage, action, stages);
    }

    if (!Helpers.isNumeric(pages)) {
        console.error("Invalid action");
        return false;
    }


    if (currentIndex - 1 < 0) {
        if (config.loop) {
            StageManager.deactivateStage(currentStage, config);
            StageManager.activateStage(stages[stages.length - 1], config);
            return true;
        }
        console.error("Unable to decrement any further");
        if (config.fn.afterIncrement) {
            config.fn.afterIncrement(currentIndex, currentStage, action, stages, false);
        }
        return false;
    } else {
        StageManager.deactivateStage(currentStage, config);
        StageManager.activateStage(stages[currentIndex - 1], config);
        if (config.fn.afterIncrement) {
            config.fn.afterIncrement(currentIndex, currentStage, action, stages, true);
        }
        return true;
    }
}