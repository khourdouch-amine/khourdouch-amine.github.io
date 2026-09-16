/* =========================================================
   KHOURDOUCH AMINE — RESEARCH PORTFOLIO
   GLOBAL JAVASCRIPT
========================================================= */

document.addEventListener("DOMContentLoaded", () => {

    /* =====================================================
       MOBILE NAVIGATION
    ===================================================== */

    const menu = document.querySelector(".menu");
    const nav = document.querySelector(".header nav");

    menu?.addEventListener("click", () => {
        nav?.classList.toggle("open");

        const isOpen = nav?.classList.contains("open");

        menu?.setAttribute("aria-expanded", isOpen ? "true" : "false");
        menu.textContent = isOpen ? "×" : "☰";
    });

    nav?.querySelectorAll("a").forEach(link => {
        link.addEventListener("click", () => {
            nav?.classList.remove("open");
            menu?.setAttribute("aria-expanded", "false");
            menu.textContent = "☰";
        });
    });


    /* =====================================================
       PROJECT 01 — OPEN / CLOSE
    ===================================================== */

    const project01 = document.querySelector("#project-01");
    const project01Button = document.querySelector('[data-project="project-01"]');
    const project01Detail = document.querySelector("#thermal-project");
    const project01Close = document.querySelector("#project-01-close");
    const project01CloseBottom = document.querySelector("#project-01-close-bottom");

    const openProject01 = () => {
        if (!project01Detail) return;

        project01Detail.classList.add("active");
        project01Detail.setAttribute("aria-hidden", "false");
        project01Button?.setAttribute("aria-expanded", "true");

        setTimeout(() => {
            project01Detail.scrollIntoView({
                behavior: "smooth",
                block: "start"
            });
        }, 100);
    };

    const closeProject01 = () => {
        if (!project01Detail) return;

        project01Detail.classList.remove("active");
        project01Detail.setAttribute("aria-hidden", "true");
        project01Button?.setAttribute("aria-expanded", "false");

        setTimeout(() => {
            project01?.scrollIntoView({
                behavior: "smooth",
                block: "center"
            });
        }, 100);
    };

    project01Button?.addEventListener("click", openProject01);
    project01Close?.addEventListener("click", closeProject01);
    project01CloseBottom?.addEventListener("click", closeProject01);


    /* =====================================================
       ESCAPE KEY
    ===================================================== */

    document.addEventListener("keydown", event => {
        if (event.key !== "Escape") return;

        if (project01Detail?.classList.contains("active")) {
            closeProject01();
        }

        if (nav?.classList.contains("open")) {
            nav.classList.remove("open");
            menu?.setAttribute("aria-expanded", "false");
            menu.textContent = "☰";
        }
    });


    /* =====================================================
       INITIAL ACCESSIBILITY STATE
    ===================================================== */

    menu?.setAttribute("aria-expanded", "false");
    project01Button?.setAttribute("aria-expanded", "false");

    if (project01Detail) {
        project01Detail.setAttribute("aria-hidden", "true");
    }

});
