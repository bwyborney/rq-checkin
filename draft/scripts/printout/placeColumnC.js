// Fill out column C
function placeColumnC(data, max) {
    // Create the column container
    let column = document.createElement('div');
    column.classList = 'inspect-column ic-external-border';
    // Create the header row
    let header = document.createElement('div');
    header.classList = 'ir-even ir-bold';
    let headerP = document.createElement('p');
    headerP.innerText = 'Repairs to perform:';
    header.appendChild(headerP);
    column.appendChild(header);
    // Keep track of how many rows have been added
    let rowCount = 0;
    // Loop through the data and make one row per entry
    for (let a  = 0; a < data.format.length; a++) {
        let row = document.createElement('div');
        row.classList = 'ir-even';
        let rowP = document.createElement('p');
        // Get the string
        let contents = generateString(data.format[a], data.values[a]);
        rowP.innerText = contents;

        row.appendChild(rowP);
        column.appendChild(row);

        rowCount += 1;
    }

    // Add the extra rows to catch up to row count
    for (let c = 0; c < (max - rowCount); c++) {
        let row = document.createElement('div');
        row.classList = 'ir-even';
        column.appendChild(row);
    }

    document.getElementById('inspection').appendChild(column);
}

function generateString(format, values) {
    let contents = '';
    // First, check if this is an 'other' repair
    if (format[0] === 'Other') {
        // If an 'other' repair is checked, add its corresponding text
        if (values[0] === 0) {
            contents += `\u2610 ${format[0]} `;
        } else {
            contents += `\u2611 ${format[0]}: ${values[1]} `;
        }
    } else {
        // Handle other types of formats
        for (let b = 0; b < format.length; b++) {
            if (values[b] === 0) {
                contents += `\u2610 ${format[b]} `;
            } else {
                contents += `\u2611 ${format[b]} `;
            }
        }
    }

    return contents;
}

export {placeColumnC};

// Here's an example of what the finished HTML will look like:
/*
<div class="inspect-column ic-external-border">
    <div class="ir-even ir-bold">
        <p>Repairs to perform:</p>
    </div>
    <div class="ir-even">
        <p>☑ Screen repair </p>
    </div>
    <div class="ir-even">
        <p>☐ OEM ☑ AFM OLED ☐ AFM LCD </p>
    </div>
    <div class="ir-even">
        <p>☐ Back glass </p>
    </div>
    <div class="ir-even">
        <p>☐ Battery </p>
    </div>
    <div class="ir-even">
        <p>☑ Charging port </p>
    </div>
    <div class="ir-even">
        <p>☐ Front camera </p>
    </div>
    <div class="ir-even">
        <p>☐ Rear camera </p>
    </div>
    <div class="ir-even">
        <p>☐ Microphone </p>
    </div>
    <div class="ir-even">
        <p>☐ Speaker </p>
    </div>
    <div class="ir-even">
        <p>☑ Proximity sensor </p>
    </div>
    <div class="ir-even">
        <p>☐ Side buttons </p>
    </div>
    <div class="ir-even">
        <p>☐ Biometric scanner </p>
    </div>
    <div class="ir-even">
        <p>☐ Microsoldering </p>
    </div>
    <div class="ir-even">
        <p>☐ Diagnostic </p>
    </div>
    <div class="ir-even">
        <p>☐ Liquid damage cleaning </p>
    </div>
    <div class="ir-even">
        <p>☑ Other: hello</p>
    </div>
    <div class="ir-even"></div>
</div>

*/