(function () {
  'use strict';

  const header = document.getElementById('header');
  const nav = document.getElementById('nav');
  const menuToggle = document.getElementById('menuToggle');
  const navLinks = document.querySelectorAll('.nav-link');
  const reveals = document.querySelectorAll('.reveal');
  const contactForm = document.getElementById('contactForm');
  const formNote = document.getElementById('formNote');
  const yearEl = document.getElementById('year');

  if (yearEl) {
    yearEl.textContent = new Date().getFullYear();
  }

  function onScroll() {
    if (window.scrollY > 40) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    updateActiveNav();
  }

  function updateActiveNav() {
    const sections = ['home', 'about', 'products', 'values', 'contact'];
    let current = 'home';

    sections.forEach(function (id) {
      const el = document.getElementById(id);
      if (!el) return;
      const rect = el.getBoundingClientRect();
      if (rect.top <= 120) {
        current = id;
      }
    });

    navLinks.forEach(function (link) {
      const href = link.getAttribute('href');
      link.classList.toggle('active', href === '#' + current);
    });
  }

  function closeMenu() {
    nav.classList.remove('open');
    menuToggle.classList.remove('open');
    menuToggle.setAttribute('aria-expanded', 'false');
    menuToggle.setAttribute('aria-label', 'Open menu');
  }

  menuToggle.addEventListener('click', function () {
    const isOpen = nav.classList.toggle('open');
    menuToggle.classList.toggle('open', isOpen);
    menuToggle.setAttribute('aria-expanded', String(isOpen));
    menuToggle.setAttribute('aria-label', isOpen ? 'Close menu' : 'Open menu');
  });

  navLinks.forEach(function (link) {
    link.addEventListener('click', closeMenu);
  });

  const revealObserver = new IntersectionObserver(
    function (entries) {
      entries.forEach(function (entry) {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          revealObserver.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
  );

  reveals.forEach(function (el, i) {
    el.style.transitionDelay = (i % 4) * 0.08 + 's';
    revealObserver.observe(el);
  });

  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const name = document.getElementById('name').value.trim();
    const email = document.getElementById('email').value.trim();
    const message = document.getElementById('message').value.trim();

    const subject = encodeURIComponent('[Website Inquiry] ' + name);
    const body = encodeURIComponent(
      'Name: ' + name + '\nEmail: ' + email + '\n\nMessage:\n' + message
    );

    window.location.href =
      'mailto:MollGrissel@gmail.com?subject=' + subject + '&body=' + body;

    formNote.textContent = 'Opening your email client—please confirm to send…';
    formNote.className = 'form-note success';

    setTimeout(function () {
      contactForm.reset();
      formNote.textContent = 'If it did not open automatically, please email MollGrissel@gmail.com directly.';
    }, 2000);
  });

  window.addEventListener('scroll', onScroll, { passive: true });
  onScroll();
})();
