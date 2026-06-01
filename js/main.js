// ============================================
// Nabeel Hamoui Urology - Main JavaScript
// ============================================

document.addEventListener('DOMContentLoaded', () => {

  // ---- Sticky header on scroll ----
  const header = document.querySelector('.header');
  if (header) {
    const onScroll = () => {
      header.classList.toggle('scrolled', window.scrollY > 40);
    };
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  // ---- Mobile hamburger menu ----
  const hamburger = document.querySelector('.hamburger, .mobile-menu-btn');
  const mobileMenu = document.querySelector('.mobile-menu');

  if (hamburger && mobileMenu) {
    hamburger.addEventListener('click', () => {
      const isOpen = hamburger.classList.toggle('open');
      mobileMenu.classList.toggle('open', isOpen);
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    // Close on link click
    mobileMenu.querySelectorAll('a').forEach(link => {
      link.addEventListener('click', () => {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      });
    });

    // Close on outside click
    document.addEventListener('click', (e) => {
      if (!header.contains(e.target) && !mobileMenu.contains(e.target)) {
        hamburger.classList.remove('open');
        mobileMenu.classList.remove('open');
        document.body.style.overflow = '';
      }
    });
  }

  // ---- Active nav link ----
  const currentPath = window.location.pathname.split('/').pop() || 'index.html';
  document.querySelectorAll('.nav__link').forEach(link => {
    const href = link.getAttribute('href');
    if (href === currentPath || (currentPath === '' && href === 'index.html')) {
      link.classList.add('active');
    }
  });

  // ---- Scroll-in animations ----
  const animEls = document.querySelectorAll('.service-card, .service-full-card, .feature-card, .credential, .affiliation-card, .procedure-item, .edu-item');

  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.style.opacity = '1';
          entry.target.style.transform = 'translateY(0)';
          observer.unobserve(entry.target);
        }
      });
    }, { threshold: 0.08, rootMargin: '0px 0px -30px 0px' });

    animEls.forEach((el, i) => {
      el.style.opacity = '0';
      el.style.transform = 'translateY(20px)';
      el.style.transition = `opacity 0.5s ease ${i * 0.05}s, transform 0.5s ease ${i * 0.05}s`;
      observer.observe(el);
    });
  }

  // ---- Contact form — async Formspree submission ----
  const form = document.getElementById('contactForm');
  const formWrapper = document.getElementById('formWrapper');
  const formConfirmation = document.getElementById('formConfirmation');
  const formError = document.getElementById('formError');

  if (form) {
    form.addEventListener('submit', async (e) => {
      e.preventDefault();

      const btn = form.querySelector('button[type="submit"]');
      const originalHTML = btn.innerHTML;

      btn.disabled = true;
      btn.textContent = 'Sending…';
      if (formError) formError.hidden = true;

      try {
        const res = await fetch('https://formspree.io/f/xlgvygwe', {
          method: 'POST',
          body: new FormData(form),
          headers: { 'Accept': 'application/json' },
        });

        if (!res.ok) throw new Error('server');

        if (formWrapper) formWrapper.hidden = true;
        if (formConfirmation) formConfirmation.hidden = false;
      } catch {
        btn.disabled = false;
        btn.innerHTML = originalHTML;
        if (formError) formError.hidden = false;
      }
    });
  }

  // ---- Mobile conditions accordion ----
  const condToggle = document.getElementById('mobileConditionsToggle');
  const condBody   = document.getElementById('mobileConditionsBody');
  if (condToggle && condBody) {
    condToggle.addEventListener('click', () => {
      const isOpen = condToggle.classList.toggle('open');
      condBody.classList.toggle('open', isOpen);
    });
  }

  // ---- Mobile procedures accordion ----
  const procToggle = document.getElementById('mobileProceduresToggle');
  const procBody   = document.getElementById('mobileProceduresBody');
  if (procToggle && procBody) {
    procToggle.addEventListener('click', () => {
      const isOpen = procToggle.classList.toggle('open');
      procBody.classList.toggle('open', isOpen);
    });
  }

  // ---- Smooth anchor scrolling ----
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', (e) => {
      const target = document.querySelector(anchor.getAttribute('href'));
      if (target) {
        e.preventDefault();
        target.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
    });
  });

});
