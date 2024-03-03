# Version goals
### 1.0
This will be the first fully-functional version of the extension, made for the Eugene store.
The idea is to get a working MVP which we can use with customers to see how they respond to it, and to get feedback from employees. 
It will include:
- [x] Professional-looking customer-facing form
- [x] A static and non-customizable form for pre-tests and repairs to be performed
- [x] A button added to the ticket-editing page which will generate the form
- [x] A way to store the form inside the ticket and easily view it at any time later
- [x] Ability to edit saved forms
- Will only work for phones
- Does not work on claim tickets

### 1.1
We'll make changes based on feedback and experience using the extension
- [ ] Better workflows
    - Key information, such as follow-up method, will be made more visible in the ticket. It is only one click to view the form, but the text is tiny and hard to read. Might make a more readable version which doesn't get printed.
    - Override button, for cases where the device is not in the store while making the ticket
- Claim ticket compatibility

### 1.2 
Here, we'll focus on some more long-term implementations of certain features, and expand device compatibility by adding customizable checklists.
- [ ] Options for customizing checklists 
- [ ] Different checklists for different device types
- [ ] Alternate way to save forms for posterity. All saved data only works with this extension, so we'll probably want a plaintext alternative


### 1.3
Adding other features:
- [ ] Alternate device labels with additional information such as contact method
- [ ] Model/manufacturer-specific information added to the bottom of a ticket. This would mostly be used for warranty and disclaimer text
- [ ] Post-test version of the form with invoice/receipt information, such as payment as warranty. It will also show pre-test vs. post-test

# To-do:
- Test and implement modular chrome functions
- Test modular iframe functions
- Sketch revised check-in form with logic and everything else, consider all permutations
    - Should include meta info as forms
    - better look, obviously
    - include defaults for override
    - maybe add thumbs-up, thumbs-down, checkmark/prohibit sign/letter x icons, etc.
- Make mockup/sample check-in HTML
- Re-make checkin.js
- Re-make preview.js with modular and cleaner functions
- Make custom options pages
- [ ] Make the checkin form look better
- [ ] Device info still isn't pulling correctly
- [ ] Need to make it so that when you re-do the form (either by clicking the edit button or RQ's built-in re-do button), it pulls the data fresh
    - [ ] Might consider adding the ability to edit all the meta information too
- [ ] Documentation and polish:
    - [ ] Add webstore images
        - Icon needs to be 96x96 inside a transparent 128x128 image
    - [ ] Add instructions
    - [x] Cursive font for signature
    - [x] Bigger divs for pre-tests, allow for two lines of text. Give them cursor pointers. Give them "selected" borders too, remove borders on hover though
    - [x] Figure out if there's a way to force back ground graphics while printing
        - [ ] there is not, so this will need to be included in the instructions
    - [ ] Add "known issues"
        - [ ] Fix: when you save the form, then preview it, then edit it, then preview it again, it shows the old data
    - [ ] In fillContactNumbers, pre-select the already-chose method and number. This will require a schema change
    - [ ] Pre-fill the contact information, will require setting the dropdowns too
- [ ] Take our store's number out

# Lower priority:
- [ ] Only allow phone numbers for phone-based contact methods, and email for emailing
- [ ] Add override button
    - Labelled as "device not present"
    - Places default data into the saved-data box and triggers the same function as saving and printing/closing the form
    - Adds "device not present" to the intake notes, which then triggers a pop-up message whenever viewing or editing the ticket
- [ ] For the extension: create options page for customizing test values
    - need to add phone number and email. This could be done with chrome user storage
    - need a hard check to ensure column A and B are the same length
    - NEED to JSON.stringify() the config value before saving it to the custom form
    - let user know if they are missing store contact info
    - allow people to upload their own logo, and then provide the link for the photo
- [ ] Test claim tickets
    - [x] Does it work when converting from regular ticket to claim?
    - [ ] Make it required and then test it while checking in a claim
        - [ ] Test what happens when you make a regular repair ticket then convert it before filling in the form
- [x] Polish:
    - [x] Make the edit button look nicer
    - [x] Fix double-scrolling
    - [x] Change the "print and save" button to just say "print" while viewing a saved form
# Ideas:
- Would love to show the ticket number and generate a qr code at the bottom of the page, but this isn't going to be doable conistently since we don't know the ticket number until the ticket is initially saved.
- An auto-filling checklist in the sidebar, which shows how many pieces of required information have been added to the ticket. This might prevent clicking on a status button until the checklist is filled
- Conditional logic, like in the custom forms (i.e if you select "screen repair," you can be required to choose a type of screen)
- Pop-up scripts (i.e. recommend battery when the health is below a certain threshold, print "reccommended" on the form next to it)
- Figure out how to make the form required

# Where I'm leaving off:
Time to start making the repairs. I need to mock it up in HTML first, then make a comment with samples like in the pre-tests file




