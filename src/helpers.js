export function isNumeric(str) {
    if (typeof str != "string") return false;
    return !isNaN(str) && !isNaN(parseFloat(str));
}

export function updateClasses(stage, classes, action) {
    classes.split(" ").filter(Boolean).forEach(className => {
        stage.classList[action](className);
    });
}

export function evaluateAttributes(attributes, stage) {
    Object.keys(attributes).forEach(attributeName => {
        let attributeValue = attributes[attributeName];
        if (attributeValue === null) {
            stage.removeAttribute(attributeName);
        } else {
            stage.setAttribute(attributeName, attributeValue);
        }
    });
}

export function merge(obj1, obj2) {
    const result = {};

    for (const key in obj1) {
        if (obj1.hasOwnProperty(key)) {
            if (typeof obj1[key] === 'object' && obj1[key] !== null && !Array.isArray(obj1[key])) {
                result[key] = merge(obj1[key], obj2[key] || {});
            } else {
                result[key] = obj1[key];
            }
        }
    }

    for (const key in obj2) {
        if (obj2.hasOwnProperty(key)) {
            result[key] = obj2[key];
        }
    }

    return result;
}