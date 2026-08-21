function scrollToSection(id) {
    const section = document.getElementById(id);

    if (section) {
        section.scrollIntoView({
            behavior: "smooth"
        });
    }
}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements = document.querySelectorAll(".reveal");

const observer = new IntersectionObserver(
    (entries) => {

        entries.forEach((entry) => {

            if (entry.isIntersecting) {
                entry.target.classList.add("visible");
            }

        });

    },
    {
        threshold: 0.1
    }
);

revealElements.forEach((element) => {
    observer.observe(element);
});


/* =========================
   STAR BACKGROUND
========================= */

const canvas = document.getElementById("stars");

if (canvas) {

    const ctx = canvas.getContext("2d");

    let width;
    let height;
    let stars = [];

    function resizeCanvas() {

        width = window.innerWidth;
        height = window.innerHeight;

        canvas.width = width;
        canvas.height = height;

        stars = [];

        for (let i = 0; i < 130; i++) {

            stars.push({
                x: Math.random() * width,
                y: Math.random() * height,
                radius: Math.random() * 1.2 + 0.2,
                speed: Math.random() * 0.2 + 0.03,
                opacity: Math.random() * 0.7 + 0.2
            });

        }
    }


    function animateStars() {

        ctx.clearRect(
            0,
            0,
            width,
            height
        );

        stars.forEach((star) => {

            star.y -= star.speed;

            if (star.y < 0) {
                star.y = height;
            }

            ctx.globalAlpha = star.opacity;

            ctx.fillStyle = "#d7cdbf";

            ctx.beginPath();

            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );

            ctx.fill();

        });

        requestAnimationFrame(animateStars);
    }


    resizeCanvas();

    window.addEventListener(
        "resize",
        resizeCanvas
    );

    animateStars();
}
