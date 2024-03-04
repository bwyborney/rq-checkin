// start a mutation observer to watch for changes to the page
// when triggered, it will check to see if the form has appeared
let watch = document.getElementsByClassName('c-ticket')[0];
const config = {childList: true, attributes: true};
const observer = new MutationObserver(checkForForm);
observer.observe(watch, config);
