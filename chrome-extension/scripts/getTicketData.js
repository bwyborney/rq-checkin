function getTicketData() {
    
    let ticketData = {
        model: '',
        serial: '',
        quote: '',
        name: '',
        phoneNumbers: [],
        email: '',
        due: '',
        techName: ''
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
                    ticketData.phoneNumbers = customerBox[i].innerText;
                    grabData = false;
                    break;
                case 'email' :
                    ticketData.email = customerBox[i].innerText;
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

    return ticketData;
}



