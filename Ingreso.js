let arr_usarios = [];

function registro_usuario() {

    let nombre_usuario = document.getElementById("nombre");
    let pass_usuario = document.getElementById("pass");


    let usuario = { nombre: nombre_usuario.value, password: pass_usuario.value };


    arr_usarios.push(usuario);


    let arreglo_JSON = JSON.stringify(arr_usarios);

    localStorage.setItem("arr_usuarios", arreglo_JSON);
}


function ingreso_usuario() {

    let arr = localStorage.getItem("arr_usuarios");

    arr = JSON.parse(arr);

    let nombre_usuario = document.getElementById("nombre").value;
    let pass_usuario = document.getElementById("pass").value;
    let Saludo = document.getElementById("Saludo");

    for (let usuario of arr) {

        if (nombre_usuario == usuario.nombre && pass_usuario == usuario.password) {
            Saludo.innerHTML = `<h1 class="display-5 fw-bold ColorRegistro">Bienvenido/a al sistema ${usuario.nombre}</h1>`;
            setTimeout(function () {
                window.location.href = "principal.html";
            }, 3000);
            break;
        }

        else {
            Saludo.innerHTML = `<h1>Usuario no encontrado ${usuario.nombre}</h1>`
        }
        

    }

}


let btn_registro = document.getElementById("btn_registro");
let btn_login = document.getElementById("btn_login");

btn_registro.addEventListener("click", registro_usuario);

btn_login.addEventListener("click", ingreso_usuario);





