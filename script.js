// A função só será chamada quando o HTML estiver totalmente carregado
document.addEventListener("DOMContentLoaded", function () {
    
    // --- Lógica do Sidebar e Ancoragem Ativa ---
    const menuToggle = document.getElementById("menuToggle");
    const sidebar = document.getElementById("sidebar");
    const mainContent = document.querySelector(".main-content");
    const navLinks = document.querySelectorAll(".main-nav-sidebar a");
    const sections = document.querySelectorAll("section[id]");
    
    // Pega a referência do ícone dentro do botão
    const menuIcon = menuToggle.querySelector("i");

    // Verifica se os elementos essenciais existem antes de adicionar os listeners
    if (menuToggle && sidebar && mainContent && menuIcon) {
        
        const closeSidebar = () => {
            sidebar.classList.remove("active");
            // Garante que o ícone volte a ser 'barras' ao fechar
            menuIcon.classList.remove("fa-times");
            menuIcon.classList.add("fa-bars");
        };

        menuToggle.addEventListener("click", () => {
            const isSidebarActive = sidebar.classList.toggle("active");

            // Troca o ícone com base no estado do menu
            if (isSidebarActive) {
                menuIcon.classList.remove("fa-bars");
                menuIcon.classList.add("fa-times");
            } else {
                menuIcon.classList.remove("fa-times");
                menuIcon.classList.add("fa-bars");
            }
        });

        navLinks.forEach((link) => {
            link.addEventListener("click", closeSidebar);
        });

        mainContent.addEventListener("click", (event) => {
            if (window.innerWidth <= 768 && sidebar.classList.contains("active") && !sidebar.contains(event.target) && !menuToggle.contains(event.target)) {
                closeSidebar();
            }
        });

        window.addEventListener("resize", () => {
            if (window.innerWidth > 768) {
                closeSidebar();
            }
        });
    }

    // Lógica para destacar o link ativo no scroll
    const activateNavLink = () => {
        let currentActiveSection = null;
        const offset = window.innerHeight * 0.4;

        sections.forEach((section) => {
            const sectionRect = section.getBoundingClientRect();
            if (sectionRect.top <= offset && sectionRect.bottom >= offset) {
                currentActiveSection = section.id;
            }
        });

        navLinks.forEach((link) => {
            link.classList.remove("active");
            if (link.getAttribute("href").substring(1) === currentActiveSection) {
                link.classList.add("active");
            }
        });
    };

    window.addEventListener("scroll", activateNavLink);
    window.addEventListener("load", activateNavLink);

    // --- Lógica do Carrossel de Depoimentos ---
    const testimonialDisplayContainer = document.querySelector(".testimonial-display-container");
    if (testimonialDisplayContainer) {
        const testimonialCards = testimonialDisplayContainer.querySelectorAll(".testimonial-card");
        let currentIndex = 0;
        
        if (testimonialCards.length > 0) {
            const showTestimonial = (index) => {
                testimonialCards.forEach((card, i) => {
                    card.style.opacity = (i === index) ? '1' : '0';
                    card.style.visibility = (i === index) ? 'visible' : 'hidden';
                });
            };

            const nextTestimonial = () => {
                currentIndex = (currentIndex + 1) % testimonialCards.length;
                showTestimonial(currentIndex);
            };

            setInterval(nextTestimonial, 4000);
            showTestimonial(currentIndex);
        }
    }
});