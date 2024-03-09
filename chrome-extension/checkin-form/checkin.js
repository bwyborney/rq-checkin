// Once the message containing the data is received from 
// the parent window, send it through to the assembly line
import { initialize } from "./initialize.js";
window.addEventListener('message', event => {
    if (event.origin === "https://cpr.repairq.io") {
        initialize(event.data);
    } else {
        return;
    }
});