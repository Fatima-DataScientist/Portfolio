document.addEventListener("DOMContentLoaded", () => {
    const title = document.querySelector(".title");
    if (!title) return;

    // Start animation assuming GSAP is loaded via HTML header
    if (typeof gsap !== "undefined") {
        startPortfolioAnimation();
    } else {
        const script = document.createElement("script");
        script.src = "https://cdnjs.cloudflare.com/ajax/libs/gsap/3.12.5/gsap.min.js";
        script.onload = () => startPortfolioAnimation();
        document.head.appendChild(script);
    }

    function revealSection(section) {
        section.classList.add("is-animated");
        const observer = new IntersectionObserver((entries) => {
            entries.forEach((entry) => {
                if (entry.isIntersecting) {
                    section.classList.add("is-visible");
                    observer.unobserve(section);
                }
            });
        }, { threshold: 0.18 });
        observer.observe(section);
    }

    document.querySelectorAll(".education-section, .experience-section, .skills-section, .tools-section, .projects-section").forEach(revealSection);

    function startPortfolioAnimation() {
        const text = title.textContent.trim();
        title.textContent = "";

        [...text].forEach((letter) => {
            const span = document.createElement("span");
            span.className = "portfolio-letter";
            span.textContent = letter;
            title.appendChild(span);
        });

        const letters = document.querySelectorAll(".portfolio-letter");

        title.style.zIndex = "1";
        const personWrapper = document.querySelector(".person-wrapper");
        if (personWrapper) {
            personWrapper.style.position = "relative";
            personWrapper.style.zIndex = "10";
        }

        letters.forEach((letter) => {
            letter.style.display = "inline-block";
            letter.style.position = "relative";
        });

        gsap.set(letters, {
            x: 0,
            y: 0,
            scale: 0.85,
            opacity: 0,
            filter: "blur(4px)"
        });

        const leftLetters = [letters[3], letters[2], letters[1], letters[0]];
        const rightLetters = [letters[4], letters[5], letters[6], letters[7], letters[8]];

        const tl = gsap.timeline();

        leftLetters.forEach((letter, index) => {
            tl.to(letter, {
                x: -(70 + index * 55),
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.65,
                ease: "power3.out"
            }, index * 0.12);
        });

        rightLetters.forEach((letter, index) => {
            tl.to(letter, {
                x: (70 + index * 55),
                opacity: 1,
                scale: 1,
                filter: "blur(0px)",
                duration: 0.65,
                ease: "power3.out"
            }, index * 0.12);
        });

        tl.to(letters, {
            scale: 1,
            duration: 0.35,
            ease: "power2.out"
        });

        gsap.from(".top-nav li", {
            y: -25,
            opacity: 0,
            duration: 0.8,
            stagger: 0.1,
            ease: "power3.out",
            delay: 0.2
        });
    }
});
