// /////////////////
// max datum vandaag
// /////////////////
const date1 = document.getElementById("datePicker1");
const date2 = document.getElementById("datePicker2");
const date3 = document.getElementById("datePicker3");
const today = new Date().toISOString().split("T")[0]; // bron: https://stackoverflow.com/a/49916376
date1.max = today;
date2.max = today;
date3.max = today;