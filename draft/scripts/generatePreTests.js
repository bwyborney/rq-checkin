// Generate the pre-test forms based on the data from column A and column B
// (a.k.a.) what has been set in the user's configuration
function generatePreTests(dataA, dataB) {
    
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
