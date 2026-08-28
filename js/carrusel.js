let imagenesCarrusel = [];
let indiceCarrusel = 0;
let tituloCarrusel = "Proyecto";
let inicioDeslizamiento = 0;

const modalCarrusel = document.getElementById("modal-imagen");
const imagenModal = document.getElementById("imagen-modal");
const botonAnterior = document.getElementById("carrusel-anterior");
const botonSiguiente = document.getElementById("carrusel-siguiente");
const contadorCarrusel = document.getElementById("contador-carrusel");
const indicadoresCarrusel = document.getElementById("indicadores-carrusel");

function abrirModal(imagenes, titulo = "Proyecto") {
  imagenesCarrusel = Array.isArray(imagenes) ? imagenes : [imagenes];
  indiceCarrusel = 0;
  tituloCarrusel = titulo;

  crearIndicadores();
  actualizarCarrusel();

  modalCarrusel.classList.add("activo");
  document.body.classList.add("modal-abierto");
  modalCarrusel.querySelector(".cerrar-modal").focus();
}

function cerrarModal() {
  modalCarrusel.classList.remove("activo");
  document.body.classList.remove("modal-abierto");
}

function cambiarImagen(direccion) {
  if (imagenesCarrusel.length < 2) return;
  indiceCarrusel = (indiceCarrusel + direccion + imagenesCarrusel.length) % imagenesCarrusel.length;
  actualizarCarrusel();
}

function irAImagen(indice) {
  indiceCarrusel = indice;
  actualizarCarrusel();
}

function actualizarCarrusel() {
  imagenModal.classList.add("cambiando");
  imagenModal.src = imagenesCarrusel[indiceCarrusel];
  imagenModal.alt = `${tituloCarrusel}, imagen ${indiceCarrusel + 1} de ${imagenesCarrusel.length}`;
  contadorCarrusel.textContent = `${indiceCarrusel + 1} / ${imagenesCarrusel.length}`;

  const tieneVariasImagenes = imagenesCarrusel.length > 1;
  botonAnterior.hidden = !tieneVariasImagenes;
  botonSiguiente.hidden = !tieneVariasImagenes;
  contadorCarrusel.hidden = !tieneVariasImagenes;
  indicadoresCarrusel.hidden = !tieneVariasImagenes;

  indicadoresCarrusel.querySelectorAll("button").forEach((indicador, indice) => {
    const estaActivo = indice === indiceCarrusel;
    indicador.classList.toggle("activo", estaActivo);
    indicador.setAttribute("aria-current", estaActivo ? "true" : "false");
  });
}

function crearIndicadores() {
  indicadoresCarrusel.innerHTML = "";

  imagenesCarrusel.forEach((_, indice) => {
    const indicador = document.createElement("button");
    indicador.type = "button";
    indicador.setAttribute("aria-label", `Ver imagen ${indice + 1}`);
    indicador.addEventListener("click", () => irAImagen(indice));
    indicadoresCarrusel.appendChild(indicador);
  });
}

imagenModal.addEventListener("load", () => imagenModal.classList.remove("cambiando"));

modalCarrusel.addEventListener("click", (evento) => {
  if (evento.target === modalCarrusel) cerrarModal();
});

document.addEventListener("keydown", (evento) => {
  if (!modalCarrusel.classList.contains("activo")) return;

  if (evento.key === "Escape") cerrarModal();
  if (evento.key === "ArrowLeft") cambiarImagen(-1);
  if (evento.key === "ArrowRight") cambiarImagen(1);
});

imagenModal.addEventListener("touchstart", (evento) => {
  inicioDeslizamiento = evento.changedTouches[0].clientX;
}, { passive: true });

imagenModal.addEventListener("touchend", (evento) => {
  const distancia = evento.changedTouches[0].clientX - inicioDeslizamiento;
  if (Math.abs(distancia) < 45) return;
  cambiarImagen(distancia > 0 ? -1 : 1);
}, { passive: true });
