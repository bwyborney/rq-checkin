import { pullMetaInfo } from "./pullMetaInfo.js";
import { placeMetaInfo } from "./printout/placeMetaInfo.js";
import { findMaxLength } from "./printout/findMaxLength.js";
import { placeColumnA } from "./printout/placeColumnA.js";
import { placeColumnB } from "./printout/placeColumnB.js";
import { placeColumnC } from "./printout/placeColumnC.js";

// Once all the data is filled in, transform the page into the printable form
function submit(data) {
    // Retrieve the meta info
    data.ticketInfo = pullMetaInfo(data.ticketInfo);
    // Hide the upper form and show the lower form
    document.getElementById('printout').style.display = 'block';
    document.getElementById('checkin').style.display = 'none';

    // Add a print button listener
    document.getElementById('print-and-save').onclick = () => window.print();

    placeMetaInfo(data.ticketInfo);

    let max = findMaxLength(data);

    placeColumnA(data.columnA, max);
    placeColumnB(data.columnB, max);
    placeColumnC(data.columnC, max);
    // Make the inspection header reflect the actual number of inspected points
    document.getElementById('inspection-points').innerText = data.columnA.values.length.toString();
}

export {submit};