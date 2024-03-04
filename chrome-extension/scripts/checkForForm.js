// Trigged by mutation observer. See if the form is on the screen currently
function checkForForm() {
    // Check if this edit element exists
    let edit = document.getElementById('customFieldEditModal');
    if (edit !== null) {
        observer.disconnect();
        // Go through the children of this element to find its title
        // then see if this is the correct title
        for (let c = 0; c < edit.children.length; c++) {
            if (edit.children[c].classList[0] === 'modal-header') {
                if (edit.children[c].children.length > 1) { 
                    // The signature modal doesn't always have the same header structure, so this prevents an error
                    if (edit.children[c].children[1].innerText === 'CPR Check-in') {
                        initialize(edit);
                    }
                }
                
            }
        }
    } 

    if (!document.getElementById('preview-frame')) {
        previewAdded = false;
    }
    // Check if you're viewing a modal and then spawn the form
    let view = document.getElementById('customFieldGroupModal');
    if (view) {
        if (view.children[0].children[1].innerText === 'CPR Check-in') {
            showPreview();
        }
    }
}