// smk-script.js - JavaScript untuk Website SMK Pancabhakti

// Inisialisasi ketika dokumen siap
document.addEventListener('DOMContentLoaded', function() {
    console.log('Website SMK Pancabhakti diinisialisasi...');

    // ==================== NAVIGASI SCROLL EFFECT ====================
    const nav = document.querySelector('.smk-nav');
    
    if (nav) {
        window.addEventListener('scroll', function() {
            if (window.scrollY > 100) {
                nav.classList.add('scrolled');
            } else {
                nav.classList.remove('scrolled');
            }
        });
    }

    // ==================== COUNTER ANIMATION ====================
    function startCounter(element, target, duration) {
        let start = 0;
        const increment = target / (duration / 16);
        
        const timer = setInterval(() => {
            start += increment;
            if (start >= target) {
                element.textContent = target + '+';
                clearInterval(timer);
            } else {
                element.textContent = Math.floor(start) + '+';
            }
        }, 16);
    }

    // Inisialisasi counter ketika section hero terlihat
    const counterObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const counters = entry.target.querySelectorAll('[data-counter]');
                counters.forEach(counter => {
                    const target = parseInt(counter.getAttribute('data-counter'));
                    startCounter(counter, target, 2000);
                });
                counterObserver.unobserve(entry.target);
            }
        });
    }, { threshold: 0.5 });

    // Observe hero section untuk counter
    const heroSection = document.querySelector('.smk-hero');
    if (heroSection) {
        counterObserver.observe(heroSection);
    }

    // ==================== CONTACT FORM HANDLING ====================
    const contactForm = document.getElementById('contactForm');
    if (contactForm) {
        contactForm.addEventListener('submit', function(e) {
            e.preventDefault();
            
            const submitBtn = this.querySelector('button[type="submit"]');
            const originalText = submitBtn.innerHTML;
            
            // Validasi form
            if (!validateContactForm(this)) {
                showNotification('Harap isi semua field dengan benar!', 'error');
                return;
            }
            
            // Simulasi pengiriman
            submitBtn.innerHTML = '<span class="spinner-border spinner-border-sm me-2"></span>Mengirim...';
            submitBtn.disabled = true;
            
            // Simulasi delay
            setTimeout(() => {
                showNotification('Pesan berhasil dikirim! Kami akan menghubungi Anda segera.', 'success');
                
                // Reset form
                this.reset();
                submitBtn.innerHTML = originalText;
                submitBtn.disabled = false;
            }, 2000);
        });
    }

    // ==================== SMOOTH SCROLL ====================
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            // Skip untuk dropdown toggle
            if (this.classList.contains('dropdown-toggle')) return;
            
            e.preventDefault();
            const targetId = this.getAttribute('href');
            const targetElement = document.querySelector(targetId);
            
            if (targetElement) {
                const offsetTop = targetElement.offsetTop - 80;
                
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
                
                // Update active nav link
                updateActiveNavLink(targetId);
            }
        });
    });

    // ==================== SCROLL ANIMATIONS ====================
    const scrollOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const scrollObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('smk-animate');
                scrollObserver.unobserve(entry.target);
            }
        });
    }, scrollOptions);

    // Observe semua card untuk animasi
    document.querySelectorAll('.smk-program-card, .smk-facility-card, .smk-news-card, .smk-teacher-card').forEach(element => {
        scrollObserver.observe(element);
    });

    // ==================== SCROLL TO TOP BUTTON ====================
    const scrollTopBtn = document.createElement('button');
    scrollTopBtn.innerHTML = '<i class="bi bi-chevron-up"></i>';
    scrollTopBtn.className = 'btn btn-primary smk-scroll-top';
    scrollTopBtn.setAttribute('aria-label', 'Kembali ke atas');
    scrollTopBtn.style.cssText = `
        position: fixed;
        bottom: 6rem;
        right: 2rem;
        z-index: 1000;
        width: 50px;
        height: 50px;
        border-radius: 50%;
        display: none;
        align-items: center;
        justify-content: center;
        box-shadow: 0 4px 12px rgba(0,0,0,0.15);
        transition: all 0.3s ease;
    `;
    document.body.appendChild(scrollTopBtn);

    // Hover effects
    scrollTopBtn.addEventListener('mouseenter', function() {
        this.style.transform = 'translateY(-2px)';
        this.style.boxShadow = '0 6px 16px rgba(0,0,0,0.2)';
    });

    scrollTopBtn.addEventListener('mouseleave', function() {
        this.style.transform = 'translateY(0)';
        this.style.boxShadow = '0 4px 12px rgba(0,0,0,0.15)';
    });

    // Show/hide scroll to top button
    window.addEventListener('scroll', function() {
        if (window.pageYOffset > 300) {
            scrollTopBtn.style.display = 'flex';
        } else {
            scrollTopBtn.style.display = 'none';
        }
        
        // Update active nav link berdasarkan scroll position
        updateActiveNavOnScroll();
    });

    // Scroll to top function
    scrollTopBtn.addEventListener('click', function() {
        window.scrollTo({
            top: 0,
            behavior: 'smooth'
        });
    });

    // ==================== FLOATING PPDB BUTTON ====================
    const floatBtn = document.querySelector('.smk-btn-float');
    if (floatBtn) {
        floatBtn.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
        });

        floatBtn.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });
        
        // Click handler
        floatBtn.addEventListener('click', function(e) {
            e.preventDefault();
            const targetSection = document.querySelector('#ppdb');
            if (targetSection) {
                const offsetTop = targetSection.offsetTop - 80;
                window.scrollTo({
                    top: offsetTop,
                    behavior: 'smooth'
                });
            }
        });
    }

    // ==================== PROGRAM CARD HOVER ANIMATIONS ====================
    const programCards = document.querySelectorAll('.smk-program-card');
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            this.style.transform = 'translateY(-10px)';
        });

        card.addEventListener('mouseleave', function() {
            this.style.transform = 'translateY(0)';
        });
    });

    // ==================== FORM VALIDATION ====================
    const formInputs = document.querySelectorAll('.smk-form-input, .smk-form-textarea');
    formInputs.forEach(input => {
        // Validasi ketika kehilangan fokus
        input.addEventListener('blur', function() {
            if (this.value.trim() === '') {
                this.classList.add('is-invalid');
            } else {
                this.classList.remove('is-invalid');
                this.classList.add('is-valid');
            }
        });

        // Reset validasi ketika user mulai mengetik
        input.addEventListener('input', function() {
            this.classList.remove('is-invalid', 'is-valid');
        });
    });

    // ==================== NOTIFICATION SYSTEM ====================
    function showNotification(message, type = 'success') {
        // Hapus notifikasi sebelumnya
        const prevNotification = document.querySelector('.smk-notification');
        if (prevNotification) {
            prevNotification.remove();
        }

        const notification = document.createElement('div');
        notification.className = `smk-notification alert alert-${type === 'success' ? 'success' : 'danger'}`;
        notification.innerHTML = `
            <div class="d-flex align-items-center">
                <i class="bi ${type === 'success' ? 'bi-check-circle-fill' : 'bi-exclamation-circle-fill'} me-2"></i>
                <span>${message}</span>
            </div>
        `;
        
        notification.style.cssText = `
            position: fixed;
            top: 100px;
            right: 20px;
            z-index: 1060;
            min-width: 300px;
            transform: translateX(100%);
            transition: transform 0.3s ease;
        `;
        
        document.body.appendChild(notification);
        
        // Animasi masuk
        setTimeout(() => {
            notification.style.transform = 'translateX(0)';
        }, 100);
        
        // Hapus setelah 5 detik
        setTimeout(() => {
            notification.style.transform = 'translateX(100%)';
            setTimeout(() => {
                if (notification.parentNode) {
                    notification.parentNode.removeChild(notification);
                }
            }, 300);
        }, 5000);
    }

    // ==================== ACTIVE NAV LINK MANAGEMENT ====================
    function updateActiveNavLink(targetId) {
        // Hapus active class dari semua nav link
        document.querySelectorAll('.smk-nav-link').forEach(link => {
            link.classList.remove('active');
        });
        
        // Tambahkan active class ke nav link yang sesuai
        const activeLink = document.querySelector(`.smk-nav-link[href="${targetId}"]`);
        if (activeLink) {
            activeLink.classList.add('active');
        }
    }

    function updateActiveNavOnScroll() {
        const sections = document.querySelectorAll('section[id]');
        const navLinks = document.querySelectorAll('.smk-nav-link');
        
        let current = '';
        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;
            if (scrollY >= sectionTop - 100) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    }

    // ==================== FORM VALIDATION FUNCTION ====================
    function validateContactForm(form) {
        const inputs = form.querySelectorAll('input[required], textarea[required]');
        let isValid = true;
        
        inputs.forEach(input => {
            if (input.value.trim() === '') {
                input.classList.add('is-invalid');
                isValid = false;
            } else {
                input.classList.remove('is-invalid');
            }
            
            // Email validation khusus
            if (input.type === 'email' && input.value.trim() !== '') {
                if (!validateEmail(input.value)) {
                    input.classList.add('is-invalid');
                    isValid = false;
                }
            }
        });
        
        return isValid;
    }

    // ==================== LAZY LOADING FOR IMAGES ====================
    const imageObserver = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const image = entry.target;
                const src = image.getAttribute('data-src');
                if (src) {
                    image.src = src;
                    image.classList.remove('lazy');
                }
                imageObserver.unobserve(image);
            }
        });
    });

    // Observe semua gambar dengan data-src
    document.querySelectorAll('img[data-src]').forEach(image => {
        imageObserver.observe(image);
    });

    // ==================== PROGRAM ICON HANDLING ====================
    function handleProgramIcons() {
        const programIcons = document.querySelectorAll('.smk-program-img');
        
        programIcons.forEach(icon => {
            // Check jika gambar gagal load
            icon.addEventListener('error', function() {
                console.log(`Gambar icon tidak ditemukan: ${this.src}`);
                
                // Ganti dengan fallback icon
                const programName = this.closest('.smk-program-card').querySelector('.smk-program-name').textContent;
                const fallbackIcon = getFallbackIcon(programName);
                
                // Buat elemen fallback
                const fallbackElement = document.createElement('div');
                fallbackElement.className = 'smk-program-fallback';
                fallbackElement.innerHTML = fallbackIcon;
                fallbackElement.style.cssText = `
                    font-size: 2.5rem;
                    color: white;
                `;
                
                // Ganti gambar dengan fallback
                this.style.display = 'none';
                this.parentElement.appendChild(fallbackElement);
            });
            
            // Preload images untuk performa
            if (icon.src) {
                const img = new Image();
                img.src = icon.src;
            }
        });
    }

    // Fungsi untuk mendapatkan fallback icon
    function getFallbackIcon(programName) {
        const iconMap = {
            'Teknik Komputer & Jaringan': '💻',
            'Teknik Kendaraan Ringan': '🚗',
            'Teknik Bisnis Sepeda Motor': '🏍️',
            'Akuntansi & Keuangan': '📊',
            'Bisnis & Pemasaran': '📈',
            'Otomatisasi Perkantoran': '🏢'
        };
        
        for (const [key, value] of Object.entries(iconMap)) {
            if (programName.includes(key)) {
                return value;
            }
        }
        
        return '📚'; // Default fallback
    }

    // Inisialisasi program icons
    handleProgramIcons();
    
    // Tambahkan animasi hover untuk program cards
    programCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.smk-program-icon');
            if (icon) {
                icon.style.transform = 'scale(1.1) rotate(5deg)';
            }
        });
        
        card.addEventListener('mouseleave', function() {
            const icon = this.querySelector('.smk-program-icon');
            if (icon) {
                icon.style.transform = 'scale(1) rotate(0deg)';
            }
        });
    });

    // ==================== COPYRIGHT YEAR UPDATE ====================
    function updateCopyrightYear() {
        const copyrightElement = document.querySelector('.smk-copyright');
        if (copyrightElement) {
            const currentYear = new Date().getFullYear();
            copyrightElement.textContent = copyrightElement.textContent.replace('2024', currentYear);
        }
    }

    // Panggil fungsi update copyright
    updateCopyrightYear();

    // ==================== RESPONSIVE MENU HANDLER ====================
    function handleResponsiveMenu() {
        const navbarToggler = document.querySelector('.navbar-toggler');
        const navbarCollapse = document.querySelector('.navbar-collapse');
        
        if (navbarToggler && navbarCollapse) {
            // Tutup menu mobile ketika klik di luar
            document.addEventListener('click', function(e) {
                if (!navbarToggler.contains(e.target) && !navbarCollapse.contains(e.target)) {
                    if (navbarCollapse.classList.contains('show')) {
                        navbarToggler.click(); // Tutup menu
                    }
                }
            });
            
            // Tutup menu mobile ketika window di-resize ke desktop
            window.addEventListener('resize', function() {
                if (window.innerWidth > 768 && navbarCollapse.classList.contains('show')) {
                    navbarToggler.click(); // Tutup menu
                }
            });
        }
    }

    // Panggil fungsi responsive menu
    handleResponsiveMenu();

    // ==================== INITIALIZATION COMPLETE ====================
    document.body.classList.add('smk-loaded');
    console.log('✅ Website SMK Pancabhakti berhasil diinisialisasi!');
});

// ==================== UTILITY FUNCTIONS ====================
function validateEmail(email) {
    const regex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return regex.test(email);
}

function formatNumber(number) {
    return number.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ".");
}

function debounce(func, wait, immediate) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            timeout = null;
            if (!immediate) func(...args);
        };
        const callNow = immediate && !timeout;
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
        if (callNow) func(...args);
    };
}