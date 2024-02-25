// default data
let data = {};
let maxRows;
let columnPlace;

// Print the page then save the data and hide the form
function printAndSave() {
    window.print();
    window.parent.postMessage('closed', '*');
}

// Trigger everything to load the page with all the correct values
function initialize() {
    document.getElementById('print-and-save').addEventListener('click', printAndSave);
    submit();
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
            let field = data.columnC.values[v][1]; 
            if (field.length > 0 && originals[v][0] === 1) {
                values[v] = "\u2611 Other: " + field;
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

    document.getElementById("estimate-cost").innerText = data.ticketInfo.ticket.estimate;
    document.getElementById("estimate-time").innerText = data.ticketInfo.ticket.due;

    document.getElementById("notes").innerText = data.ticketInfo.notes;

    document.getElementById("inspection-points").innerText = data.columnA.values.length;

    document.getElementById('tech-signature').innerText = data.ticketInfo.technician.name;
}  

// Call these functions to fill out the form:
function submit() {
    fillMetaInfo();
    fillColumnA();
    fillColumnB();
    fillColumnC();

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
