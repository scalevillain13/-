document.addEventListener('DOMContentLoaded', function() {
    console.log('NE GOTOV - сайт загружен');
    
    // Элементы мобильного меню
    const burgerMenu = document.querySelector('.burger-menu');
    const mobileMenu = document.querySelector('.mobile-menu');
    const mobileMenuClose = document.querySelector('.mobile-menu-close');
    const mobileNavLinks = document.querySelectorAll('.mobile-nav-link');
    
    // Элементы модального окна
    const orderModal = document.getElementById('orderModal');
    const modalClose = document.getElementById('modalClose');
    const modalCancel = document.getElementById('modalCancel');
    const orderItemName = document.getElementById('orderItemName');
    const orderItemPrice = document.getElementById('orderItemPrice');
    
// Открытие мобильного меню
if (burgerMenu && mobileMenu) {
    burgerMenu.addEventListener('click', function(e) {
        e.stopPropagation();
        this.classList.toggle('active');
        
        // Добавляем небольшую задержку для плавности
        if (this.classList.contains('active')) {
            mobileMenu.style.display = 'flex';
            // Небольшая задержка перед добавлением active для плавности
            setTimeout(() => {
                mobileMenu.classList.add('active');
            }, 10);
        } else {
            mobileMenu.classList.remove('active');
            // Ждем окончания анимации перед скрытием
            setTimeout(() => {
                mobileMenu.style.display = 'none';
            }, 300);
        }
        
        document.body.style.overflow = this.classList.contains('active') ? 'hidden' : '';
    });
}

// Закрытие мобильного меню
if (mobileMenuClose && mobileMenu) {
    mobileMenuClose.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        burgerMenu.classList.remove('active');
        
        // Ждем окончания анимации перед скрытием
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
        
        document.body.style.overflow = '';
    });
}

// Закрытие меню при клике на ссылку
mobileNavLinks.forEach(link => {
    link.addEventListener('click', function() {
        mobileMenu.classList.remove('active');
        burgerMenu.classList.remove('active');
        
        setTimeout(() => {
            mobileMenu.style.display = 'none';
        }, 300);
        
        document.body.style.overflow = '';
    });
});
    
    // Закрытие меню при клике вне его
    document.addEventListener('click', function(e) {
        if (mobileMenu && mobileMenu.classList.contains('active') && 
            !mobileMenu.contains(e.target) && 
            !burgerMenu.contains(e.target)) {
            mobileMenu.classList.remove('active');
            burgerMenu.classList.remove('active');
            document.body.style.overflow = '';
        }
    });
    
// Функции для модального окна заказа
function openOrderModal(itemName, itemPrice) {
    orderItemName.textContent = itemName;
    orderItemPrice.textContent = itemPrice;
    orderModal.classList.add('active');
    // УБРАНА блокировка скролла страницы
}

function closeOrderModal() {
    orderModal.classList.remove('active');
    // УБРАНА разблокировка скролла страницы
}

// Обработчики для модального окна
if (modalClose) {
    modalClose.addEventListener('click', closeOrderModal);
}

if (modalCancel) {
    modalCancel.addEventListener('click', closeOrderModal);
}

// Закрытие модального окна при клике вне его
orderModal.addEventListener('click', function(e) {
    if (e.target === orderModal) {
        closeOrderModal();
    }
});

// Закрытие модального окна при нажатии Escape
document.addEventListener('keydown', function(e) {
    if (e.key === 'Escape' && orderModal.classList.contains('active')) {
        closeOrderModal();
    }
});
    
    // Анимация появления элементов при скролле
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };
    
    const observer = new IntersectionObserver(function(entries) {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('scroll-visible');
            }
        });
    }, observerOptions);
    
    // Наблюдаем за элементами для анимации
    document.querySelectorAll('.feature-card, .menu-item, .step, .contact-item, .delivery-item').forEach(item => {
        observer.observe(item);
    });
    
    // Функция плавной прокрутки
    function smoothScrollTo(targetId) {
        const targetElement = document.getElementById(targetId);
        if (!targetElement) return;
        
        const targetPosition = targetElement.offsetTop - 80;
        window.scrollTo({
            top: targetPosition,
            behavior: 'smooth'
        });
    }
    
    // Обработчики для навигационных ссылок (десктоп)
    document.querySelectorAll('.nav-link[href^="#"]').forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href').substring(1);
            smoothScrollTo(targetId);
        });
    });
    
    // Обработчики CTA кнопок
    document.querySelectorAll('.cta-button').forEach(button => {
        button.addEventListener('click', function() {
            const buttonText = this.textContent.trim();
            
            if (buttonText === 'Смотреть меню') {
                smoothScrollTo('menu-preview');
            }
        });
    });
    
    // Обработчики кнопок "Заказать" в меню
    document.querySelectorAll('.order-button').forEach(button => {
        button.addEventListener('click', function() {
            const menuItem = this.closest('.menu-item');
            const itemName = menuItem.querySelector('h3').textContent;
            const itemPrice = menuItem.querySelector('.price').textContent;
            
            // Открываем модальное окно с информацией о заказе
            openOrderModal(itemName, itemPrice);
            
            console.log(`Открыт заказ: ${itemName} - ${itemPrice}`);
        });
    });
    
    // Наблюдаем за кнопкой CTA для повторной анимации при скролле
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        observer.observe(ctaButton);
    }
    
    // Оптимизация производительности
    let resizeTimeout;
    window.addEventListener('resize', function() {
        clearTimeout(resizeTimeout);
        resizeTimeout = setTimeout(function() {
            console.log('Window resized - оптимизация layout');
        }, 250);
    });
});

setTimeout(() => {
    const ctaButton = document.querySelector('.cta-button');
    if (ctaButton) {
        ctaButton.style.opacity = '1';
        ctaButton.style.transform = 'translateY(0)';
        ctaButton.style.transition = 'all 0.8s ease';
    }
}, 2200); // 2200ms = 2.2 секунды задержки