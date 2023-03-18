let Seccion = [];

const btnAuto = document.getElementById("BotonAuto");
const btnMoto = document.getElementById("BotonMoto");

function agregarUsuario(evento) {
  const ramo = evento.target.id === "BotonAuto" ? "Auto" : "Moto";
  const usuario = { ramo };
  Seccion.push(usuario);
  localStorage.setItem("Seccion", JSON.stringify(Seccion));
}

btnAuto.addEventListener("click", agregarUsuario);
btnMoto.addEventListener("click", agregarUsuario);




Toastify({
  text: "Bienvenido a Rivadeneira Seguros",
}).showToast();

