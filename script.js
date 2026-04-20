/* ===================================================================
   KAKA BRAND GUIDELINES — INTERACTIVE SCRIPT
   =================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // ==================== NAVIGATION ====================
    const nav = document.getElementById('brandNav');
    const navToggle = document.getElementById('navToggle');
    const mobileNav = document.getElementById('mobileNav');

    // Scroll-based nav style
    const handleNavScroll = () => {
        if (window.scrollY > 80) {
            nav.classList.add('scrolled');
        } else {
            nav.classList.remove('scrolled');
        }
    };

    window.addEventListener('scroll', handleNavScroll, { passive: true });

    // Mobile nav toggle
    navToggle.addEventListener('click', () => {
        mobileNav.classList.toggle('active');
        document.body.style.overflow = mobileNav.classList.contains('active') ? 'hidden' : '';
    });

    // ==================== SCROLL ANIMATIONS ====================
    const observerOptions = {
        root: null,
        rootMargin: '0px 0px -60px 0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                
                // Stagger children animation
                const children = entry.target.querySelectorAll('.strategy-card, .value-item, .audience-card, .logo-var-card, .color-card, .type-card, .photo-rule, .tone-card, .package-item, .pillar-card, .social-card, .toc-item, .material-card');
                children.forEach((child, index) => {
                    child.style.transitionDelay = `${index * 0.1}s`;
                    child.classList.add('visible');
                });
            }
        });
    }, observerOptions);

    // Observe all section children
    document.querySelectorAll('.section .container > *').forEach((el) => {
        observer.observe(el);
    });

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                const offset = 80;
                const targetPosition = target.getBoundingClientRect().top + window.scrollY - offset;
                window.scrollTo({
                    top: targetPosition,
                    behavior: 'smooth'
                });
            }
        });
    });

    // ==================== ACTIVE NAV LINK ====================
    const sections = document.querySelectorAll('.section[id]');
    const navLinks = document.querySelectorAll('.nav-links a');

    const updateActiveLink = () => {
        const scrollPos = window.scrollY + 150;

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.offsetHeight;
            const sectionId = section.getAttribute('id');

            if (scrollPos >= sectionTop && scrollPos < sectionTop + sectionHeight) {
                navLinks.forEach(link => {
                    link.style.color = '';
                    if (link.getAttribute('href') === `#${sectionId}`) {
                        link.style.color = 'var(--champagne-gold)';
                    }
                });
            }
        });
    };

    window.addEventListener('scroll', updateActiveLink, { passive: true });

    // ==================== PARALLAX PEARLS ====================
    const pearls = document.querySelectorAll('.pearl-float');
    
    window.addEventListener('mousemove', (e) => {
        const x = (e.clientX / window.innerWidth - 0.5) * 2;
        const y = (e.clientY / window.innerHeight - 0.5) * 2;
        
        pearls.forEach((pearl, index) => {
            const speed = (index + 1) * 8;
            pearl.style.transform = `translate(${x * speed}px, ${y * speed}px)`;
        });
    });

    // ==================== TRAIT BARS ANIMATION ====================
    const traitBars = document.querySelectorAll('.trait-fill');
    const traitObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const bar = entry.target;
                const width = bar.style.width;
                bar.style.width = '0%';
                setTimeout(() => {
                    bar.style.width = width;
                }, 100);
            }
        });
    }, { threshold: 0.3 });

    traitBars.forEach(bar => traitObserver.observe(bar));

    // ==================== COVER TITLE SHIMMER ====================
    const coverTitle = document.querySelector('.cover-title');
    if (coverTitle) {
        setInterval(() => {
            coverTitle.style.textShadow = `0 0 40px rgba(201, 169, 110, ${0.1 + Math.random() * 0.15})`;
        }, 2000);
    }

    // ==================== PAGE LOAD ====================
    document.body.style.opacity = '0';
    document.body.style.transition = 'opacity 0.6s ease';
    
    requestAnimationFrame(() => {
        document.body.style.opacity = '1';
    });

    // Initial nav check
    handleNavScroll();
});

// ==================== GLOBAL FUNCTIONS ====================
function closeMobileNav() {
    const mobileNav = document.getElementById('mobileNav');
    mobileNav.classList.remove('active');
    document.body.style.overflow = '';
}
