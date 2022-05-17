// constructores
function Seguro(marca, year, tipo) {
  this.marca = marca;
  this.year = year;
  this.tipo = tipo;
}
//Realiza la cotizacion con los datos
Seguro.prototype.cotizarSeguro = function () {
  /* 
    1 = Americano 1.15
    2 = Asiatico 1.05
    3 = Europeo 1.35 
    */
  let cantidad;
  const base = 2000;

  switch (this.marca) {
    case "1":
      cantidad = base * 1.15;
      break;
    case "2":
      cantidad = base * 1.05;
      break;
    case "3":
      cantidad = base * 1.35;
      break;
    default:
      break;
  }
  //leer el año
  const diferencia = new Date().getFullYear() - this.year;

  //cada año que la diferencia es mayor, el costo va a reducirse
  cantidad -= ((diferencia + 3) * cantidad) / 100;

  /*
Si el seguro es basico se multiplica por un 30%
si el seguro es completo se multiplica por un 50%
*/

  if (this.tipo === "basico") {
    cantidad += 1.3;
  } else {
    cantidad += 1.5;
  }
  return cantidad;

  console.log(cantidad);
};

function UI() { }

UI.prototype.llenarOpciones = () => {
  const max = new Date().getFullYear(),
    min = max - 20;

  const selectYear = document.querySelector("#year");

  for (let i = max; i > min; i--) {
    // crea elemento desplegable con opciones del a;o
    let option = document.createElement(`option`);
    option.value = i;
    option.textContent = i;
    selectYear.appendChild(option);
  }
};

UI.prototype.mostrarResultado = (total, seguro) => {

  const { marca, year, tipo } = seguro;

  let textoMarca;
  switch (marca) {
    case '1':
      textoMarca = 'Americano';
      break;
    case '2':
      textoMarca = 'Asiatico';
      break;
    case '3':
      textoMarca = 'Europeo'
      break;
  }


  //Crear el resultado
  const div = document.createElement('div');
  div.classList.add('mt-10');
  //manejo del DOM, para visualizacion
  div.innerHTML = `
  <p class ="header"> Tu resumen </p>
  <p class = "font-bold"> Marca: <span class="font-normal"> $ ${textoMarca} </span> </p>
  <p class = "font-bold"> Total: <span class="font-normal"> $ ${total} </span> </p>
  `;
  const resultadoDiv = document.querySelector('#resultado');
  // resultadoDiv.appendChild(div);
  //Mostrar el spinner
  const spinner = document.querySelector('#cargando');
  spinner.style.display = 'block';

  setTimeout(() => {
    spinner.style.display = 'none';//se borra el spinner
    resultadoDiv.appendChild(div);//se muestra el resultado
  }, 3000);
 
}

// instancia UI
const ui = new UI();
// console.log(ui)

document.addEventListener("DOMContentLoaded", () => {
  ui.llenarOpciones(); //Llena la ventana select con los a;os
});

// validacion del formulario/ los selectores no agregarlos en un prototype

UI.prototype.mostrarMensaje = function (mensaje, tipo) {
  const div = document.createElement("div");

  if (tipo === "error") {
    div.classList.add("mensaje", "error");
  } else {
    div.classList.add("mensaje", "correcto");
  }
  div.classList.add("mensaje", "mt-10");
  div.textContent = mensaje;

  //insertar en el HTML
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.insertBefore(div, document.querySelector("#resultado"));

  setTimeout(() => {
    div.remove();
  }, 3000);
};

eventListeners();
function eventListeners() {
  const formulario = document.querySelector("#cotizar-seguro");
  formulario.addEventListener("submit", cotizarSeguro);
}

function cotizarSeguro(e) {
  e.preventDefault();

  //leer la marca seleccionada
  const marca = document.querySelector("#marca").value;
  console.log(marca);

  //leer el tipo de cobertura
  const year = document.querySelector("#year").value;

  //leer la marca seleccionada
  const tipo = document.querySelector('input[name="tipo"]:checked').value;
  console.log(tipo);

  if (marca === "" || year === "" || tipo === "") {
    ui.mostrarMensaje("Todos los campos son obligatorios", "error");
  } else {
    // ui.mostrarMensaje("Eureca..", "correcto");
  }

  ui.mostrarMensaje('Cotizando...', 'exito');

  //ocultar las cotizaciones previas
  const resultados = document.querySelector('#resultado div')
  if (resultados != null) {
    resultados.remove()
  }

  //Instanciar el seguro
  const seguro = new Seguro(marca, year, tipo);
  const total = seguro.cotizarSeguro();

  ui.mostrarResultado(total, seguro);
}
