// js/script.js

// Navbar Toggle for Mobile
document.addEventListener('DOMContentLoaded', function() {
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    
    if (hamburger) {
        hamburger.addEventListener('click', function() {
            hamburger.classList.toggle('active');
            navMenu.classList.toggle('active');
        });
        
        // Close mobile menu when clicking a link
        document.querySelectorAll('.nav-menu a').forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                navMenu.classList.remove('active');
            });
        });
    }
    
    // Navbar scroll effect
    window.addEventListener('scroll', function() {
        const navbar = document.querySelector('.navbar');
        if (window.scrollY > 50) {
            navbar.style.padding = '15px 0';
            navbar.style.boxShadow = '0 5px 20px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.padding = '20px 0';
            navbar.style.boxShadow = '0 2px 10px rgba(0, 0, 0, 0.1)';
        }
    });
    
    // Smooth scrolling for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 80,
                    behavior: 'smooth'
                });
            }
        });
    });
    
    // Initialize projects page functionality if on projects.html
    if (window.location.pathname.includes('projects.html')) {
        initProjectsPage();
    }
    
    // Initialize certifications page functionality if on certifications.html
    if (window.location.pathname.includes('certifications.html')) {
        initCertificationsPage();
    }
    
    // Initialize gallery page functionality if on gallery.html
    if (window.location.pathname.includes('gallery.html')) {
        initGalleryPage();
    }
    
    // Initialize contact page functionality if on contact.html
    if (window.location.pathname.includes('contact.html')) {
        initContactPage();
    }
});

// Projects Page Functionality
function initProjectsPage() {
    const projectCards = document.querySelectorAll('.project-card');
    
    projectCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
            this.style.boxShadow = '0 15px 30px rgba(0, 0, 0, 0.15)';
        });
        
        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
            this.style.boxShadow = '0 5px 15px rgba(0, 0, 0, 0.1)';
        });
        
        // Add click functionality to project buttons
        const buttons = this.querySelectorAll('.project-btn');
        buttons.forEach(btn => {
            btn.addEventListener('click', function(e) {
                e.stopPropagation(); // Prevent card click event
                const link = this.getAttribute('data-link');
                if (link) {
                    window.open(link, '_blank');
                }
            });
        });
    });
}

// Certifications Page Functionality
function initCertificationsPage() {
    const certCards = document.querySelectorAll('.cert-card');
    const modal = document.getElementById('cert-modal');
    const modalImg = document.getElementById('modal-img');
    const modalTitle = document.getElementById('modal-title');
    const closeModal = document.querySelector('.close-modal');
    
    if (certCards.length > 0 && modal) {
        certCards.forEach(card => {
            card.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-img');
                const title = this.querySelector('.cert-title').textContent;
                
                if (imgSrc) {
                    modalImg.src = imgSrc;
                    modalImg.alt = title;
                    modalTitle.textContent = title;
                    modal.style.display = 'flex';
                    document.body.style.overflow = 'hidden';
                } else {
                    // If no image, open link instead
                    const link = this.getAttribute('data-link');
                    if (link) {
                        window.open(link, '_blank');
                    }
                }
            });
        });
        
        // Close modal
        if (closeModal) {
            closeModal.addEventListener('click', function() {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal when clicking outside
        modal.addEventListener('click', function(e) {
            if (e.target === modal) {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && modal.style.display === 'flex') {
                modal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Gallery Page Functionality
function initGalleryPage() {
    const galleryItems = document.querySelectorAll('.gallery-item');
    const galleryModal = document.getElementById('gallery-modal');
    const galleryModalImg = document.getElementById('gallery-modal-img');
    const closeGalleryModal = document.querySelector('.close-gallery-modal');
    
    if (galleryItems.length > 0 && galleryModal) {
        galleryItems.forEach(item => {
            item.addEventListener('click', function() {
                const imgSrc = this.getAttribute('data-img') || this.querySelector('img').src;
                galleryModalImg.src = imgSrc;
                galleryModalImg.alt = this.getAttribute('data-title') || 'Gallery Image';
                galleryModal.style.display = 'flex';
                document.body.style.overflow = 'hidden';
            });
        });
        
        // Close modal
        if (closeGalleryModal) {
            closeGalleryModal.addEventListener('click', function() {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            });
        }
        
        // Close modal when clicking outside
        galleryModal.addEventListener('click', function(e) {
            if (e.target === galleryModal) {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
        
        // Close modal with Escape key
        document.addEventListener('keydown', function(e) {
            if (e.key === 'Escape' && galleryModal.style.display === 'flex') {
                galleryModal.style.display = 'none';
                document.body.style.overflow = 'auto';
            }
        });
    }
}

// Contact Page Form Validation (fallback when EmailJS is not used)
// Contact Page Form Validation (fallback + Google Sheets)
function initContactPage() {
    // If EmailJS is loaded, the contact page inline script handles it
    if (typeof emailjs !== 'undefined') {
        return;
    }
    
    const contactForm = document.getElementById('contact-form');
    // YOUR GOOGLE SCRIPT URL
    const scriptURL = 'https://script.google.com/macros/s/AKfycbzC1HcT9wki8p1JcLUs57zwnLhOAGyYgp-l_UhSHqV7PIRUsv7cC2dvI-aC2Gh0lsnCzQ/exec';
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            const submitBtn = contactForm.querySelector('.submit-btn');
            let isValid = true;
            
            // Reset error states
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Validation Logic
            if (!name.value.trim()) { showError(name, 'Name is required'); isValid = false; }
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim() || !emailRegex.test(email.value)) { showError(email, 'Valid email required'); isValid = false; }
            if (!message.value.trim() || message.value.trim().length < 10) { showError(message, 'Message too short'); isValid = false; }
            
            if (isValid) {
                // Change button state
                const originalBtnText = submitBtn.textContent;
                submitBtn.textContent = 'Sending...';
                submitBtn.disabled = true;

                // Send to Google Sheets only (as EmailJS failed/is missing)
                fetch(scriptURL, { method: 'POST', body: new FormData(contactForm)})
                    .then(response => {
                        alert('Thank you! Your message was saved to my records.');
                        contactForm.reset();
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    })
                    .catch(error => {
                        console.error('Error!', error.message);
                        alert('Message could not be sent. Please try again later.');
                        submitBtn.textContent = originalBtnText;
                        submitBtn.disabled = false;
                    });
            }
        });
    }
}

// Helper function to show error messages
function showError(input, message) {
    const formGroup = input.closest('.form-group');
    formGroup.classList.add('error');
    
    const errorElement = document.createElement('div');
    errorElement.className = 'error-message';
    errorElement.textContent = message;
    errorElement.style.color = '#e74c3c';
    errorElement.style.fontSize = '0.85rem';
    errorElement.style.marginTop = '5px';
    
    formGroup.appendChild(errorElement);
}

// Theme Toggle Functionality
document.addEventListener('DOMContentLoaded', function() {
    // Theme toggle button
    const themeToggle = document.createElement('button');
    themeToggle.className = 'theme-toggle';
    themeToggle.setAttribute('aria-label', 'Toggle dark/light mode');
    themeToggle.innerHTML = `
        <i class="fas fa-sun"></i>
        <i class="fas fa-moon"></i>
    `;
    
    // Add toggle button to navbar
    const navbarContainer = document.querySelector('.navbar .container');
    if (navbarContainer) {
        navbarContainer.appendChild(themeToggle);
    }
    
    // Check for saved theme preference or respect OS preference
    const savedTheme = localStorage.getItem('theme') || 
                      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    
    // Set initial theme
    document.documentElement.setAttribute('data-theme', savedTheme);
    
    // Update toggle position based on theme
    updateTogglePosition(savedTheme);
    
    // Theme toggle click event
    themeToggle.addEventListener('click', function() {
        const currentTheme = document.documentElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        
        // Set new theme
        document.documentElement.setAttribute('data-theme', newTheme);
        
        // Save preference to localStorage
        localStorage.setItem('theme', newTheme);
        
        // Update toggle position
        updateTogglePosition(newTheme);
        
        // Add animation effect
        this.classList.add('clicked');
        setTimeout(() => {
            this.classList.remove('clicked');
        }, 300);
    });
    
    function updateTogglePosition(theme) {
        // This function ensures the toggle button shows correctly for the current theme
        // No additional logic needed as CSS handles the visual state
    }
    
    // Listen for system theme changes
    window.matchMedia('(prefers-color-scheme: dark)').addEventListener('change', function(e) {
        if (!localStorage.getItem('theme')) {
            const newTheme = e.matches ? 'dark' : 'light';
            document.documentElement.setAttribute('data-theme', newTheme);
        }
    });
    
    // Add CSS for toggle animation
    const style = document.createElement('style');
    style.textContent = `
        .theme-toggle.clicked {
            transform: scale(0.95);
        }
        
        .theme-toggle:focus {
            outline: 2px solid var(--primary-color);
            outline-offset: 2px;
        }
    `;
    document.head.appendChild(style);
});