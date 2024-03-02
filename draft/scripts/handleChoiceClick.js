// Update the data values and the classes of multi-select options when clicked
function handleChoiceClick(e, values, format) {
    // Parse the element's ID into an array index and a choice
    const index = e.target.id.split('-');
    const parsed = parseInt(index[1]);
    const choice = parseInt(index[2]);
    // Set the value
    values[parsed] = choice;
    // Reset the classes of all the options in that row
    for (let o = 0; o < format[parsed].length; o++) {
        document.getElementById(`${index[0]}-${index[1]}-${o}`).classList = 'ci-deselected';
    }
    // Set the class of the selected option
    e.target.classList = 'ci-selected';
}

export {handleChoiceClick};