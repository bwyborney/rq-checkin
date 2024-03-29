import { getDefaultData } from "./scripts/getDefaultData.js";
import { fillStoreInfo } from "./scripts/fillStoreInfo.js";
import { fillPreTests } from "./scripts/fillPreTests.js";
import { fillRepairs } from "./scripts/fillRepairs.js";
import { fillData } from "./scripts/fillData.js";
let data;

// Once the message containing the data is received from 
// the parent window, send it through to the assembly line
window.addEventListener('message', event => {
    if (event.origin === "https://cpr.repairq.io") {
        initialize(event.data);
    } else {
        return;
    }
});

function initialize(passedData) {
    if (passedData === 'noData' || passedData === undefined) {
        // Get the default data if there is none
        data = getDefaultData();
    } else {
        data = passedData;
    }
    // Fill in the store information
    let storePhone = data.ticketInfo.technician.number;
    let storeEmail = data.ticketInfo.technician.email;
    fillStoreInfo(storePhone, storeEmail);
    // Add onchange listeners to the store info forms
    addStoreInfoListeners();
    // Fill the pretests
    fillPreTests(data.columnA.values, data.columnB.format);
    // Fill the repairs
    fillRepairs(data.columnC.format);
    // Add listener for the submit button
    document.getElementById('submit').addEventListener('click', () => {handleSubmit()});
}

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
        if (format.length < 2 || index === 0) {
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
        if (format.length < 2 || index === values.length - 1) {
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
        let newValues;
        let newFormat;
        // Check if the last value is being removed
        if (format.length === 1) {
            if (type === 'pt') {
                newValues = [''];
                newFormat = [['Pass', 'Fail', 'Not testable']];
            } else {
                newValues = [0];
                newFormat = [['Repair']];
            }
        } else {
            // Delete this index from the array
            newValues = [...values];
            newFormat = [...format];
            newValues.splice(index, 1);
            newFormat.splice(index, 1);
        }
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

// Handle submit button
function handleSubmit() {
    // Pass the data along to the filler function
    let completeData = fillData(data);
    // Emit this data back to the main page
    window.parent.postMessage(completeData, '*');
}

function addStoreInfoListeners() {
    // Identify the two form elements
    let phone = document.getElementById('store-phone');
    let email = document.getElementById('store-email');
    // Add listeners
    phone.onchange = (e) => handlePhoneChange(e);
    email.onchange = (e) => handleEmailChange(e);
}

// For each form, change the value in the data to the form's value
// The "data" variable getting passed here is data.ticketInfo.technician
function handlePhoneChange(e) {
    data.ticketInfo.technician.number = e.target.value;
}

function handleEmailChange(e) {
    data.ticketInfo.technician.email = e.target.value;
}