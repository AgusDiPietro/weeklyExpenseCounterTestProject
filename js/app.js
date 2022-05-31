//Variables y Selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul")
let presupuesto;

// Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);
}

//Clases
class Presupuesto{
    constructor(presupusto){
        this.presupusto = Number(presupusto);
        this.restante = Number(presupuesto);

    }
}
class UI {

}

//Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cúal es tu presupuesto?');

   // console.log(Number(presupuestoUsuario));

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario || presupuestoUsuario <= 0)) {
        window.location.reload(); // Hace que se recargue la página.
    }

    //Una vez validado el presupuesto
    presupusto = new Presupuesto(presupuestoUsuario);

}