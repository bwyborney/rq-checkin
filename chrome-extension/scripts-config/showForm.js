// Display the configuration form
function showForm(container) {
    // Get the data
    let data = pullData();
    // Gets passed 'container,' which is the edit modal. Hide all its children
    for (let c = 0; c < container.children.length; c++) {
        container.children[c].style.display = 'none';
    }
    // Now add our page as an iframe
    let frame = document.createElement('iframe');
    frame.id = 'config-frame';
    frame.onload = () => {
        frame.contentWindow.postMessage(data, chrome.runtime.getURL('/config-page/config.html'));
    };
    frame.src = chrome.runtime.getURL('/config-page/config.html');
    frame.width = '100%';
    frame.height = '80%';
    container.appendChild(frame);

    // Start listening for the data to come back from the form
    window.addEventListener('message', event => {
        let origin = chrome.runtime.getURL('/');
        let correctOrigin = origin.substring(0, origin.length - 1);
        if (event.origin === correctOrigin) {
            // Bring back the regular forms
            for (let c = 0; c < container.children.length; c++) {
                container.children[c].style.display = 'block';
            }
            // Hide the form
            frame.style.display = 'none';
            // Save the data in the form
            let dataSpot = document.getElementById('CustomFieldForm_value');
            dataSpot.value = JSON.stringify(event.data);

        } else {
            return;
        }
    });

}