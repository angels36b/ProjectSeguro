// constructores
function Seguro(marca, year, tipo){
    this.marca= marca;
    this.year = year;
    this.tipo = tipo;
}

function UI(){

}

UI.prototype.llenarOpciones = ()=>{
    const max = new Date().getFullYear(),
          min = max - 20;

    const selectYear = document.createElement('#year');

    for(let i = max ; i > min; i--){
        // crea elemento desplegable con opciones del a;o
        let option = document.createElement(`option`);
        option.value = i;
        option.textContent = i;
        selectYear.appendChild(option);
    }
}

// instancia UI
const ui = new UI()
// console.log(ui)

document.addEventListener('DOMContentLoaded',()=>{
       ui.llenarOpciones();//Llena la ventana select con los a;os 
})