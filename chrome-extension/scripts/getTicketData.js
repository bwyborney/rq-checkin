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
    let deviceBox;
    let deviceBoxFound = false;
    if (document.getElementsByClassName('device-row').length > 0) {
        deviceBox = document.getElementsByClassName('device-row')[0].children;
        deviceBoxFound = true;
    }
    
    // Go and pull the device information from the correct boxes
    if (deviceBoxFound) {
        ticketData.model = deviceBox[1].innerText;
        ticketData.serial = deviceBox[3].children[0].value;

    }
    
    // Get the price quote using the unique 'remaining-balance' class
    ticketData.quote = '$' + document.getElementsByClassName('remaining-balance')[0].innerText;


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
    /*
    let notesPage = document.getElementById('ytTicketForm_ticketDevices_0_problem_description_ifr').contentDocument;
    let notes = notesPage.getElementsByTagName('p')[0].innerText;
    ticketData.notes = notes;
    */
    // There are several elements which might contain the notes, all with the same ID
    let candidates = document.getElementsByClassName('tox-edit-area__iframe');
    for (let c = 0; c < candidates.length; c++) {
        let notesPage = candidates[c].contentDocument;
        let notes = '';
        if (notesPage.getElementsByTagName('p').length > 0) {
            notes = notesPage.getElementsByTagName('p')[0].innerText;
        }
        if (notes.length > 0) {
            ticketData.notes = notes;
        }
    }
    // Because of this method, if someone types in notes for one device, then changes their mind and types notes
    // for a different device which is higher in the list, the first notes will be chosen.
    // There's a way around this, but I don't have time right now, and this is not a top priority since the
    // notes are editable anyway.
    return ticketData;
}