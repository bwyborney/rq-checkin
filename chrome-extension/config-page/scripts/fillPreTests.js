import { handleMiniMenuClick } from "../config.js";
import { handleTitleChange } from "../config.js";
import { handleFormatChange } from "../config.js";

// Fill in the pre-test items. Gets passed data.columnA.values
// and data.columnB.format
function fillPreTests(values, format) {
    // Identify where to insert all the new elements
    let section = document.getElementById('pretest-section');
    // Make sure there's actually something in the values
    if (values.length === undefined || values.length < 1) {
        values = [""];
    }
    for (let a = 0; a < values.length; a++) {
        // Create the container for this entry
        let row = document.createElement('div');
        row.classList = 'pretest-entry';
        // Add a "mini menu" to the row
        let mm = generateMiniMenu(a);
        row.appendChild(mm);
        // Add the text entry box
        let title = document.createElement('div');
        title.classList = 'pretest-text';
        let titleForm = document.createElement('input');
        titleForm.type = 'text';
        titleForm.id = `pt-${a}-value`;
        titleForm.placeholder = 'Touch screen';
        titleForm.value = values[a];
        titleForm.onchange = (e) => handleTitleChange(e);
        // Add the text box to the row
        title.appendChild(titleForm);
        row.appendChild(title);
        // Add the format selection menu
        let options = document.createElement('div');
        options.classList = 'pretest-option';
        let selector = document.createElement('select');
        selector.id = `pt-${a}-format`;
        selector.onchange = (e) => handleFormatChange(e);
        // Add all the different options
        let format1 = document.createElement('option');
        format1.value = 'yn';
        format1.innerText = 'Yes/No';
        selector.appendChild(format1);

        let format2 = document.createElement('option');
        format2.value = 'pf';
        format2.innerText = 'Pass/Fail/Not testable';
        selector.appendChild(format2);

        let format3 = document.createElement('option');
        format3.value = 'amps';
        format3.innerText = 'Amps';
        selector.appendChild(format3);

        let format4 = document.createElement('option');
        format4.value = 'percent';
        format4.innerText = 'Percent';
        selector.appendChild(format4);
        // Set the value according to what's already in the data
        let formatValue = determineFormatValue(format[a]);
        selector.value = formatValue;
        // Append options to the row
        options.appendChild(selector);
        row.appendChild(options);
        // Add the row to the correct section
        section.appendChild(row);
    }
}

// Create a standard "mini menu" element, which is used for controlling entries
function generateMiniMenu(index) {
    let mm = document.createElement('div');
    mm.classList = 'minimenu';
    // Create the 'up arrow' button, then create the other three buttons
    let up = document.createElement('div');
    up.id = `pt-${index}-up`;
    up.innerText = '\u2191';
    up.onclick = () => handleMiniMenuClick(index, 'pt', 'up');
    mm.appendChild(up);

    let down = document.createElement('div');
    down.id = `pt-${index}-down`;
    down.innerText = '\u2193';
    down.onclick = () => handleMiniMenuClick(index, 'pt', 'down');
    mm.appendChild(down);

    let add = document.createElement('div');
    add.id = `pt-${index}-add`;
    add.innerText = '\uff0b';
    add.onclick = () => handleMiniMenuClick(index, 'pt', 'add');
    mm.appendChild(add);

    let remove = document.createElement('div');
    remove.id = `pt-${index}-remove`;
    remove.innerText = 'x';
    remove.onclick = () => handleMiniMenuClick(index, 'pt','remove');
    mm.appendChild(remove);

    return mm;
}

// Determine what the value of a format selector should be based on what is passed in
function determineFormatValue(format) {
    let result = 'pf';
    switch (format[0]) {
        case 'default' :
            result = 'pf';
            break;
        case 'Yes' :
            result = 'yn';
            break;
        case 'Pass' :
            result = 'pf';
            break;
        case 'amps':
            result = 'amps';
            break;
        case 'percent':
            result = 'percent';
            break;
    }

    return result;
}

export {fillPreTests};