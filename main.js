/// <reference types="jquery" />

//Variables

let base = $("#base");
let fecha = $("#fecha");

const simbolos = {
    "AUD": "A$",
    "BGN": "лв",
    "BRL": "R$",
    "CAD": "C$",
    "CHF": "₣",
    "CNY": "¥",
    "CZK": "Kč",
    "DKK": "kr",
    "GBP": "€",
    "HKD": "£",
    "HUF": "HK$",
    "IDR": "Rp",
    "ILS": "₪",
    "INR": "₹",
    "ISK": "kr",
    "JPY": "¥",
    "KRW": "₩",
    "MXN": "$",
    "MYR": "RM",
    "NOK": "kr",
    "NZD": "$",
    "PHP": "₱",
    "PLN": "zł",
    "RON": "lei",
    "SEK": "kr",
    "SGD": "$",
    "THB": "฿",
    "TRY": "₺",
    "USD": "$",
    "ZAR": "R"
}

//Agregar opciones de moneda base

for (const moneda in simbolos) {
    base.append($(`<option value="${moneda}">${moneda}</option>`));
}

//Seleccionar moneda base

document.querySelector("#botonConfirmar").onclick = function () {

    if (base[0].value !== "" && fecha[0].value !== "") {

        //Mostrar Cotizaciones

    } else {
        alert("Debes seleccionar una moneda base y una fecha.");
    }
}

// Convertir valores
