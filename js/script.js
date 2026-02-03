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
function initContactPage() {
    // If EmailJS is loaded, the contact page inline script handles the form - don't attach duplicate handler
    if (typeof emailjs !== 'undefined') {
        return;
    }
    
    const contactForm = document.getElementById('contact-form');
    
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            // Basic validation
            const name = document.getElementById('name');
            const email = document.getElementById('email');
            const message = document.getElementById('message');
            let isValid = true;
            
            // Reset error states
            document.querySelectorAll('.error-message').forEach(el => el.remove());
            document.querySelectorAll('.form-group').forEach(el => el.classList.remove('error'));
            
            // Name validation
            if (!name.value.trim()) {
                showError(name, 'Name is required');
                isValid = false;
            }
            
            // Email validation
            const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
            if (!email.value.trim()) {
                showError(email, 'Email is required');
                isValid = false;
            } else if (!emailRegex.test(email.value)) {
                showError(email, 'Please enter a valid email address');
                isValid = false;
            }
            
            // Message validation
            if (!message.value.trim()) {
                showError(message, 'Message is required');
                isValid = false;
            } else if (message.value.trim().length < 10) {
                showError(message, 'Message must be at least 10 characters long');
                isValid = false;
            }
            
            // If valid, show success message (fallback when EmailJS not available)
            if (isValid) {
                alert('Thank you for your message! I will get back to you soon.');
                contactForm.reset();
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