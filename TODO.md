# Version goals
### 1.0
This will be the first fully-functional version of the extension, made for the Eugene store.
The idea is to get a working MVP which we can use with customers to see how they respond to it, and to get feedback from employees. 
It will include:
- [x] Professional-looking customer-facing form
- [ ] A static and non-customizable form for pre-tests and repairs to be performed
- [ ] Will only work for phones
- [x] A button added to the ticket-editing page which will generate the form
- [ ] A way to store the form inside the ticket and easily view it at any time later

### 2.0 
Here, we'll focus on some more long-term implementations of certain features, and expand device compatibility by adding customizable checklists.
- [ ] Options for customizing checklists 
- [ ] Different checklists for different device types
- [ ] Ability to edit saved forms

### 3.0
Adding other features:
- [ ] Alternate device labels with additional information such as contact method
- [ ] Model/manufacturer-specific information added to the bottom of a ticket. This would mostly be used for warranty and disclaimer text
- [ ] Post-test version of the form with invoice/receipt information, such as payment as warranty

# To-do:
- [x] Add print and save
    - Should just automatically happen on submit
- [x] Add awareness for saved data
    - Change the "create" button to an "edit" button
    - Add the view button
    - need to spin up the observer again once the custom form is closed
- [x] Add buttons to the custom form 
    - first need to make a method of viewing a saved form
    - need an override button and a view button
- [ ] Add override button
    - Means we'll need a way to fill in that form later on
    - The custom form can be edited later though
- [x] estimate cost and turaround time isn't working
- [ ] viewing saved form isn't always working during the initial ticket-edit
- [ ] Test with different types of ticket. Chrome extensions trigger based on URLs, and there are at least two URL variants for ticket editing. Element selectors may be different on claim tickets, too.
- [ ] Add awareness for different device types
    - Actually, no, just need to make different custom forms for different device types. This means the awareness of the title of the custom form has to change
    - Could repairQ hide forms unless they're on the correct device type? 
- [ ] For the extension: create options page for customizing test values
    - need to add phone number and email. This could be done with chrome user storage
    - need a hard check to ensure column A and B are the same length
    - NEED to JSON.stringify() the config value before saving it to the custom form
- [ ] Add a backup in case someone fills this out before fillin out the customer, device data, if they choose anonymous customer, etc
- [ ] Clean up the code
    - comments
    - function modularization
- [ ] Figure out a way to save the "other" repair data so it's visible in the preview
- [ ] Documentation and polish:
    - [ ] Add a favicon
    - [ ] Add webstore images
    - [ ] Add instructions
    - [ ] In customization, let user know if they are missing store contact info
    - [ ] Cursive font for signature
    - [ ] Bigger divs for pre-tests, allow for two lines of text. Give them cursor pointers. Give them "selected" borders too, remove borders on hover though
    - [ ] Add catches for nulls
    - [ ] Figure out if there's a way to force back ground graphics while printing
    - [ ] Make the edit button look nicer
    - [ ] Fix double-scrolling

# Ideas:
- Would love to show the ticket number and generate a qr code at the bottom of the page, but this isn't going to be doable conistently since we don't know the ticket number until the ticket is initially saved.

