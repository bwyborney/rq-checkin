// Hide the text fields from view so they don't get messed with
function hideFields() {
    let fields = document.querySelectorAll('div[data-condition="null"]');
     for (let f = 0; f < fields.length; f++) {
         fields[f].style.display = 'none';
     }
 }