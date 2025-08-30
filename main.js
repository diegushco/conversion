const btnbstocop = document.getElementById("bstocop");
const btncoptobs = document.getElementById("coptobs");
const btnbstodolar = document.getElementById("bstodolar");
const btndolartobs = document.getElementById("dolartobs");
const btnbstoeur = document.getElementById("bstoeur");
const btneurtobs = document.getElementById("eurtobs");
const conversion = document.getElementById("conversion");
const inputElement = document.getElementById("value");
const btnborrar = document.getElementById("btnborrar");
const current = document.getElementById("current");
const resultcontainer = document.getElementById("resultcontainer");
const result = document.getElementById("result");
const referencia = document.getElementById("referencia");
const referenciaCOP = document.getElementById("referenciacop");
const referenciaUSD = document.getElementById("referenciausd");
const referenciaEUR = document.getElementById("referenciaeur");
const placeholder = document.getElementById("placeholder");


const BOLIVAR = "bolivar";
const PESO = "peso";
const DOLARBS = "dolarbs";
const DOLAR = "dolar";
const EUROBS = "eurobs";
const EURO = "euro";

let currentConversion = BOLIVAR;
let currentTasa = -1;
let currentTasaCOP = -1;
let currentTasaEUR = -1;
let currentTasaUSD = -1;

function addPointSeparator(numero) {
  // Convierte el número a una cadena de texto
  var numeroString = numero.toString();

  // Separa los enteros de los decimales, si los hay
  var partes = numeroString.split(".");

  // Obtiene los enteros y los decimales por separado
  var enteros = partes[0];
  var decimales = partes[1] || "";

  // Agrega puntos de separación a los enteros
  enteros = enteros.replace(/\B(?=(\d{3})+(?!\d))/g, ".");

  // Regresa el número con los puntos de separación
  return enteros + (decimales.length > 0 ? "." + decimales : "");
}

function getCurrentTasaCOP() {

  const today = new Date();
    today.setDate(today.getDate() - 1);

    const year = today.getFullYear();
    const month = String(today.getMonth() + 1).padStart(2, '0'); // Los meses van de 0 a 11
    const day = String(today.getDate()).padStart(2, '0');

    const fecha = `${year}-${month}-${day}`;


  fetch("https://v6.exchangerate-api.com/v6/403140ddd8064813a803593f/latest/usd", {
    method: "GET",

    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
        currentTasa = parseFloat(json.conversion_rates.COP);
        const calculo = Number((currentTasa / currentTasaUSD)-9);

      
        currentTasa = (calculo).toFixed(2);
        currentTasaCOP = parseFloat((((calculo)).toFixed(2)));

        referencia.textContent = currentTasa;
        referenciaCOP.textContent = JSON.stringify(currentTasa);
        convert();
    });
}

function getCurrentTasaEUR() {
  fetch("https://v6.exchangerate-api.com/v6/403140ddd8064813a803593f/latest/eur", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
        // Guardar el price en currentTasa
        currentTasaEUR = parseFloat(json.conversion_rates.VES);
        referenciaEUR.textContent = JSON.stringify(currentTasaEUR);
        convert();
    })
    .catch((error) => {
        console.error("Error al obtener la tasa:", error);
    });
}

function getCurrentTasaUSD() {
  fetch("https://v6.exchangerate-api.com/v6/403140ddd8064813a803593f/latest/usd", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
        // Guardar el price en currentTasa
      currentTasaUSD = parseFloat(json.conversion_rates.VES);
        referenciaUSD.textContent = JSON.stringify(currentTasaUSD);
        getCurrentTasaCOP();
        convert();
    })
    .catch((error) => {
        console.error("Error al obtener la tasa:", error);
    });
}



function convert() {
  let valueFinal = 0;
  const value = inputElement.value;
  const valueFloat = parseFloat(value);
  const valorCurrent = Number(currentTasa);

  if (currentConversion === BOLIVAR) {
    valueFinal = valueFloat * valorCurrent;
  } else if (currentConversion === PESO) {
    valueFinal = valueFloat / valorCurrent;
  }else if (currentConversion === DOLAR) {
    valueFinal = valueFloat * valorCurrent;
  }else if (currentConversion === DOLARBS) {
    valueFinal = valueFloat / valorCurrent;
  }else if (currentConversion === EUROBS) {
    valueFinal = valueFloat / valorCurrent;
  }else if (currentConversion === EURO) {
    valueFinal = valueFloat * valorCurrent;
  }
  const numsep = addPointSeparator(Math.round(valueFinal * 100) / 100);
  result.textContent = numsep;
}

function change(){
    const nuevaTasa = prompt("Ingrese un nuevo valor de tasa, solo ingrese numeros.");
    currentTasa = parseFloat(nuevaTasa);
    referencia.textContent = currentTasa;
    convert();
}

btnbstocop.addEventListener("click", () => {
  // Obtener el estilo actual del botón
  const currentColor = btnbstocop.style.backgroundColor;

  // Verificar si el color actual es azul
  if (currentColor !== "green") {
    // Cambiar el color a rojo si es azul btnbstodolar btndolartobs btnbstoeur btneurtobs
    btnbstocop.style.backgroundColor = "green";
    btncoptobs.style.backgroundColor = "gray";
    btnbstodolar.style.backgroundColor = "gray";
    btndolartobs.style.backgroundColor = "gray";
    btnbstoeur.style.backgroundColor = "gray";
    btneurtobs.style.backgroundColor = "gray";
    conversion.innerText = btnbstocop.textContent;
    currentConversion = BOLIVAR;
    current.textContent = "Pesos";
    placeholder.textContent = "Bolivares";
    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
    referencia.textContent = referenciaCOP.textContent;

    currentTasa = currentTasaCOP;
  }
});

btncoptobs.addEventListener("click", () => {
  // Obtener el estilo actual del botón
  const currentColor = btncoptobs.style.backgroundColor;

  // Verificar si el color actual es azul
  if (currentColor !== "green") {
    // Cambiar el color a rojo si es azul
    btncoptobs.style.backgroundColor = "green";
    btnbstocop.style.backgroundColor = "gray";
    btnbstodolar.style.backgroundColor = "gray";
    btndolartobs.style.backgroundColor = "gray";
    btnbstoeur.style.backgroundColor = "gray";
    btneurtobs.style.backgroundColor = "gray";
    conversion.innerText = btncoptobs.textContent;
    currentConversion = PESO;
    current.textContent = placeholder.textContent = "Bolivares";
    placeholder.textContent = "Pesos";

    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
    referencia.textContent = referenciaCOP.textContent;
    currentTasa = currentTasaCOP;
  }
});

btnbstodolar.addEventListener("click", () => {
  // Obtener el estilo actual del botón
  const currentColor = btnbstodolar.style.backgroundColor;

  // Verificar si el color actual es azul
  if (currentColor !== "green") {
    // Cambiar el color a rojo si es azul btnbstodolar btndolartobs btnbstoeur btneurtobs
    btnbstodolar.style.backgroundColor = "green";
    btncoptobs.style.backgroundColor = "gray";
    btnbstocop.style.backgroundColor = "gray";
    btndolartobs.style.backgroundColor = "gray";
    btnbstoeur.style.backgroundColor = "gray";
    btneurtobs.style.backgroundColor = "gray";
    conversion.innerText = btnbstodolar.textContent;
    currentConversion = DOLARBS;
    current.textContent = "Dolares";
    placeholder.textContent = "Bolivares";
    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
    referencia.textContent = referenciaUSD.textContent;
    currentTasa = currentTasaUSD;
  }
});

btndolartobs.addEventListener("click", () => {
  // Obtener el estilo actual del botón
  const currentColor = btndolartobs.style.backgroundColor;

  // Verificar si el color actual es azul
  if (currentColor !== "green") {
    // Cambiar el color a rojo si es azul btnbstodolar btndolartobs btnbstoeur btneurtobs
    btndolartobs.style.backgroundColor = "green";
    btncoptobs.style.backgroundColor = "gray";
    btnbstodolar.style.backgroundColor = "gray";
    btnbstocop.style.backgroundColor = "gray";
    btnbstoeur.style.backgroundColor = "gray";
    btneurtobs.style.backgroundColor = "gray";
    conversion.innerText = btndolartobs.textContent;
    currentConversion = DOLAR;
    current.textContent = "Bolivares";
    placeholder.textContent = "Dolares";
    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
    referencia.textContent = referenciaUSD.textContent;
    currentTasa = currentTasaUSD;
  }
});

btnbstoeur.addEventListener("click", () => {
  // Obtener el estilo actual del botón
  const currentColor = btnbstoeur.style.backgroundColor;

  // Verificar si el color actual es azul
  if (currentColor !== "green") {
    // Cambiar el color a rojo si es azul btnbstodolar btndolartobs btnbstoeur btneurtobs
    btnbstoeur.style.backgroundColor = "green";
    btncoptobs.style.backgroundColor = "gray";
    btnbstodolar.style.backgroundColor = "gray";
    btndolartobs.style.backgroundColor = "gray";
    btnbstocop.style.backgroundColor = "gray";
    btneurtobs.style.backgroundColor = "gray";
    conversion.innerText = btnbstoeur.textContent;
    currentConversion = EUROBS;
    current.textContent = "Euros";
    placeholder.textContent = "Bolivares";
    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
    referencia.textContent = referenciaEUR.textContent;
    currentTasa = currentTasaEUR;
  }
});

btneurtobs.addEventListener("click", () => {
  // Obtener el estilo actual del botón
  const currentColor = btneurtobs.style.backgroundColor;
  
  // Verificar si el color actual es azul
  if (currentColor !== "green") {
    // Cambiar el color a rojo si es azul btnbstodolar btndolartobs btnbstoeur btneurtobs
    btneurtobs.style.backgroundColor = "green";
    btncoptobs.style.backgroundColor = "gray";
    btnbstodolar.style.backgroundColor = "gray";
    btndolartobs.style.backgroundColor = "gray";
    btnbstoeur.style.backgroundColor = "gray";
    btnbstocop.style.backgroundColor = "gray";
    conversion.innerText = btneurtobs.textContent;
    currentConversion = EURO;
    current.textContent = "Bolivares";
    placeholder.textContent = "Euros";
    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
    referencia.textContent = referenciaEUR.textContent;
    currentTasa = currentTasaEUR;
  }
});

btnborrar.addEventListener("click", () => {
  inputElement.value = "";
  resultcontainer.style.display = "none";
  inputElement.focus();
});

inputElement.addEventListener("input", function (event) {
  const value = event.target.value;
  if (value === "") {
    resultcontainer.style.display = "none";
  } else {
    resultcontainer.style.display = "flex";
    convert();
  }
});

btnbstocop.click();

getCurrentTasaEUR();
getCurrentTasaUSD();
resultcontainer.style.display = "none";

if ("serviceWorker" in navigator) {
    window.addEventListener("load", function () {
      navigator.serviceWorker
        .register("service-worker.js")
        .then(function (registration) {
          console.log(
            "Service Worker registrado con éxito con alcance:",
            registration.scope
          );
        })
        .catch(function (error) {
          console.error("Error al registrar el Service Worker:", error);
        });
    });
  }
