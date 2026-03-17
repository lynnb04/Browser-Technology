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

// required toggle op datum partnerschapsvoorwaarden
const bedingJa = document.getElementById("beding-ja");
const bedingNee = document.getElementById("beding-nee");
const datumFieldset = document.getElementById("voorwaarden-datum");

const datumInput = datumFieldset.querySelector("input");

function toggleDatumRequired() {
    if (bedingJa.checked) {
        datumInput.required = true;
        datumInput.disabled = false;
    } else {
        datumInput.required = false;
        datumInput.disabled = true;
    }
}

bedingJa.addEventListener("change", toggleDatumRequired);
bedingNee.addEventListener("change", toggleDatumRequired);


// required toggle op notaris gegevens
const jaTestament = document.getElementById("testament-ja");
const neeTestament = document.getElementById("testament-nee");
const notarisFieldset = document.getElementById("notaris-gegevens");

const inputs = notarisFieldset.querySelectorAll("input:not(#tussenvoegsel-notaris)");

function toggleRequired() {
    if (jaTestament.checked) {
        inputs.forEach(input => {
            input.required = true;
            input.disabled = false;
        });
    } else {
        inputs.forEach(input => {
            input.required = false;
            input.disabled = true;
        });
    }
}

jaTestament.addEventListener("change", toggleRequired);
neeTestament.addEventListener("change", toggleRequired);


// required toggle op bsn/rsin, beconnummer en protocolnummer

// radio buttons
const kiesBsn = document.getElementById("kies-bsn");
const kiesBecon = document.getElementById("kies-beconnummer");
const kiesProtocol = document.getElementById("kies-protocolnummer");

// fieldsets / inputs
const bsnFieldset = document.getElementById("fieldset-bsn");
const bsnKiesInput = document.getElementById("bsn-gemachtigde");

const beconFieldset = document.getElementById("fieldset-becon");
const beconKiesInput = document.getElementById("becon-gemachtigde");

const protocolFieldset = document.getElementById("fieldset-protocol");
const protocolKiesInput = document.getElementById("protocol-gemachtigde");

// toggle function
function toggleGemachtigdeFields() {
    if (kiesBsn.checked) {
        bsnKiesInput.required = true;
        bsnKiesInput.disabled = false;

        beconKiesInput.required = false;
        beconKiesInput.disabled = true;

        protocolKiesInput.required = false;
        protocolKiesInput.disabled = true;
    } else if (kiesBecon.checked) {
        bsnKiesInput.required = false;
        bsnKiesInput.disabled = true;

        beconKiesInput.required = true;
        beconKiesInput.disabled = false;

        protocolKiesInput.required = false;
        protocolKiesInput.disabled = true;
    } else if (kiesProtocol.checked) {
        bsnKiesInput.required = false;
        bsnKiesInput.disabled = true;

        beconKiesInput.required = false;
        beconKiesInput.disabled = true;

        protocolKiesInput.required = true;
        protocolKiesInput.disabled = false;
    } else {
        bsnKiesInput.required = false;
        bsnKiesInput.disabled = true;

        beconKiesInput.required = false;
        beconKiesInput.disabled = true;

        protocolKiesInput.required = false;
        protocolKiesInput.disabled = true;
    }
}

// event listeners
kiesBsn.addEventListener("change", toggleGemachtigdeFields);
kiesBecon.addEventListener("change", toggleGemachtigdeFields);
kiesProtocol.addEventListener("change", toggleGemachtigdeFields);



// functie voor custom error messages
function setCustomValidationMessage(inputElement, customMessage) {
    if (!inputElement) return;

    // functie die de validiteit controleert en de juiste melding set
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
            // veld is geldig, reset de error message
            inputElement.setCustomValidity('');
        }
    };

    // controleer tijdens het typen
    inputElement.addEventListener('input', () => {
        checkValidity();
        // forceer de browser om te checken
        inputElement.reportValidity(); // toont de bubble tijdens typen
    });

    // controleer bij submit, en voorkom dat de browser zijn eigen standaard teksten gebruikt
    inputElement.addEventListener('invalid', (event) => {
        checkValidity();
    });
}

// pas validatie toe op specifieke velden:

// voorletters: alleen letters en leestekens, min 1, max 10
const voorlettersInput = document.getElementById('voorletters-overledene');
setCustomValidationMessage(voorlettersInput, "Gebruik alleen hoofdletters of spaties (minimaal 1 letter).");

const voorlettersNotarisInput = document.getElementById('voorletters-notaris');
setCustomValidationMessage(voorlettersNotarisInput, "Gebruik alleen hoofdletters of spaties (minimaal 1 letter).");


// achternaam: alleen letters en leestekens, min 2
const achternaamInput = document.getElementById('achternaam-overledene');
setCustomValidationMessage(achternaamInput, "Begin met een hoofdletter en gebruik vervolgens alleen kleine letters, spaties of koppeltekens (minimaal 2 letters).");

const achternaamNotarisInput = document.getElementById('achternaam-notaris');
setCustomValidationMessage(achternaamNotarisInput, "Begin met een hoofdletter en gebruik vervolgens alleen kleine letters, spaties of koppeltekens (minimaal 2 letters).");


// bsn: precies 9 cijfers
const bsnInput = document.getElementById('bsn-overledene');
setCustomValidationMessage(bsnInput, "Een BSN moet uit exact 9 cijfers bestaan.");

const bsnGemachtigdeInput = document.getElementById('bsn-gemachtigde');
setCustomValidationMessage(bsnGemachtigdeInput, "Een BSN moet uit exact 9 cijfers bestaan.");

// overlijdensdatum (om rangeOverflow op te vangen voor de max="" attribuut die hierboven is ingesteld)
setCustomValidationMessage(date1, "De datum mag niet in de toekomst liggen.");
setCustomValidationMessage(date2, "De datum mag niet in de toekomst liggen.");
setCustomValidationMessage(date3, "De datum mag niet in de toekomst liggen.");

// protocolnummer: precies 6 cijfers
const protocolInput = document.getElementById('protocolnummer-notaris');
setCustomValidationMessage(protocolInput, "Het protocolnummer moet uit exact 6 cijfers bestaan.");

const protocolGemachtigdeInput = document.getElementById('protocol-gemachtigde');
setCustomValidationMessage(protocolGemachtigdeInput, "Het protocolnummer moet uit exact 6 cijfers bestaan.");

// beconnummer: precies 6 cijfers
const beconGemachtigdeInput = document.getElementById('becon-gemachtigde');
setCustomValidationMessage(beconGemachtigdeInput, "Het beconnummer moet uit exact 6 cijfers bestaan.");