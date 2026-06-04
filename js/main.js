const items = document.querySelectorAll('.reveal, .seccion, .bloque-doble, .cta, .pagina-hero, .sobre-mi, .contacto-contenedor');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });
items.forEach((item, index) => {
  item.style.transitionDelay = `${Math.min(index * 0.04, 0.2)}s`;
  observer.observe(item);
});
