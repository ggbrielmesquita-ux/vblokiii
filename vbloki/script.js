document.addEventListener('DOMContentLoaded', () => {
    
    /* ================= A. CARROSSEL INFINITO (PRIORIDADE) ================= */
    const track = document.querySelector('.carousel-track');
    if(track) {
        // Verifica se já tem muitos itens para não duplicar infinitamente se o script rodar 2x
        if(track.children.length < 10) { 
            track.innerHTML += track.innerHTML;
        }
    }

    /* ================= B. MENU MOBILE ================= */
    const mobileBtn = document.querySelector('.mobile-toggle');
    const navList = document.querySelector('nav ul');
    const navLinks = document.querySelectorAll('nav ul li a');

    if(mobileBtn) {
        mobileBtn.addEventListener('click', () => {
            navList.classList.toggle('active');
            const icon = mobileBtn.querySelector('i');
            if(navList.classList.contains('active')) {
                icon.classList.remove('fa-bars');
                icon.classList.add('fa-xmark');
            } else {
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            }
        });

        // Fecha menu ao clicar
        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                navList.classList.remove('active');
                const icon = mobileBtn.querySelector('i');
                icon.classList.remove('fa-xmark');
                icon.classList.add('fa-bars');
            });
        });
    }

    /* ================= C. ANIMAÇÃO AO ROLAR (SCROLL REVEAL) ================= */
    const revealElements = document.querySelectorAll('.scroll-reveal');
    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
            }
        });
    }, { threshold: 0.1 });
    revealElements.forEach(el => observer.observe(el));

    /* ================= D. CONTADOR DE NÚMEROS ================= */
    const counters = document.querySelectorAll('.counter');
    let hasCounted = false;

    // Pequeno atraso para garantir que a tela carregou
    setTimeout(() => {
        if(hasCounted) return;
        hasCounted = true;

        counters.forEach(counter => {
            const target = +counter.getAttribute('data-target');
            const duration = 2000; 
            const increment = target / (duration / 16); 

            let current = 0;
            const updateCounter = () => {
                current += increment;
                if(current < target) {
                    counter.innerText = Math.ceil(current);
                    requestAnimationFrame(updateCounter);
                } else {
                    counter.innerText = target;
                }
            };
            updateCounter();
        });
    }, 500);

    /* ================= E. FAQ (PERGUNTAS) ================= */
    const faqQuestions = document.querySelectorAll('.faq-question');
    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const activeQuestion = document.querySelector('.faq-question.active');
            if(activeQuestion && activeQuestion !== question) {
                activeQuestion.classList.remove('active');
                activeQuestion.nextElementSibling.classList.remove('active');
            }
            question.classList.toggle('active');
            question.nextElementSibling.classList.toggle('active');
        });
    });
});