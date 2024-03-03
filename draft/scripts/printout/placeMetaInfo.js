// Place the meta info into the form
function placeMetaInfo(info) {
    document.getElementById('customer-name').innerText = info.customer.name;
    const contact = info.customer.contact.method + ' ' + info.customer.contact.number;
    document.getElementById('customer-contact').innerText = contact;
    document.getElementById('estimate-cost').innerText = info.ticket.estimate;
    document.getElementById('estimate-time').innerText = info.ticket.due;
    document.getElementById('device-model').innerText = info.device.model;
    document.getElementById('device-serial').innerText = info.device.serial;
    document.getElementById('technician-name').innerText = info.technician.name;
    document.getElementById('technician-number').innerText = info.technician.number;
    document.getElementById('technician-email').innerText = info.technician.email;

    document.getElementById('tech-signature').innerText = info.technician.name;
}

export {placeMetaInfo};