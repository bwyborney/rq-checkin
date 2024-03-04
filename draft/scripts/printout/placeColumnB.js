// Fill out column B
function placeColumnB(data, max) {
    // Create the column container
    let column = document.createElement('div');
    column.classList = 'inspect-column ic-internal-border';
    // Create the header row
    let header = document.createElement('div');
    header.classList = 'ir-even ir-bold';
    let headerP = document.createElement('p');
    headerP.innerText = 'Result';
    header.appendChild(headerP);
    column.appendChild(header);
    // Keep track of how many rows have been added
    let rowCount = 0;
    // Keep track of whether this is an even or odd row, for CSS purposes
    let evenOrOdd = 'odd';
    // Loop through the data and make one row per entry
    for (let a  = 0; a < data.format.length; a++) {
        let row = document.createElement('div');
        row.classList = `ir-${evenOrOdd}`;
        let rowP = document.createElement('p');
        // The inner text of rowP is where this varies from the columnA function
        // We'll need to perform some logic to put together a nice-looking string
        let contents = generateString(data.format[a], data.values[a]);
        rowP.innerText = contents;

        row.appendChild(rowP);
        column.appendChild(row);

        if (evenOrOdd === 'odd') {
            evenOrOdd = 'even';
        } else {
            evenOrOdd = 'odd';
        }

        rowCount += 1;
    }

    // Add the extra rows to catch up to row count
    for (let c = 0; c < (max - rowCount); c++) {
        let row = document.createElement('div');
        row.classList = `ir-${evenOrOdd}`;
        column.appendChild(row);

        if (evenOrOdd === 'odd') {
            evenOrOdd = 'even';
        } else {
            evenOrOdd = 'odd';
        }
    }

    document.getElementById('inspection').appendChild(column);
}

// Make a nice-looking string out of the format and the values
function generateString(format, values) {
    let contents = '';
    // First, check if this is a text entry
    if (format[0] === 'percent' || format[0] === 'amps') {
        contents += `${values} ${format[0]}`;
    } else {
        // Then fill out the rest
        for (let b = 0; b < format.length; b++) {
            if (values === b) {
                contents += `\u2611 ${format[b]} `;
            } else {
                contents += `\u2610 ${format[b]} `;
            }
        }
    }

    return contents;
}

export {placeColumnB};

// Here's an example of what the finished HTML will look like:
/*
<div class="inspect-column ic-internal-border">
    <div class="ir-even ir-bold">
        <p>Result</p>
    </div>
    <div class="ir-odd">
        <p>☑ Yes ☐ No </p>
    </div>
    <div class="ir-even">
        <p>☑ Yes ☐ No </p>
    </div>
    <div class="ir-odd">
        <p>55%</p>
    </div>
</div>
*/