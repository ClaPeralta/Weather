const container = document.querySelector(".container");

const resultado = document.querySelector("#resultado");

const formulario = document.querySelector("#formulario");

window.addEventListener("load", () => {
  formulario.addEventListener("submit", buscarClima);
});

function buscarClima(e) {
  e.preventDefault();

  //console.log("Buscando Clima...");

  //validar formulario
  const ciudad = document.querySelector("#ciudad").value;
  const pais = document.querySelector("#pais").value;

  // console.log(ciudad);
  // console.log(pais);

  if (ciudad === "" || pais === "") {
    //mostrar error
    mostrarError("Ambos campos son obligatorios");

    return;
  }
  //consulta a la API
  consultarAPI(ciudad, pais);
}

function mostrarError(mensaje) {
  console.log(mensaje);

  const alerta = document.querySelector(".bg-red-100");

  if (!alerta) {
    //crear la alerta
    const alerta = document.createElement("div");

    alerta.classList.add(
      "bg-red-100",
      "border-red-400",
      "text-red-700",
      "px-4",
      "py-3",
      "rounded",
      "max-w-md",
      "mx-auto",
      "mt-6",
      "text-center"
    );

    alerta.innerHTML = `
  <strong class="font-bold">Error!</strong>
  <span class="block">${mensaje}</span>
  `;

    container.appendChild(alerta);
    //eliminar alerta despues de 5secs
    setTimeout(() => {
      alerta.remove();
    }, 3500);
  }
}
function consultarAPI(ciudad, pais) {
  const appID = "9885a55b589f8370dfbd7daed5ade375";

  const url = `https://api.openweathermap.org/data/2.5/weather?q=${ciudad},${pais}&appid=${appID}&units=metric`;

  //console.log(url);

  spinner();

  fetch(url)
    .then((respuesta) => respuesta.json())
    .then((datos) => {
      //limpio el html previo
      limpiarHTML();

      //console.log(datos);
      if (datos.cod === "404") {
        mostrarError("Ciudad NO encontrada");
        return;
      }
      //imprime rta en el html
      mostrarClima(datos);
    });
}

function mostrarClima(datos) {
  const {
    name,
    main: { temp, feels_like, temp_min, temp_max },
  } = datos;

  const nombreCiudad = document.createElement("h2");
  nombreCiudad.innerHTML = `${name}`;
  nombreCiudad.classList.add("font-bold", "text-6xl");

  const actual = document.createElement("p");
  actual.innerHTML = `${temp} &#8451;`;
  actual.classList.add("font-bold", "text-6xl");

  const sensacionTermica = document.createElement("p");
  sensacionTermica.innerHTML = `${feels_like} &#8451; de sensacion termica`;
  sensacionTermica.classList.add("text-2xl");

  const maxima = document.createElement("p");
  maxima.innerHTML = `${temp_max} &#8451; Temp. Max `;
  maxima.classList.add("text-xl");

  const minima = document.createElement("p");
  minima.innerHTML = `${temp_min} &#8451; Temp. Min `;
  minima.classList.add("text-xl");

  const resultadoDiv = document.createElement("div");
  resultadoDiv.classList.add("text-center", "text-white");
  resultadoDiv.appendChild(nombreCiudad);
  resultadoDiv.appendChild(actual);
  resultadoDiv.appendChild(sensacionTermica);
  resultadoDiv.appendChild(maxima);
  resultadoDiv.appendChild(minima);

  resultado.appendChild(resultadoDiv);
}

function limpiarHTML() {
  while (resultado.firstChild) {
    resultado.removeChild(resultado.firstChild);
  }
}

function spinner() {
  limpiarHTML();
  const divSpinner = document.createElement("div");
  divSpinner.classList.add("sk-folding-cube");

  divSpinner.innerHTML = `
  <div class="sk-cube1 sk-cube"></div>
  <div class="sk-cube2 sk-cube"></div>
  <div class="sk-cube4 sk-cube"></div>
  <div class="sk-cube3 sk-cube"></div>
  `;

  resultado.appendChild(divSpinner);
}
