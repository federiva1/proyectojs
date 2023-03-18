let Datos_vehiculo = [];



const btnCotizar = document.getElementById("BotonDeCotizacion");

function Cotizar() {
    let edad = document.getElementById("Ano_del_vehiculo");
    let marca = document.getElementById("Marca_del_vehiculo");
    let modelo = document.getElementById("Modelo_del_vehiculo");
    let precio = document.getElementById("Valor_vehiculo");
    let uso = document.getElementById("Uso_vehiculo");
    let CP = document.getElementById("Codigo_postal_vehiculo");


    let DatosGenerales = { Año: edad.value, Marca: marca.value, Modelo: modelo.value, Valor: precio.value, Uso: uso.value, CP: CP.value };

    Datos_vehiculo.push(DatosGenerales);

    let arreglos_JSON = JSON.stringify(Datos_vehiculo);

    localStorage.setItem("Datos_vehiculo", arreglos_JSON);

    let valor_basico = precio.value * 0.02;
    let Premium = precio.value * 0.08

    let datos = document.getElementById("datos");

    datos.innerHTML = `<div class="text-center my-4">
    <h1 class="ColorLetra">Podemos ofrecerte los siguientes planes</h1>
</div>

<section>
    <div class="container d-flex justify-content-center">
        <div class="card mb-3 mx-auto Tarjetas" style="width: 18rem;">
            <div class="card-body TarjetasTecho">
                <h5 class="card-title ">Plan Basico</h5>
                <p class="card-text">Cuota de $${valor_basico} por mes</p>
            </div>
            <ul class="list-group list-group-flush">
                <br>
                <br>
                <li class="list-group-item">Responsabilidad civil por daños a terceros</li>
                <br>
                <li class="list-group-item">Responsabilidad civil por muerte de terceros</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-primary btn-lg px-4 "> Contratar </button>

            </div>
        </div>
        <div class="card mb-3 mx-auto Tarjetas" style="width: 18rem;">
            <div class="card-body TarjetasTecho">
                <h5 class="card-title ">Plan Premium</h5>
                <p class="card-text">Cuota de $${Premium} por mes</p>
            </div>
            <ul class="list-group list-group-flush">
                <br>
                <li class="list-group-item">Robo e incendio del vehiculo</li>
                <br>
                <li class="list-group-item">Responsabilidad civil por daños a terceros</li>
                <br>
                <li class="list-group-item">Responsabilidad civil por muerte de terceros</li>
            </ul>
            <div class="card-body">
                <button type="button" class="btn btn-primary btn-lg px-4 "> Contratar </button>

            </div>
        </div>
    </div>
</section>`


}

btnCotizar.addEventListener("click", Cotizar);
