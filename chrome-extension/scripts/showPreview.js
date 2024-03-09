// Show the form preview
function showPreview(previewAdded) {
    let previewData;
    let injectPoint;
    // Identify the modal
    let modal = document.getElementById('customFieldGroupModal');
    modal.style.width = '90vw';
    modal.style.marginLeft = '5vw';
    modal.style.left = '0';
    for (let m = 0; m < modal.children.length; m++) {
        if (modal.children[m].classList[0] === 'modal-body') {
            // Identify the inject point for later
            injectPoint = modal.children[m];
            injectPoint.style.height = '70vh';
            injectPoint.style.overflow = 'hidden';
            
            // The div containing data only slightly varies depending on whether you're in edit or ticket-view mode.
            let dataDiv;
            if (modal.children[m].children[1].classList[0] === 'staff') {
                dataDiv = modal.children[m].children[3];
            } else {
                dataDiv = modal.children[m].children[1];
            }
            // Hide the data table from the modal
            dataDiv.style.display = 'none';
            // Find the saved data
            let dataTable = dataDiv.children[0]; // Tbody containing the data
            let dataBox = dataTable.children[0].children[1].children[0]; // Cell containing the data
            previewData = JSON.parse(dataBox.innerText);
        }
    }

    if (!previewAdded) {
        // Load the HTML into an iframe and serve it
        let frame = document.createElement('iframe');
        frame.id ='preview-frame';
        frame.onload = () => {
            frame.contentWindow.postMessage(previewData, chrome.runtime.getURL('/checkin-form/preview.html'));
        };
        frame.src = chrome.runtime.getURL('/checkin-form/preview.html');
        frame.width = '100%';
        frame.height = '100%';
        injectPoint.appendChild(frame);
        previewAdded = true;

        // Listen for the iframe to get closed
        window.addEventListener('message', event => {
            // Set the CORS origin thingy
            // Man my head hurts
            let origin = chrome.runtime.getURL('/');
            let correctOrigin = origin.substring(0, origin.length - 1);
            if (event.origin === correctOrigin) {
                startup();
            } else {
                return;
            }
        });
    }
}