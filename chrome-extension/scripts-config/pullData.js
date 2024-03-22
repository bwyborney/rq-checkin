// Pulls the data if any exists on the page
function pullData() {
    // Identify where the data is saved
    let dataSpot = document.getElementById('CustomFieldForm_value');
    let data = 'noData';
    if (dataSpot.value.length > 0) {
        // See if the existing data parses correctly
        let testData = JSON.parse(dataSpot.value);
        if (testData.version !== undefined) {
            data = testData;
        }
    }

    return data;
}