document.addEventListener('DOMContentLoaded', () => {
    lucide.createIcons();

    // Theme Toggle
    const themeToggles = document.querySelectorAll('.theme-toggle');
    const root = document.documentElement;
    const currentTheme = localStorage.getItem('theme') || 'light';
    
    root.setAttribute('data-theme', currentTheme);
    
    themeToggles.forEach(themeToggle => {
        themeToggle.addEventListener('click', () => {
            const newTheme = root.getAttribute('data-theme') === 'light' ? 'dark' : 'light';
            root.setAttribute('data-theme', newTheme);
            localStorage.setItem('theme', newTheme);
        });
    });

    // Mobile Menu
    const hamburger = document.querySelector('.hamburger');
    const mobileMenu = document.querySelector('.mobile-menu');
    const navLinks = document.querySelectorAll('.mobile-menu a');

    if (hamburger && mobileMenu) {
        hamburger.addEventListener('click', () => {
            hamburger.classList.toggle('active');
            mobileMenu.classList.toggle('active');
            document.body.style.overflow = mobileMenu.classList.contains('active') ? 'hidden' : '';
        });

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            });
        });
    }

    // Navbar Scroll
    const navbar = document.querySelector('.custom-navbar');
    if (navbar) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 50) {
                navbar.classList.add('scrolled');
            } else {
                navbar.classList.remove('scrolled');
            }
        });
    }

    const yearEl = document.getElementById('currentYear');
    if (yearEl) yearEl.textContent = new Date().getFullYear();

    // AOS
    if (typeof AOS !== 'undefined') {
        AOS.init({ duration: 800, once: true, offset: 100, disable: window.matchMedia('(prefers-reduced-motion: reduce)').matches });
    }

    // GSAP
    if (typeof gsap !== 'undefined' && typeof ScrollTrigger !== 'undefined') {
        gsap.registerPlugin(ScrollTrigger);
        
        const heroTitle = document.querySelector('.hero-title');
        if (heroTitle) {
            gsap.fromTo(heroTitle, { y: 50, opacity: 0 }, { y: 0, opacity: 1, duration: 1, ease: 'power3.out' });
            gsap.fromTo('.hero-subtitle', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.2, ease: 'power3.out' });
            gsap.fromTo('.hero-actions', { y: 30, opacity: 0 }, { y: 0, opacity: 1, duration: 1, delay: 0.4, ease: 'power3.out' });
            gsap.fromTo('.hero-visual', { x: 50, opacity: 0, rotateY: 15 }, { x: 0, opacity: 1, rotateY: 0, duration: 1.5, delay: 0.2, ease: 'power3.out' });
        }

        gsap.utils.toArray('.grid-asymmetric').forEach(grid => {
            gsap.from(grid.children, {
                scrollTrigger: { trigger: grid, start: 'top 85%' },
                y: 50, opacity: 0, duration: 0.8, stagger: 0.1, ease: 'power2.out'
            });
        });
    }

    // Swiper
    if (typeof Swiper !== 'undefined') {
        new Swiper('.review-swiper', {
            slidesPerView: 1, spaceBetween: 30,
            pagination: { el: '.swiper-pagination', clickable: true },
            breakpoints: { 768: { slidesPerView: 2 }, 1024: { slidesPerView: 3 } }
        });
    }

    // CountUp
    if (typeof countUp !== 'undefined') {
        const stats = document.querySelectorAll('.stat-num');
        stats.forEach(stat => {
            const endVal = parseInt(stat.getAttribute('data-count'), 10);
            if (endVal) {
                const count = new countUp.CountUp(stat, endVal);
                const observer = new IntersectionObserver((entries) => {
                    if(entries[0].isIntersecting) { count.start(); observer.disconnect(); }
                });
                observer.observe(stat);
            }
        });
    }

    // 3D Tilt
    const tiltCards = document.querySelectorAll('.card-3d');
    tiltCards.forEach(card => {
        if (!window.matchMedia('(prefers-reduced-motion: reduce)').matches && window.innerWidth > 768) {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const x = e.clientX - rect.left;
                const y = e.clientY - rect.top;
                const centerX = rect.width / 2;
                const centerY = rect.height / 2;
                const rotateX = ((y - centerY) / centerY) * -10;
                const rotateY = ((x - centerX) / centerX) * 10;
                card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
            });
            card.addEventListener('mouseleave', () => {
                card.style.transform = `perspective(1000px) rotateX(0deg) rotateY(0deg) scale3d(1, 1, 1)`;
            });
        }
    });

    // Password Toggle
    document.querySelectorAll('.toggle-password').forEach(toggle => {
        toggle.addEventListener('click', function() {
            const input = document.getElementById(this.getAttribute('data-target'));
            if (input.type === 'password') {
                input.type = 'text';
                this.innerHTML = '<i data-lucide="eye-off"></i>';
            } else {
                input.type = 'password';
                this.innerHTML = '<i data-lucide="eye"></i>';
            }
            lucide.createIcons();
        });
    });

    // Dummy Form
    document.querySelectorAll('form').forEach(form => {
        form.addEventListener('submit', (e) => {
            if(!form.classList.contains('search-form')) {
                e.preventDefault();
                const btn = form.querySelector('button[type="submit"]');
                if(btn) {
                    const ogText = btn.innerHTML;
                    btn.innerHTML = 'Processing...';
                    btn.disabled = true;
                    setTimeout(() => {
                        btn.innerHTML = 'Success!';
                        btn.style.backgroundColor = 'var(--success-green)';
                        setTimeout(() => {
                            btn.innerHTML = ogText;
                            btn.disabled = false;
                            btn.style.backgroundColor = '';
                            form.reset();
                        }, 2000);
                    }, 1500);
                }
            }
        });
    });

    // Simple Filtering Logic (Gadgets & Articles)
    const filterBtns = document.querySelectorAll('.filter-btn');
    const filterItems = document.querySelectorAll('.filter-item');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            const filter = btn.getAttribute('data-filter');
            
            filterItems.forEach(item => {
                if (filter === 'all' || item.getAttribute('data-category') === filter) {
                    item.style.display = 'block';
                    setTimeout(() => { item.style.opacity = '1'; item.style.transform = 'scale(1)'; }, 50);
                } else {
                    item.style.opacity = '0';
                    item.style.transform = 'scale(0.9)';
                    setTimeout(() => { item.style.display = 'none'; }, 300);
                }
            });
        });
    });

    // Cart System
    let storedCart = localStorage.getItem('tech_intel_cart');
    let cart = storedCart ? JSON.parse(storedCart) : [
        { name: "Nova X1", price: "$799", quantity: 1 },
        { name: "AirPods Pro 2", price: "$249", quantity: 1 }
    ];
    if (!storedCart) {
        localStorage.setItem('tech_intel_cart', JSON.stringify(cart));
    }

    const updateCartBadges = () => {
        const totalCount = cart.reduce((acc, item) => acc + (item.quantity || 1), 0);
        document.querySelectorAll('.nav-cart-badge').forEach(badge => {
            badge.textContent = totalCount;
            badge.style.display = totalCount > 0 ? 'flex' : 'none';
        });
        renderCartModal();
    };

    const renderCartModal = () => {
        const cartList = document.getElementById('cartItemsList');
        const cartTotalEl = document.getElementById('cartTotalPrice');
        if (!cartList) return;

        if (cart.length === 0) {
            cartList.innerHTML = `
                <div class="text-center py-4 text-secondary">
                    <i data-lucide="shopping-cart" class="w-12 h-12 mb-2 opacity-50 d-inline-block"></i>
                    <h6 class="fw-semibold text-primary mt-2">Your cart is empty</h6>
                    <p class="text-sm mb-3">Looks like you haven't added any devices yet.</p>
                    <a href="gadgets.html" class="btn-primary-custom py-2 px-4 text-sm" data-bs-dismiss="modal">
                        <i data-lucide="sparkles" class="w-4 h-4"></i> Browse Gadgets
                    </a>
                </div>
            `;
            if (cartTotalEl) cartTotalEl.textContent = '$0.00';
            lucide.createIcons();
            return;
        }

        let total = 0;
        cartList.innerHTML = cart.map((item, idx) => {
            const priceNum = parseFloat(item.price.replace(/[^0-9.]/g, '')) || 0;
            const qty = item.quantity || 1;
            total += priceNum * qty;
            return `
                <div class="d-flex align-items-center justify-content-between py-2 border-bottom border-color">
                    <div class="me-2 flex-grow-1">
                        <strong class="d-block text-sm">${item.name}</strong>
                        <span class="text-secondary text-sm">${item.price} each</span>
                    </div>
                    <div class="d-flex align-items-center gap-2">
                        <div class="d-inline-flex align-items-center border border-color rounded-pill px-2 py-0">
                            <button class="btn btn-sm p-0 text-secondary cart-qty-minus" data-index="${idx}" style="line-height:1; font-weight:bold; width:16px;">−</button>
                            <span class="px-2 text-sm fw-semibold">${qty}</span>
                            <button class="btn btn-sm p-0 text-secondary cart-qty-plus" data-index="${idx}" style="line-height:1; font-weight:bold; width:16px;">+</button>
                        </div>
                        <span class="text-accent fw-bold text-sm min-w-60 text-end">$${(priceNum * qty).toFixed(2)}</span>
                        <button class="btn btn-sm btn-link text-danger p-0 ms-1 remove-cart-item" data-index="${idx}" aria-label="Remove item"><i data-lucide="trash-2" class="w-4 h-4"></i></button>
                    </div>
                </div>
            `;
        }).join('');

        if (cartTotalEl) cartTotalEl.textContent = `$${total.toFixed(2)}`;
        lucide.createIcons();

        cartList.querySelectorAll('.cart-qty-plus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'), 10);
                if (cart[index]) {
                    cart[index].quantity = (cart[index].quantity || 1) + 1;
                    localStorage.setItem('tech_intel_cart', JSON.stringify(cart));
                    updateCartBadges();
                }
            });
        });

        cartList.querySelectorAll('.cart-qty-minus').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'), 10);
                if (cart[index]) {
                    if ((cart[index].quantity || 1) > 1) {
                        cart[index].quantity = cart[index].quantity - 1;
                    } else {
                        cart.splice(index, 1);
                    }
                    localStorage.setItem('tech_intel_cart', JSON.stringify(cart));
                    updateCartBadges();
                }
            });
        });

        cartList.querySelectorAll('.remove-cart-item').forEach(btn => {
            btn.addEventListener('click', () => {
                const index = parseInt(btn.getAttribute('data-index'), 10);
                cart.splice(index, 1);
                localStorage.setItem('tech_intel_cart', JSON.stringify(cart));
                updateCartBadges();
            });
        });
    };

    // Explicit Navbar Cart Button Click Handler
    document.querySelectorAll('.nav-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            // Close mobile menu if open
            const hamburger = document.querySelector('.hamburger');
            const mobileMenu = document.querySelector('.mobile-menu');
            if (hamburger && mobileMenu) {
                hamburger.classList.remove('active');
                mobileMenu.classList.remove('active');
                document.body.style.overflow = '';
            }
            // Always reload latest cart
            const currentStored = localStorage.getItem('tech_intel_cart');
            if (currentStored) {
                cart = JSON.parse(currentStored);
            }
            updateCartBadges();
            const modalEl = document.getElementById('cartModal');
            if (modalEl && typeof bootstrap !== 'undefined') {
                const modalInstance = bootstrap.Modal.getOrCreateInstance(modalEl);
                modalInstance.show();
            }
        });
    });

    document.querySelectorAll('.add-to-cart-btn').forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            const name = btn.getAttribute('data-name');
            const price = btn.getAttribute('data-price') || '$299';
            const existing = cart.find(item => item.name === name);
            if (existing) {
                existing.quantity = (existing.quantity || 1) + 1;
            } else {
                cart.push({ name, price, quantity: 1 });
            }
            localStorage.setItem('tech_intel_cart', JSON.stringify(cart));
            updateCartBadges();

            const ogHtml = btn.innerHTML;
            btn.innerHTML = '<i data-lucide="check" class="w-4 h-4"></i> Added!';
            btn.style.backgroundColor = 'var(--success-green)';
            lucide.createIcons();
            setTimeout(() => {
                btn.innerHTML = ogHtml;
                btn.style.backgroundColor = '';
                lucide.createIcons();
            }, 1500);
        });
    });

    updateCartBadges();

    // Back to Top functionality
    const backToTop = document.querySelector('.back-to-top');
    if (backToTop) {
        window.addEventListener('scroll', () => {
            if (window.scrollY > 300) {
                backToTop.classList.add('show');
            } else {
                backToTop.classList.remove('show');
            }
        });
        backToTop.addEventListener('click', (e) => {
            e.preventDefault();
            window.scrollTo({ top: 0, behavior: 'smooth' });
        });
    }
});
