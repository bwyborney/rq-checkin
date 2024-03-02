// Retrieve the "starting data" which is passed to this page by the extension

function getStartingData() {
  return {
    "version": 1,
    "ticketInfo": {
      "customer": {
        "name": "Customer Name",
        "contact": "",
        "methods": [
          "(111)111-1111",
          "(000)000-0000",
          "fake@email.net"
        ]
      },
      "ticket": {
        "estimate": "$99.99",
        "due": "1/1/1 - 1:00"
      },
      "technician": {
        "name": "Technician Name",
        "number": "(222)222-2222",
        "email": "repairs@cpr-anywhere.com"
      },
      "device": {
        "model": "Google Pixel 7",
        "serial": "DF78HR95FDG546"
      },
      "notes": "The screen is cracked and has ghost touching."
    },
    "columnA": {
      "values": [
        "Front cracked?",
        "Back cracked?",
        "Touch sensitivity:",
        "Display visibility:",
        "Biometric scanner:",
        "Proximity sensor:",
        "Ear speaker:",
        "Loudspeaker:",
        "Microphones:",
        "Vibration:",
        "Cellular signal:",
        "WiFi and Bluetooth:",
        "Side buttons:",
        "Rear camera:",
        "Front camera:",
        "Flashlight:",
        "Battery health:"
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
    },
    "columnC": {
      "format": [
        [
          "Screen repair"
        ],
        [
          "OEM",
          "AFM OLED",
          "AFM LCD"
        ],
        [
          "Back glass"
        ],
        [
          "Battery"
        ],
        [
          "Charging port"
        ],
        [
          "Front camera"
        ],
        [
          "Rear camera"
        ],
        [
          "Microphone"
        ],
        [
          "Speaker"
        ],
        [
          "Proximity sensor"
        ],
        [
          "Side buttons"
        ],
        [
          "Biometric scanner"
        ],
        [
          "Microsoldering"
        ],
        [
          "Diagnostic"
        ],
        [
          "Liquid damage cleaning"
        ],
        [
          "Other"
        ]
      ],
      "values": [
        [
          0
        ],
        [
          0,
          0,
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0
        ],
        [
          0,
          0
        ]
      ]
    }
  };
}

export {getStartingData};