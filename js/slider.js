const slider = document.getElementById('slider');
const slides = document.querySelectorAll('.slide');
const prevButton = document.getElementById('prev');
const nextButton = document.getElementById('next');
const indicators = document.querySelectorAll('[data-index]');

let currentIndex = 0;
let visibleSlides = 3;
let slideWidth = slides[0].offsetWidth; 

function updateSliderDimensions() {
    slideWidth = slides[0].offsetWidth; 
    visibleSlides = window.innerWidth < 768 ? 1 : 3; 
}


function updateSlider() {
    const offset = -currentIndex * slideWidth;
    slider.style.transform = `translateX(${offset}px)`;
    
    
    const activeIndex = Math.floor(currentIndex / visibleSlides);
    indicators.forEach((indicator, index) => {
        if (index === activeIndex) {
            indicator.classList.add('bg-blue-600');
        } else {
            indicator.classList.remove('bg-blue-600');
        }
    });

    checkButtons();
}


function goToSlide(index) {
    const totalSlides = slides.length;
    
    if (index >= 0 && index <= Math.max(0, totalSlides - visibleSlides)) {
        currentIndex = index;
        updateSlider();
    }
}

function checkButtons() {
   
    prevButton.disabled = currentIndex <= 0;
    nextButton.disabled = currentIndex >= slides.length - visibleSlides;
}


prevButton.addEventListener('click', () => {
    if (currentIndex > 0) {
        goToSlide(currentIndex - 1);
    }
});

nextButton.addEventListener('click', () => {
    if (currentIndex < slides.length - visibleSlides) {
        goToSlide(currentIndex + 1);
    }
});


indicators.forEach(indicator => {
    indicator.addEventListener('click', (e) => {
        const index = parseInt(e.target.dataset.index);
        goToSlide(index * visibleSlides);
    });
});


window.addEventListener('resize', () => {
    updateSliderDimensions();
    updateSlider();
});


updateSliderDimensions();
updateSlider();
