// Trigged by mutation observer. See if the form is on the screen currently
function spawnConfigButton() {
    // Use a unique class name to find the custom form edit modal
    let potentialContainers = document.getElementsByClassName('modal-wide');
    let container = 'dud';
    if (potentialContainers.length > 0) {
        container = potentialContainers[0];
    }
    // If the modal is found, continue
    if (container !== null && container !== 'dud') {
        // Stop the observer from re-firing
        observer.disconnect();
        // Find the point to inject a button for pulling up the form
        let buttonPoint;
        for (let c = 0; c < container.children.length; c++) {
            // Need to loop through the children here, since we are looking for
            // an element with no unique identifiers. It has a specific class,
            // but that class is used elsewhere on the page, outside the modal.
            if (container.children[c].classList[0] === 'modal-footer') {
                buttonPoint = container.children[c];
            }
        }
        // Spawn the button to pull up the form
        let initButton = document.createElement('div');
        initButton.classList = 'rqc-con-btn';
        initButton.innerText = 'RQ Check-in';
        initButton.addEventListener('click', () => showForm(container));
        buttonPoint.appendChild(initButton);

    }

}