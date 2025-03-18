import * as Helpers from "./helpers.js";
import * as Actions from "./actions.js";
import * as StageManager from "./stageManager.js";

class Core {
    constructor(container, config = {}) {
        const isObject = (v) => v && typeof v === 'object'

        config = Helpers.merge({
            directChildrenOnly: true,
            active: {
                classes: "multistage-active",
                display: "block",
                attributes: {}
            },
            inactive: {
                classes: "",
                display: "none",
                attributes: {}
            },
            loop: true,
            fn: {
                beforeIncrement: () => { },
                beforeDecrement: () => { },
                afterIncrement: () => { },
                afterDecrement: () => { }
            }
        }, config);

        this.directChildrenOnly = config.directChildrenOnly;
        this.active = config.active;
        this.inactive = config.inactive;
        this.loop = config.loop;
        this.fn = config.fn;

        this.#init(container);
    }

    #init(container) {
        if (!container) {
            console.error("The container is null");
            return false;
        }

        if (!container.nodeType) {
            try {
                container = document.querySelector(container);
            }
            catch (e) {
                if (e instanceof SyntaxError) {
                    console.error("Invalid selector");
                }
                else {
                    console.error(e);
                }
                return;
            }
        }

        Object.defineProperty(this, "activeIndex", {
            get: function () {
                let stages = this.stages;
                let currentStage = this.directChildrenOnly
                    ? container.querySelector(":scope > .stage.multistage-active")
                    : container.querySelector(":scope .stage.multistage-active");

                if (!currentStage) {
                    console.error("The container has no active stage");
                    return false;
                }

                return Array.from(stages).indexOf(currentStage);
            }
        });

        this.stages = this.directChildrenOnly
            ? container.querySelectorAll(":scope > .stage")
            : container.querySelectorAll(":scope .stage");

        let stages = this.stages;

        stages.forEach((stage, index) => {
            if (index === 0) {
                StageManager.activateStage(stage, this); //i
            } else {
                StageManager.deactivateStage(stage, this); //i
            }

            let actionButtons = stage.querySelectorAll(":scope [data-multistage-action]");
            actionButtons.forEach(btn => {
                let handler = () => {
                    let action = btn.getAttribute("data-multistage-action");
                    if (action.startsWith('+')) {
                        Actions.handleIncrementAction(action, container, this); //i
                    } else if (action.startsWith('-')) {
                        Actions.handleDecrementAction(action, container, this); //i
                    }
                };

                let events = (btn.getAttribute("data-multistage-events") ?? "").split(" ").filter(Boolean);
                if (!events.length) {
                    events = ["click"];
                }
                events.forEach(event => btn.addEventListener(event, handler));
            });
        });

        return true;
    }
}

export default Core;