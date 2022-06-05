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
        this.calcularRestante();    
    }
    
    calcularRestante(){
        const gastado = this.gastos.reduce((total, gasto ) => total + gasto.cantidad, 0 ) //va sumando el total de lo gastado.
        this.restante = this.presupusto - gastado;

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

    agregarGastoListado(gastos) {

        this.limpiarHTML(); //Elimina el html previo y repetido.

        // iterar sobre los gastos 
        gastos.forEach ( gasto => {
            
            const {cantidad, nombre , id} = gasto;

            // Crear un LI
            const nuevoGasto = document.createElement('li');
            nuevoGasto.className = 'list-group-item d-flex justify-content-between align-items-center';
            nuevoGasto.dataset.id = id // hace lo mismo que nuevoGasto.setAttribute('data-id',id);

            //Agregar HTML de cada gasto
            nuevoGasto.innerHTML = `${nombre} <span class = "badge-primary badge-pill"> $ ${cantidad} </span>`;

            //Boton para eliminar el gasto
            const btnBorrar = document.createElement('button');
            btnBorrar.classList.add('btn', 'btn-danger', 'borrar-gasto');
            btnBorrar.innerHTML = 'Borrar &times';

            nuevoGasto.appendChild(btnBorrar);

            //Agregamos el boton al html del gasto
            gastoListado.appendChild(nuevoGasto);
        })
    }
    limpiarHTML(){
        while(gastoListado.firstChild){
            gastoListado.removeChild(gastoListado.firstChild);
        }
    }

    actualizarRestante(restante){
        document.querySelector("#restante").textContent = restante;
    }
    comprobarPresupuesto(presupuestoObj){
        const {presupuesto, restante} = presupuestoObj;
        
        const restanteDiv = document.querySelector('.restante');

        //Comprobar 25%
        if((presupuesto/4) > restante){
            restanteDiv.classList.remove('alert-success','alert-warning');
            restanteDiv.classList.add('alert-danger');
            //Comprobar 50%
        }else if ((presupuesto/2) > restante){
            restanteDiv.classList.remove('alert-success');
            restanteDiv.classList.add('alert-warning');
        }
        // si el restante es 0 o menor.
        if(restante <=0) {
            ui.imprimirAlerta('El presupuesto se ha agotado', 'error');
            formulario.querySelector('button[type="submit"]').disable = true;
        }
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
   
   // Mensaje de que se agrega el gasto.
   ui.imprimirAlerta("Gasto agregado correctamente");

   // Imprimir los gastos   
   const {gastos, restante} = presupuesto;    
   ui.agregarGastoListado(gastos);

   ui.actualizarRestante(restante);

   ui.comprobarPresupuesto(presupuesto); // comprobamos lo que gastamos junto al presupuesto.

   // Reiniciamos el formulario para volver a utilizarlo
   formulario.reset();

}