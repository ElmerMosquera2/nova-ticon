// -- JavaScript funcional para la sección Nosotros --
document.addEventListener('DOMContentLoaded', function() {
  // Variables del navbar
  const burger = document.getElementById('burger');
  const navLinks = document.querySelectorAll('.nav-links a');
  const sections = document.querySelectorAll('section[id]');
  
  // Función para ocultar todas las secciones
  function ocultarSecciones() {
    sections.forEach(section => {
      section.style.display = 'none';
    });
  }
  
  // Función para mostrar una sección
  function mostrarSeccion(id) {
    ocultarSecciones();
    const seccion = document.getElementById(id);
    if (seccion) {
      seccion.style.display = 'block';
    }
  }
  
  // Eventos para el navbar
  navLinks.forEach(link => {
    link.addEventListener('click', function(e) {
      e.preventDefault();
      const id = link.getAttribute('href').substring(1);
      mostrarSeccion(id);
      
      // Actualizar clase activa
      navLinks.forEach(l => l.classList.remove('activo'));
      link.classList.add('activo');
    });
  });
  
  // Menú móvil
  burger.addEventListener('click', function() {
    const enlaces = document.querySelector('.nav-links');
    enlaces.classList.toggle('abierto');
    this.setAttribute('aria-expanded', enlaces.classList.contains('abierto'));
  });
  
  // Cerrar menú al hacer clic en un enlace
  document.querySelector('.nav-links').addEventListener('click', function(e) {
    if (e.target.tagName === 'A') {
      const enlaces = document.querySelector('.nav-links');
      enlaces.classList.remove('abierto');
      burger.setAttribute('aria-expanded', 'false');
    }
  });
  
  // Mostrar sección de inicio por defecto
  mostrarSeccion('inicio');
  
  // Botones funcionalitos en la sección Nosotros
  const btnParticipar = document.querySelector('.btn.lima');
  if (btnParticipar) {
    btnParticipar.addEventListener('click', function(e) {
      e.preventDefault();
      // Animación de clic
      this.style.transform = 'scale(0.95)';
      setTimeout(() => {
        this.style.transform = '';
      }, 200);
      
      // Mostrar mensaje
      const mensaje = document.createElement('div');
      mensaje.style.position = 'fixed';
      mensaje.style.top = '20px';
      mensaje.style.right = '20px';
      mensaje.style.background = var(--verde);
      mensaje.style.color = '#fff';
      mensaje.style.padding = '16px 24px';
      mensaje.style.borderRadius = '8px';
      mensaje.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
      mensaje.style.zIndex = '9999';
      mensaje.textContent = '¡Gracias por tu interés! Te contactaremos pronto.';
      document.body.appendChild(mensaje);
      
      setTimeout(() => {
        mensaje.remove();
      }, 3000);
    });
  }
  
  // Contador animado para estadísticas
  const cifras = document.querySelectorAll('.cifra b');
  if (cifras.length > 0) {
    // Ya no usamos IntersectionObserver complejo, solo hacemos contador simple
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const target = parseInt(entry.target.textContent);
          let current = 0;
          const duration = 1500;
          const startTime = performance.now();
          
          function animateCounter(currentTime) {
            const elapsed = currentTime - startTime;
            const progress = Math.min(elapsed / duration, 1);
            // Easing cubic-out
            const easeOut = 1 - Math.pow(1 - progress, 3);
            current = Math.floor(target * easeOut);
            entry.target.textContent = current;
            
            if (progress < 1) {
              requestAnimationFrame(animateCounter);
            }
          }
          
          requestAnimationFrame(animateCounter);
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.5 });
    
    cifras.forEach(cifra => observer.observe(cifra));
  }
  
  // Efecto parallax sutil en el hero
  const mascota = document.querySelector('.mascota');
  if (mascota) {
    document.addEventListener('mousemove', (e) => {
      const x = e.clientX / window.innerWidth - 0.5;
      const y = e.clientY / window.innerHeight - 0.5;
      if (mascota) {
        mascota.style.transform = `translate(${y * 10}px, ${x * 10}px)`;
      }
    });
  }
});