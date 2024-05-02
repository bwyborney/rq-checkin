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

    // There are several elements which might contain the notes, all with the same ID
    // They will be contained within a tr which will be displayed as table-row if
    // they are the correct one
    // Find the right one:
    let drIndex = 999;
    let deviceRows = document.getElementsByClassName('device-ticket-info');
    for (let d = 0; d < deviceRows.length; d++) {
        if (deviceRows[d].style.display !== 'none') { 
            drIndex = d;
        }
    }
    // Idenfity all the potential boxes containing the data, then pick the notes
    // out of the one matching the earlier index
    if (drIndex !== 999) {
        let drBox = document.getElementsByClassName('tox-edit-area__iframe')[drIndex];
        let notesPage = drBox.contentDocument;
        let notes = '';
        if (notesPage.getElementsByTagName('p').length > 0) {
            notes = notesPage.getElementsByTagName('p')[0].innerText;
        }
        if (notes.length > 0) {
            ticketData.notes = notes;
        }
    
        // Identify the div containing device info using the 'device-row'
        // class at the same index, then narrow it down to its children
        let deviceBox;
        let deviceBoxFound = false;
        if (document.getElementsByClassName('device-row').length > 0) {
            deviceBox = document.getElementsByClassName('device-row')[drIndex].children;
            deviceBoxFound = true;
        }
        
        // Go and pull the device information from the correct boxes
        if (deviceBoxFound) {
            ticketData.model = deviceBox[1].innerText;
            ticketData.serial = deviceBox[3].children[0].value;
        }

    }
    


    return ticketData;
}