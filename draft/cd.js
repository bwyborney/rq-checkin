// Retrieve the initial "data" object
import { getStartingData } from "./scripts/getStartingData.js";
let data = getStartingData();

// Identify all the meta forms for use in the next two functions
import { identifyMetaForms } from "./scripts/identifyMetaForms.js";
let mf = identifyMetaForms();

// Fill in the meta forms with all the starting data
import { fillMetaForms } from "./scripts/fillMetaForms.js";
fillMetaForms(data.ticketInfo, mf);

// Fill the dropdowns for customer contact method
import { fillContactNumbers } from "./scripts/fillContactNumbers.js";
fillContactNumbers(data.ticketInfo.customer.methods, mf.customer.number);

// Add listeners to each of the fillable meta forms
import { addMetaFormListeners } from "./scripts/addMetaFormListeners.js";
addMetaFormListeners(mf);

// Generate pre-test forms
import { generatePreTests } from "./scripts/generatePreTests.js";
generatePreTests(data.columnA.values, data.columnB);

// Generate repair forms


// Add listener and handler for the submit button