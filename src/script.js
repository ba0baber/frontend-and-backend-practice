
class ThemeManager {
    constructor() {
        this.themeToggle = document.getElementById('themeToggle');
        this.themeIcon = this.themeToggle.querySelector('.theme-toggle__icon');
        this.themeText = this.themeToggle.querySelector('.theme-toggle__text');
        this.currentTheme = localStorage.getItem('theme') || 'light';
        
        this.init();
    }
    
    init() {
        this.applyTheme(this.currentTheme);
        this.themeToggle.addEventListener('click', () => this.toggleTheme());
    }
    
    toggleTheme() {
        this.currentTheme = this.currentTheme === 'light' ? 'dark' : 'light';
        this.applyTheme(this.currentTheme);
        this.saveTheme();
    }
    
    applyTheme(theme) {
        document.body.setAttribute('data-theme', theme);
        
        
        document.body.classList.add('theme-transition');
        setTimeout(() => {
            document.body.classList.remove('theme-transition');
        }, 300);
        
        
        if (theme === 'dark') {
            this.themeIcon.textContent = '☀️';
            this.themeText.textContent = 'Светлая тема';
        } else {
            this.themeIcon.textContent = '🌙';
            this.themeText.textContent = 'Тёмная тема';
        }
    }
    
    saveTheme() {
        localStorage.setItem('theme', this.currentTheme);
    }
}


document.addEventListener('DOMContentLoaded', () => {
    new ThemeManager();
    
    
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach(card => {
        card.addEventListener('click', (e) => {
            if (!e.target.classList.contains('product-card__button')) {
                card.classList.toggle('product-card--selected');
                card.setAttribute('data-state', 
                    card.classList.contains('product-card--selected') ? 'selected' : 'default'
                );
            }
        });
    });
});