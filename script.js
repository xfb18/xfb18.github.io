// 语言切换功能
let currentLang = 'zh';

function toggleLanguage() {
    currentLang = currentLang === 'zh' ? 'en' : 'zh';
    document.body.classList.toggle('en', currentLang === 'en');
    updateLanguage();
}

function updateLanguage() {
    // 更新语言切换按钮
    const langBtn = document.querySelector('.lang-toggle');
    langBtn.textContent = currentLang === 'zh' ? 'EN' : '中';

    // 更新所有带有 data-zh 和 data-en 的元素
    document.querySelectorAll('[data-zh]').forEach(el => {
        const zhText = el.getAttribute('data-zh');
        const enText = el.getAttribute('data-en');

        if (currentLang === 'zh') {
            // 保留英文内容中的空格和特殊字符
            el.textContent = zhText || el.textContent;
        } else {
            el.textContent = enText || el.textContent;
        }
    });

    // 更新 HTML lang 属性
    document.documentElement.lang = currentLang === 'zh' ? 'zh-CN' : 'en';
}

// 滚动动画
function handleScrollAnimation() {
    const elements = document.querySelectorAll('.section, .research-card, .course-card, .pub-item');

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    });

    elements.forEach(el => {
        el.classList.add('fade-in');
        observer.observe(el);
    });
}

// 平滑滚动
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// 导航栏滚动效果
function handleNavScroll() {
    const navbar = document.querySelector('.navbar');
    let lastScroll = 0;

    window.addEventListener('scroll', () => {
        const currentScroll = window.pageYOffset;

        if (currentScroll > 50) {
            navbar.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
        } else {
            navbar.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
        }

        lastScroll = currentScroll;
    });
}

// 页面加载完成后初始化
document.addEventListener('DOMContentLoaded', () => {
    initSmoothScroll();
    handleNavScroll();

    // 延迟执行滚动动画，确保元素已渲染
    setTimeout(() => {
        handleScrollAnimation();
    }, 100);
});

// 更新活动导航链接
function updateActiveNav() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav-menu a');

    window.addEventListener('scroll', () => {
        let current = '';

        sections.forEach(section => {
            const sectionTop = section.offsetTop;
            const sectionHeight = section.clientHeight;

            if (pageYOffset >= sectionTop - 200) {
                current = section.getAttribute('id');
            }
        });

        navLinks.forEach(link => {
            link.classList.remove('active');
            if (link.getAttribute('href') === `#${current}`) {
                link.classList.add('active');
            }
        });
    });
}

updateActiveNav();
