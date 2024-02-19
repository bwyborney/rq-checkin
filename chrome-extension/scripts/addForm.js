// Example of how to load the page in 
function getTicketData() {
    
    let ticketData = {
        model: '',
        serial: '',
        quote: '',
        name: '',
        phoneNumbers: [],
        email: '',
        due: '',
        techName: '',
        notes: ''
    };
    
    // Identify the div containing device info using the unique 'device-row'
    // class, then narrow it down to its children
    let deviceBox = document.getElementsByClassName('device-row')[0].children;
    
    // Go and pull the device information from the correct boxes
    ticketData.model = deviceBox[1].innerText;
    ticketData.serial = deviceBox[3].children[0].value;
    
    // Get the price quote using the unique 'remaining-balance' class
    ticketData.quote = document.getElementsByClassName('remaining-balance')[0].innerText;


    // Select the parent DIV containing the customer's info using the
    // unique 'customer-details' class
    let query = document.getElementsByClassName('customer-details');

    // Narrow the selection down to the div which contains customer info
    let customerBox = query[0].children[1].children;

    // Loop through these elements, looking for markers such as 'Customer
    // name' and then saving the following element's content to a var
    let marker = '';
    let grabData = false;

    for (let i = 0; i < customerBox.length; i++) {

        if (grabData) {
            switch(marker) {
                case 'default':
                    break;
                case 'name' :
                    ticketData.name = customerBox[i].innerText;
                    grabData = false;
                    break;
                case 'phoneNumbers' :
                    let phones = customerBox[i].innerText.split('\n');
                    ticketData.phoneNumbers.push(phones[0]);
                    if (phones.length === 2) {
                        ticketData.phoneNumbers.push(phones[1]);
                    }
                    grabData = false;
                    break;
                case 'email' :
                    ticketData.phoneNumbers.push(customerBox[i].innerText);
                    grabData = false;
                    break;
            }
            
        }

        switch (customerBox[i].innerText) {
            case 'default':
                marker = '';
                break;
            case 'Customer Name:':
                marker = 'name';
                grabData = true;
                break;
            case 'Contact Number:':
                marker = 'phoneNumbers';
                grabData = true;
                break;
            case 'Email Address:':
                marker = 'email';
                grabData = true;
                break;
        }
    }

    // Get the due time and date
    let date = document.getElementsByClassName('date-picker')[0].value;
    let time = document.getElementsByClassName('estimate-time')[0].value;

    // Combine the two values and add a colon and hyphen
    // First make sure there's actually a date and a time chosen
    let datetime = '';
    if (date.length > 0) {
        if (time.length === 4) {
            datetime = `${date} - ${time[0]}${time[1]}:${time[2]}${time[3]}`;
        } else if (time.length === 3) {
            datetime = `${date} - ${time[0]}:${time[1]}${time[2]}`;
        } else {
            datetime = date;
        }
    }
    ticketData.due = datetime;

    // Get the technician's name
    let username = document.getElementById('user_dropdown').innerText;
    let usernamesplit = username.split(', ');
    ticketData.techName = usernamesplit[1] + ' ' + usernamesplit[0];

    // Get the initial diagnostic notes
    let notesPage = document.getElementById('ytTicketForm_ticketDevices_0_problem_description_ifr').contentDocument;
    let notes = notesPage.getElementById('tinymce').children[0].innerText;
    ticketData.notes = notes;

    return ticketData;
}

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





// Hide the text fields from view so they don't get messed with

function hideFields() {
   let fields = document.querySelectorAll('div[data-condition="null"]');
    for (let f = 0; f < fields.length; f++) {
        fields[f].style.display = 'none';
    }
}

// Show the form page
function launchPage(completeData, parent) {
    // Hide extra stuff first
    document.getElementById('button-create').remove();
    for (let c = 0; c < parent.children.length; c++) {
        if (parent.children[c].classList[0] === 'modal-footer' || parent.children[c].classList[0] === 'modal-body') {
            parent.children[c].style.display = 'none';
        }
    }
    // Load the HTML into an iframe and serve it
    let frame = document.createElement('iframe');
    frame.id ='checkin-frame';
    frame.onload = () => {
        frame.contentWindow.postMessage(completeData, chrome.runtime.getURL('/checkin-form/checkin.html'));
    };
    frame.src = chrome.runtime.getURL('/checkin-form/checkin.html');
    frame.width = '100%';
    frame.height = '100%';
    parent.appendChild(frame);

    // Listen for the data to come back from the iframe
    window.addEventListener('message', event => {
        // Set the CORS origin thingy
        // Man my head hurts
        let origin = chrome.runtime.getURL('/');
        let correctOrigin = origin.substring(0, origin.length - 1);
        if (event.origin === correctOrigin) {
            // Hide the form and save the data
            frame.style.display = 'none'
            for (let c = 0; c < parent.children.length; c++) {
                if (parent.children[c].classList[0] === 'modal-footer') {
                    parent.children[c].style.display = 'table';
                    let saveSpot = document.querySelectorAll('div[data-condition="null"]')[0].children[1].children[0];
                    // Put the data in the data box
                    saveSpot.innerText = JSON.stringify(event.data);
                    // Start the observer again
                    initialize(document.getElementById('customFieldEditModal'));
                    startup();
                }
            }
        } else {
            return;
        }
    });
    
}

// Get it all started up
function initialize(parent) {
    // Make sure there's not already data
    let saveSpot = document.querySelectorAll('div[data-condition="null"]')[0].children[1].children[0];
    let newButton = document.createElement('div');
    newButton.id = 'button-create';
    let completeData;
    if (saveSpot.innerText.length < 1) {
        let ticketData = getTicketData();
        completeData = convertData(ticketData);
        

        
        newButton.innerText = 'Create form';

        // Hide the save buttons until something has been filled out
        for (let c = 0; c < parent.children.length; c++) {
            // First, find the footer
            if (parent.children[c].classList[0] === 'modal-footer') {
                // Now find and hide the buttons
                for (let g = 0; g < parent.children[c].children.length; g++) {
                    if (parent.children[c].children[g].innerText === 'Save Draft' || parent.children[c].children[g].innerText === 'Save & Submit') {
                        parent.children[c].children[g].style.display = 'none';
                    }
                }
            }
        }
        
        
    } else {
        completeData = JSON.parse(saveSpot.innerText);
        newButton.innerText = 'Edit form';

        // Bring back the save and submit button
        for (let c = 0; c < parent.children.length; c++) {
            // First, find the footer
            if (parent.children[c].classList[0] === 'modal-footer') {
                // Now find and display the buttons
                for (let g = 0; g < parent.children[c].children.length; g++) {
                    if (parent.children[c].children[g].innerText === 'Save & Submit') {
                        parent.children[c].children[g].style.display = 'inline-block';
                    }
                }
            }
        }
        

        
    }
    hideFields();
    if (document.getElementById('button-create') === null) {
        
        newButton.addEventListener('click', () => launchPage(completeData, parent));
        parent.appendChild(newButton);

    }
    // Need to start the observer again in case the form gets closed in another way
    startup();
}

let previewAdded = false;

// Show the form preview
function showPreview() {
    let previewData;
    let injectPoint;
    // Identify the modal
    let modal = document.getElementById('customFieldGroupModal');
    modal.style.width = '90vw';
    modal.style.marginLeft = '5vw';
    modal.style.left = '0';
    for (let m = 0; m < modal.children.length; m++) {
        if (modal.children[m].classList[0] === 'modal-body') {
            // Identify the inject point for later
            injectPoint = modal.children[m];
            injectPoint.style.height = '70vh';
            injectPoint.style.overflow = 'hidden';
            // Hide the data table from the modal
            modal.children[m].children[1].style.display = 'none';
            // Find the saved data
            let dataTable = modal.children[m].children[1].children[0]; // Tbody containing the data
            let dataBox = dataTable.children[0].children[1].children[0]; // Cell containing the data
            previewData = JSON.parse(dataBox.innerText);
        }
    }

    if (!previewAdded) {
        // Load the HTML into an iframe and serve it
        let frame = document.createElement('iframe');
        frame.id ='preview-frame';
        frame.onload = () => {
            frame.contentWindow.postMessage(previewData, chrome.runtime.getURL('/checkin-form/preview.html'));
        };
        frame.src = chrome.runtime.getURL('/checkin-form/preview.html');
        frame.width = '100%';
        frame.height = '100%';
        injectPoint.appendChild(frame);
        previewAdded = true;

        // Listen for the iframe to get closed
        window.addEventListener('message', event => {
            // Set the CORS origin thingy
            // Man my head hurts
            let origin = chrome.runtime.getURL('/');
            let correctOrigin = origin.substring(0, origin.length - 1);
            if (event.origin === correctOrigin) {
                startup();
            } else {
                return;
            }
        });

    }
    



}

// Check if the custom form has popped up yet
function checkForForm() {
    // Check if this edit element exists
    let edit = document.getElementById('customFieldEditModal');
    if (edit !== null) {
        observer.disconnect();
        // Go through the children of this element to find its title
        // then see if this is the correct title
        for (let c = 0; c < edit.children.length; c++) {
            if (edit.children[c].classList[0] === 'modal-header') {
                if (edit.children[c].children[1].innerText === 'CPR Check-in') {
                    initialize(edit);
                }
            }
        }
        
    } 
    // Check if you're viewing a modal and then spawn the form
    let view = document.getElementById('customFieldGroupModal');
    if (view) {
        if (view.children[0].children[1].innerText === 'CPR Check-in') {
            showPreview();
        }
    }
    
}

// Watch for changes to the page
function startup() {
    observer.observe(watch, config);
}

let watch = document.getElementsByClassName('c-ticket')[0];
const config = {childList: true, attributes: true};
const observer = new MutationObserver(checkForForm);
observer.observe(watch, config);











