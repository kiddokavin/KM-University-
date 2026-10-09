/* ==========================================================================
   Apex University - College Management Website JavaScript Engine
   Includes:
   - Multi-page navigation switcher (Home, Admissions, Courses, Faculty, Events, Gallery, Contact)
   - Mobile Hamburger Menu Toggle
   - Online Admission Application Form Validation
   - Contact Form Validation
   - Toast Popup Notification Manager
   - Gallery Category Filter Logic
   ========================================================================== */

document.addEventListener('DOMContentLoaded', () => {
    // Navigation Elements
    const navLinks = document.querySelectorAll('[data-page]');
    const pageSections = document.querySelectorAll('.page-section');
    const mobileToggle = document.getElementById('mobileToggle');
    const navMenu = document.getElementById('navMenu');
    const toast = document.getElementById('toast');

    // Email & Phone Regex Patterns
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^[0-9]{10}$/;

    // ==========================================
    // 1. PAGE NAVIGATION SWITCHER
    // ==========================================
    function switchPage(targetPageId) {
        // Active link highlighting
        navLinks.forEach(link => {
            if (link.getAttribute('data-page') === targetPageId) {
                link.classList.add('active');
            } else {
                link.classList.remove('active');
            }
        });

        // Show target section, hide others
        pageSections.forEach(section => {
            if (section.id === targetPageId) {
                section.classList.add('active');
            } else {
                section.classList.remove('active');
            }
        });

        // Close mobile drawer if open
        if (navMenu.classList.contains('show')) {
            navMenu.classList.remove('show');
        }

        // Scroll to top smooth
        window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Attach Click Handler to all Navigation Links & Buttons
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetPage = link.getAttribute('data-page');
            if (targetPage) {
                switchPage(targetPage);
            }
        });
    });

    // Mobile Hamburger Menu Toggle
    mobileToggle.addEventListener('click', () => {
        navMenu.classList.toggle('show');
    });

    // ==========================================
    // 2. TOAST POPUP NOTIFICATION MANAGER
    // ==========================================
    function showToast(message) {
        toast.innerText = message;
        toast.style.display = 'block';
        setTimeout(() => {
            toast.style.display = 'none';
        }, 3500);
    }

    // Event Registration Buttons
    document.querySelectorAll('.btn-event-reg').forEach(btn => {
        btn.addEventListener('click', () => {
            showToast('🎉 Event Registration Confirmed! Check your email for venue pass.');
        });
    });

    // ==========================================
    // 3. GALLERY CATEGORY FILTER
    // ==========================================
    const filterBtns = document.querySelectorAll('.gallery-filters .filter-btn');
    const galleryCards = document.querySelectorAll('.gallery-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const category = btn.getAttribute('data-cat');
            galleryCards.forEach(card => {
                if (category === 'all' || card.getAttribute('data-cat') === category) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });

    // ==========================================
    // 4. ADMISSION FORM VALIDATION
    // ==========================================
    const admissionForm = document.getElementById('admissionForm');
    const admName = document.getElementById('admName');
    const admEmail = document.getElementById('admEmail');
    const admPhone = document.getElementById('admPhone');
    const admCourse = document.getElementById('admCourse');
    const admPercentage = document.getElementById('admPercentage');
    const admAlert = document.getElementById('admAlert');

    function showError(inputEl, errorId, message) {
        const errEl = document.getElementById(errorId);
        errEl.innerText = message;
        errEl.classList.add('show');
    }

    function clearError(errorId) {
        const errEl = document.getElementById(errorId);
        errEl.classList.remove('show');
    }

    admissionForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        // Name Validation
        if (admName.value.trim().length < 3) {
            showError(admName, 'admNameError', 'Full Name is required (min 3 chars).');
            isValid = false;
        } else {
            clearError('admNameError');
        }

        // Email Validation
        if (!emailRegex.test(admEmail.value.trim())) {
            showError(admEmail, 'admEmailError', 'Please enter a valid email address.');
            isValid = false;
        } else {
            clearError('admEmailError');
        }

        // Phone Validation
        if (!phoneRegex.test(admPhone.value.trim())) {
            showError(admPhone, 'admPhoneError', 'Valid 10-digit phone number is required.');
            isValid = false;
        } else {
            clearError('admPhoneError');
        }

        // Course Selection
        if (admCourse.value === '') {
            showError(admCourse, 'admCourseError', 'Please select a degree course.');
            isValid = false;
        } else {
            clearError('admCourseError');
        }

        // Percentage Check
        const pct = parseFloat(admPercentage.value);
        if (isNaN(pct) || pct < 50 || pct > 100) {
            showError(admPercentage, 'admPercentageError', 'Percentage must be between 50% and 100%.');
            isValid = false;
        } else {
            clearError('admPercentageError');
        }

        if (isValid) {
            admAlert.style.display = 'block';
            admissionForm.reset();
            setTimeout(() => {
                admAlert.style.display = 'none';
            }, 6000);
        }
    });

    // ==========================================
    // 5. CONTACT FORM VALIDATION
    // ==========================================
    const contactForm = document.getElementById('contactForm');
    const cntName = document.getElementById('cntName');
    const cntEmail = document.getElementById('cntEmail');
    const cntMessage = document.getElementById('cntMessage');
    const cntAlert = document.getElementById('cntAlert');

    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        let isValid = true;

        if (cntName.value.trim().length < 3) {
            showError(cntName, 'cntNameError', 'Name is required.');
            isValid = false;
        } else {
            clearError('cntNameError');
        }

        if (!emailRegex.test(cntEmail.value.trim())) {
            showError(cntEmail, 'cntEmailError', 'Valid email is required.');
            isValid = false;
        } else {
            clearError('cntEmailError');
        }

        if (cntMessage.value.trim().length < 5) {
            showError(cntMessage, 'cntMessageError', 'Message must be at least 5 characters.');
            isValid = false;
        } else {
            clearError('cntMessageError');
        }

        if (isValid) {
            cntAlert.style.display = 'block';
            contactForm.reset();
            setTimeout(() => {
                cntAlert.style.display = 'none';
            }, 5000);
        }
    });
});
