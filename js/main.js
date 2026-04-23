/* =========================================================
   Fitness Boss - small interactive layer
   ========================================================= */

// Sticky navbar
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  navbar.classList.toggle('scrolled', window.scrollY > 30);
});

// Mobile hamburger
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');
hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
});
navLinks.querySelectorAll('a').forEach(a => {
  a.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
  });
});

// Scroll reveal animations using IntersectionObserver
const revealEls = document.querySelectorAll('.reveal, .reveal-left, .reveal-right');
const io = new IntersectionObserver((entries) => {
  entries.forEach(e => {
    if (e.isIntersecting) {
      e.target.classList.add('in-view');
      io.unobserve(e.target);
    }
  });
}, { threshold: 0.12 });
revealEls.forEach(el => io.observe(el));

// Trigger hero reveal immediately
window.addEventListener('load', () => {
  document.querySelectorAll('.hero .reveal').forEach(el => el.classList.add('in-view'));
});

// Service cards: 3D tilt that follows the mouse
document.querySelectorAll('.service-card').forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -10;
    const ry = ((x / r.width) - 0.5) * 12;
    card.style.transform = `translateY(-10px) rotateX(${rx}deg) rotateY(${ry}deg)`;
    card.style.setProperty('--mx', `${(x / r.width) * 100}%`);
    card.style.setProperty('--my', `${(y / r.height) * 100}%`);
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

// Gallery 3D tilt on mouse
document.querySelectorAll('.gallery-item').forEach(item => {
  item.addEventListener('mousemove', (e) => {
    const r = item.getBoundingClientRect();
    const x = e.clientX - r.left;
    const y = e.clientY - r.top;
    const rx = ((y / r.height) - 0.5) * -8;
    const ry = ((x / r.width) - 0.5) * 10;
    item.style.transform = `perspective(900px) rotateX(${rx}deg) rotateY(${ry}deg) translateY(-6px)`;
  });
  item.addEventListener('mouseleave', () => { item.style.transform = ''; });
});

// Testimonials slider
const slidesEl = document.getElementById('slides');
const dotsEl = document.getElementById('dots');
const slideCount = slidesEl.children.length;
let current = 0;
for (let i = 0; i < slideCount; i++) {
  const b = document.createElement('button');
  b.setAttribute('aria-label', 'slide ' + (i + 1));
  b.addEventListener('click', () => goTo(i));
  dotsEl.appendChild(b);
}
function goTo(i) {
  current = (i + slideCount) % slideCount;
  slidesEl.style.transform = `translateX(-${current * 100}%)`;
  dotsEl.querySelectorAll('button').forEach((b, idx) => b.classList.toggle('active', idx === current));
}
goTo(0);
setInterval(() => goTo(current + 1), 6000);
