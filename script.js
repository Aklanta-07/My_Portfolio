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
    const words = [
        "Java 21 & Spring Boot APIs",
        "Low-Level System Architectures",
        "Resilient Audit Engines",
        "AI-Ready Retail Backends"
    ];
    const typingDelay = 90;
    const erasingDelay = 50;
    const newWordDelay = 2200;
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
            setTimeout(type, typingDelay + 400);
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
        threshold: 0.12,
        rootMargin: "0px 0px -40px 0px"
    };

    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('revealed');
                observer.unobserve(entry.target);
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
            
            const submitBtn = contactForm.querySelector('.btn-submit');
            const submitBtnText = submitBtn.querySelector('span');
            const submitBtnIcon = submitBtn.querySelector('i');
            
            const originalText = submitBtnText.textContent;
            const originalIconClass = submitBtnIcon.className;
            
            submitBtnText.textContent = 'Sending...';
            submitBtnIcon.className = 'fa-solid fa-circle-notch fa-spin';
            submitBtn.disabled = true;
            
            setTimeout(() => {
                submitBtnText.textContent = originalText;
                submitBtnIcon.className = originalIconClass;
                submitBtn.disabled = false;
                
                formStatus.className = 'form-status-msg success';
                formStatus.innerHTML = '<i class="fa-solid fa-circle-check"></i> Thank you! Your message has been sent successfully.';
                
                contactForm.reset();
                
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

    // 8. Project Category Filtering
    const filterBtns = document.querySelectorAll('.filter-btn');
    const projectCards = document.querySelectorAll('.project-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            projectCards.forEach(card => {
                if (filterValue === 'all' || card.getAttribute('data-category') === filterValue) {
                    card.classList.remove('hide');
                } else {
                    card.classList.add('hide');
                }
            });
        });
    });

    // 9. AI Roadmap Modal Handling
    const openAiRoadmapBtn = document.getElementById('open-ai-roadmap-btn');
    const closeAiRoadmapBtn = document.getElementById('close-modal-btn');
    const aiRoadmapModal = document.getElementById('ai-roadmap-modal');

    if (openAiRoadmapBtn && aiRoadmapModal) {
        const openModal = () => {
            aiRoadmapModal.classList.add('active');
            aiRoadmapModal.setAttribute('aria-hidden', 'false');
            document.body.style.overflow = 'hidden';
        };

        const closeModal = () => {
            aiRoadmapModal.classList.remove('active');
            aiRoadmapModal.setAttribute('aria-hidden', 'true');
            document.body.style.overflow = '';
        };

        openAiRoadmapBtn.addEventListener('click', openModal);
        if (closeAiRoadmapBtn) closeAiRoadmapBtn.addEventListener('click', closeModal);

        aiRoadmapModal.addEventListener('click', (e) => {
            if (e.target === aiRoadmapModal) closeModal();
        });

        document.addEventListener('keydown', (e) => {
            if (e.key === 'Escape' && aiRoadmapModal.classList.contains('active')) {
                closeModal();
            }
        });
    }
});
