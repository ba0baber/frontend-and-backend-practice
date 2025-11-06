class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.init();
    }
    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme(savedTheme);
        if (this.themeToggle) {
            this.themeToggle.addEventListener('click', () => this.toggleTheme());
        }
        this.initContactModal();
    }
    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        localStorage.setItem('theme', theme);
        
        
        const themeToggles = document.querySelectorAll('#themeToggle, .theme-toggle');
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('.theme-toggle__icon, .bi');
            const text = toggle.querySelector('.theme-toggle__text'); 
            
            if (theme === 'dark') {
                if (icon) {
                    if (icon.classList.contains('bi-moon')) {
                        icon.classList.replace('bi-moon', 'bi-sun');
                    } else {
                        icon.textContent = '☀️';
                    }
                }
                if (text) text.textContent = 'Светлая тема';
            } else {
                if (icon) {
                    if (icon.classList.contains('bi-sun')) {
                        icon.classList.replace('bi-sun', 'bi-moon');
                    } else {
                        icon.textContent = '🌙';
                    }
                }
                if (text) text.textContent = 'Тёмная тема';
            }
        });
    }
    initContactModal() {
        const contactModal = document.getElementById('contactModal');
        const feedbackForm = document.getElementById('feedbackForm');
        const cancelButton = document.getElementById('cancelButton');
        if (!contactModal || !feedbackForm) return;
        if (cancelButton) {
            cancelButton.addEventListener('click', function() {
                feedbackForm.reset();
                contactModal.close();
            });
        }
        contactModal.addEventListener('click', function(event) {
            if (event.target === this) {
                this.close();
                feedbackForm.reset();
            }
        });
        feedbackForm.addEventListener('keypress', function(event) {
            if (event.key === 'Enter' && event.target.type !== 'textarea') {
                event.preventDefault();
            }
        });
    }
}
function clearForm() {
    const form = document.getElementById('feedbackForm');
    if (form) {
        form.reset();
    }
    const modal = document.getElementById('contactModal');
    if (modal) {
        modal.close();
    }
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
document.addEventListener('DOMContentLoaded', function() {
    new ThemeManager();
    const themeToggle = document.getElementById('themeToggle');
    if (themeToggle && !themeToggle.querySelector('.theme-toggle__icon')) {
        const savedTheme = localStorage.getItem('theme') || 'light';
        document.body.setAttribute('data-theme', savedTheme);
        themeToggle.addEventListener('click', function() {
            const currentTheme = document.body.getAttribute('data-theme');
            const newTheme = currentTheme === 'light' ? 'dark' : 'light';
            document.body.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
            if (newTheme === 'dark') {
                themeToggle.innerHTML = '<i class="bi bi-sun"></i> Светлая тема';
            } else {
                themeToggle.innerHTML = '<i class="bi bi-moon"></i> Тёмная тема';
            }
        });
        if (savedTheme === 'dark') {
            themeToggle.innerHTML = '<i class="bi bi-sun"></i> Светлая тема';
        } else {
            themeToggle.innerHTML = '<i class="bi bi-moon"></i> Тёмная тема';
        }
    }
});