export function generateStages(count, buttons = []) {
    let html = `<div id="multistage">`;
    for (let i = 0; i < count; i++) {
        html += `<div class="stage">${i} ${buttons.join(" ")}</div>`;
    }
    html += `</div>`;
    return html;
}