// Get the data 
import { getData } from "./scripts/getData.js";
let data = getData();

// Fill in the store information
let storePhone = '(541)914-1230';
let storeEmail = 'repairs@cpr-eugene.com';
import { fillStoreInfo } from "./scripts/fillStoreInfo.js";
fillStoreInfo(storePhone, storeEmail);

// Add onchange listeners to the store info forms
import { addStoreInfoListeners } from "./scripts/addStoreInfoListeners.js";
addStoreInfoListeners(data.ticketInfo.technician);

// Fill the pretests
import { fillPreTests } from "./scripts/fillPreTests.js";
fillPreTests(data.columnA.values, data.columnB.format);

// Fill the repairs
import { fillRepairs } from "./scripts/fillRepairs.js";
fillRepairs(data.columnC.format);

// Handler for mini-menu clicks
// Declaring this here so it has access to the data variable
function handleMiniMenuClick(index, type, command) {
    // Decide if this is a pre-test or a repair, then set the target data
    let values;
    let format;
    if (type === 'pt') {
        values = data.columnA.values;
        format = data.columnB.format;
    } else {
        values = data.columnC.values;
        format = data.columnC.format;
    }
    // Handle the action differently depending on the command/button
    if (command === 'up') {
        // Do nothing if "up" is clicked when the item is at the top
        if (values.length < 2 || index === 0) {
            console.log('cannot move up');
        } else {
            // Swap the value with the value above it to move it "up" the list
            let newValues = [...values];
            let newFormat = [...format];
            newValues[index] = values[index - 1];
            newValues[index - 1] = values[index];
            newFormat[index] = format[index - 1];
            newFormat[index - 1] = format[index];
            values = newValues;
            format = newFormat;
        }
    } else if (command === 'down') {
        if (values.length < 2 || index === values.length - 1) {
            console.log('cannot move down');
        } else {
            let newValues = [...values];
            let newFormat = [...format];
            newValues[index] = values[index + 1];
            newValues[index + 1] = values[index];
            newFormat[index] = format[index + 1];
            newFormat[index + 1] = format[index];
            values = newValues;
            format = newFormat;
        }
    } else if (command === 'add') {
        // Add a new element below this one
        let newValues = [...values];
        let newFormat = [...format];
        // This will get handle differently for pre-tests vs. repairs
        if (type === 'pt') {
            newValues.splice(index + 1, 0, "");
            newFormat.splice(index + 1, 0, ["Pass, Fail, Not testable"]);
        } else {
            newFormat.splice(index + 1, 0, ["Repair"]);
        }

        values = newValues;
        format = newFormat;
    } else if (command === 'remove') {
        // Delete this index from the array
        let newValues = [...values];
        let newFormat = [...format];
        newValues.splice(index, 1);
        newFormat.splice(index, 1);
        values = newValues;
        format = newFormat;
    }

    // Now replace the actual data with the new stuff
    if (type === 'pt') {
        data.columnA.values = values;
        data.columnB.format = format;
    } else {
        data.columnC.values = values;
        data.columnC.format = format;
    }

    // Now clear out the old elements and re-render them
    document.getElementById('pretest-section').replaceChildren();
    document.getElementById('repair-section').replaceChildren();
    fillPreTests(data.columnA.values, data.columnB.format);
    fillRepairs(data.columnC.format);
}
export {handleMiniMenuClick};

// Handle when the title of a pretest or a repair option is changed
function handleTitleChange(e) {
    // Parse the type and index from the calling element's ID
    let parse = e.target.id.split('-');
    let column = parse[0];
    let index = parse[1];
    // Handle this depending on whether it's a pre-test or a repair
    if (column === 'pt') {
        data.columnA.values[index] = e.target.value;
    } else {
        // Repair format can be an array of 1 or an array of 3, which means
        // they may have a double index. Let's find out
        if (parse[2] === 'value') {
            data.columnC.format[index] = [e.target.value];
        } else {
            let index2 = parseInt(parse[2]);
            data.columnC.format[index][index2] = e.target.value;
        }
    }
}
export {handleTitleChange};

// Handle the format of a pre-test or repair being changed
function handleFormatChange(e) {
    // Parse the type and index from the calling element's ID
    let parse = e.target.id.split('-');
    let column = parse[0];
    let index = parse[1];
    
    if (column === 'pt') {
        // We'll inject a new set of values in the data.columnA.format,
        // depending on what the value being passed in is
        let newFormat = [];
        switch(e.target.value) {
            case 'default' :
                newFormat = ["Yes", "No"];
                break;
            case 'yn' :
                newFormat = ["Yes", "No"];
                break;
            case 'pf' :
                newFormat = ["Pass", "Fail", "Not testable"];
                break;
            case 'amps' :
                newFormat = ["amps"];
                break;
            case 'percent' :
                newFormat = ["percent"];
                break;
        }
        data.columnB.format[index] = newFormat;
    } else { // Handle changes to a repair format
        let newFormat = [];
        switch (e.target.value) {
            case 'default' :
                newFormat = [""];
                break;
            case 'chk' :
                newFormat = [""];
                break;
            case 'pic' :  
                newFormat = ["","","",];
                break;
            case 'oth' :
                newFormat = ["Other"];
                break;
        }
        data.columnC.format[index] = newFormat;
        // Now clear out the old elements and re-render them
    document.getElementById('repair-section').replaceChildren();
        fillRepairs(data.columnC.format);
    }
}
export {handleFormatChange};