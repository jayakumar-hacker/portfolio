/* ============================================
   JAYAKUMAR K — PORTFOLIO
   script.js — Interactions & Animations
   ============================================ */

'use strict';

// ===== Navbar Scroll Effect =====
const navbar = document.getElementById('navbar');
const scrollThreshold = 50;

function handleNavbarScroll() {
  if (window.scrollY > scrollThreshold) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
}

window.addEventListener('scroll', handleNavbarScroll, { passive: true });
handleNavbarScroll(); // Run on load

// ===== Hamburger Menu =====
const hamburger = document.getElementById('hamburger');
const navLinks = document.getElementById('navLinks');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('active');
  navLinks.classList.toggle('open');
  document.body.style.overflow = navLinks.classList.contains('open') ? 'hidden' : '';
});

// Close menu when a link is clicked
navLinks.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('active');
    navLinks.classList.remove('open');
    document.body.style.overflow = '';
  });
});

// ===== Smooth Scroll for all anchor links =====
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      e.preventDefault();
      const offsetTop = target.getBoundingClientRect().top + window.scrollY - 70;
      window.scrollTo({ top: offsetTop, behavior: 'smooth' });
    }
  });
});

// ===== Scroll Reveal Animation =====
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        revealObserver.unobserve(entry.target); // Animate once
      }
    });
  },
  { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
);

// Observe all reveal elements
document.querySelectorAll('.reveal-up, .reveal-right').forEach(el => {
  revealObserver.observe(el);
});

// ===== Skill Bar Animation =====
const skillObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const fills = entry.target.querySelectorAll('.skill-fill');
        fills.forEach(fill => {
          const targetWidth = fill.getAttribute('data-w');
          // Small delay to let the card reveal first
          setTimeout(() => {
            fill.style.width = targetWidth + '%';
          }, 300);
        });
        skillObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.3 }
);

const skillsSection = document.querySelector('.skills');
if (skillsSection) skillObserver.observe(skillsSection);

// ===== Contact Form Handling =====
const contactForm = document.getElementById('contactForm');
if (contactForm) {
  contactForm.addEventListener('submit', function (e) {
    e.preventDefault();

    const name = this.querySelector('#name').value.trim();
    const email = this.querySelector('#email').value.trim();
    const service = this.querySelector('#service').value;
    const message = this.querySelector('#message').value.trim();

    if (!name || !email || !message) {
      showToast('Please fill in all required fields.', 'error');
      return;
    }

    // Compose WhatsApp message as fallback
    const waText = encodeURIComponent(
      `Hi Jayakumar,\n\nName: ${name}\nEmail: ${email}\nService: ${service || 'Not specified'}\n\nMessage: ${message}`
    );
    const waUrl = `https://wa.me/916382109933?text=${waText}`;

    // Show success and open WhatsApp
    showToast('Opening WhatsApp to send your message...', 'success');
    setTimeout(() => window.open(waUrl, '_blank'), 800);

    this.reset();
  });
}

// ===== Toast Notification =====
function showToast(message, type = 'success') {
  // Remove existing toasts
  const existing = document.querySelector('.toast');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.className = `toast toast-${type}`;
  toast.textContent = message;

  Object.assign(toast.style, {
    position: 'fixed',
    bottom: '90px',
    right: '28px',
    background: type === 'success'
      ? 'linear-gradient(135deg, rgba(139,92,246,0.95), rgba(168,85,247,0.95))'
      : 'rgba(239,68,68,0.9)',
    color: 'white',
    padding: '12px 20px',
    borderRadius: '10px',
    fontSize: '0.875rem',
    fontFamily: "'Inter', sans-serif",
    boxShadow: '0 8px 30px rgba(0,0,0,0.3)',
    zIndex: '9999',
    opacity: '0',
    transform: 'translateY(12px)',
    transition: 'all 0.3s cubic-bezier(0.4,0,0.2,1)',
    maxWidth: '280px',
    backdropFilter: 'blur(10px)',
  });

  document.body.appendChild(toast);

  requestAnimationFrame(() => {
    toast.style.opacity = '1';
    toast.style.transform = 'translateY(0)';
  });

  setTimeout(() => {
    toast.style.opacity = '0';
    toast.style.transform = 'translateY(12px)';
    setTimeout(() => toast.remove(), 300);
  }, 3500);
}

// ===== Active Nav Link on Scroll =====
const sections = document.querySelectorAll('section[id]');
const navLinkEls = document.querySelectorAll('.nav-link');

function highlightActiveNav() {
  const scrollPos = window.scrollY + 100;

  sections.forEach(section => {
    const top = section.offsetTop;
    const height = section.offsetHeight;
    const id = section.getAttribute('id');

    if (scrollPos >= top && scrollPos < top + height) {
      navLinkEls.forEach(link => {
        link.style.color = '';
        if (link.getAttribute('href') === `#${id}`) {
          link.style.color = 'var(--purple-glow)';
        }
      });
    }
  });
}

window.addEventListener('scroll', highlightActiveNav, { passive: true });

// ===== Cursor glow effect on hero =====
const hero = document.querySelector('.hero');
if (hero) {
  hero.addEventListener('mousemove', (e) => {
    const rect = hero.getBoundingClientRect();
    const x = ((e.clientX - rect.left) / rect.width) * 100;
    const y = ((e.clientY - rect.top) / rect.height) * 100;
    hero.style.setProperty('--mouse-x', x + '%');
    hero.style.setProperty('--mouse-y', y + '%');
  });
}

// ===== Card tilt on hover (subtle) =====
document.querySelectorAll('.project-card, .service-card').forEach(card => {
  card.addEventListener('mousemove', function (e) {
    const rect = this.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    this.style.transform = `translateY(-4px) rotateX(${-y * 4}deg) rotateY(${x * 4}deg)`;
  });

  card.addEventListener('mouseleave', function () {
    this.style.transform = '';
    this.style.transition = 'all 0.5s cubic-bezier(0.4,0,0.2,1)';
  });

  card.addEventListener('mouseenter', function () {
    this.style.transition = 'border-color 0.35s ease, box-shadow 0.35s ease, background 0.35s ease';
  });
});

// ===== Init: Trigger hero reveals immediately =====
window.addEventListener('DOMContentLoaded', () => {
  // Small delay for cinematic feel
  setTimeout(() => {
    document.querySelectorAll('.hero .reveal-up, .hero .reveal-right').forEach(el => {
      el.classList.add('visible');
    });
  }, 100);
});

console.log('%cJayakumar K — Portfolio', 'color:#a855f7;font-size:16px;font-weight:bold;font-family:monospace;');
console.log('%cBuilt with precision. Open source @ github.com/jayakumar-hacker', 'color:#64748b;font-size:12px;');
