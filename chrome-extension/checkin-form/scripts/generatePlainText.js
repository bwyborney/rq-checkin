// Create a plaintext version of the original data
function generatePlainText() {
    // Grab all the meta info from the top
    let plainText = '';
    plainText += ' \n ';
    plainText += document.getElementById('mi-customer-info').innerText;
    plainText += ' \n ';
    plainText += document.getElementById('mi-estimate-info').innerText;
    plainText += ' \n ';
    plainText += document.getElementById('mi-device-info').innerText;
    plainText += ' \n ';
    plainText += document.getElementById('mi-technician-info').innerText;
    plainText += ' \n ';
    plainText += 'Customer remarks: ';
    plainText += document.getElementById('notes').innerText;
    plainText += ' \n ';

    // Grab the contents of the pre-tests, keeping column A and B together
    plainText += 'Pre-tests: ';
    plainText += ' \n ';
    let colA = document.getElementsByClassName('inspect-column')[0].children;
    let colB = document.getElementsByClassName('inspect-column')[1].children;

    for (let p = 1; p < colA.length - 1; p++) {
        plainText += colA[p].children[0].innerText;
        plainText += ' ';
        plainText += colB[p].children[0].innerText;
        plainText += ' \n ';
    }

    // Grab the contents of the repairs to perform
    plainText += 'Repairs to perform: ';
    plainText += ' \n ';
    let colC = document.getElementsByClassName('inspect-column')[2].children;
    for (let p = 1; p < colC.length - 1; p++) {
        plainText += colC[p].children[0].innerText;
        plainText += ' \n '; 
    }

    return plainText;
}

export {generatePlainText};