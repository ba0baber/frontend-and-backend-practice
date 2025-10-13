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
}

// Функции для модального окна контактов
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
});