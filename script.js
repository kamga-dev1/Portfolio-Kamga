/* script.js – Interactions, thème sombre/clair et formulaire */

document.addEventListener('DOMContentLoaded', () => {
  const toggleBtn = document.getElementById('theme-toggle');
  const body = document.body;
  const currentYearSpan = document.getElementById('current-year');
  const contactForm = document.getElementById('contact-form');
  const formFeedback = document.getElementById('form-feedback');

  // 1. Année dynamique du footer
  if (currentYearSpan) {
    currentYearSpan.textContent = new Date().getFullYear();
  }

  // 2. Gestion du Thème (Dark / Light)
  const setIcon = (isLight) => {
    if (toggleBtn) {
      toggleBtn.innerHTML = isLight 
        ? '<i class="fa-solid fa-sun"></i>' 
        : '<i class="fa-solid fa-moon"></i>';
    }
  };

  const savedTheme = localStorage.getItem('portfolio-theme');
  if (savedTheme === 'light') {
    body.classList.add('light-mode');
    setIcon(true);
  } else {
    body.classList.remove('light-mode');
    setIcon(false);
  }

  if (toggleBtn) {
    toggleBtn.addEventListener('click', () => {
      const isLight = body.classList.toggle('light-mode');
      localStorage.setItem('portfolio-theme', isLight ? 'light' : 'dark');
      setIcon(isLight);
    });
  }

  // 3. Navigation active selon le scroll
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-link');

  const updateActiveNav = () => {
    const scrollY = window.pageYOffset;
    sections.forEach(current => {
      const sectionHeight = current.offsetHeight;
      const sectionTop = current.offsetTop - 120;
      const sectionId = current.getAttribute('id');

      if (scrollY > sectionTop && scrollY <= sectionTop + sectionHeight) {
        navLinks.forEach(link => {
          link.classList.remove('active');
          if (link.getAttribute('href') === `#${sectionId}`) {
            link.classList.add('active');
          }
        });
      }
    });
  };

  window.addEventListener('scroll', updateActiveNav);

  // 4. Gestion du formulaire de contact
  if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
      e.preventDefault();
      const submitBtn = contactForm.querySelector('button[type="submit"]');
      
      if (submitBtn) {
        submitBtn.disabled = true;
        submitBtn.innerHTML = '<i class="fa-solid fa-circle-notch fa-spin"></i> Envoi en cours...';
      }

      setTimeout(() => {
        contactForm.reset();
        if (submitBtn) {
          submitBtn.disabled = false;
          submitBtn.innerHTML = '<span>Envoyer le message</span> <i class="fa-solid fa-paper-plane"></i>';
        }

        if (formFeedback) {
          formFeedback.textContent = '✓ Merci ! Votre message a bien été envoyé.';
          formFeedback.style.color = '#38bdf8';
          setTimeout(() => {
            formFeedback.textContent = '';
          }, 5000);
        }
      }, 900);
    });
  }

  // 5. Galerie interactive pour le projet SubMan
  const submanThumbs = document.querySelectorAll('.subman-thumb');
  const mainPreviewImg = document.getElementById('subman-main-preview');
  const previewCaption = document.getElementById('subman-preview-caption');

  if (submanThumbs.length && mainPreviewImg) {
    submanThumbs.forEach(thumb => {
      thumb.addEventListener('click', () => {
        submanThumbs.forEach(t => t.classList.remove('active'));
        thumb.classList.add('active');

        const newSrc = thumb.getAttribute('data-img');
        const newCaption = thumb.getAttribute('data-caption');

        mainPreviewImg.style.opacity = '0';
        setTimeout(() => {
          mainPreviewImg.src = newSrc;
          mainPreviewImg.style.opacity = '1';
          if (previewCaption && newCaption) {
            previewCaption.textContent = newCaption;
          }
        }, 180);
      });
    });
  }
});

