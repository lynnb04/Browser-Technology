// /////////////////
// max datum vandaag
// /////////////////
const date1 = document.getElementById("datum-1");
const date2 = document.getElementById("datum-2");
const date3 = document.getElementById("datum-3");
const today = new Date().toISOString().split("T")[0]; // bron: https://stackoverflow.com/a/49916376
if (date1) date1.max = today;
if (date2) date2.max = today;
if (date3) date3.max = today;



// /////////
// validatie
// /////////

// Functie voor custom error messages
function setCustomValidationMessage(inputElement, customMessage) {
    if (!inputElement) return;

    // Functie die de validiteit controleert en de juiste melding set
    const checkValidity = () => {
        if (inputElement.validity.valueMissing) {
            inputElement.setCustomValidity('Dit veld is verplicht.');
        } else if (inputElement.validity.patternMismatch) {
            inputElement.setCustomValidity(customMessage);
        } else if (inputElement.validity.tooLong || inputElement.validity.tooShort) {
            inputElement.setCustomValidity(`Te veel of te weinig tekens ingevoerd.`);
        } else if (inputElement.validity.rangeOverflow) {
            inputElement.setCustomValidity('Datum mag niet in de toekomst liggen.');
        } else {
            // Veld is geldig, reset de error message
            inputElement.setCustomValidity('');
        }
    };

    // Controleer tijdens het typen
    inputElement.addEventListener('input', () => {
        checkValidity();
        // Forceer de browser om te checken (handig voor real-time CSS/JS validatie)
        inputElement.reportValidity(); // Toont de bubble tijdens typen
    });

    // Controleer bij submit, en voorkom dat de browser zijn eigen standaard teksten gebruikt
    inputElement.addEventListener('invalid', (event) => {
        checkValidity();
    });
}

// Pas validatie toe op specifieke velden

// Voorletters: alleen letters en leestekens, min 1, max 50
const voorlettersInput = document.getElementById('voorletters-overledene');
setCustomValidationMessage(voorlettersInput, "Gebruik alleen letters, spaties, koppeltekens of apostrofs (minimaal 1 letter).");

// Achternaam: alleen letters en leestekens, min 2, max 50
const achternaamInput = document.getElementById('achternaam-overledene');
setCustomValidationMessage(achternaamInput, "Gebruik alleen letters, spaties, koppeltekens of apostrofs (minimaal 2 letters).");

// BSN: precies 9 cijfers
const bsnInput = document.getElementById('bsn-overledene');
setCustomValidationMessage(bsnInput, "Een BSN moet uit exact 9 cijfers bestaan.");

// Overlijdensdatum (om rangeOverflow op te vangen voor de max="" attribuut die hierboven is ingesteld)
setCustomValidationMessage(date1, "De datum mag niet in de toekomst liggen.");
setCustomValidationMessage(date2, "De datum mag niet in de toekomst liggen.");
setCustomValidationMessage(date3, "De datum mag niet in de toekomst liggen.");

// Protocolnummer
const protocolInput = document.getElementById('protocolnummer-notaris');
if (protocolInput) {
    protocolInput.addEventListener('input', function() {
        if (protocolInput.value.length > 6) {
            protocolInput.setCustomValidity('Het protocolnummer mag uit maximaal 6 cijfers bestaan.');
        } else {
            protocolInput.setCustomValidity(''); 
        }
    });
}
