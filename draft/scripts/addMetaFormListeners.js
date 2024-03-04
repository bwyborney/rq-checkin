// Add listeners to the contact dropdowns
function addMetaFormListeners(mf) {
    mf.customer.method.addEventListener('change', () => handleMethodChange(mf));
    mf.customer.number.addEventListener('change', () => handleNumberChange(mf));

}
// If "other" is selected, display the "other" input box
// for the contact method.
function handleMethodChange(mf) {
    if (mf.customer.method.value === 'Other') {
        mf.customer.otherMethod.style.display = 'grid';
        document.getElementById('number-column').style.display = 'block';
    } else if (mf.customer.method.value === 'No contact method') {
        mf.customer.otherMethod.style.display = 'none';
        document.getElementById('number-column').style.display = 'none';
    } else {
        mf.customer.otherMethod.style.display = 'none';
        document.getElementById('number-column').style.display = 'block';
    }
}
// And for the contact number
function handleNumberChange(mf) {
    if (mf.customer.number.value === 'Other') {
        mf.customer.otherNumber.style.display = 'grid';
    } else {
        mf.customer.otherNumber.style.display = 'none';
    }
}

export {addMetaFormListeners};