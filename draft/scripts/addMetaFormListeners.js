// Add listeners to the contact dropdowns
function addMetaFormListeners(mf) {
    mf.customer.method.addEventListener('change', () => shOtherMethod(mf));
    mf.customer.number.addEventListener('change', () => shOtherNumber(mf));
}

// If "other" is selected, display the "other" input box
// for the contact method 
function shOtherMethod(mf) {
    if (mf.customer.method.value === 'Other') {
        mf.customer.otherMethod.style.display = 'grid';
    } else {
        mf.customer.otherMethod.style.display = 'none';
    }
}

// And for the contact number
function shOtherNumber(mf) {
    if (mf.customer.number.value === 'Other') {
        mf.customer.otherNumber.style.display = 'grid';
    } else {
        mf.customer.otherNumber.style.display = 'none';
    }
}

export {addMetaFormListeners};