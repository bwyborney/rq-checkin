// Example of how to load the page in 

/*
let frame = document.createElement('iframe');
frame.id ='checkin-frame';
frame.src = chrome.runtime.getURL('/checkin-form/checkin.html');
let inject = document.getElementById('customer');
inject.appendChild(frame);
*/

function injectButtons(parent) {
    console.log(parent);
}

// Check if the custom form has popped up yet
function checkForForm() {
    // Check if this edit element exists
    let edit = document.getElementById('customFieldEditModal');
    if (edit !== null) {
        // Go through the children of this element to find its title
        // then see if this is the correct title
        for (let c = 0; c < edit.children.length; c++) {
            if (edit.children[c].classList[0] === 'modal-header') {
                if (edit.children[c].children[1].innerText === 'CPR Check-in') {
                    injectButtons(edit);
                }
            }
        }
    }
}

// Watch for changes to the page
function observeForm() {
    let watch = document.getElementsByClassName('c-ticket')[0];
    const config = {childList: true, attributes: true};
    const observer = new MutationObserver(checkForForm);
    observer.observe(watch, config);
}

observeForm();
