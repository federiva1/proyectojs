// Asociación marca y modelo

const inputMarca = document.getElementById('Marca_del_vehiculo');
const inputModelo = document.getElementById('Modelo_del_vehiculo');
const datalistModelos = document.getElementById('lista_modelos');

const modelosPorMarca = {
    'Audi': ['A1', 'A3', 'A4', 'A6', 'Q3', 'Q5', 'Q7'],
    'BMW': ['Serie 1', 'Serie 3', 'Serie 5', 'Serie 7', 'X1', 'X3', 'X5'],
    'Chevrolet': ['Spark', 'Sail', 'Cruze', 'Sonic', 'Captiva', 'Trax'],
    'Ford': ['Fiesta', 'Focus', 'Fusion', 'Escape', 'Explorer', 'Edge'],
    'Honda': ['Fit', 'City', 'Civic', 'Accord', 'CR-V', 'HR-V', 'Pilot']
};

function llenarListaModelos() {
    const marcaSeleccionada = inputMarca.value;
    const modelos = modelosPorMarca[marcaSeleccionada];
    datalistModelos.innerHTML = '';
    modelos.forEach(function (modelo) {
        const option = document.createElement('option');
        option.value = modelo;
        datalistModelos.appendChild(option);
    });
}

inputMarca.addEventListener('change', llenarListaModelos);

//------------------------------------------------------------------------------- 
//Guardo los datos del vehículo en el array



//Ingreso de datos//

let Datos_vehiculo = [];

const btnCotizar = document.getElementById("BotonDeCotizacion");

function Cotizar() {
    let edad = document.getElementById("Ano_del_vehiculo");
    let marca = document.getElementById("Marca_del_vehiculo");
    let modelo = document.getElementById("Modelo_del_vehiculo");
    let precio = document.getElementById("Valor_vehiculo");
    let uso = document.getElementById("Uso_vehiculo");
    let CP = document.getElementById("Codigo_postal_vehiculo");
    if (!edad.value || !marca.value || !modelo.value || !precio.value || !uso.value || !CP.value) {

        Toastify({
            text: "Faltan completar datos",
            backgroundColor: "red"
        }).showToast();;
        return;
    }


    //Vuevlve al formulario si quedó incompleto//

    let DatosGenerales = { Año: edad.value, Marca: marca.value, Modelo: modelo.value, Valor: precio.value, Uso: uso.value, CP: CP.value };

    Datos_vehiculo.push(DatosGenerales);

    let arreglos_JSON = JSON.stringify(Datos_vehiculo);

    localStorage.setItem("Datos_vehiculo", arreglos_JSON);
    //Cotizacion//


    let datos = document.getElementById("datos");


    datos.innerHTML = `<div class="text-center my-4">
    <h1 class="ColorLetra">Podemos ofrecerte los siguientes planes</h1>
</div>
<section class="d-flex flex-wrap" id="fede"></section>
`

    let productosAuto;


    fetch("/Productos/ProductosAuto.json")
        .then(response => response.json())
        .then(data => {
            productosAuto = data;

            for (const [index, producto] of productosAuto.entries()) {
                if (producto.Antiguedad <= edad.value) {
                    // Div contenedor
                    const container = document.createElement("div");
                    container.classList.add("container", "d-flex", "justify-content-center");

                    // tarjetita
                    const card = document.createElement("div");
                    card.classList.add("card", "mb-3", "mx-auto", "Tarjetas");
                    card.style.width = "18rem";
                    const body = document.createElement("div");
                    body.classList.add("card-body", "TarjetasTecho");
                    const title = document.createElement("h5");
                    title.classList.add("card-title");
                    title.textContent = producto.Paquete;
                    body.appendChild(title);

                    // Valor Cuota
                    const cuota = document.createElement("p");
                    cuota.classList.add("card-text");
                    cuota.textContent = "Cuota de $" + parseFloat(producto.Coeficiente) * precio.value;
                    body.appendChild(cuota);
                    const lista = document.createElement("ul");
                    lista.classList.add("list-group", "list-group-flush");
                    const item = document.createElement("li");
                    item.classList.add("list-group-item");
                    item.textContent = producto.Coberturas;
                    lista.appendChild(item);


                    card.appendChild(body);
                    card.appendChild(lista);

                    // Boton
                    const button = document.createElement("button");
                    button.classList.add("btn", "btn-primary", "btn-lg", "px-4");
                    button.type = "button";
                    button.textContent = "Contratar";
                    button.setAttribute("id", `btn-contratar-${index}`);
                    card.appendChild(button);
                    button.addEventListener("click", (event) => {
                        const buttonId = event.target.id;
                        const index = buttonId.split("-")[2];
                        const productoContratado = productosAuto[index];
                        Contratar(productoContratado); //
                    });


                    container.appendChild(card);
                    const targetElement = document.querySelector("#fede");
                    targetElement.appendChild(container);
                } else {
                    console.log("no aplica");
                }
            }

        });


}

btnCotizar.addEventListener("click", Cotizar);


/*
function Contratar() {

    const btnContratar = document.querySelectorAll(".btn-contratar");
    btnContratar.forEach((button, index) => {
        button.addEventListener("click", () => {
            Contratar(`btn-contratar-${index}`);
        });
    });

    let datos = document.getElementById("datos");


    datos.innerHTML = `<div id="datos">
    <div class="container form-container">
        <div class="text-center my-4">
            <h1 class="ColorLetra">Completa los datos del vehiculo</h1>
        </div>
        <form>
        <div class="col">
        <div class="col-md-6 form-group CamposFormulario text-center my-4 mx-auto">
            <input type="tel" class="form-control" placeholder="Patente" id="Patente_del_vehiculo" list="lista_Patente">
            
        </div>
    </div>
            <div class="row">
                <div class="col-md-6 form-group CamposFormulario">
                    <input type="tel" class="form-control" placeholder="Chasis" id="Chasis_del_vehiculo"
                        list="lista_Chasis">
                    
                </div>
                <div class="col-md-6 form-group CamposFormulario">
                    <input type="tel" class="form-control" placeholder="Motor" id="Motor_del_vehiculo" list="lista_Motor">
                
                </div>
            </div>
            
            <div class="text-center my-4">
            <button type="button" class="btn btn-primary btn-lg px-4 " id="btnSiguiente"> SIGUIENTE </button>
        </div>`
        document.getElementById("btnSiguiente").addEventListener("click", validarDatos);

        function validarDatos() {
            let Patente = document.getElementById("Patente_del_vehiculo");
            let Chasis = document.getElementById("Chasis_del_vehiculo");
            let Motor = document.getElementById("Motor_del_vehiculo");
        
            if (!Patente.value || !Chasis.value || !Motor.value) {
                Toastify({
                    text: "Faltan completar datos",
                    backgroundColor: "red"
                }).showToast();
                return;
            }
        
          
            datos.innerHTML = `<div id="datos">
                <div class="container form-container">
                    <div class="text-center my-4">
                        <h1 class="ColorLetra">Elegi el medio de pago</h1>
                    </div>
                    <form>
                        <div class="col">
                            <div class="col-md-6 form-group CamposFormulario text-center my-4 mx-auto">
                                <input type="tel" class="form-control" placeholder="Elegi tu medio de pago" id="MDP" list="lista_MDP">
                            </div>
                        </div>
                    </form>
                </div>
            </div>`;
        }
        

    }*/

function Contratar() {

    const btnContratar = document.querySelectorAll(".btn-contratar");
    btnContratar.forEach((button, index) => {
        button.addEventListener("click", () => {
            Contratar(`btn-contratar-${index}`);
        });
    });

    let datos = document.getElementById("datos");

    datos.innerHTML = `<div id="datos">
            <div class="container form-container">
                <div class="text-center my-4">
                    <h1 class="ColorLetra">Completa los datos del vehiculo</h1>
                </div>
                <form>
                    <div class="col">
                        <div class="col-md-6 form-group CamposFormulario text-center my-4 mx-auto">
                            <input type="tel" class="form-control" placeholder="Patente" id="Patente_del_vehiculo" list="lista_Patente">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 form-group CamposFormulario">
                            <input type="tel" class="form-control" placeholder="Chasis" id="Chasis_del_vehiculo" list="lista_Chasis">
                        </div>
                        <div class="col-md-6 form-group CamposFormulario">
                            <input type="tel" class="form-control" placeholder="Motor" id="Motor_del_vehiculo" list="lista_Motor">
                        </div>
                    </div>
                    <div class="text-center my-4">
                        <button type="button" class="btn btn-primary btn-lg px-4 " id="btnSiguiente">SIGUIENTE</button>
                    </div>
                </form>
            </div>
        </div>`;

    document.getElementById("btnSiguiente").addEventListener("click", validarDatos);

    function validarDatos() {
        let Patente = document.getElementById("Patente_del_vehiculo");
        let Chasis = document.getElementById("Chasis_del_vehiculo");
        let Motor = document.getElementById("Motor_del_vehiculo");

        if (!Patente.value || !Chasis.value || !Motor.value) {
            Toastify({
                text: "Faltan completar datos",
                backgroundColor: "red"
            }).showToast();
            return;
        }

        datos.innerHTML = `<div id="datos">
          <div class="container form-container">
            <div class="text-center my-4">
              <h1 class="ColorLetra">Elegi el medio de pago</h1>
            </div>
            <form>
              <div class="col">
                <div class="col-md-6 form-group CamposFormulario text-center my-4 mx-auto">
                  <select class="form-select" aria-label="Selecciona el medio de pago" id="MDP">
                    <option value="" selected>Selecciona el medio de pago</option>
                    <option value="efectivo">Efectivo</option>
                    <option value="cbu">CBU</option>
                    <option value="tarjeta">Tarjeta de crédito</option>
                  </select>
                </div>
              </div>
              <div id="datos-pago"></div>
              <div class="text-center my-4">
                <button type="button" class="btn btn-primary btn-lg px-4" id="btnFinalizar">FINALIZAR</button>
              </div>
            </form>
          </div>
        </div>`;

        let MedioDePago = document.getElementById("MDP");
        MedioDePago.addEventListener("change", () => {
            let datosPago = document.getElementById("datos-pago");
            switch (MedioDePago.value) {
                case "cbu":
                    datosPago.innerHTML = `<div class="row">
                <div class="text-center my-4">
                  <input type="text" class="form-control" placeholder="NRO CBU" id="CBU">
                </div>
              </div>`;
                    break;
                case "tarjeta":
                    datosPago.innerHTML = `<div class="row">
                <div class="col-md-6 form-group CamposFormulario">
                  <input type="text" class="form-control" placeholder="Nombre del titular" id="Nombre_titular">
                </div>
                <div class="col-md-6 form-group CamposFormulario">
                  <input type="tel" class="form-control" placeholder="Número de tarjeta" id="Numero_tarjeta">
                </div>
              </div>
              <div class="row">
                <div class="col-md-6 form-group CamposFormulario">
                  <input type="text" class="form-control" placeholder="Fecha de vencimiento (MM/AA)" id="Fecha_vencimiento">
                  </div>
                  <div class="col-md-6 form-group CamposFormulario">
                  <input type="tel" class="form-control" placeholder="Código de seguridad" id="Codigo_seguridad">
                  </div>
                  </div>`;
                    break;
                default:
                    datosPago.innerHTML = "";
                    break;
            }
        });

        let btnFinalizar = document.getElementById("btnFinalizar");
        btnFinalizar.addEventListener("click", () => {
            let datosPago = document.getElementById("datos-pago");
            let nombre_pagador = "";
            let cbu = "";
            let nombre_titular = "";
            let numero_tarjeta = "";
            let fecha_vencimiento = "";
            let codigo_seguridad = "";

            switch (MedioDePago.value) {
                case "cbu":
                    datosPago.innerHTML = `<div class="row">
                        <div class="text-center my-4">
                            <input type="text" class="form-control" placeholder="NRO CBU" id="CBU">
                        </div>
                    </div>`;
                    break;
                case "tarjeta":
                    datosPago.innerHTML = `<div class="row">
                        <div class="col-md-6 form-group CamposFormulario">
                            <input type="text" class="form-control" placeholder="Nombre del titular" id="Nombre_titular">
                        </div>
                        <div class="col-md-6 form-group CamposFormulario">
                            <input type="tel" class="form-control" placeholder="Número de tarjeta" id="Numero_tarjeta">
                        </div>
                    </div>
                    <div class="row">
                        <div class="col-md-6 form-group CamposFormulario">
                            <input type="text" class="form-control" placeholder="Fecha de vencimiento (MM/AA)" id="Fecha_vencimiento">
                        </div>
                        <div class="col-md-6 form-group CamposFormulario">
                            <input type="tel" class="form-control" placeholder="Código de seguridad" id="Codigo_seguridad">
                        </div>
                    </div>`;
                    break;
                default:
                    datosPago.innerHTML = "";
                    break;
            }
            
            // Agrega una validación adicional para los datos de CBU o tarjeta de crédito
            if (MedioDePago.value === "cbu" && !document.getElementById("CBU").value) {
                Toastify({
                    text: "Faltan completar datos",
                    backgroundColor: "red"
                }).showToast();
                return;
            } else if (MedioDePago.value === "tarjeta" && (!document.getElementById("Nombre_titular").value || !document.getElementById("Numero_tarjeta").value || !document.getElementById("Fecha_vencimiento").value || !document.getElementById("Codigo_seguridad").value)) {
                Toastify({
                    text: "Faltan completar datos",
                    backgroundColor: "red"
                }).showToast();
                return;
            }
            // Envío de datos a la API
            // ...

            Toastify({
                text: "¡Gracias por su compra!",
                backgroundColor: "green"
            }).showToast();

        });
    }

}


