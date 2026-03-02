// ////////////////////////
// huwelijk jaar validation
// ////////////////////////
const input = document.getElementById("jaar-huwelijk");

input.addEventListener("input", function () {
    // alles behalve cijfers weghalen
    this.value = this.value.replace(/\D/g, "");

    // eerste cijfer geen 0
    if (this.value.length > 0 && this.value[0] === "0") {
        this.value = this.value.slice(1);
    }

    // minimaal 1900
    if (this.value.length === 4 && Number(this.value) < 1900) {
        this.value = "1900";
    }
});




// /////////////////
// max datum vandaag
// /////////////////
const date1 = document.getElementById("datePicker1");
const date2 = document.getElementById("datePicker2");
const today = new Date().toISOString().split("T")[0]; // bron: https://stackoverflow.com/a/49916376
date1.max = today;
date2.max = today;



// //////////////////////
// verberg volgende vraag
// //////////////////////

// volgorde = 1a alles ingevuld --> 1b ja = volgende deelvraag, nee --> 1c ja = volgende deelvraag, nee --> 1d ja = notarisgegevens, nee --> vraag 2