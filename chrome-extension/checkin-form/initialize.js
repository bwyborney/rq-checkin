
import { identifyMetaForms } from "./scripts/identifyMetaForms.js";
import { fillMetaForms } from "./scripts/fillMetaForms.js";
import { fillContactNumbers } from "./scripts/fillContactNumbers.js";
import { addMetaFormListeners } from "./scripts/addMetaFormListeners.js";
import { generatePreTests } from "./scripts/generatePreTests.js";
import { generateRepairs } from "./scripts/generateRepairs.js";
import { handleSubmit } from "./scripts/handleSubmit.js";


function initialize(data) {
    // Identify all the meta forms for use in the next two functions
    let mf = identifyMetaForms();

    // Fill in the meta forms with all the starting data
    fillMetaForms(data.ticketInfo, mf);

    // Fill the dropdowns for customer contact method
    fillContactNumbers(data.ticketInfo.customer.methods, mf.customer.number);

    // Add listeners to each of the fillable meta forms
    addMetaFormListeners(mf);

    // Generate pre-test forms
    generatePreTests(data.columnA.values, data.columnB);

    // Generate repair forms
    generateRepairs(data.columnC.format, data.columnC.values);

    // Add listener and handler for the submit button
    document.getElementById('submit').onclick = () => handleSubmit(data);
}

export {initialize};
