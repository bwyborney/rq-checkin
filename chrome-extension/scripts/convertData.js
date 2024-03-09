function convertData(ticketData) {
    let configField = document.querySelectorAll('div[data-condition="null"]')[1].children[1].children[0];
    let config = JSON.parse(configField.innerText);

    config.ticketInfo.customer.name = ticketData.name;
    config.ticketInfo.customer.methods = ticketData.phoneNumbers;
    config.ticketInfo.ticket.estimate = ticketData.quote;
    config.ticketInfo.ticket.due = ticketData.due;
    config.ticketInfo.technician.name = ticketData.techName;
    config.ticketInfo.device.model = ticketData.model;
    config.ticketInfo.device.serial = ticketData.serial;
    config.ticketInfo.notes = ticketData.notes;    

    return config;    
}