// ナビゲーションとスクロール効果
document.addEventListener('DOMContentLoaded', function() {
    const navbar = document.querySelector('.navbar');
    const hamburger = document.querySelector('.hamburger');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // スクロール時のナビゲーション効果
    window.addEventListener('scroll', function() {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });

    // ハンバーガーメニューの制御
    hamburger.addEventListener('click', function() {
        hamburger.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // ナビゲーションリンクのクリック時にメニューを閉じる
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // スムーズスクロール
    navLinks.forEach(link => {
        link.addEventListener('click', function(e) {
            e.preventDefault();
            const targetId = this.getAttribute('href');
            if (targetId.startsWith('#')) {
                const targetSection = document.querySelector(targetId);
                if (targetSection) {
                    targetSection.scrollIntoView({
                        behavior: 'smooth',
                        block: 'start'
                    });
                }
            }
        });
    });

    // パララックス効果
    window.addEventListener('scroll', function() {
        const scrolled = window.pageYOffset;
        const parallaxElements = document.querySelectorAll('.bg-fractal');
        
        parallaxElements.forEach((element, index) => {
            const speed = 0.5 + (index * 0.2);
            const yPos = -(scrolled * speed);
            element.style.transform = `translateY(${yPos}px) rotate(${scrolled * 0.1}deg)`;
        });
    });

    // エネルギー球のインタラクション
    const energySphere = document.querySelector('.energy-sphere');
    if (energySphere) {
        energySphere.addEventListener('mouseenter', function() {
            this.style.transform = 'scale(1.1)';
            this.style.transition = 'transform 0.3s ease';
        });

        energySphere.addEventListener('mouseleave', function() {
            this.style.transform = 'scale(1)';
        });

        // クリック時の特殊効果
        energySphere.addEventListener('click', function() {
            createResonanceEffect(this);
        });
    }

    // 共鳴エフェクトの作成
    function createResonanceEffect(element) {
        const rect = element.getBoundingClientRect();
        const centerX = rect.left + rect.width / 2;
        const centerY = rect.top + rect.height / 2;

        for (let i = 0; i < 8; i++) {
            const particle = document.createElement('div');
            particle.className = 'resonance-particle';
            particle.style.position = 'fixed';
            particle.style.left = centerX + 'px';
            particle.style.top = centerY + 'px';
            particle.style.width = '4px';
            particle.style.height = '4px';
            particle.style.background = 'linear-gradient(45deg, #FFD700, #9370DB)';
            particle.style.borderRadius = '50%';
            particle.style.pointerEvents = 'none';
            particle.style.zIndex = '9999';
            
            document.body.appendChild(particle);

            const angle = (i / 8) * Math.PI * 2;
            const distance = 100;
            const endX = centerX + Math.cos(angle) * distance;
            const endY = centerY + Math.sin(angle) * distance;

            particle.animate([
                {
                    transform: 'translate(-50%, -50%) scale(1)',
                    opacity: 1
                },
                {
                    transform: `translate(${endX - centerX}px, ${endY - centerY}px) scale(0)`,
                    opacity: 0
                }
            ], {
                duration: 1000,
                easing: 'ease-out'
            }).onfinish = () => {
                particle.remove();
            };
        }
    }

    // フラクタルパターンのアニメーション制御
    const fractalLayers = document.querySelectorAll('.fractal-layer');
    let isHovering = false;

    fractalLayers.forEach(layer => {
        layer.addEventListener('mouseenter', function() {
            if (!isHovering) {
                isHovering = true;
                fractalLayers.forEach((l, index) => {
                    l.style.animationDuration = `${2 + index}s`;
                });
            }
        });

        layer.addEventListener('mouseleave', function() {
            isHovering = false;
            fractalLayers.forEach((l, index) => {
                l.style.animationDuration = `${8 + index * 4}s`;
            });
        });
    });

    // 哲学カードのインタラクション
    const philosophyCards = document.querySelectorAll('.philosophy-card');
    philosophyCards.forEach(card => {
        card.addEventListener('mouseenter', function() {
            const icon = this.querySelector('.icon-wrapper');
            if (icon) {
                icon.style.animation = 'none';
                icon.offsetHeight; // リフロー強制
                icon.style.animation = 'cardHover 0.6s ease-in-out';
            }
        });
    });

    // 創造セクションの詳細アイテムのアニメーション
    const detailItems = document.querySelectorAll('.detail-item');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach((entry, index) => {
            if (entry.isIntersecting) {
                setTimeout(() => {
                    entry.target.style.opacity = '1';
                    entry.target.style.transform = 'translateY(0)';
                }, index * 200);
            }
        });
    }, {
        threshold: 0.1
    });

    detailItems.forEach(item => {
        item.style.opacity = '0';
        item.style.transform = 'translateY(30px)';
        item.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
        observer.observe(item);
    });

    // 浮遊要素のインタラクション
    const floatingElements = document.querySelectorAll('.float-element');
    floatingElements.forEach(element => {
        element.addEventListener('click', function() {
            this.style.animation = 'none';
            this.offsetHeight; // リフロー強制
            this.style.animation = 'floatPulse 0.8s ease-in-out';
            
            // テキストの一時的な変更
            const originalText = this.textContent;
            const concepts = ['∞', '✨', '🌟', '🔮', '🌌'];
            const randomConcept = concepts[Math.floor(Math.random() * concepts.length)];
            
            this.textContent = randomConcept;
            setTimeout(() => {
                this.textContent = originalText;
            }, 800);
        });
    });

    // 共鳴ボタンの特殊効果
    const resonanceButton = document.querySelector('.btn-resonance');
    if (resonanceButton) {
        resonanceButton.addEventListener('click', function(e) {
            // 波紋効果の作成
            const ripple = document.createElement('span');
            const rect = this.getBoundingClientRect();
            const size = Math.max(rect.width, rect.height);
            const x = e.clientX - rect.left - size / 2;
            const y = e.clientY - rect.top - size / 2;
            
            ripple.style.width = ripple.style.height = size + 'px';
            ripple.style.left = x + 'px';
            ripple.style.top = y + 'px';
            ripple.classList.add('ripple');
            
            this.appendChild(ripple);
            
            setTimeout(() => {
                ripple.remove();
            }, 600);
        });
    }

    // キーボードナビゲーション
    document.addEventListener('keydown', function(e) {
        if (e.key === 'Escape') {
            hamburger.classList.remove('active');
            navMenu.classList.remove('active');
        }
    });

    // ページ読み込み時のアニメーション
    const animateElements = document.querySelectorAll('[class*="hero-"], .section-header, .philosophy-card, .creation-visual');
    animateElements.forEach((element, index) => {
        element.style.opacity = '0';
        element.style.transform = 'translateY(50px)';
        element.style.transition = 'opacity 0.8s ease, transform 0.8s ease';
        
        setTimeout(() => {
            element.style.opacity = '1';
            element.style.transform = 'translateY(0)';
        }, index * 100);
    });
});

// CSS アニメーションの追加
const style = document.createElement('style');
style.textContent = `
    @keyframes cardHover {
        0% { transform: scale(1) rotate(0deg); }
        50% { transform: scale(1.1) rotate(5deg); }
        100% { transform: scale(1) rotate(0deg); }
    }
    
    @keyframes floatPulse {
        0% { transform: scale(1); }
        50% { transform: scale(1.2); }
        100% { transform: scale(1); }
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleEffect 0.6s linear;
        pointer-events: none;
    }
    
    @keyframes rippleEffect {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
    
    .resonance-particle {
        box-shadow: 0 0 10px currentColor;
    }
    
    .hamburger.active .bar:nth-child(2) {
        opacity: 0;
    }
    
    .hamburger.active .bar:nth-child(1) {
        transform: translateY(7px) rotate(45deg);
    }
    
    .hamburger.active .bar:nth-child(3) {
        transform: translateY(-7px) rotate(-45deg);
    }
`;
document.head.appendChild(style); 