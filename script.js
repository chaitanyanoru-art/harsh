/* =========================
   SMOOTH NAVIGATION
========================= */

function scrollToSection(id) {

    const section =
        document.getElementById(id);

    if (!section) return;

    section.scrollIntoView({
        behavior: "smooth"
    });
}


/* =========================
   SCROLL REVEAL
========================= */

const revealElements =
    document.querySelectorAll(".reveal");

const observer =
    new IntersectionObserver(
        (entries) => {

            entries.forEach(
                (entry) => {

                    if (
                        entry.isIntersecting
                    ) {

                        entry.target.classList.add(
                            "visible"
                        );

                    }

                }
            );

        },
        {
            threshold: 0.15
        }
    );


revealElements.forEach(
    (element) => {

        observer.observe(element);

    }
);


/* =========================
   STARFIELD
========================= */

const canvas =
    document.getElementById("stars");

const ctx =
    canvas.getContext("2d");

let width;
let height;

let stars = [];


function resizeCanvas() {

    width =
        canvas.width =
        window.innerWidth;

    height =
        canvas.height =
        window.innerHeight;


    stars =
        Array.from(
            {
                length: 130
            },

            () => ({

                x:
                    Math.random()
                    * width,

                y:
                    Math.random()
                    * height,

                radius:
                    0.2 +
                    Math.random()
                    * 1.2,

                speed:
                    0.03 +
                    Math.random()
                    * 0.2,

                opacity:
                    0.2 +
                    Math.random()
                    * 0.7

            })
        );
}


function animateStars() {

    ctx.clearRect(
        0,
        0,
        width,
        height
    );


    stars.forEach(
        (star) => {

            star.y -=
                star.speed;


            if (star.y < 0) {

                star.y =
                    height;

            }


            ctx.globalAlpha =
                star.opacity;


            ctx.fillStyle =
                "#d7cdbf";


            ctx.beginPath();


            ctx.arc(
                star.x,
                star.y,
                star.radius,
                0,
                Math.PI * 2
            );


            ctx.fill();

        }
    );


    requestAnimationFrame(
        animateStars
    );
}


resizeCanvas();

window.addEventListener(
    "resize",
    resizeCanvas
);

animateStars();
