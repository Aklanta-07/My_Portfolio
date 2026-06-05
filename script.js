/* ==========================================================================
   PORTFOLIO JAVASCRIPT LOGIC
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // 1. Theme Toggle Logic
    const themeToggleBtn = document.getElementById('theme-toggle');
    const htmlElement = document.documentElement;
    
    // Check local storage or default to dark
    const savedTheme = localStorage.getItem('portfolio-theme') || 'dark';
    htmlElement.setAttribute('data-theme', savedTheme);
    
    themeToggleBtn.addEventListener('click', () => {
        const currentTheme = htmlElement.getAttribute('data-theme');
        const newTheme = currentTheme === 'dark' ? 'light' : 'dark';
        
        htmlElement.setAttribute('data-theme', newTheme);
        localStorage.setItem('portfolio-theme', newTheme);
    });

    // 2. Mobile Navigation Toggle
    const menuToggle = document.getElementById('menu-toggle');
    const mobileMenu = document.getElementById('mobile-menu');
    const mobileLinks = document.querySelectorAll('.mobile-link');
    
    const toggleMenu = () => {
        const isExpanded = menuToggle.getAttribute('aria-expanded') === 'true';
        menuToggle.setAttribute('aria-expanded', !isExpanded);
        menuToggle.classList.toggle('active');
        mobileMenu.classList.toggle('active');
        // Prevent body scrolling when mobile menu is open
        document.body.style.overflow = !isExpanded ? 'hidden' : '';
    };

    menuToggle.addEventListener('click', toggleMenu);

    // Close menu when a link is clicked
    mobileLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        });
    });

    // Close mobile menu on window resize if screen goes larger than 768px
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768 && mobileMenu.classList.contains('active')) {
            menuToggle.setAttribute('aria-expanded', 'false');
            menuToggle.classList.remove('active');
            mobileMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });

    // 3. Scroll Progress Indicator & Header Scroll Styling
    const scrollProgress = document.getElementById('scroll-progress');
    const header = document.querySelector('.header');
    const backToTopBtn = document.getElementById('back-to-top');

    const handleScroll = () => {
        const totalHeight = document.documentElement.scrollHeight - window.innerHeight;
        const progress = totalHeight > 0 ? (window.scrollY / totalHeight) * 100 : 0;
        
        scrollProgress.style.width = `${progress}%`;
        
        // Header scroll behavior
        if (window.scrollY > 20) {
            header.classList.add('scrolled');
        } else {
            header.classList.remove('scrolled');
        }
        
        // Back to top button visibility
        if (window.scrollY > 400) {
            backToTopBtn.classList.add('active');
        } else {
            backToTopBtn.classList.remove('active');
        }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll(); // Initial run on load

    // Back to top click handler
    backToTopBtn.addEventListener('click', () => {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // 4. Typewriter Effect
    const typeTextSpan = document.querySelector('.typing-text');
    const words = ["Backend Developer", "Java Spring Engineer", "Problem Solver"];
    const typingDelay = 100;
    const erasingDelay = 60;
    const newWordDelay = 2000;
    let wordIndex = 0;
    let charIndex = 0;

    function type() {
        if (charIndex < words[wordIndex].length) {
            typeTextSpan.textContent += words[wordIndex].charAt(charIndex);
            charIndex++;
            setTimeout(type, typingDelay);
        } else {
            setTimeout(erase, newWordDelay);
        }
    }

    function erase() {
        if (charIndex > 0) {
            typeTextSpan.textContent = words[wordIndex].substring(0, charIndex - 1);
            charIndex--;
            setTimeout(erase, erasingDelay);
        } else {
            wordIndex++;
            if (wordIndex >= words.length) wordIndex = 0;
            setTimeout(type, typingDelay + 500);
        }
    }

    // Start Typewriter
    if (words.length && typeTextSpan) {
        setTimeout(type, newWordDelay);
    }

    // 5. Active Link Spy Scrolling
    const sections = document.querySelectorAll('section');
    const navLinks = document.querySelectorAll('.nav-link');

    const spyScroll = () => {
        let currentSectionId = '';
        
        sections.forEach(section => {
            const sectionTop = section.offsetTop - 120; // offset to compensate for sticky header
            const sectionHeight = section.clientHeight;
            
            if (window.scrollY >= sectionTop && window.scrollY < sectionTop + sectionHeight) {
                currentSectionId = section.getAttribute('id');
            }
        });
        
        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${currentSectionId}`) {
                link.classList.add('active');
            }
        });
    };

    window.addEventListener('scroll', spyScroll);
    spyScroll(); // Initial spy check

    // 6. Scroll Reveal Animations (Intersection Observer)
    const revealItems = document.querySelectorAll('.reveal-item');
    
    const revealObserverOptions = {
        threshold: 0.12, // element must be 12% in viewport
        rootMargin: "0px 0px -40px 0px" // triggers slightly before scrolling fully past
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target); // Stop observing once revealed
            }
        });
    }, revealObserverOptions);

    revealItems.forEach(item => {
        revealObserver.observe(item);
    });

    // 7. Contact Form Simulation
    const contactForm = document.getElementById('contact-form');
    const formStatus = document.getElementById('form-status');

    if (contactForm) {
        contactForm.addEventListener('submit', (e) => {
            e.preventDefault();
            
            // Get form values
            const name = document.getElementById('form-name').value;
            const email = document.getElementById('form-email').value;
            const subject = document.getElementById('form-subject').value;
            const message = document.getElementById('form-message').value;
            
            // Update UI to submitting state
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            
            const originalText = submitBtnText.textContent;
            const originalIconClass = submitBtnIcon.className;
            
            submitBtnText.textContent = 'Sending...';
            submitBtnIcon.className = 'fa-solid fa-circle-notch fa-spin';
            submitBtn.disabled = true;
            
            // Simulate form submission (e.g. AJAX post delay)
            setTimeout(() => {
                // Return button to normal
                submitBtnText.textContent = originalText;
                submitBtnIcon.className = originalIconClass;
                submitBtn.disabled = false;
                
                // Show success status
                formStatus.className = 'form-status-msg success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
                
                // Reset form fields
                contactForm.reset();
                
                // Clear success message after 5 seconds
                setTimeout(() => {
                    formStatus.style.opacity = '0';
                    setTimeout(() => {
                        formStatus.innerHTML = '';
                        formStatus.style.opacity = '1';
                    }, 300);
                }, 5000);
                
            }, 1800);
        });
    }
});
