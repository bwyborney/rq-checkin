import { handleMiniMenuClick } from "../config.js";
import { handleTitleChange } from "../config.js";
import { handleFormatChange } from "../config.js";
// Fill in the repairs column on the page

function fillRepairs(format) {
    // Identify where to insert all the new elements
    let section = document.getElementById('repair-section');
    // Make sure there's actually something in the format
    if (format.length === undefined || format.length < 1) {
        format = ["Other"];
    }
    for (let a = 0; a < format.length; a++) {
        // Create the container for this entry
        let row = document.createElement('div');
        row.classList = 'repair-entry';
        // this row will be split into upper and lower sections
        let upper = document.createElement('div');
        upper.classList = 'repair-entry-upper';
        // Add a "mini menu" to the row
        let mm = generateMiniMenu(a);
        upper.appendChild(mm);
        // Add the type selector dropdown
        let selectContainer = document.createElement('div');
        selectContainer.classList = 'repair-option';
        let selector = document.createElement('select');
        selector.id = `re-${a}-format`;
        selector.onchange = (e) => handleFormatChange(e);
        // Add all the options to the selector
        let optionA = document.createElement('option');
        optionA.value = 'chk';
        optionA.innerText = "Checkbox";
        selector.appendChild(optionA);
        let optionB = document.createElement('option');
        optionB.value = 'pic';
        optionB.innerText = "Pick one";
        selector.appendChild(optionB);
        let optionC = document.createElement('option');
        optionC.value = 'oth';
        optionC.innerText = "Other";
        selector.appendChild(optionC);
        // Determine the pre-selected value of the selector
        let formatType = determineFormat(format[a]);
        selector.value = formatType;
        selectContainer.appendChild(selector);
        upper.appendChild(selectContainer);
        // Create the lower portion of the row. This will depend on the format
        let lower = document.createElement('div');
        lower.classList = 'repair-entry-lower';
        // Set this element up depending on the format type from earlier
        if (formatType === 'chk') {
            // Create an input element and its container for a checkbox format
            let lowerContainer = document.createElement('div');
            lowerContainer.classList = 're-check';
            let lowerInput = document.createElement('input');
            lowerInput.onchange = (e) => handleTitleChange(e);
            lowerInput.type = 'text';
            lowerInput.placeholder="Screen replacement";
            lowerInput.id = `re-${a}-value`;
            lowerInput.value = format[a][0];
            lowerContainer.appendChild(lowerInput);
            lower.appendChild(lowerContainer);
        } else if (formatType === 'pic') {
            // Create the inputs for a "pick one"
            let lowerContainer = document.createElement('div');
            lowerContainer.classList = 're-pick';

            let inputA = document.createElement('input');
            inputA.onchange = (e) => handleTitleChange(e);
            inputA.type = 'text';
            inputA.placeholder = 'OEM display';
            inputA.id = `re-${a}-0-value`;
            inputA.value = format[a][0];
            lowerContainer.appendChild(inputA);

            let inputB = document.createElement('input');
            inputB.onchange = (e) => handleTitleChange(e);
            inputB.type = 'text';
            inputB.placeholder = 'OEM display';
            inputB.id = `re-${a}-1-value`;
            inputB.value = format[a][1];
            lowerContainer.appendChild(inputB);

            let inputC = document.createElement('input');
            inputC.onchange = (e) => handleTitleChange(e);
            inputC.type = 'text';
            inputC.placeholder = 'OEM display';
            inputC.id = `re-${a}-2-value`;
            inputC.value = format[a][2];
            lowerContainer.appendChild(inputC);

            lower.appendChild(lowerContainer);
        }


        row.appendChild(upper);
        row.appendChild(lower);
        section.appendChild(row);
    }
}

// Create a standard "mini menu" element, which is used for controlling entries
function generateMiniMenu(index) {
    let mm = document.createElement('div');
    mm.classList = 'minimenu';
    // Create the 'up arrow' button, then create the other three buttons
    let up = document.createElement('div');
    up.id = `rep-${index}-up`;
    up.innerText = '\u2191';
    up.onclick = () => handleMiniMenuClick(index, 'rep', 'up');
    mm.appendChild(up);

    let down = document.createElement('div');
    down.id = `rep-${index}-down`;
    down.innerText = '\u2193';
    down.onclick = () => handleMiniMenuClick(index, 'rep', 'down');
    mm.appendChild(down);

    let add = document.createElement('div');
    add.id = `rep-${index}-add`;
    add.innerText = '\uff0b';
    add.onclick = () => handleMiniMenuClick(index, 'rep', 'add');
    mm.appendChild(add);

    let remove = document.createElement('div');
    remove.id = `rep-${index}-remove`;
    remove.innerText = 'x';
    remove.onclick = () => handleMiniMenuClick(index, 'rep','remove');
    mm.appendChild(remove);

    return mm;
}

// Translate the format into a format type
function determineFormat(format) {
    let value = '';
    // The format may be a checkbox or "other", which are represented by an
    // array with a length of 1
    if (format.length === 1) {
        if (format[0] === 'Other') {
            value = 'oth';
        } else {
            value = 'chk';
        }
    } else {
        value = 'pic';
    }
    return value;
}

export {fillRepairs};