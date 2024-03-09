// Change the value in data when a repair "other" input form is changed
function handleRepairInput(e, values) {
    // Parse the element's ID into an array index and a choice
    const index = e.target.id.split('-');
    const parsed = parseInt(index[1]);
    const choice = parseInt(index[2]);
    
    values[parsed][choice] = e.target.value;
}

export {handleRepairInput};