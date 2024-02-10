function selectOption(index, value, id) {
    data.column2Values[index] = value;
    const div0 = `pt-${index}-0`;
    document.getElementById(div0).classList = "pt-option pto-not-selected";
    const div1 = `pt-${index}-1`;
    document.getElementById(div1).classList = "pt-option pto-not-selected";
    const div2 = `pt-${index}-2`;
    document.getElementById(div2).classList = "pt-option pto-not-selected";

    const targetDiv = `pt-${index}-${id}`;
    document.getElementById(`pt-${index}-${id}`).classList = "pt-option pto-selected";
}

function batteryHealth() {
    data.column2Values[17] = `${document.getElementById('entry-bh').value}%`;
}

const data = {
    customer: {
        name: "Customer Name",
        contact: "Call (541)914-1230"
    },
    ticket: {
        number: "12345678",
        cost: "$299.99",
        due: "2/7/24 - 12:30"
    },
    device: {
        model: "Samsung Galaxy S22 Ultra",
        serial: "45648461564861685"
    },
    technician: {
        name: "Ben Wyborney",
        number: "12345678",
        email: "repairs@cpr-eugene.com"
    },
    notes: {
        notes: "Screen replacement - the glass is cracked but the device is still usable."
    },
    column2Values: {
        values: [
            "\u2611 Yes \u2610 No ",
            "\u2611 Yes \u2610 No ",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "\u2611 Pass \u2610 Fail \u2610 Not testable",
            "100%"
        ]
    },
    column3Values: {
        values: [
            false,
            "none",
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false,
            false
        ]
    }
};

function performRepair(id, option) {
    if (id !== 1) {
        data.column3Values.values[id] = !data.column3Values.values[id];
        if (data.column3Values.values[id]) {
            document.getElementById(`pe-${id}`).classList = "pe pt-option pto-selected";
        } else {
            document.getElementById(`pe-${id}`).classList = "pe pt-option pto-not-selected";
        }
    } else {
        if (data.column3Values.values[1] === option) {
            data.column3Values.values[1] = 'none';
            document.getElementById(`pe-1-oem`).classList = "pe pt-option pto-not-selected";
            document.getElementById(`pe-1-lcd`).classList = "pe pt-option pto-not-selected";
            document.getElementById(`pe-1-oled`).classList = "pe pt-option pto-not-selected";
        } else {
            data.column3Values.values[1] = option;
            document.getElementById(`pe-1-oem`).classList = "pe pt-option pto-not-selected";
            document.getElementById(`pe-1-lcd`).classList = "pe pt-option pto-not-selected";
            document.getElementById(`pe-1-oled`).classList = "pe pt-option pto-not-selected";
            document.getElementById(`pe-1-${option}`).classList = "pe pt-option pto-selected";

        }
        
    }
}

function parseColumn3() {
    let repairTypes = [
        'Display',
        '\u2610 OEM \u2610 AFM LCD \u2610 AFM OLED',
        'Back glass',
        'Charging port',
        'Battery',
        'Front camera',
        'Rear camera',
        'Proximity sensor',
        'Ear speaker',
        'Loudspeaker',
        'Side buttons',
        'Microsoldering',
        'Diagnostic',
        'Liquid damage cleaning',
        'Other'
    ];

    for (let i = 0; i < data.column3Values.values.length; i++) {
        if (i === 1) {
            console.log('hello');
        } else {
            if (data.column3Values.values[i]) {
                repairTypes[i] = '\u2611 ' + repairTypes[i];
            } else {
                repairTypes[i] = '\u2610 ' + repairTypes[i];
            }
        }
    }

    if (data.column3Values.values[1] === 'none') {
        console.log('hello again');
    } else if (data.column3Values.values[1] === 'oem') {
        repairTypes[1] = '\u2611 OEM \u2610 AFM LCD \u2610 AFM OLED';
    } else if (data.column3Values.values[1] === 'lcd') {
        repairTypes[1] = '\u2610 OEM \u2611 AFM LCD \u2610 AFM OLED';
    } else if (data.column3Values.values[1] === 'oled') {
        repairTypes[1] = '\u2610 OEM \u2610 AFM LCD \u2611 AFM OLED';
    }

    data.column3Values.values = repairTypes;
}

function submitAll() {

    data.column2Values.values.unshift('Results');

    parseColumn3();

    data.column3Values.values.unshift('Repairs to perform');

    document.getElementById('customer-name').innerText = data.customer.name;
    document.getElementById('customer-contact').innerText = data.customer.contact;
    document.getElementById('ticket-number').innerText = data.ticket.number;
    document.getElementById('estimate-cost').innerText = data.ticket.cost;
    document.getElementById('estimate-time').innerText = data.ticket.due;
    document.getElementById('device-model').innerText = data.device.model;
    document.getElementById('device-serial').innerText = data.device.serial;
    document.getElementById('technician-name').innerText = data.technician.name;
    document.getElementById('technician-number').innerText = data.technician.number;
    document.getElementById('technician-email').innerText = data.technician.email;
    document.getElementById('notes').innerText = data.notes.notes;

    let columns = document.getElementsByClassName('inspect-column');

    for (let v = 0; v < data.column2Values.values.length; v++) {
        columns[1].children[v].children[0].innerText = data.column2Values.values[v];
    }

    for (let w = 0; w < data.column3Values.values.length; w++) {
        columns[2].children[w].children[0].innerText = data.column3Values.values[w];
    }

    document.getElementById('entry').style.display = 'none';
    document.getElementById('container').style.display = 'grid';
}

