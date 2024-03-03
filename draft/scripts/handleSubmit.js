import { submit } from "./submit.js";

// Handle the submit button being clicked
function handleSubmit(data) {
    // First, rest all the error messages to display: none
    document.getElementById('error1').style.display = 'none';
    document.getElementById('error2').style.display = 'none';
    document.getElementById('error3').style.display = 'none';
    document.getElementById('error4').style.display = 'none';
    document.getElementById('error5').style.display = 'none';
    // make sure everything is filled out
    let ready = true;
    // Check on the contact information
    let method = document.getElementById('ci-customer-method').value;
    let number = document.getElementById('ci-customer-number').value;
    let othermethod = document.getElementById('ci-other-method').value;
    let othernumber = document.getElementById('ci-other-number').value;
    // Make sure a selection has been made for contact number and method
    if (method === '' || number === '') {
        ready = false;
        document.getElementById('error1').style.display = 'grid';
    } 
    // If 'other' method or number has been selected, make sure something
    // has actually been typed in
    if (method === 'Other') {
        if (othermethod === '') {
            ready = false;
            document.getElementById('error2').style.display = 'grid';
        }
    } 
    if (number === 'Other') {
        if (othernumber === '') {
            ready = false;
            document.getElementById('error2').style.display = 'grid';
        }
    }
    // Check on the customer remarks
    if (document.getElementById('ci-ticket-notes').value.length < 3) {
        ready = false;
        document.getElementById('error3').style.display = 'grid';
    }
    // Check on the pre-repair inspection
    for (let b = 0; b < data.columnB.values.length; b++) {
        if (data.columnB.values[b] === 999) {
            ready = false;
            document.getElementById('error4').style.display = 'grid';
        }
    }
    // Check to see if "other" repair has been clicked. If it has,
    // make sure something has actually been typed in
    for (let a = 0; a < data.columnC.format.length; a++) {
        if (data.columnC.format[a][0] === 'Other') {
            if (data.columnC.values[a][0] === 1) {
                if (data.columnC.values[a][1] === 0) {
                    ready = false;
                    document.getElementById('error5').style.display = 'grid';
                }
            }
        }
    }
    // If everything looks good, submit the form
    if (ready) {
        submit(data);
    }
}

export {handleSubmit};