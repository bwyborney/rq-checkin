// Display the configuration form
function showForm(container) {
    // First, get the data
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

}