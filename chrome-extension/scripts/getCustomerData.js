function getCustomerData() {
    // Here is where the customer data will be stored
    let customerData = {
        name: '',
        phoneNumbers: [],
        email: ''
    };

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
                    customerData.name = customerBox[i].innerText;
                    grabData = false;
                    break;
                case 'phoneNumbers' :
                    customerData.phoneNumbers = customerBox[i].innerText;
                    grabData = false;
                    break;
                case 'email' :
                    customerData.email = customerBox[i].innerText;
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

    return customerData;
}




