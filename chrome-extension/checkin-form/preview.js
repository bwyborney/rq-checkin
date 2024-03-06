// Once the message containing the data is received from 
// the parent window, send it through to the assembly line
import { initializePreview } from "./scripts/initializePreview.js";
window.addEventListener('message', event => {
    if (event.origin === "https://cpr.repairq.io") {
        initializePreview(event.data);
    } else {
        return;
    }
});