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

        Promise.all([
            fetch(`https://api.frankfurter.dev/v1/${fecha[0].value}?base=${base[0].value}`).then(res => res.json()),
            fetch(`https://api.frankfurter.dev/v1/currencies`).then(res => res.json())
        ])
            .then(([monedaJSON, nombresJSON]) => {

                if ($("#titleCotizaciones").hidden = true) {
                    $("#titleCotizaciones").show();
                }

                $("#containerCotizaciones").empty();

                let base = base[0].value;
                let cotizaciones = monedaJSON.rates;
                cotizaciones[base] = 1;

                for (const moneda in simbolos) {
                    const card = $("<div>", {
                        html: ` <h1>${moneda}</h1>
                                <h2 id="nombreMoneda">${nombresJSON[moneda]}</h2>
                                <p>1${simbolos[base[0].value]} = ${cotizaciones[moneda]} ${simbolos[moneda]}</p>
                                <input min="0" placeholder="${base[0].value}" type="number" id="monedaBase">
                                <input placeholder="${moneda}" type="number" id="cotizacion" disabled>
                                <button class="botonConvertir">Convertir</button>`,
                        class: "cambio"
                    });

                    $("#containerCotizaciones").append(card);

                    convertir(card.find(".botonConvertir"), cotizaciones[moneda], card.find("#monedaBase")[0], card.find("#cotizacion")[0]);
                }
            })
            .catch(error => console.error(error));
    } else {
        alert("Debes seleccionar una moneda base y una fecha.");
    }
}

// Convertir valores

function convertir(botonActual, moneda, monedaBase, output) {
    botonActual.click(function () {
        output.value = `${monedaBase.value * moneda}`;
    });
}
