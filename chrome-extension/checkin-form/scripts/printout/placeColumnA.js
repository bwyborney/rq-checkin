// Fill out column A
function placeColumnA(data, max) {
    // Create the column container
    let column = document.createElement('div');
    column.classList = 'inspect-column ic-internal-border';
    // Create the header row
    let header = document.createElement('div');
    header.classList = 'ir-even ir-bold';
    let headerP = document.createElement('p');
    headerP.innerText = 'Function';
    header.appendChild(headerP);
    column.appendChild(header);
    // Keep track of how many rows have been added
    let rowCount = 0;
    // Keep track of whether this is an even or odd row, for CSS purposes
    let evenOrOdd = 'odd';
    // Loop through the data and make one row per entry
    for (let a = 0; a < data.values.length; a++) {
        // Create the row
        let row = document.createElement('div');
        row.classList = `ir-${evenOrOdd}`;
        let rowP = document.createElement('p');
        rowP.innerText = data.values[a];
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

export {placeColumnA};

// Here's an example of what the finished HTML will look like:
/*
<div class="inspect-column ic-internal-border">
    <div class="ir-even ir-bold">
        <p>Function</p>
    </div>
    <div class="ir-odd">
        <p>Front cracked?</p>
    </div>
    <div class="ir-even">
        <p>Back cracked?</p>
    </div>
</div>
*/