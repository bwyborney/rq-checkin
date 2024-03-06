// Find the longest column's length, so they can all be set to that length
function findMaxLength(data) {
    let max = data.columnA.values.length;
    if (data.columnB.values.length > max) {
        max = data.columnB.values.length;
    }
    if (data.columnC.values.length > max) {
        max = data.columnC.values.length;
    }
    return max;
}
export {findMaxLength};