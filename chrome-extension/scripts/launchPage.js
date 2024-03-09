// Show the form page
function launchPage(completeData, parent) {
    // Hide extra stuff first
    document.getElementById('button-create').remove();
    for (let c = 0; c < parent.children.length; c++) {
        if (parent.children[c].classList[0] === 'modal-footer' || parent.children[c].classList[0] === 'modal-body') {
            parent.children[c].style.display = 'none';
        }
    }
    // Load the HTML into an iframe and serve it
    let frame = document.createElement('iframe');
    frame.id ='checkin-frame';
    frame.onload = () => {
        frame.contentWindow.postMessage(completeData, chrome.runtime.getURL('/checkin-form/checkin.html'));
    };
    frame.src = chrome.runtime.getURL('/checkin-form/checkin.html');
    frame.width = '100%';
    frame.height = '80%';
    parent.appendChild(frame);

    // Listen for the data to come back from the iframe
    window.addEventListener('message', event => {
        // Set the CORS origin thingy
        // Man my head hurts
        let origin = chrome.runtime.getURL('/');
        let correctOrigin = origin.substring(0, origin.length - 1);
        if (event.origin === correctOrigin) {
            // Hide the form and save the data
            frame.style.display = 'none'
            for (let c = 0; c < parent.children.length; c++) {
                if (parent.children[c].classList[0] === 'modal-footer') {
                    parent.children[c].style.display = 'table';
                    let saveSpot = document.querySelectorAll('div[data-condition="null"]')[0].children[1].children[0];
                    // Put the data in the data box
                    saveSpot.innerText = JSON.stringify(event.data.data);
                    // Put the plaintext data where it belongs
                    let plainSpot = document.querySelectorAll('div[data-condition="null"]')[2].children[1].children[0];
                    plainSpot.innerText = event.data.plainText;
                    // Start the observer again
                    initialize(document.getElementById('customFieldEditModal'));
                    startup();
                }
            }
        } else {
            return;
        }
    });
}