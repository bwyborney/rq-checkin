// Retrieve the values of all the meta info boxes and put them into data
// Gets passed data.ticketInfo
function pullMetaInfo(info) {
    info.customer.name = document.getElementById('ci-customer-name').value;
    
    info.ticket.estimate = document.getElementById('ci-ticket-estimate').value;
    info.ticket.due = document.getElementById('ci-ticket-due').value;

    info.technician.name = document.getElementById('ci-technician-name').value;
    info.technician.number = document.getElementById('ci-store-number').value;
    info.technician.email = document.getElementById('ci-store-email').value;

    info.device.model = document.getElementById('ci-device-model').value;
    info.device.serial = document.getElementById('ci-device-serial').value;

    info.notes = document.getElementById('ci-ticket-notes').value;
    // Get the contact info, depending on whether or not "other" is checked
    let method = document.getElementById('ci-customer-method').value;
    let number = document.getElementById('ci-customer-number').value;
    let otherMethod = document.getElementById('ci-other-method').value;
    let otherNumber = document.getElementById('ci-other-number').value;

    if (method === 'Other') {
        info.customer.contact.method = otherMethod;
    } else 
    if (method === 'No contact method') {
        info.customer.contact.method = 'No contact method'; 
    } else if (method === '') {
        // If nothing has been select, but the form was allowd to submit, then
        // the user must be editing the form and has previously filled this
        // part of the data in, so don't change it
    } else {
        info.customer.contact.method = method;
    }

    if (number === 'Other') {
        info.customer.contact.number = otherNumber;
    } else if (method === 'No contact method') {
        // Handle 'no contact method'
        info.customer.contact.number = ''; 
        
    } else if (number === '') {
        
    } else {
        info.customer.contact.number = number;
    }
    // Handle 'no contact method'
    if (method === 'No contact method') {

    }

    return info;
}

export {pullMetaInfo};
