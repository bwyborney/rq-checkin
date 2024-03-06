// Add options to the phone number dropdown menu
// This gets passed the phone numbers from the data and the selection element
function fillContactNumbers(numbers, menu) {
    for (let n = 0; n < numbers.length; n++) {
        let option = document.createElement('option');
        option.value = numbers[n];
        option.innerText = numbers[n];
        menu.appendChild(option);
    }

    let otherOption = document.createElement('option');
    otherOption.value = 'Other';
    otherOption.innerText = 'Other';
    menu.appendChild(otherOption); 
}

export {fillContactNumbers};