

const cotizador = new API('2d27a5ef181ac2d1dd5c54f38936403693ae715ac904d3d4b627bede76625a50');
const ui = new Interfaz();

//leer el formulario para validar

const formulario = document.querySelector('#formulario');

formulario.addEventListener('submit',(e)=>{
    e.preventDefault();

    //leer la moneda selecionada
    const monedaSelect = document.querySelector('#moneda');
    const monedaSeleccionada = monedaSelect.options[monedaSelect.selectedIndex].value;


    //leer la criptomoneda selecionada
    const criptoMonedaSelect = document.querySelector('#criptomoneda');
    const criptoMonedaSeleccionada = criptoMonedaSelect.options[criptoMonedaSelect.selectedIndex].value;

    //validar que alla sellecionado de ambos options

    if(monedaSeleccionada === '' || criptoMonedaSeleccionada === ''){
        //arrojar alerta de error
        ui.mostrarMensaje('Ambos campos son obligatorios', 'alert bg-danger text-center');
    } else {
        //consultar Api
        cotizador.obtenerValores(monedaSeleccionada, criptoMonedaSeleccionada)
            .then(data => {
                ui.mostrarResultado(data.resultado.RAW, monedaSeleccionada, criptoMonedaSeleccionada );
            } )
    }


    console.log(criptoMonedaSeleccionada);
    console.log(monedaSeleccionada);

})