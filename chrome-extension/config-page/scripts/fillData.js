// Takes the data template and fleshes it out
function fillData(data) {
    // Every entry in columnB.format needs a corresponding 999 in columnB.values
    let newColBVal = [];
    for (let bf = 0; bf < data.columnB.format.length; bf++) {
        newColBVal[bf] = 999;
    }
    data.columnB.values = newColBVal;
    // Likewise, columnC.values needs to be filled out
    let newColCVal = [];
    for (let cf = 0; cf < data.columnC.format.length; cf++) {
        newColCVal[cf] = [0];
        if (data.columnC.format[cf].length > 1) {
            for (let c = 0; c < data.columnC.format[cf].length; c++) {
                newColCVal[cf][c] = 0;
            }
        } else if (data.columnC.format[cf][0] === 'Other') {
            newColCVal[cf][0] = 0;
            newColCVal[cf][1] = 0;
        }
    }
    data.columnC.values = newColCVal;
    return data;
}

export {fillData};