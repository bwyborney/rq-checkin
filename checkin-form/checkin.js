// sample data
let data = {
    ticketInfo: {
        customer: {
            name: "Customer McCustomer",
            contact: "Call 541-123-4567"
        },
        ticket: {
            number: "12345678",
            estimate: "$329.99",
            due: "1/1/24 - 1:00"
        },
        technician: {
            name: "Ben Wyborney",
            number: "12345678",
            email: "repairs@cpr-eugene.com"
        },
        device: {
            model: "Samsung Galaxy S22 Ultra",
            serial: "45648461564861685"
        },
        notes: "Screen replacement - the glass is cracked."
    },
    columnA: {
        values: [
            "Front cracked?",
            "Battery health?",
            "Biometric scanner"
        ]
    },
    columnB: {
        format: [
            ["Yes", "No"],
            ["percent"],
            ["Pass", "Fail", "Not testable"]
        ],
        values: [
            0,
            "85",
            1
        ]
    },
    columnC: {
        format: [
            ["Screen replacement"],
            ["OEM", "AFM LCD", "AFM OLED"],
            ["Other"]
        ],
        values:  [
            true,
            2,
            "Factory reset" 
        ]
    }
}

// Keep track of the longest column's length, so they can be matched later
let maxRows = 0;

// The place where the columns go
const columnPlace = document.getElementById("inspection");

// Make one row element for everything in column A
function fillColumnA() {
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
    let values = [];
    const format = data.columnC.format;
    const originals = data.columnC.values;

    for (let v = 0; v < format.length; v++) {
        // Check for the "other" keyword. Check it if needed,
        // then append the "other" text
        if (format[v][0] === "Other") {
            if (originals[v].length > 0) {
                values[v] = "\u2611 Other: " + originals[v];
            } else {
                values[v] = "\u2610 Other: ";
            }
        } else if (format[v].length === 1) {
            // A single-length format only requires a check or not a check
            if (originals[v]) {
                values[v] = "\u2611 " + format[v];
            } else {
                values[v] = "\u2610 " + format[v];
            }
        } else {
            // Check the correct item, just like in column B
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
}   

fillMetaInfo();
fillColumnA();
fillColumnB();
fillColumnC();