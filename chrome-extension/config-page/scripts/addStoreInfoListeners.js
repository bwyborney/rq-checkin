function addStoreInfoListeners(data) {
    // Identify the two form elements
    let phone = document.getElementById('store-phone');
    let email = document.getElementById('store-email');
    // Add listeners
    phone.onchange = (e, data) => handlePhoneChange(e, data);
    email.onchange = (e, data) => handleEmailChange(e, data);
}

// For each form, change the value in the data to the form's value
// The "data" variable getting passed here is data.ticketInfo.technician
function handlePhoneChange(e, data) {
    data.number = e.target.value;
}

function handleEmailChange(e, data) {
    data.email = e.target.value;
}

export {addStoreInfoListeners};