// Trigged by mutation observer. See if the form is on the screen currently
function checkForForm() {
    // Check if this edit element exists
    let edit = document.getElementById('customFieldEditModal');
    if (edit !== null) {
        // Make sure it's the correct one by looking at the title of the modal
        let titleField = edit.children[0].children[1];
        if (titleField !== undefined && titleField.innerText !== undefined) {
            if (titleField.innerText.includes('CPR Check-in')) {
                observer.disconnect();
                // Go through the children of this element to find its title
                // then see if this is the correct title
                for (let c = 0; c < edit.children.length; c++) {
                    if (edit.children[c].classList[0] === 'modal-header') {
                        if (edit.children[c].children.length > 1) { 
                            // The signature modal doesn't always have the same header structure, so this prevents an error
                            if (edit.children[c].children[1].innerText.includes('CPR Check-in')) { // I know this is slightly redundant
                                initialize(edit);
                            }
                        }
                    }
                }
            }
        }

        
    } 
    let previewAdded = true;
    if (!document.getElementById('preview-frame')) {
        previewAdded = false;
    }
    // Check if you're viewing a modal and then spawn the form
    let view = document.getElementById('customFieldGroupModal');
    if (view) {
        if (view.children[0].children[1].innerText.includes('CPR Check-in')) {
            showPreview(previewAdded);
        }
    }
}