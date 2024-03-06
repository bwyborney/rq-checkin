// Get it all started up
function initialize(parent) {
    // Hide the extra scrollbar
    parent.style.overflow = 'hidden';
    // Make sure there's not already data
    let saveSpot = document.querySelectorAll('div[data-condition="null"]')[0].children[1].children[0];
    let newButton = document.createElement('div');
    newButton.id = 'button-create';
    
    let ticketData = getTicketData();
    let completeData = convertData(ticketData);
    if (saveSpot.innerText.length < 1) {
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