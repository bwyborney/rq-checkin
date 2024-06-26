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
- [x] Work on any type of device
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
- [ ] Customizable disclaimers
- [ ] Alternate way to save forms for posterity. All saved data only works with this extension, so we'll probably want a plaintext alternative


### 1.3
Adding other features:
- [ ] Logic
    - [ ] When you choose to do a screen repair, the type of screen pops up
    - [ ] Below 84% battery health prompts a script for including a battery
- [ ] Non-customer-facing prompts, such as accessories
- [ ] Alternate device labels with additional information such as contact method
    - Overall page size could be customized
    Would need to be printed from the same page as the form
- [ ] Model/manufacturer-specific information added to the bottom of a ticket. This would mostly be used for warranty and disclaimer text
- [ ] Post-test version of the form with invoice/receipt information, such as payment as warranty. It will also show pre-test vs. post-test

# To-do:
- [ ] Make sure price includes tax (we don't have tax here)
- [ ] Auto-format phone numbers
- [ ] Add instructions
    - [ ] Webpage
    - [ ] Extension page
    - [ ] git page
    - [ ] video
- [ ] allow people to upload their own logo, and then provide the link for the photo
- [ ] Test text overflow in repair and pre-test item names

# Lower priority:
- [ ] fix the due time showing up in 24-hour format
- [ ] Redesign "pick one" repair options since they only allow for three options right now
- [ ] Only allow phone numbers for phone-based contact methods, and email for emailing
- [ ] Add override button
    - Labelled as "device not present"
    - Places default data into the saved-data box and triggers the same function as saving and printing/closing the form
    - Adds "device not present" to the intake notes, which then triggers a pop-up message whenever viewing or editing the ticket
- [x] For the extension: create options page for customizing test values
    - need to add phone number and email. This could be done with chrome user storage
    - need a hard check to ensure column A and B are the same length
    - NEED to JSON.stringify() the config value before saving it to the custom form
    - let user know if they are missing store contact info
    
- [ ] Test claim tickets
    - [x] Does it work when converting from regular ticket to claim?
    - [ ] Make it required and then test it while checking in a claim
        - [ ] Test what happens when you make a regular repair ticket then convert it before filling in the form
- [ ] Make the config mutationObserver restart after submitting the page (for the config form)
- [ ] prevent the config form from popping up when the form is not ready yet
# Ideas:
- An auto-filling checklist in the sidebar, which shows how many pieces of required information have been added to the ticket. This might prevent clicking on a status button until the checklist is filled
- Conditional logic, like in the custom forms (i.e if you select "screen repair," you can be required to choose a type of screen)
- Pop-up scripts (i.e. recommend battery when the health is below a certain threshold, print "reccommended" on the form next to it)
- Figure out how to make the form required
- Add override buttons (all good, can't test, device not present)





