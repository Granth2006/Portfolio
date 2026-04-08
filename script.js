/* ======================================
   GRANTH KUMAR PORTFOLIO — script.js
   Clean, conflict-free JavaScript
   ====================================== */

// ---- DOM References ----
const header       = document.getElementById('header');
const menuIcon     = document.getElementById('menu-icon');
const navbar       = document.getElementById('navbar');
const overlay      = document.getElementById('mobile-overlay');
const navLinks     = document.querySelectorAll('.nav-link');
const sections     = document.querySelectorAll('section[id]');
const filterBtns   = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card');
const typingEl     = document.getElementById('typing-text');

// ---- Typing animation ----
const roles = [
    'beautiful websites',
    'stunning UIs',
    'WordPress sites',
    'graphic designs',
    'digital experiences',
];
let roleIdx = 0;
let charIdx = 0;
let isDeleting = false;
let typingTimer;

function typeRole() {
    const current = roles[roleIdx];

    if (!isDeleting) {
        typingEl.textContent = current.slice(0, charIdx + 1);
        charIdx++;
        if (charIdx === current.length) {
            isDeleting = true;
            typingTimer = setTimeout(typeRole, 2000);
            return;
        }
    } else {
        typingEl.textContent = current.slice(0, charIdx - 1);
        charIdx--;
        if (charIdx === 0) {
            isDeleting = false;
            roleIdx = (roleIdx + 1) % roles.length;
        }
    }

    typingTimer = setTimeout(typeRole, isDeleting ? 60 : 90);
}

typeRole();

// ---- Header scroll effect ----
function onScroll() {
    // Sticky header style
    if (window.scrollY > 60) {
        header.classList.add('scrolled');
    } else {
        header.classList.remove('scrolled');
    }

    // Active nav link based on section
    let current = '';
    sections.forEach(sec => {
        const secTop = sec.offsetTop - 120;
        if (window.scrollY >= secTop) {
            current = sec.getAttribute('id');
        }
    });

    navLinks.forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === '#' + current) {
            link.classList.add('active');
        }
    });
}

window.addEventListener('scroll', onScroll, { passive: true });
onScroll(); // run once on load

// ---- Mobile menu ----
function openMenu() {
    menuIcon.classList.add('open');
    navbar.classList.add('open');
    overlay.classList.add('open');
    document.body.style.overflow = 'hidden';
}

function closeMenu() {
    menuIcon.classList.remove('open');
    navbar.classList.remove('open');
    overlay.classList.remove('open');
    document.body.style.overflow = '';
}

menuIcon.addEventListener('click', () => {
    if (navbar.classList.contains('open')) {
        closeMenu();
    } else {
        openMenu();
    }
});

overlay.addEventListener('click', closeMenu);

navLinks.forEach(link => {
    link.addEventListener('click', closeMenu);
});

// ---- Project filter ----
filterBtns.forEach(btn => {
    btn.addEventListener('click', () => {
        const filter = btn.dataset.filter;

        // Update active button
        filterBtns.forEach(b => b.classList.remove('active'));
        btn.classList.add('active');

        // Show/hide cards
        projectCards.forEach(card => {
            if (filter === 'all' || card.dataset.category === filter) {
                card.classList.remove('hidden');
                card.style.animation = 'cardReveal 0.4s ease both';
            } else {
                card.classList.add('hidden');
            }
        });
    });
});

// ---- Intersection Observer for scroll-in animations ----
const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -50px 0px',
};

const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('in-view');
            observer.unobserve(entry.target);
        }
    });
}, observerOptions);

// Observe elements that should animate in
document.querySelectorAll('.project-card, .about-grid, .contact-grid, .stat-item, .chip').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// Add in-view style
const style = document.createElement('style');
style.textContent = `
    .in-view {
        opacity: 1 !important;
        transform: translateY(0) !important;
    }
    .project-card.hidden {
        display: none !important;
    }
    @keyframes cardReveal {
        from { opacity: 0; transform: translateY(20px) scale(0.97); }
        to   { opacity: 1; transform: translateY(0) scale(1); }
    }
`;
document.head.appendChild(style);

// ---- Smooth close on nav link click (desktop too) ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        const targetId = this.getAttribute('href');
        if (targetId === '#') return;
        const target = document.querySelector(targetId);
        if (target) {
            e.preventDefault();
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

// ---- Contact form UX ----
const contactForm = document.getElementById('contact-form');
const submitBtn   = document.getElementById('submit-btn');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        // Let the form submit naturally (getform.io handles it)
        // Just add a loading state
        submitBtn.innerHTML = '<i class="bx bx-loader-alt bx-spin"></i> Sending...';
        submitBtn.disabled = true;
    });
}
