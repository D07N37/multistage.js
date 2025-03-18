# multistage.js ![workflow badge](https://github.com/D07N37/multistage.js/actions/workflows/main.yml/badge.svg)

Multistage.js is a highly customizable *<4kb* javascript library to build multi-stage HTML forms. This library does not introduce any classes or unneccesary styles.

## Usage

**CDN:**
```
<script src="https://cdn.jsdelivr.net/gh/D07N37/multistage.js@1.0.0/dist/multistage.min.js"></script>
```

**Self-Hosting:**
You can download the latest release [here](https://github.com/D07N37/multistage.js/releases).

## Get Started
The multi-stage forms need to be initialized before they can be used and displayed.

The class constructor requires at least one parameter which can either be an element, or a selector. If the parameter is a selector, the library will use the `document.querySelector()` method to obtain the element. This parameter refers to the container which will contain all of the stages within the form. The container can be a `<form>` element.
```
// new Multistage(element)
let instance = new Multistage(document.getElementById("helloworld"));

// new Multistage(selector)
let instance = new Multistage("#helloworld");
```

## Element Structure
The stages are defined by the class `.stage`. If `Multistage.directChildrenOnly` is `true`, then the stages must be direct decendants of the container to be recognized.

## Navigating Stages
Elements within a stage can use the `data-multistage-action` attribute to navigate through the stages. The value of the attribute should start with either a `+`, or `-`, to indicate the direction and contain an integer indicating the number of stages to move.

For example, `+1` will go to the next stage, `+2` will skip one stage, `-5` will go back 5 stages, .etc

These movements will be triggered by the events specified in the `data-multistage-event` attribute, or by default, on click. Multiple events can be listened for by seperating them in the `data-multistage-event` attribute by a whitespace.

For example, `click contextmenu` will trigger the action on both left and right click.

## Customize

The customizations are represented by an object and can be passed into the class constructor as a second parameter.

These customizations can also be read, and modified directly on an instance of the `Multistage` class (e.g. `new Multistage("foo").directChildrenOnly`).

> [!IMPORTANT]
> Modifying properties modifies them for future evaluations, such as when the stage index changes, and will not result in retrospective changes.

| Key | Type | Description |
|-|-|-|
| `directChildrenOnly` | `Boolean` | If true, stages must be direct decendants of the container to be recognized. |
| `active.classes` | `String` | A list of classes to append to the active stage, seperated by a single whitespace. These classes will be automatically removed if another stage is selected. To avoid this behaviour, add the same class to `inactive.classes` so that it is added back. |
| `active.display` | `String` | The value to assign to the css property `display` if the stage is active. Default: `block`. |
| `active.attributes` | `Object` | The attributes to set on the active stage, each represented by a key/value pair in the object, with the key being the attribute name and the value being the attribute value. The attribute are not automatically removed. To remove the attribute, set the value to `null`. |
| `inactive.classes` | `String` | A list of classes to append to the inactive stages, seperated by a single whitespace. When an inactive stage becomes active, these classes will be removed from the stage. To avoid this behaviour, add the same class to `active.classes` so that it is added back. |
| `inactive.display` | `String` | The value to assign to the css property `display` of the inactive stages. Default: `none`. |
| `inactive.attributes` | `Object` | The attributes to set on the inactive stages, each represented by a key/value pair in the object, with the key being the attribute name and the value being the attribute value. The attribute are not automatically removed. To remove the attribute, set the value to `null`. |
| `loop` | `Boolean` | If true, incrementing the stage index by any amount whilst on the last stage will toggle first stage, and decrementing the stage index by any amount whilst on the first stage will toggle the last stage. |
| `fn.beforeIncrement` | `function` | Parameters: <ul><li>`currentIndex`: `Number`</li><li>`currentStage`: `Element`</li><li>`action`: `String`</li><li>`allStages`: `Element[]`</li></ul> This method will be called **before** the stage index is **incremented** |
| `fn.afterIncrement` | `function` | Parameters: <ul><li>`currentIndex`: `Number`</li><li>`currentStage`: `Element`</li><li>`action`: `String`</li><li>`allStages`: `Element[]`</li><li>`successful`: `Boolean`</li></ul> This method will be called **after** the stage index is **incremented**. The `successful` parameter indicates whether the stage index was actually incremented. A false value can occur if `loop` is false and the prospective stage index would be out-of-bounds. |
| `fn.beforeDecrement` | `function` | Parameters: <ul><li>`currentIndex`: `Number`</li><li>`currentStage`: `Element`</li><li>`action`: `String`</li><li>`allStages`: `Element[]`</li></ul> This method will be called **before** the stage index is **decremented** |
| `fn.afterDecrement` | `function` | Parameters: <ul><li>`currentIndex`: `Number`</li><li>`currentStage`: `Element`</li><li>`action`: `String`</li><li>`allStages`: `Element[]`</li><li>`successful`: `Boolean`</li></ul> This method will be called **after** the stage index is **decremented**. The `successful` parameter indicates whether the stage index was actually incremented. A false value can occur if `loop` is false and the prospective stage index would be out-of-bounds. |

## Other Properties
Aside from the customiziation properties, the Multistage class also contains the following read-only properties:

| Key | Type | Description |
|-|-|-|
| activeIndex | Number | Zero-based representation of the active stage |

## License
Multistage.js is available under the MIT license. See the LICENSE file for more info.
