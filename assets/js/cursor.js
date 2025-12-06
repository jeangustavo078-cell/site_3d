const cursor = document.querySelector(".cursor");
const outline = document.querySelector(".cursor-outline");

let mouseX = 0;
let mouseY = 0;
let outlineX = 0;
let outlineY = 0;

// pega a posição do mouse
document.addEventListener("mousemove", (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;

  // cursor segue exatamente
  cursor.style.transform = `translate(${mouseX}px, ${mouseY}px)`;
});

// animação do outline com atraso
function animateOutline() {
  outlineX += (mouseX - outlineX) * 0.15;
  outlineY += (mouseY - outlineY) * 0.15;

  outline.style.transform = `translate(${outlineX}px, ${outlineY}px)`;

  requestAnimationFrame(animateOutline);
}

animateOutline();

