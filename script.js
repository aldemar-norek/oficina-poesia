// ===========================
// NAVBAR: scroll effect + mobile toggle
// ===========================
const navbar = document.getElementById('navbar');
const navToggle = document.getElementById('navToggle');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

navToggle.addEventListener('click', () => {
  navLinks.classList.toggle('open');
  const isOpen = navLinks.classList.contains('open');
  navToggle.setAttribute('aria-expanded', isOpen);
  // Animate hamburger to X
  const spans = navToggle.querySelectorAll('span');
  if (isOpen) {
    spans[0].style.transform = 'translateY(7px) rotate(45deg)';
    spans[1].style.opacity = '0';
    spans[2].style.transform = 'translateY(-7px) rotate(-45deg)';
  } else {
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  }
});

// Close mobile menu on link click
navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => {
    navLinks.classList.remove('open');
    const spans = navToggle.querySelectorAll('span');
    spans[0].style.transform = '';
    spans[1].style.opacity = '';
    spans[2].style.transform = '';
  });
});

// ===========================
// STICKY BAR: show after hero
// ===========================
const stickyBar = document.getElementById('stickyBar');
const hero = document.getElementById('hero');

const stickyObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (!entry.isIntersecting) {
      stickyBar.classList.add('visible');
    } else {
      stickyBar.classList.remove('visible');
    }
  });
}, { threshold: 0.1 });

if (hero) stickyObserver.observe(hero);

// ===========================
// FAQ ACCORDION
// ===========================
document.querySelectorAll('.faq-question').forEach(button => {
  button.addEventListener('click', () => {
    const isExpanded = button.getAttribute('aria-expanded') === 'true';
    const answer = button.nextElementSibling;

    // Close all others
    document.querySelectorAll('.faq-question').forEach(btn => {
      btn.setAttribute('aria-expanded', 'false');
      btn.nextElementSibling.classList.remove('open');
    });

    // Toggle current
    if (!isExpanded) {
      button.setAttribute('aria-expanded', 'true');
      answer.classList.add('open');
    }
  });
});

// ===========================
// CURRÍCULO ACCORDION
// ===========================
const curriculoToggle = document.getElementById('curriculoToggle');
const curriculoContent = document.getElementById('curriculoContent');

if (curriculoToggle && curriculoContent) {
  curriculoToggle.addEventListener('click', () => {
    const isExpanded = curriculoToggle.getAttribute('aria-expanded') === 'true';
    curriculoToggle.setAttribute('aria-expanded', !isExpanded);
    curriculoContent.classList.toggle('open', !isExpanded);
  });
}

// ===========================
// FADE-IN ON SCROLL
// ===========================
const fadeEls = document.querySelectorAll(
  '.pilar-card, .depoimento-card, .perfil-card, .faq-item, .livro-card, .antologia-bloco, .autoridade-bloco'
);

fadeEls.forEach(el => el.classList.add('fade-in'));

const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

fadeEls.forEach(el => fadeObserver.observe(el));

// ===========================
// SMOOTH SCROLL for anchor links
// ===========================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    const href = this.getAttribute('href');
    if (href === '#') return;
    const target = document.querySelector(href);
    if (target) {
      e.preventDefault();
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});
