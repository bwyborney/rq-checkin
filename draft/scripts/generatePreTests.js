// Generate the pre-test forms based on the data from column A and column B
// (a.k.a.) what has been set in the user's configuration
function generatePreTests(dataA, dataB) {
  // Figure out where to inject these test elements
  const inject = document.getElementById('ci-section-inspection');

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

      options.appendChild(input);

      // Add a tailing character to show percent or amps
      let tail = document.createElement('p');
      if (format[0] === 'percent') {
        tail.innerText = '%';
      } else if (format[0] === 'amps') {
        tail.innerText = 'amps';
      }
      options.appendChild(tail);

    } else {
      // Handle all other kinds of inputs
      options.classList = 'ci-inspect-options';
      for (let b = 0; b < format.length; b++) {
        // Create one selectable element for each possible choice
        let choice = document.createElement('div');
        // Initialize the classes to 'selected' if they are already marked as such in the data
        if (values[b] === 1) {
          choice.classList = 'ci-selected';
        } else {
          choice.classList = 'ci-deselected';
        }

        choice.innerText = format[b];
        choice.id = `cio-${a}-${b}`;

        options.appendChild(choice);
      }
      
    }

    row.appendChild(options);
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
        "Back cracked?",
        "Touch sensitivity",
        "Display visibility",
        "Biometric scanner",
        "Proximity sensor",
        "Ear speaker",
        "Loudspeaker",
        "Microphones",
        "Vibration",
        "Cellular signal",
        "WiFi and Bluetooth",
        "Side buttons",
        "Rear camera",
        "Front camera",
        "Flashlight",
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
          "Yes",
          "No"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "Pass",
          "Fail",
          "Not testable"
        ],
        [
          "percent"
        ]
      ],
      "values": [
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999,
        999
      ]
    }
    */
