import { pullMetaInfo } from "./pullMetaInfo.js";

// Once all the data is filled in, transform the page into the printable form
function submit(data) {
    // Retrieve the meta info
    data.ticketInfo = pullMetaInfo(data.ticketInfo);
}

export {submit};