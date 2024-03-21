import { handleTest } from "../config.js";
// Handle a click on a minimenu
function handleMiniMenuClick(index, type, command) {
    console.log(index);
    console.log(type);
    console.log(command);
    handleTest();
}

export {handleMiniMenuClick};