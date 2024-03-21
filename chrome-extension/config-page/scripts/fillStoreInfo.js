// Fill in the store information with the provided data
function fillStoreInfo(storePhone, storeEmail) {
    // Identify the two form elements
    let phoneInput = document.getElementById('store-phone');
    let emailInput = document.getElementById('store-email');
    // Fill the forms, as long as a value has already been provided
    if (storePhone.length !== undefined && storePhone.length > 0) {
        phoneInput.value = storePhone;
    }
    if (storeEmail.length !== undefined && storeEmail.length > 0) {
        emailInput.value = storeEmail;
    }
}

export {fillStoreInfo};