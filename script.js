// Sticky Navbar
const navbar = document.querySelector('.navbar');
const mobileMenu = document.getElementById('mobile-menu');
const navLinks = document.querySelector('.nav-links');

window.addEventListener('scroll', () => {
    if (window.scrollY > 50) {
        navbar.classList.add('scrolled');
    } else {
        navbar.classList.remove('scrolled');
    }
});

// Mobile Menu Toggle
mobileMenu.addEventListener('click', () => {
    navLinks.classList.toggle('active');
    mobileMenu.classList.toggle('active');
});

// Close Mobile Menu on Link Click
document.querySelectorAll('.nav-links a').forEach(link => {
    link.addEventListener('click', () => {
        navLinks.classList.remove('active');
        mobileMenu.classList.remove('active');
    });
});

// Typing Text Effect
const typingText = document.querySelector('.typing-text');
const words = ['Web Developer', 'UI/UX Designer', 'Freelancer', 'Creative Coder'];
let wordIndex = 0;
let charIndex = 0;
let isDeleting = false;

function type() {
    if (!typingText) return; // Guard clause

    const currentWord = words[wordIndex];

    if (isDeleting) {
        typingText.textContent = currentWord.substring(0, charIndex - 1);
        charIndex--;
    } else {
        typingText.textContent = currentWord.substring(0, charIndex + 1);
        charIndex++;
    }

    if (!isDeleting && charIndex === currentWord.length) {
        isDeleting = true;
        setTimeout(type, 2000); // Wait at end of word
    } else if (isDeleting && charIndex === 0) {
        isDeleting = false;
        wordIndex = (wordIndex + 1) % words.length;
        setTimeout(type, 500); // Wait before starting new word
    } else {
        const speed = isDeleting ? 50 : 150;
        setTimeout(type, speed);
    }
}

// Start Typing Animation
document.addEventListener('DOMContentLoaded', type);

// Smooth Scrolling for Anchors
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// Scroll Reveal Animation
const revealElements = document.querySelectorAll('.section-title, .about-text, .skill-card, .project-card, .contact-content');

const revealOnScroll = () => {
    const windowHeight = window.innerHeight;
    const elementVisible = 150;

    revealElements.forEach((reveal) => {
        const elementTop = reveal.getBoundingClientRect().top;
        if (elementTop < windowHeight - elementVisible) {
            reveal.classList.add('active');
            reveal.style.opacity = "1";
            reveal.style.transform = "translateY(0)";
        }
    });
};

// Initial Style for Reveal Elements (Hidden)
revealElements.forEach(el => {
    el.style.opacity = "0";
    el.style.transform = "translateY(30px)";
    el.style.transition = "all 0.8s cubic-bezier(0.5, 0, 0, 1)";
});

window.addEventListener('scroll', revealOnScroll);
// Trigger once on load
revealOnScroll();

// Contact Form Handling (Simulated Backend)
const contactForm = document.getElementById('contactForm');
const submitBtn = document.getElementById('submitBtn');
const formMessage = document.getElementById('formMessage');

if (contactForm) {
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();

        // Get values
        const name = document.getElementById('name').value;
        const email = document.getElementById('email').value;
        const message = document.getElementById('message').value;

        // Visual Feedback - "Sending..."
        const originalBtnText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;
        submitBtn.style.opacity = '0.7';
        formMessage.style.display = 'none';

        // Simulate Network Request (2 seconds)
        setTimeout(() => {
            // Success State
            submitBtn.textContent = 'Message Sent!';
            submitBtn.style.backgroundColor = '#10b981'; // Green
            submitBtn.style.color = '#fff';

            formMessage.textContent = `Thanks ${name}! Your message has been sent successfully. I'll get back to you at ${email} soon.`;
            formMessage.style.color = '#10b981';
            formMessage.style.display = 'block';

            // Clear Form
            contactForm.reset();

            // Reset Button after 3 seconds
            setTimeout(() => {
                submitBtn.textContent = originalBtnText;
                submitBtn.disabled = false;
                submitBtn.style.opacity = '1';
                submitBtn.style.backgroundColor = ''; // Reset to CSS default
                submitBtn.style.color = '';

                // Hide message after a while
                setTimeout(() => {
                    formMessage.style.display = 'none';
                }, 5000);

            }, 3000);

            // Log to console to show "Backend" activity
            console.log('--- FORM SUBMISSION RECEIVED ---');
            console.log('Name:', name);
            console.log('Email:', email);
            console.log('Message:', message);
            console.log('--------------------------------');

        }, 2000);
    });
}
