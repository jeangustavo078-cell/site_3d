// Smooth scroll
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.onclick = () => {
    const id = link.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  };
});

const divs = document.querySelectorAll('.testimonial-card');

// ativa/desativa clicando na div
divs.forEach(div => {
  div.addEventListener('click', (e) => {
    // impede que o clique suba para o document
    e.stopPropagation();

    // se quiser apenas uma ativa por vez:
    divs.forEach(d => d.classList.remove('div-ativa'));
    div.classList.add('div-ativa');
  });
});

// desativa todas ao clicar fora
document.addEventListener('click', () => {
  divs.forEach(div => div.classList.remove('div-ativa'));
});