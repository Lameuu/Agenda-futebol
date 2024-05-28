// JavaScript para controlar o carrossel
let currentSlide = 0;
const slides = document.querySelectorAll('.carousel-item');
const totalSlides = slides.length;

function showSlide(n) {
    slides.forEach(slide => {
        slide.classList.remove('active');
    });
    slides[n].classList.add('active');
    currentSlide = n;
}

function prevSlide() {
    currentSlide--;
    if (currentSlide < 0) {
        currentSlide = totalSlides - 1;
    }
    showSlide(currentSlide);
}

function nextSlide() {
    currentSlide++;
    if (currentSlide >= totalSlides) {
        currentSlide = 0;
    }
    showSlide(currentSlide);
}

// Inicia o carrossel automaticamente
let autoSlide = setInterval(nextSlide, 3000);

// Pára o carrossel quando o mouse passa por cima
document.querySelector('.carousel').addEventListener('mouseover', () => {
    clearInterval(autoSlide);
});

// Continua o carrossel quando o mouse sai
document.querySelector('.carousel').addEventListener('mouseleave', () => {
    autoSlide = setInterval(nextSlide, 3000);
});
