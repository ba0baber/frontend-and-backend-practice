class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle?.querySelector('.theme-toggle__icon');
        this.themeText = this.themeToggle?.querySelector('.theme-toggle__text');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }

        this.addInteractiveStates();
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        localStorage.setItem('theme', this.currentTheme);
    }
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        if (this.themeIcon && this.themeText) {
            if (theme === 'dark') {
                this.themeIcon.textContent = '☀️';
                this.themeText.textContent = 'Светлая тема';
            } else {
                this.themeIcon.textContent = '🌙';
                this.themeText.textContent = 'Тёмная тема';
            }
        }
    }
    
    addInteractiveStates() {
        const interactiveElements = document.querySelectorAll(
            '.nav__link, .project-card__button, .product-card__button, .theme-toggle, .skill'
        );
        
        interactiveElements.forEach(element => {
            element.addEventListener('mouseenter', this.handleMouseEnter);
            element.addEventListener('mouseleave', this.handleMouseLeave);
            element.addEventListener('mousedown', this.handleMouseDown);
            element.addEventListener('mouseup', this.handleMouseUp);
        });
    }
    
    handleMouseEnter(e) {
        e.target.style.transition = 'all 0.3s ease';
    }
    
    handleMouseLeave(e) {
        e.target.style.transition = 'all 0.3s ease';
    }
    
    handleMouseDown(e) {
        e.target.style.transform = 'translateY(1px)';
    }
    
    handleMouseUp(e) {
        e.target.style.transform = 'translateY(0)';
    }
}

function initContactModal() {
    const contactModal = document.getElementById('contactModal');
    const feedbackForm = document.getElementById('feedbackForm');
    
    if (!contactModal || !feedbackForm) return;
  
    contactModal.addEventListener('click', function(event) {
        if (event.target === this) {
            this.close();
        }
    });

    feedbackForm.addEventListener('keypress', function(event) {
        if (event.key === 'Enter' && event.target.type !== 'textarea') {
            event.preventDefault();
        }
    });
}

function submitForm() {
    const form = document.getElementById('feedbackForm');
    const contactModal = document.getElementById('contactModal');
    
    if (!form || !contactModal) return;
    
    const formData = new FormData(form);

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };

    console.log('Данные формы:', data);

    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');

    contactModal.close();
    form.reset();
}

document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    initContactModal();
    
    const animatedElements = document.querySelectorAll('.profile__card, .about, .skill, .project-card, .product-card');
    animatedElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(20px)';
        element.style.transition = 'all 0.6s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, 100 * index);
    });
});