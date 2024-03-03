import { handleRepairInput } from "./handleRepairInput.js";
import { handleRepairClick } from "./handleRepairClick.js";

// Create all the forms for repair options
// This will mostly work the same as generatePreTests
function generateRepairs(format, values) {
    // Figure out where to inject these test elements
    let inject = document.getElementById('ci-section-repairs');
    // inject will change at the halfway mark, to make two even columns.
    // find that halfway mark:
    const shiftPoint = Math.ceil(format.length / 2);
    let shiftCounter = 0;
    // Build all the elements
    for (let a = 0; a < format.length; a++) {
        // build the container
        let row = document.createElement('div');
        row.classList = 'ci-repair-row';
        let title = document.createElement('div');
        title.classList = 'cir-title cst-hide';
        title.innerText = 'repair';
        row.appendChild(title);
        // create the container for the interactable elements
        let optionRow = document.createElement('div');
        // Create the row differently depending on its type
        // First, check if it's an "other" repair
        if (format[a][0] === 'Other') {
            optionRow.classList = 'cir-input';
            let option = document.createElement('div');
            // Check if this option has already been selected.
            if (values[a][0] === 1) {
                option.classList = 'ci-repair cir-selected';
                option.innerText = `\u2611 ${format[a][0]}`;
            } else {
                option.classList = 'ci-repair cir-deselected';
                option.innerText = `\u2610 ${format[a][0]}`;
            }
            // Give it an ID referncing its index in the data
            option.id = `cir-${a}-0`;
            // Add event listener
            option.onclick = (e) => handleRepairClick(e, format, values);
            // Create the input form
            let otherInput = document.createElement('input');
            otherInput.type = 'text';
            otherInput.placeholder = 'other';
            otherInput.id = `cir-${a}-1`;
            // Add event listener
            otherInput.onchange = (e) => handleRepairInput(e, values);
            // Fill the form if there is already existing data
            if (values[a][1] !== 0) {
                otherInput.value = values[a][1];
            }

            optionRow.appendChild(option);
            optionRow.appendChild(otherInput);

        } else if (format[a].length === 1) { // Now check for single options (i.e. checked/unchecked)
            optionRow.classList = 'cir-single';
            let option = document.createElement('div');

            if (values[a][0] === 1) {
                option.classList = 'ci-repair cir-selected';
                option.innerText = `\u2611 ${format[a][0]}`;
            } else {
                option.classList = 'ci-repair cir-deselected';
                option.innerText = `\u2610 ${format[a][0]}`;
            }

            option.id = `cir-${a}-0`;
            // Add event listener
            option.onclick = (e) => handleRepairClick(e, format, values);
            optionRow.appendChild(option);
        } else { // Now make the multi-option variant
            optionRow.classList = 'cir-options';
            for (let b = 0; b < format[a].length; b++) {
                let option = document.createElement('div');

                if (values[a][b] === 1) {
                    option.classList = 'ci-repair cir-selected';
                    option.innerText = `\u2611 ${format[a][b]}`;
                } else {
                    option.classList = 'ci-repair cir-deselected';
                    option.innerText = `\u2610 ${format[a][b]}`;
                }

                option.id = `cir-${a}-${b}`;
                // Add event listener
                option.onclick = (e) => handleRepairClick(e, format, values);
                optionRow.appendChild(option);
            }
        }
        row.appendChild(optionRow);
        // Check if it's time to move to the next column
    if (shiftCounter >= shiftPoint) {
        inject = document.getElementById('ci-section-repairs-2');
        }
        shiftCounter += 1;
        inject.appendChild(row);
    }
}

export {generateRepairs};

// Sample of what the finished HTML should look like:
/*
<div class="ci-repair-row">
    <div class="cir-title cst-hide">Screen repair</div>
    <!-- Why include the title? It's just an easy way to keep the heights of
    these rows even with the adjacent pre-test rows. They will be invisible -->
    <div class="cir-single">
        <div class="ci-repair cir-deselected" id="cir-0-0">&#9744; Screen repair</div>
    </div>
</div>

<div class="ci-repair-row">
    <div class="cir-title cst-hide">Screen type:</div>
    <div class="cir-options">
        <div class="ci-repair cir-deselected" id="cir-1-0">&#9744; OEM</div>
        <div class="ci-repair cir-selected" id="cir-1-1">&#9744; AFM OLED</div>
        <div class="ci-repair cir-deselected" id="cir-1-2">&#9744; AFM LCD</div>
    </div>
</div>

<div class="ci-repair-row">
    <div class="cir-title cst-hide">Screen repair</div>
    <div class="cir-input">
        <div class="ci-repair cir-deselected" id="cir-2-0">&#9744; Other:</div>
        <input type="text" placeholder="other" id="cir-2-1">
    </div>
</div>
*/

// Sample of what the data will look like:
/*
format = [
  [
    "Screen repair"
  ],
  [
    "OEM",
    "AFM OLED",
    "AFM LCD"
  ],
  [
    "Other"
  ]
]

values = [
  [
    0
  ],
  [
    0,
    0,
    0
  ],
  [
    0,
    0
  ]
]
*/