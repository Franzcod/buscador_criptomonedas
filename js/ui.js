

class Interfaz {

    constructor() {
         this.init();
    }
    init() {
         this.construirSelect();
    }

    construirSelect(){
        cotizador.obtenerMonedasAPI()
            .then(monedas => {

                //Crear un SElect de opciones
                const select = document.querySelector('#criptomoneda');

                for(const [ key, value] of Object.entries(monedas.monedas.Data)){
                    //Añadir simbol y el nombre como opciones 

                    const opcion = document.createElement('option');
                    opcion.value= value.Symbol;
                    opcion.appendChild(document.createTextNode(value.CoinName));
                    select.appendChild(opcion);
                }
            });
    }


    mostrarMensaje(mensaje, clases){
        const div= document.createElement('div');
        div.className = clases;
        div.appendChild(document.createTextNode(mensaje));

        //Seleccionar mensaje
        const divMensaje = document.querySelector('.mensajes');
        divMensaje.appendChild(div);


        //Mostrar contenido
        setTimeout(() => {
            document.querySelector('.mensajes div').remove();
        }, 2000);
    }

    //Imprime el resultado de la cotisacion de criptomoneda que le pasemos

    mostrarResultado(resultado, moneda, crypto){
    
        const resultadoAnterior = document.querySelector('#resultado > div');

        if (resultadoAnterior){
            resultadoAnterior.remove();
        }
   

        const datosMoneda = resultado[crypto][moneda];
        let precio = datosMoneda.PRICE.toFixed(3);
        let variacion = datosMoneda.CHANGEPCTDAY.toFixed(3);
        let actualizacion = new Date(datosMoneda.LASTUPDATE * 1000).toLocaleDateString('es-AR');

        //Construir el template
        let templateHTML = `
            <div class="card bg-warning">
                <div class="card-body  text-light">
                    <h2 class="card-title ">Resultado: </h2>
                    <p> El precio de ${datosMoneda.FROMSYMBOL} a moneda ${datosMoneda.TOSYMBOL} es de : $ ${precio}</p>
                    <p> Variacion del ultimo dia:  ${variacion} %</p>
                    <p>Ultima actualizacion : ${actualizacion}</p>
                </div>
            </div>
        `;

        this.mostrarSpinner('block');

        setTimeout(() => {
            // INsertar el resultado
            document.querySelector('#resultado').innerHTML = templateHTML;

            this.mostrarSpinner('none');
        }, 1500);

    }


    //mostrar spiner al apretar boton de usqueda
    mostrarSpinner(vista){
        const spinner = document.querySelector('.contenido-spinner');
        spinner.style.display  = vista;

    }
}