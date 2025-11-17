/* ----------------------------
   BACKGROUND ANIMATION
----------------------------- */

const canvas = document.getElementById("bg");
const ctx = canvas.getContext("2d");

let dots = [];

function resize() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resize();
window.onresize = resize;

class Dot {
    constructor() {
        this.x = Math.random() * canvas.width;
        this.y = Math.random() * canvas.height;
        this.vx = (Math.random() - 0.5) * 0.6;
        this.vy = (Math.random() - 0.5) * 0.6;
        this.size = 2;
    }

    update() {
        this.x += this.vx;
        this.y += this.vy;

        if (this.x < 0 || this.x > canvas.width) this.vx *= -1;
        if (this.y < 0 || this.y > canvas.height) this.vy *= -1;
    }

    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = "rgba(0,200,255,0.8)";
        ctx.fill();
    }
}

// Create dots
for (let i = 0; i < 80; i++) dots.push(new Dot());

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    // update + draw dots
    dots.forEach(dot => {
        dot.update();
        dot.draw();
    });

    // draw lines between dots
    for (let i = 0; i < dots.length; i++) {
        for (let j = i + 1; j < dots.length; j++) {
            let dx = dots[i].x - dots[j].x;
            let dy = dots[i].y - dots[j].y;
            let distance = Math.sqrt(dx * dx + dy * dy);

            if (distance < 130) {
                ctx.beginPath();
                ctx.strokeStyle = "rgba(0,200,255,0.12)";
                ctx.lineWidth = 1;
                ctx.moveTo(dots[i].x, dots[i].y);
                ctx.lineTo(dots[j].x, dots[j].y);
                ctx.stroke();
            }
        }
    }

    requestAnimationFrame(animate);
}
animate();


/* ----------------------------
   SMOOTH SCROLLING
----------------------------- */

document.querySelectorAll("nav a").forEach(link => {
    link.addEventListener("click", function (e) {
        if (this.hash !== "") {
            e.preventDefault();
            const target = document.querySelector(this.hash);
            window.scrollTo({
                top: target.offsetTop - 60,
                behavior: "smooth"
            });
        }
    });
});


/* ----------------------------
   SCROLL SPY (highlight menu)
----------------------------- */

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".nav-links a");

window.addEventListener("scroll", () => {
    let current = "";

    sections.forEach(section => {
        const sectionTop = section.offsetTop - 80;
        if (pageYOffset >= sectionTop) {
            current = section.getAttribute("id");
        }
    });

    navLinks.forEach(a => {
        a.classList.remove("active");
        if (a.getAttribute("href") === `#${current}`) {
            a.classList.add("active");
        }
    });
});
