# rq-checkin
 A RepairQ extension which generates a customer-facing form showing the results of a pre-test on their phone, a list of repairs to be performed on that phone, and a confirmation of estimated cost and intended follow-up method and time.
 This will be packaged as a browser extension without any requirements for a desktop app or remote server. I'm open to changing this approach down the road, but I think the full scope of this project fits neatly into an extension, using mostly static HTML and vanilla JS. I also think this is the easiest way for most folks to access the software and the easiest way for us to push updates to everyone.

# Goals
1. Create transparency for customers by showing them which repairs we are going to perform and whether we are using OEM or aftermarket screens. This will help customers feel more confident that they are getting exactly what they expect to get from us.
2. Provide clarity by showing the customer exactly which components of their phone are working before the repair, and which ones are intended to be fixed. This will alleviate disputes with customers who might claim we said one thing and then did another thing.
3. Ensure employee accountability by giving the customer all the information we have during check-in. By handing this sheet to a customer, we are creating an agreement with the customer on the status of their phone and our intentions for the repair. The customer gets to take this form home with them while we work on their phone, so they can call out any errors. This means we need to get this checklist right every time, and so we are less likely to skip certain steps or skip the pre-test altogether. 
4. Standardize a workflow for asking customers about additional repairs. Right now, asking a customer if they'd like to fix their back glass or replace their battery is completely up to whoever is checking in the device. By adding those questions to this form, we are making sure the customer gets asked every time.

## Features
### Priority 1
- A thorough pre-test checklist and list of repairs to perform
- A professional-looking form to hand the customer
- Easy and quick workflow for technicians to fill out the form and provide it to the customer while creating a normal RepairQ ticket
- One-click access from the ticket to this form once it is saved. Ideally, the form or some version of it will be saved within the ticket's data rather than on an external server
- The form shows the customer's name and their provided contact method. It also shows the name of the technician who created the form and the store's contact information.

### Priority 2
- An auto-generated label which can be printed and stuck to the customer's device. This will be an alternative to RepairQ's labels, and it will show the contact method, as well as good/bad OLED.
- Customizable pre-test and repair options, depending on device model or type
- Compatibility with all device types
- Custom information which can be added depending on the device model (i.e. warranty information regarding green lines on Samsung OLEDs, 30-day accidental warranty on iPhone LCDs, etc.)
- Make this workflow and form a requirement during check-ins. This will only work once the extension is aware of device type or is compatible with every device type. We will also need to account for situations where we are creating a ticket while the device is not present.
- This will be a requirement for the above features: an option page and instructions/documentation
- Update alerts. Extenstions don't automatically update every time, and it's easy to ignore update notifications. Maybe we can ask for emails?

### Priority 3
- Script prompts. These are items which will not end up on the customer-facing form but would naturally fit into the workflow of an intake pre-test. It would cover questions about adding accessories, insurance, etc.
- Safari, Firefox, etc. Most people are probably using Chrome, but a fair few probably use Safari. Firefox compatibility is just for me 

## Other projects
These may end up getting integrated with this project, however the priority is to get this one shipped and working first.
- [RCP Order Converter](https://chromewebstore.google.com/detail/rcp-order-converter/egnaiolljdmpnngnpijngcbngjhpfflb?hl=en): a Chrome extension which generates .csv files for RCP orders so they can be quickly imported into RepairQ.
- [RQ Mods](https://chromewebstore.google.com/detail/rq-mods/cbfbidmaikcepocpnjeoafncoeeanegh?hl=en): a Chrome extension which fixes several bugs in RepairQ and adds a few UI changes and features, such as an unlock pattern recorder.
- In development: custom ticket workflows in RQ, triggered by device models. This will mainly involve contextual prompts. For example, a device sale will trigger a prompt for a customer to sign a return policy, or an accessory sale will trigger a prompt to discuss the VIP program.
- In development: RQ Checklists, which adds a custom checklist to the side of a ticket. Boxes are automatically checked once their corresponding actions are taken. For example, a box might get automatically checked once the check-in form is generated, or once a part is attached to a repair SKU. The ticket will not be able to be saved until certain boxes are checked.

-Ben Wyborney