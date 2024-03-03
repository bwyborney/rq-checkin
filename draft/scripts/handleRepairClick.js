// Handle when a repair option is clicked
function handleRepairClick(e, format, values) {
    // Parse the element's ID into an array index and a choice
    const index = e.target.id.split('-');
    const parsed = parseInt(index[1]);
    const choice = parseInt(index[2]);
    // Set the values and classes. This can be an array of one or more items
    // I'm using format as the length counter to account for "other" formats
    // being 1-long while their value is 2-long
    for (let v = 0; v < format[parsed].length; v++) {
        if (v !== choice) {
            values[parsed][v] = 0;
            let deselect = document.getElementById(`cir-${parsed}-${v}`);
            deselect.classList = 'cir-deselected';
            deselect.innerText = `\u2610 ${format[parsed][v]}`;
        } else {
            if (values[parsed][v] === 1) {
                values[parsed][v] = 0;
                e.target.classList = 'cir-deselected';
                e.target.innerText = `\u2610 ${format[parsed][v]}`;
            } else {
                values[parsed][v] = 1;
                e.target.classList = 'cir-selected';
                e.target.innerText = `\u2611 ${format[parsed][v]}`;
            }
        }
    }
}

export {handleRepairClick};