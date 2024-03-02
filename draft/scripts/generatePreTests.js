// Generate the pre-test forms based on the data from column A and column B
// (a.k.a.) what has been set in the user's configuration

import { handleInputChange } from "./handleInputChange.js";
import { handleChoiceClick } from "./handleChoiceClick.js";

function generatePreTests(dataA, dataB) {
  // Figure out where to inject these test elements
  let inject = document.getElementById('ci-section-inspection');
  // inject will change at the halfway mark, to make two even columns.
  // find that halfway mark:
  const shiftPoint = Math.ceil(dataA.length / 2);
  let shiftCounter = 0;
  // Build all the elements
  for (let a = 0; a < dataA.length; a++) {
    const test = dataA[a];
    const format = dataB.format[a];
    const values = dataB.values[a];
    // Start building the container elements
    let row = document.createElement('div');
    row.classList = 'ci-inspect-row';
    let title = document.createElement('p');
    title.innerText = test;
    row.appendChild(title);
    let options = document.createElement('div');
    // Handle manual input tests, such as percent and amps
    if (format[0] === 'percent' || format[0] === 'amps') {
      // Create the input element 
      options.classList = 'ci-inspect-input';
      let input = document.createElement('input');
      input.type = 'text';
      input.placeholder = values[0] || '0';
      // Assign an id. a-0 represents the index in data.columnB.values,
      // Which is where this input's value will be stored
      input.id = `cio-${a}-0`;
      // Add a handler for this input changing
      // Pass it this form as an event and the values list
      input.onchange  = (e) => handleInputChange(e, dataB.values);

      options.appendChild(input);
      // Add a "percent" or "amps" indicator to the end
      let indicator = document.createElement('p');
      indicator.innerText = format[0];
      options.appendChild(indicator);
    } else {
      // Handle all other kinds of inputs
      options.classList = 'ci-inspect-options';
      for (let b = 0; b < format.length; b++) {
        let choice = document.createElement('div');
        choice.innerText = format[b];
        // Each choice gets an ID representing its index in the data
        choice.id = `cio-${a}-${b}`;
        // Make the choice appear selected if it has already been marked as so
        // in the data
        if (values[b] === 1)  {
          choice.classList = 'ci-selected';
        } else {
          choice.classList = 'ci-deselected';
        }
        // Add a click handler for this choice, passing along the values
        // and this element as an event
        choice.onclick = (e) => handleChoiceClick(e, dataB.values, dataB.format);
        options.appendChild(choice);
      }
    }
    row.appendChild(options);
    // Check if it's time to move to the next column
    if (shiftCounter >= shiftPoint) {
      inject = document.getElementById('ci-section-inspection-2');
    }
    shiftCounter += 1;

    inject.appendChild(row);
  }
}

export {generatePreTests};

// Here is an example of what the finished product might look like.
// There are two forms these pre-tests can take, a selection from multiple
// options, or a text input
/*
<div class="ci-inspect-row">
    <p>Touch screen response</p>
    <div class="ci-inspect-options">
        <div class="ci-deselected" id="cio-2-1">Pass</div>
        <div class="ci-deselected" id="cio-2-2">Fail</div>
        <div class="ci-selected" id="cio-2-3">Can't test</div>
    </div>
</div>

<div class="ci-inspect-row">
    <p>Battery health</p>
    <div class="ci-inspect-input">
        <input type="text" placeholder="80" id="cio-3-0">
    </div>
</div>
*/

// Here is an example of what the data will look like.
// ColumnA.values is getting passed in as dataA, same with B
/*
"columnA": {
      "values": [
        "Front cracked?",
        "Battery health"
      ]
    },
    "columnB": {
      "format": [
        [
          "Yes",
          "No"
        ],
        [
          "percent"
        ]
      ],
      "values": [
        999,
        999
      ]
    }
    */
