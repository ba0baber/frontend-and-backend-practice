
class ThemeManager {
    constructor() {
        this.init();
    }

    init() {
        const savedTheme = localStorage.getItem('theme') || 'light';
        this.applyTheme(savedTheme);
        this.addThemeToggleListeners();
        this.initContactModal();
    }

    addThemeToggleListeners() {
        const themeToggles = document.querySelectorAll('#themeToggle, .theme-toggle');
        themeToggles.forEach(toggle => {
            toggle.addEventListener('click', () => this.toggleTheme());
        });
    }

    toggleTheme() {
        const currentTheme = document.body.getAttribute('data-theme') || 'light';
        const newTheme = currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(newTheme);
        localStorage.setItem('theme', newTheme);
    }

    applyTheme(theme) {
        console.log('Applying theme:', theme); 
        document.body.setAttribute('data-theme', theme);
        
       
        this.updateThemeSwitchers(theme);
    }

    updateThemeSwitchers(theme) {
        const themeToggles = document.querySelectorAll('#themeToggle, .theme-toggle');
        
        themeToggles.forEach(toggle => {
            const icon = toggle.querySelector('.theme-toggle__icon, .bi');
            const text = toggle.querySelector('.theme-toggle__text'); 
            
            if (theme === 'dark') {
                if (icon) {
                    if (icon.classList.contains('bi-moon')) {
                        icon.classList.replace('bi-moon', 'bi-sun');
                    } else if (icon.classList.contains('bi-sun')) {
                     
                    } else {
                        icon.textContent = '☀️';
                    }
                }
                if (text) text.textContent = 'Светлая тема';
            } else {
                if (icon) {
                    if (icon.classList.contains('bi-sun')) {
                        icon.classList.replace('bi-sun', 'bi-moon');
                    } else if (icon.classList.contains('bi-moon')) {
                       
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
        
        if (!contactModal || !feedbackForm) {
            console.log('Modal elements not found');
            return;
        }

        if (cancelButton) {
            cancelButton.addEventListener('click', () => {
                console.log('Cancel button clicked');
                feedbackForm.reset();
                contactModal.close();
            });
        }

      
        contactModal.addEventListener('click', (event) => {
            if (event.target === contactModal) {
                feedbackForm.reset();
                contactModal.close();
            }
        });

        feedbackForm.addEventListener('keypress', (event) => {
            if (event.key === 'Enter' && event.target.type !== 'textarea') {
                event.preventDefault();
            }
        });
    }
}

function clearForm() {
    console.log('clearForm called');
    const form = document.getElementById('feedbackForm');
    const modal = document.getElementById('contactModal');
    
    if (form) form.reset();
    if (modal) modal.close();
}

function submitForm() {
    console.log('submitForm called');
    const form = document.getElementById('feedbackForm');
    const contactModal = document.getElementById('contactModal');
    
    if (!form || !contactModal) {
        console.error('Form or modal not found');
        return;
    }

    if (!form.checkValidity()) {
        form.reportValidity();
        return;
    }

    const formData = new FormData(form);
    const data = {
        name: formData.get('name'),
        phone: formData.get('phone'),
        email: formData.get('email'),
        category: formData.get('category'),
        message: formData.get('message')
    };

    console.log('Form data:', data);
    alert('Спасибо! Ваше обращение отправлено. Мы свяжемся с вами в ближайшее время.');
    
    contactModal.close();
    form.reset();
}

document.addEventListener('DOMContentLoaded', function() {
    console.log('DOM loaded, initializing ThemeManager');
    new ThemeManager();
});