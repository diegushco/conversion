const btnbstocop = document.getElementById("bstocop");
const btncoptobs = document.getElementById("coptobs");
const conversion = document.getElementById("conversion");
const inputElement = document.getElementById("value");
const btnborrar = document.getElementById("btnborrar");
const current = document.getElementById("current");
const resultcontainer = document.getElementById("resultcontainer");
const result = document.getElementById("result");
const referencia = document.getElementById("referencia");
const placeholder = document.getElementById("placeholder");


const BOLIVAR = "bolivar";
const PESO = "peso";

let currentConversion = BOLIVAR;
let currentTasa = -1;

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

function getCurrentTasa() {
  fetch("https://run.mocky.io/v3/e0093aa1-4e1b-4243-a063-94420bb641e8", {
    method: "GET",
    headers: { "Content-type": "application/json;charset=UTF-8" },
  })
    .then((response) => response.json())
    .then((json) => {
        currentTasa = parseFloat(json.tasa);
        referencia.textContent = currentTasa;
        convert();
    });
}

function convert() {
  let valueFinal = 0;
  const value = inputElement.value;
  const valueFloat = parseFloat(value);
  if (currentConversion === BOLIVAR) {
    valueFinal = valueFloat * currentTasa;
  } else if (currentConversion === PESO) {
    valueFinal = valueFloat / currentTasa;
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
    // Cambiar el color a rojo si es azul
    btnbstocop.style.backgroundColor = "green";
    btncoptobs.style.backgroundColor = "gray";
    conversion.innerText = btnbstocop.textContent;
    currentConversion = BOLIVAR;
    current.textContent = "Pesos";
    placeholder.textContent = "Bolivares";
    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
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
    conversion.innerText = btncoptobs.textContent;
    currentConversion = PESO;
    current.textContent = placeholder.textContent = "Bolivares";
    placeholder.textContent = "Pesos";

    resultcontainer.style.display = "none";
    inputElement.value = "";
    inputElement.focus();
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
getCurrentTasa();
resultcontainer.style.display = "none";
