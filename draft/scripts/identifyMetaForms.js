// Identify all the forms to be used for meta info
function identifyMetaForms() {
    let mf = {
        customer: {},
        ticket: {},
        technician: {},
        device: {},
        notes: ''
    };

    mf.customer.name = document.getElementById('ci-customer-name');
    mf.customer.method = document.getElementById('ci-customer-method');
    mf.customer.number = document.getElementById('ci-customer-number');
    mf.customer.otherMethod = document.getElementById('ci-other-method');
    mf.customer.otherNumber = document.getElementById('ci-other-number');
    mf.ticket.estimate = document.getElementById('ci-ticket-estimate');
    mf.ticket.due = document.getElementById('ci-ticket-due');
    mf.technician.name = document.getElementById('ci-technician-name');
    mf.technician.number = document.getElementById('ci-store-number');
    mf.technician.email = document.getElementById('ci-store-email');
    mf.device.model = document.getElementById('ci-device-model');
    mf.device.serial = document.getElementById('ci-device-serial');
    mf.notes = document.getElementById('ci-ticket-notes');
    
    return mf;
}

export {identifyMetaForms};

