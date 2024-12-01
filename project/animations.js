class TextAnimator {
    constructor(element, texts) {
        this.element = element;
        this.texts = texts;
        this.currentIndex = 0;
        this.init();
    }

    init() {
        this.animate();
        setInterval(() => this.animate(), 4000);
    }

    animate() {
        gsap.to(this.element, {
            opacity: 0,
            y: -20,
            duration: 0.5,
            onComplete: () => {
                this.element.textContent = this.texts[this.currentIndex];
                gsap.to(this.element, {
                    opacity: 1,
                    y: 0,
                    duration: 0.5
                });
                this.currentIndex = (this.currentIndex + 1) % this.texts.length;
            }
        });
    }
}

// Create floating hearts
function createHearts() {
    const hearts = document.querySelectorAll('.heart');
    hearts.forEach((heart, index) => {
        const delay = index * 2;
        heart.style.left = `${Math.random() * 100}%`;
        heart.style.animationDelay = `${delay}s`;
    });
}

// Initialize confetti
function initConfetti() {
    const confettiColors = ['#ff6b6b', '#ffd700', '#4ecdc4', '#ff8e8e'];
    const confettiContainer = document.querySelector('.confetti');
    
    for (let i = 0; i < 50; i++) {
        const confetti = document.createElement('div');
        confetti.className = 'confetti-piece';
        confetti.style.backgroundColor = confettiColors[Math.floor(Math.random() * confettiColors.length)];
        confetti.style.left = `${Math.random() * 100}%`;
        confetti.style.animationDelay = `${Math.random() * 3}s`;
        confettiContainer.appendChild(confetti);
    }
}