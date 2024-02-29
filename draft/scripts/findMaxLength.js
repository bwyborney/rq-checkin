// Find the longest column in the data. This value will be used
// to add extra rows to the other columns so their length matches
function findMaxLength(data) {
    let maxLength = Math.max(
        data.columnA.values.length,
        data.columnB.values.length,
        data.columnB.format.length,
        data.columnC.values.length,
        data.columnC.format.length,
    );
    
    return maxLength;
}

export {findMaxLength};