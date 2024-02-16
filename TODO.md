# Version goals
### 1.0
This will be the first fully-functional version of the extension, made for the Eugene store.
The idea is to get a working MVP which we can use with customers to see how they respond to it, and to get feedback from employees. 
It will include:
- Professional-looking customer-facing form
- A static and non-customizable form for pre-tests and repairs to be performed
- Will only work for phones
- A button added to the ticket-editing page which will generate the form
- A way to store the form inside the ticket and easily view it at any time later

### 1.x
This(these) version(versions) will focus on making changes from customer and employee feedback, as well as fixing bugs as we find them.

### 2.0 
Here, we'll focus on some more long-term implementations of certain features, and expand device compatibility by adding customizable checklists.
- Better solution for storing and accessing forms, if needed
- Options for customizing checklists 
- Different checklists for different device types

### 3.0
Adding other features:
- Alternate device labels which additional information such as contact method
- Model/manufacturer-specific information added to the bottom of a ticket. This would mostly be used for warranty and disclaimer text

# To-do:
- [ ] Functions for pulling customer, device, ticket, and repair details
    BW: nearly done, just need to pull ticket information and customer contact information. Will need to come up with a solution for contact method. I think the intake form should just have a drop-down which includes call, text, email, customer to return, and another drop-drop down which includes primary number (pulled from RQ), alt number, email, or custom 
- [ ] Barcode generator. I'm just using a sample barcode PNG for CSS prototyping. This doesn't have to be a QR code, but it should be labelled "ticket number: 1234567"
    BW: probably just use [this](https://davidshimjs.github.io/qrcodejs/)
- [ ] Create the Chrome extension. Will add a button alongside the ticket-status buttons to pull up the intake form
- [ ] Find a solution for saving the form for later viewing
    BW: since I'm hoping to avoid storing any information off-site, the obvious approach is to encode the intake information into RQ somehow. We could save a JSON object as the contents of a note or custom form. This is gonna be tricky, though
- [ ] Test with different types of ticket. Chrome extensions trigger based on URLs, and there are at least two URL variants for ticket editing. Element selectors may be different on claim tickets, too.
- [ ] Documentation and polish:
    - Add a favicon
    - Add webstore images
    - Add instructions
- [ ] For the extension: create options page for customizing test values
- [ ] While customizing options, need a hard check to ensure column A and B are the same length
- [ ] Add an override button for certain situations
    Add a way to track whether this has been done or not
- [ ] Add a backup in case someone fills this out before fillin out the customer, device data, if they choose anonymous customer, etc
- [ ] Finish the customization page. It is started
    Do need to add customer store phone number and email before full release

Where I'm leaving off:
Finish functions for pulling all page data and creating a basic default variable, this should happen when the edit modal is detected
    Just make a basic test layout for now
    Need to make a getConfig function in order to handle config, which means
    I need a solution for configs
Need to add buttons in the extension.
    One for creating the form, one for viewing it, one for override (doesn't do anything yet)
Work on add button first, spawns the check-in page
    submit button on the check-in page saves the data into the custom form
    override button fills in the data as "overridden"
    view button only appears if the form has been filled out, override and new only appear when it hasn't
add contextual detection for different types of devices (maybe make this into the custom forms)
    Could even save the schema in the custom form to save up chrome user storage space
If you don't do that, make the chrome options page
test test test
Need to remove ticket number, that will be impossible to get
Change contact information for the store to get pulled from settings
technicians will type in their name every time
make sure the disclaimer is on there and includes the "diagnostic and liquid rep may require additional repairs" or maybe there's just a better catch-all disclaimer for that

Add customer disclaimers

NEED to JSON.stringify() the config value before saving it to the custom form