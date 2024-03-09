// Handle a text input field's change. Used for battery health and other repairs
function handleInputChange(e, values) {
    // Parse the element's ID into an array index
    const index = e.target.id.split('-');
    const parsed = parseInt(index[1]);
    // Update the corresponding value
    values[parsed] = e.target.value;
}

export {handleInputChange};