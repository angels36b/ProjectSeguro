// constructores
function Seguro(marca, year, tipo){
    this.marca= marca;
    this.year = year;
    this.tipo = tipo;
}

function UI() { }

UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.querySelector('#year');

    for(let i = max ; i > min; i--){
        // crea elemento desplegable con opciones del a;o
        let option = document.createElement(`option`);
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// instancia UI
const ui = new UI();
// console.log(ui)

document.addEventListener('DOMContentLoaded',()=>{
       ui.llenarOpciones();//Llena la ventana select con los a;os 
})

// validacion del formulario/ los selectores no agregarlos en un prototype

eventListeners();
function eventListeners(){
    const formulario = document.querySelector('#cotizar-seguro');
    formulario.addEventListener('submit', cotizarSeguro);
}

function cotizarSeguro(e){
    e.preventDefault();

//leer la marca seleccionada
const marca = document.querySelector('#marca').value;
console.log(marca);

//leer el tipo de ocbertura
const year = document.querySelector('#year').value;

//leer la marca seleccionada
const tipo = document.querySelector('input[name="tipo"]:checked').value;
console.log(tipo);


if (marca === '' || year === '' || tipo === ''){
    console.log('No paso la validacion')
}else{
    console.log('Si paso la validacion..')
}

    console.log('Cotizando...')
}