let frame = document.createElement('iframe');
frame.id ='checkin-frame';
frame.src = chrome.runtime.getURL('/checkin-form/checkin.html');
let inject = document.getElementById('customer');
inject.appendChild(frame);