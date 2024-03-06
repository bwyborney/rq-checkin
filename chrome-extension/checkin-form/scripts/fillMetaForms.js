// Fill all the meta forms at the beginning of the program.
// This function gets passed data.ticketInfo and pointers to the elements
// of all the meta forms, in an object
function fillMetaForms(ticketInfo, mf) {
    mf.customer.name.value = ticketInfo.customer.name;
    mf.ticket.estimate.value = ticketInfo.ticket.estimate;
    mf.ticket.due.value = ticketInfo.ticket.due;
    mf.technician.name.value = ticketInfo.technician.name;
    mf.technician.number.value = ticketInfo.technician.number;
    mf.technician.email.value = ticketInfo.technician.email;
    mf.device.model.value = ticketInfo.device.model;
    mf.device.serial.value = ticketInfo.device.serial;
    mf.notes.value = ticketInfo.notes;
}

export {fillMetaForms};