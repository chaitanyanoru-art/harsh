const scenes = [...document.querySelectorAll(".scene")];
const progress = document.getElementById("progressBar");
let current = 0;
let locked = false;

function showScene(index) {
  if (index < 0 || index >= scenes.length || locked) return;

  locked = true;

  scenes[current].classList.remove("active");
  current = index;
  scenes[current].classList.add("active");

  progress.style.width =
    `${(current / (scenes.length - 1)) * 100}%`;

  setTimeout(() => {
    locked = false;
  }, 850);
}

function nextScene() {
  showScene(current + 1);
}

document.getElementById("beginBtn").addEventListener("click", nextScene);

document.querySelectorAll(".next-btn").forEach(button => {
  button.addEventListener("click", nextScene);
});

document.getElementById("starButton").addEventListener("click", () => {
  showScene(5);
});

document.getElementById("replayBtn").addEventListener("click", () => {
  scenes[current].classList.remove("active");
  current = 0;
  scenes[current].classList.add("active");
  progress.style.width = "0%";
});

/* Wheel navigation: deliberately restrained so it feels like a film. */
let wheelTimer = null;

document.getElementById("film").addEventListener(
  "wheel",
  event => {
    event.preventDefault();

    if (Math.abs(event.deltaY) < 10 || wheelTimer) return;

    wheelTimer = setTimeout(() => {
      wheelTimer = null;
    }, 900);

    if (event.deltaY > 0) nextScene();
    else showScene(current - 1);
  },
  { passive: false }
);

/* Touch swipe navigation. */
let touchStartY = null;

document.getElementById("film").addEventListener(
  "touchstart",
  event => {
    touchStartY = event.changedTouches[0].clientY;
  },
  { passive: true }
);

document.getElementById("film").addEventListener(
  "touchend",
  event => {
    if (touchStartY === null) return;

    const endY = event.changedTouches[0].clientY;
    const distance = touchStartY - endY;

    if (Math.abs(distance) > 55) {
      if (distance > 0) nextScene();
      else showScene(current - 1);
    }

    touchStartY = null;
  },
  { passive: true }
);

/* Keyboard support. */
window.addEventListener("keydown", event => {
  if (event.target.matches("input,textarea,button")) {
    if (event.key !== "Escape") return;
  }

  if (event.key === "ArrowDown" || event.key === "PageDown") {
    event.preventDefault();
    nextScene();
  }

  if (event.key === "ArrowUp" || event.key === "PageUp") {
    event.preventDefault();
    showScene(current - 1);
  }
});

/* Starfield. */
const canvas = document.getElementById("stars");
const ctx = canvas.getContext("2d");
let stars = [];

function resize() {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;

  stars = Array.from({ length: 120 }, () => ({
    x: Math.random() * canvas.width,
    y: Math.random() * canvas.height,
    r: 0.2 + Math.random() * 1.2,
    speed: 0.03 + Math.random() * 0.18,
    alpha: 0.15 + Math.random() * 0.65
  }));
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  for (const star of stars) {
    star.y -= star.speed;

    if (star.y < 0) star.y = canvas.height;

    ctx.globalAlpha = star.alpha;
    ctx.fillStyle = "#d8cfc3";

    ctx.beginPath();
    ctx.arc(star.x, star.y, star.r, 0, Math.PI * 2);
    ctx.fill();
  }

  requestAnimationFrame(animate);
}

resize();
window.addEventListener("resize", resize);
animate();
