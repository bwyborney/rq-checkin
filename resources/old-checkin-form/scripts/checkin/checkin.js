// default data
let data = {};
let maxRows;
let columnPlace;

// ----- Everything for generating the initial checkin form:

// These functions will get passed IDs which they need to 
// parse into a two-layer array index
function parseId(id) {
    // Get an array with just the two numbers
    let numbersOnly = id.split('-').toSpliced(0,1);
    // Those numbers are chars, need to be ints
    let parsed = [];
    for (let n = 0; n < numbersOnly.length; n++) {
        parsed[n] = parseInt(numbersOnly[n]);
    }
    return parsed;
}

// When a pre-test percent or amperage value is changed
function changeColumnBValue(id, value) {
    let index = parseId(id);
    const a = index[0];
    data.columnB.values[a] = value;
}

// When a pre-test with multiple selections is clicked
function changeColumnBSelection(id) {
    let index = parseId(id);
    const a = index[0];
    const b = index[1];
    // Change the class of the selected element, but first set
    // all its neighbors to the default class
    for (let c = 0; c < data.columnB.format[a].length; c++) {
        let target = `t-${a}-${c}`;
        document.getElementById(target).classList = 'ci-deselected';
    }
    document.getElementById(id).classList = 'ci-selected';
    // Now change the value in storage
    data.columnB.values[a] = b;
    
}

// Add all the pre test forms to the page
function addPreTests() {
    // Add a header first
    let sectionHeader = document.createElement('p');
    sectionHeader.classList = 'section-head';
    sectionHeader.innerText = 'Pre-repair Inspection:';
    document.getElementById('checkin').appendChild(sectionHeader);
    // Make one row for each item on the list
    for (let p = 0; p < data.columnA.values.length; p++) {
        let row = document.createElement('div');
        row.classList.add('ci-test');
        // The label says what the test is for
        let label = document.createElement('div');
        label.classList.add('ci-test-label');
        label.innerText = data.columnA.values[p];
        row.appendChild(label);
        // Check if the test contains a keyword, either "percent" or "amps"
        // If it does, it will require an input form and a different class
        if (data.columnB.format[p][0] === "percent" || 
        data.columnB.format[p][0] === "amps" ) {
            row.classList.add('ci-input');
            let input = document.createElement('input');
            input.type = 'text'; // could change this to number, but that wouldn't allow floats
            // The id will let the change function know which value to change
            const inputId = `t-${p}-0`;
            input.id = inputId;
            input.addEventListener('change', () => changeColumnBValue(inputId, input.value));
            row.appendChild(input);
            // This is just an ending, so folks won't add their own percent sign
            let append = document.createElement('div');
            append.classList.add('ci-append');
            append.innerText = data.columnB.format[p][0];
            row.appendChild(append);
        } else {
            row.classList.add('ci-multiselect');
            // Add one button per option
            for (let v = 0; v < data.columnB.format[p].length; v++) {
                let button = document.createElement('div');
                button.classList.add('ci-deselected');
                button.innerText = data.columnB.format[p][v];
                const inputId = `t-${p}-${v}`;
                button.id = inputId;
                // Use a different function for this type of input
                button.addEventListener('click', () => changeColumnBSelection(inputId));

                row.appendChild(button);
            }
        }

        
        document.getElementById('checkin').appendChild(row);
    }
}

// Handle checkbox clicks for repair types
function handleRepairCheck(id) {
    // Get the index of the array and the sub-array
    let index = parseId(id);
    const a = index[0];
    const b = index[1];

    // Toggle the target value between 1 and 0. It defaults at 0
    if (data.columnC.values[a][b] === 0) {
        data.columnC.values[a][b] = 1;
    } else if (data.columnC.values[a][b] === 1) {
        data.columnC.values[a][b] = 0;
    }

    // Now, if this is a multi-option, such as screen type, deselect the others
    for (let u = 0; u < data.columnC.values[a].length; u++) {
        if (u !== b) {
            data.columnC.values[a][u] = 0;
        }
    }

    // Finally, set the correct classes and checkboxes for everyone
    for (let s = 0; s < data.columnC.values[a].length; s++) {

        if (document.getElementById(`r-${a}-${s}`) != null) {
            if (data.columnC.values[a][s] === 0) {
                document.getElementById(`r-${a}-${s}`).classList = "rep-deselected";
                document.getElementById(`r-${a}-${s}`).innerText = "\u2610 " + data.columnC.format[a][s];
            } else {
                document.getElementById(`r-${a}-${s}`).classList = "rep-selected";
                document.getElementById(`r-${a}-${s}`).innerText = "\u2611 " + data.columnC.format[a][s];
            }

        }
        


    }
}

// Add the repair checklist
function addRepairs() {
    // Add a header first
    let sectionHeader = document.createElement('p');
    sectionHeader.classList = 'section-head';
    sectionHeader.innerText = 'Repairs to perform:';
    document.getElementById('checkin').appendChild(sectionHeader);

    let format = data.columnC.format;
    for (let f = 0; f < format.length; f++) {
        let row = document.createElement('div');
        row.classList.add('rep-test');

        if (format[f][0] === "Other") {
            row.classList.add('rep-other');
            let item = document.createElement('div');
            item.classList.add('rep-deselected');

            let itemId = `r-${f}-0`;
            item.id = itemId;
            item.innerText = "\u2610 Other";
            item.addEventListener('click', () => handleRepairCheck(itemId));
            row.appendChild(item);

            let field = document.createElement('input');
            field.type = 'text';
            field.placeholder="Enter the type of repair";
            field.classList.add("rep-other-input");
            field.id = `other-input-${f}`;
            row.appendChild(field);
        } else {
            row.classList.add('rep-select');
            for (let g = 0; g < format[f].length; g++) {
                let item = document.createElement('div');
                item.classList.add('rep-deselected');
                let itemId = `r-${f}-${g}`;
                item.id = itemId;
                item.innerText = "\u2610 " + data.columnC.format[f][g];
                item.addEventListener('click', () => handleRepairCheck(itemId));
                row.appendChild(item);
            }

        }
        
        document.getElementById('checkin').appendChild(row);
    }

}

// Concatenate the values of the contact method dropdown boxes and
// update the data accordingly
function concatContact() {
    // First, identify all the values
    const method = document.getElementById('contact-method').value;
    const otherMethod = document.getElementById('cic-other-method').value;
    const number = document.getElementById('contact-number').value;
    const otherNumber = document.getElementById('cic-other-number').value;

    let concat = '';
    if (method === 'No contact method') {
        concat = method;
    } else {
        if (method === 'Other') {
            concat += otherMethod;
        } else {
            concat += method;
        }
        concat += ' ';
        if (number === 'Other') {
            concat += otherNumber;
        } else {
            concat += number;
        }
    }

    data.ticketInfo.customer.contact = concat;
    
}

// Handle contact method change
function handleContactMethod() {
    // Show or hide the second row if there is no contact method
    const value = document.getElementById('contact-method').value;
    if (value == 'No contact method') {
        document.getElementsByClassName('ci-contact-row')[1].style.display = 'none';
    } else {
        document.getElementsByClassName('ci-contact-row')[1].style.display = 'grid';
    }
    // Show or hide the "other" box as needed
    if (value === 'Other') {
        document.getElementById('cic-other-method').style.display = 'grid';
    } else {
        document.getElementById('cic-other-method').style.display = 'none';
    }

    concatContact();
}

// Handle contact number change
function handleContactNumber() {
    // Show or hide the "other" box as needed
    const value = document.getElementById('contact-number').value;
    if (value === 'Other') {
        document.getElementById('cic-other-number').style.display = 'grid';
    } else {
        document.getElementById('cic-other-number').style.display = 'none';
    }

    concatContact();
}

// Prepare the contact method selection menus
function addContact() {
    // Populate all the contact options in the dropdown menu
    for (let m = 0; m < data.ticketInfo.customer.methods.length; m++) {
        let option = document.createElement('option');
        option.value = data.ticketInfo.customer.methods[m];
        option.innerText = data.ticketInfo.customer.methods[m];
        document.getElementById('contact-number').appendChild(option);
    }
    // Add an 'other' option
    let other = document.createElement('option');
    other.value = 'Other';
    other.innerText = 'Other';
    document.getElementById('contact-number').appendChild(other);
    // Add listeners for all the contacts methods
    document.getElementById('contact-method').addEventListener('change', handleContactMethod);
    document.getElementById('contact-number').addEventListener('change', handleContactNumber);

    document.getElementById('cic-other-method').addEventListener('change', concatContact);
    document.getElementById('cic-other-number').addEventListener('change', concatContact);
}

// Update the notes if they get changed
function updateNotes() {
    data.ticketInfo.notes = document.getElementById('ci-notes').value;
}

// When the Submit button is clicked, make sure everything is ready
function checkSubmit() {
    // Hide the error messages. They'll be visible again if they still apply
    document.getElementById('err-contact').style.display = 'none';
    document.getElementById('err-pretest').style.display = 'none';
    document.getElementById('err-other-repair').style.display = 'none';

    let pass = true;
    // Make sure all the pre-tests are filled out by checking against the default value of 999
    for (let b = 0; b < data.columnB.values.length; b++) {
        if (data.columnB.values[b] === 999) {
            pass = false;
            document.getElementById('err-pretest').style.display = 'grid';
        }
    }
    // Make sure the contact method is chosen
    // First, identify all the values
    const method = document.getElementById('contact-method').value;
    const otherMethod = document.getElementById('cic-other-method').value;
    const number = document.getElementById('contact-number').value;
    const otherNumber = document.getElementById('cic-other-number').value;

    if (method === "") {
        pass = false;
        document.getElementById('err-contact').style.display = 'grid';
    } else if (method === "Other" && otherMethod === "") {
        pass = false;
        document.getElementById('err-contact').style.display = 'grid';
    }
    if (method !== "No contact method" && number === "") {
        pass = false;
        document.getElementById('err-contact').style.display = 'grid';
    }
    if (method !== "No contact method" && number === "Other" && otherNumber === "") {
        pass = false;
        document.getElementById('err-contact').style.display = 'grid';
    }    

    // Make sure that, if the "other" box is checked,
    // something has actually been typed in
    for (let o = 0; o < data.columnC.format.length; o++) {
        if (data.columnC.format[o][0] === "Other") {
            if (data.columnC.values[o][0] === 1) {
                if (document.getElementById(`other-input-${o}`).value.length < 1) {
                    pass = false;
                    document.getElementById('err-other-repair').style.display = 'grid';
                }
            }
        }
    }

    if (pass) {
        submit();
    }
}

// Generate a plain text version of the data
function generatePlainText() {
    // Grab all the meta info from the top
    let plainText = '';
    plainText += ' \n ';
    plainText += document.getElementById('mi-customer-info').innerText;
    plainText += ' \n ';
    plainText += document.getElementById('mi-estimate-info').innerText;
    plainText += ' \n ';
    plainText += document.getElementById('mi-device-info').innerText;
    plainText += ' \n ';
    plainText += document.getElementById('mi-technician-info').innerText;
    plainText += ' \n ';
    plainText += 'Customer remarks: ';
    plainText += document.getElementById('notes').innerText;
    plainText += ' \n ';

    // Grab the contents of the pre-tests, keeping column A and B together
    plainText += 'Pre-tests: ';
    plainText += ' \n ';
    let colA = document.getElementsByClassName('inspect-column')[0].children;
    let colB = document.getElementsByClassName('inspect-column')[1].children;

    for (let p = 1; p < colA.length - 1; p++) {
        plainText += colA[p].children[0].innerText;
        plainText += ' ';
        plainText += colB[p].children[0].innerText;
        plainText += ' \n ';
    }

    // Grab the contents of the repairs to perform
    plainText += 'Repairs to perform: ';
    plainText += ' \n ';
    let colC = document.getElementsByClassName('inspect-column')[2].children;
    for (let p = 1; p < colC.length - 1; p++) {
        plainText += colC[p].children[0].innerText;
        plainText += ' \n '; 
    }

    return plainText;
}

// Print the page then save the data and hide the form
function printAndSave() {
    let plainText = generatePlainText();
    let parcel = {data: data, plainText: plainText};
    window.print();
    window.parent.postMessage(parcel, '*');
}

// Trigger everything to load the page with all the correct values
function initialize() {
    if (data.ticketInfo.notes) {
        document.getElementById('ci-notes').value = data.ticketInfo.notes;
    }

    document.getElementById('ci-notes').addEventListener('change', updateNotes);

    addPreTests();
    addContact();
    addRepairs();

    document.getElementById('submit-button').addEventListener('click', checkSubmit);

    document.getElementById('print-and-save').addEventListener('click', printAndSave);
}








// ----- Everything for populating the printout form:

// Keep track of the longest column's length, so they can be matched later
function getMaxRows() {
    let max = 0;
    let columnALength = data.columnA.values.length;
    let columnBLength = data.columnB.values.length;
    let columnCLength = data.columnC.values.length;

    if (columnALength > columnBLength) {
        max = columnALength;
    } else {
        max = columnBLength;
    }

    if (columnCLength > max) {
        max = columnCLength;
    }

    return max;
}


// Make one row element for everything in column A
function fillColumnA() {
    maxRows = getMaxRows();
    columnPlace = document.getElementById("inspection");

    let container = document.createElement('div');
    container.classList = 'inspect-column ic-internal-border';

    // To keep track of whether this is an even row, for background color
    let evenOrOdd = 'ir-odd';

    // Add the header row
    let header = document.createElement("div");
    header.classList = "ir-even ir-bold";
    let headerP = document.createElement("p");
    headerP.innerText = "Function";
    header.appendChild(headerP);
    container.appendChild(header);

    // Add one row for each entry
    const values = data.columnA.values;
    for (let a = 0; a < values.length; a++) {
        let row = document.createElement("div");
        let rowP = document.createElement("p");
        rowP.innerText = values[a];
        row.appendChild(rowP);

        // Flip even or odd every time
        row.classList.add(evenOrOdd);
        if (evenOrOdd === 'ir-odd') {
            evenOrOdd = 'ir-even';
        } else {
            evenOrOdd = 'ir-odd';
        }

        container.appendChild(row);
    }

    let difference = maxRows - (container.children.length - 1);
    for (let d = 0; d < difference; d++) {
        let row = document.createElement("div");
        row.classList.add(evenOrOdd);
        if (evenOrOdd === 'ir-odd') {
            evenOrOdd = 'ir-even';
        } else {
            evenOrOdd = 'ir-odd';
        }

        container.appendChild(row);
    }

    columnPlace.appendChild(container);
}

function fillColumnB() {
    let container = document.createElement('div');
    container.classList = 'inspect-column ic-internal-border';

    // To keep track of whether this is an even row, for background color
    let evenOrOdd = 'ir-odd';

    // Add the header row, just like the columnA function
    let header = document.createElement("div");
    header.classList = "ir-even ir-bold";
    let headerP = document.createElement("p");
    headerP.innerText = "Result";
    header.appendChild(headerP);
    container.appendChild(header);

    // This is where this function differs from the columnA function:
    // each entry in the values array will be handled differently
    let values = [];
    const format = data.columnB.format;
    const originals = data.columnB.values;

    for (let v = 0; v < format.length; v++) {
        if (format[v][0] === "percent") {
            values[v] = originals[v] + '%';
        } else if (format[v][0] === "amps") {
            values[v] = originals[v] + 'amps';
        } else {
            let concat = "";
            for (let w = 0; w < format[v].length; w++) {
                if (originals[v] === w) {
                    concat += "\u2611 ";
                } else {
                    concat += "\u2610 ";
                }
                concat += format[v][w];
                concat += " ";
            }
            values[v] = concat;
        }
    }

    // Create one row per entry, just like the columnA function
    for (let b = 0; b < values.length; b++) {
        let row = document.createElement("div");
        let rowP = document.createElement("p");
        rowP.innerText = values[b];
        row.appendChild(rowP);

        // Flip even or odd every time
        row.classList.add(evenOrOdd);
        if (evenOrOdd === 'ir-odd') {
            evenOrOdd = 'ir-even';
        } else {
            evenOrOdd = 'ir-odd';
        }

        container.appendChild(row);
    }

    let difference = maxRows - (container.children.length - 1);
    for (let d = 0; d < difference; d++) {
        let row = document.createElement("div");
        row.classList.add(evenOrOdd);
        if (evenOrOdd === 'ir-odd') {
            evenOrOdd = 'ir-even';
        } else {
            evenOrOdd = 'ir-odd';
        }

        container.appendChild(row);
    }

    columnPlace.appendChild(container);
}

function fillColumnC() {
    let container = document.createElement('div');
    container.classList = 'inspect-column ic-external-border';

    let header = document.createElement("div");
    header.classList = "ir-even ir-bold";
    let headerP = document.createElement("p");
    headerP.innerText = "Repairs to perform:";
    header.appendChild(headerP);
    container.appendChild(header);
    
    // Here's the unique code for column C
    const format = data.columnC.format;
    const originals = data.columnC.values;
    let values = [];
    for (let v = 0; v < format.length; v++) {
        // Handle "other" repairs by grabbing the value of the correlated input 
        if (format[v][0] === "Other") {
            let field = document.getElementById(`other-input-${v}`).value;
            if (field.length > 0 && originals[v][0] === 1) {
                values[v] = "\u2611 Other: " + field;
                // Save the value of the "other" repair
                data.columnC.values[v][1] = field; 
            } else {
                values[v] = "\u2610 Other: ";
            }
        } else {
            // Check the boxes as neccesarry
            values[v] = "";
            for (let q = 0; q < format[v].length; q++) {
                if (originals[v][q] === 0) {
                    values[v] += `\u2610 ${format[v][q]} `;
                } else {
                    values[v] += `\u2611 ${format[v][q]} `;
                }
            }
        }
    }
    

    // Column C is all even, no odd
    const evenOrOdd = 'ir-even';

    for (let c = 0; c < values.length; c++) {
        let row = document.createElement("div");
        let rowP = document.createElement("p");
        rowP.innerText = values[c];
        row.appendChild(rowP);
        row.classList.add(evenOrOdd);
        container.appendChild(row);
    }

    let difference = maxRows - (container.children.length - 1);
    for (let d = 0; d < difference; d++) {
        let row = document.createElement("div");
        row.classList.add(evenOrOdd);

        container.appendChild(row);
    }

    columnPlace.appendChild(container);
}

// Fill the "meta info," all the stuff that goes on the top of the page
function fillMetaInfo() {
    document.getElementById("customer-name").innerText = data.ticketInfo.customer.name;
    document.getElementById("customer-contact").innerText = data.ticketInfo.customer.contact;

    document.getElementById("device-model").innerText = data.ticketInfo.device.model;
    document.getElementById("device-serial").innerText = data.ticketInfo.device.serial;

    document.getElementById("technician-name").innerText = data.ticketInfo.technician.name;
    document.getElementById("technician-number").innerText = data.ticketInfo.technician.number;
    document.getElementById("technician-email").innerText = data.ticketInfo.technician.email;

    document.getElementById("notes").innerText = data.ticketInfo.notes;

    document.getElementById("estimate-cost").innerText = data.ticketInfo.ticket.estimate;
    document.getElementById("estimate-time").innerText = data.ticketInfo.ticket.due;

    document.getElementById("inspection-points").innerText = data.columnA.values.length;

    document.getElementById('tech-signature').innerText = data.ticketInfo.technician.name;
}  

// Call these functions to fill out the form:
function submit() {
    fillMetaInfo();
    fillColumnA();
    fillColumnB();
    fillColumnC();

    document.getElementById('checkin').style.display = 'none';
    document.getElementById('submit').style.display = 'none';
    document.getElementById('printout').style.display = 'grid';
}

window.addEventListener('message', event => {
    if (event.origin === "https://cpr.repairq.io") {
        data = event.data;
        initialize();
    } else {
        return;
    }
});