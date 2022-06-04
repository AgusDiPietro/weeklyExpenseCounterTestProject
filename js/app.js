//Variables y Selectores
const formulario = document.querySelector("#agregar-gasto");
const gastoListado = document.querySelector("#gastos ul")
let presupuesto;

// Eventos
eventListeners();
function eventListeners(){
    document.addEventListener('DOMContentLoaded',preguntarPresupuesto);

    formulario.addEventListener('submit',agregarGasto);
}

//Clases
class Presupuesto{
    constructor(presupusto){
        this.presupusto = Number(presupusto);
        this.restante = Number(presupuesto);
        this.gastos = [];
    }
    
    nuevoGasto(gasto){
        this.gastos = [...this.gastos, gasto];
    }
}
//metodos que van a imprimir html para la visualizacion del usuario.
class UI {
    insertarPresupuesto(cantidad){
        // Extrayendo los valores.
        const {presupuesto, restante} = cantidad

        //Agregar al HTML
        document.querySelector("#total").textContent = presupuesto;
        document.querySelector("#restante").textContent = restante;

    }

    imprimirAlerta(mensaje,tipo){
        //crear el div
        const divMensaje = document.createElement('div');
        divMensaje.classList.add('text-center', 'alert');

        if(tipo === 'error'){
            divMensaje.classList.add('alert-danger');
        }else {
            divMensaje.classList.add('alert-succes');
        }
        //Mensaje de error
        divMensaje.textContent = mensaje;
        // Insertar en HTML
        document.querySelector('.primario').insertBefore(divMensaje, formulario);
        //Quitar mensaje del HTML despues de un tiempo
        setTimeout(() => {
           divMensaje.remove() 
        }, 1500); 



    }
}
// instanciar
const ui = new UI

//Funciones
function preguntarPresupuesto(){
    const presupuestoUsuario = prompt('¿Cúal es tu presupuesto?');

   // console.log(Number(presupuestoUsuario));

    if (presupuestoUsuario === '' || presupuestoUsuario === null || isNaN(presupuestoUsuario || presupuestoUsuario <= 0)) {
        window.location.reload(); // Hace que se recargue la página.
    }

    //Una vez validado el presupuesto
    presupusto = new Presupuesto(presupuestoUsuario);

    ui.insertarPresupuesto(presupuesto);

}
//Añade los gastos a la lista
function agregarGasto(e){
    e.preventDefault();

    //Leer datos del formulario
    const nombre = document.querySelector("gasto").value;
    const cantidad = Number(document.querySelector("cantidad").value);

    if(nombre ==='' || cantidad ===''){
       ui.imprimirAlerta('Ambos campos son obligatorios','error');
       return;
    }else if (cantidad <= 0 || isNaN(cantidad)){
        ui.imprimirAlerta("Cantidad no valida", "error");
        return;
    }

   // Generamos un objeto por cada gasto
   const gasto = { nombre, cantidad, id:Date.now() } ; // Unimos nombre y cantidad a gasto.

   // añade nuevo gasto
   presupuesto.nuevoGasto(gasto);
   
   ui.imprimirAlerta("Gasto agregado correctamente");

}