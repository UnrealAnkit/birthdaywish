document.addEventListener('DOMContentLoaded', () => {
    // Initialize AOS
    AOS.init({
        duration: 1000,
        once: true,
        offset: 100
    });

    // Initialize birthday messages
    const wishTexts = [
        "Happy Birthday! 🎉",
        "May Your Day Be Magical! ✨",
        "Wishing You Joy & Happiness! 🎈",
        "Here's To Another Amazing Year! 🎂"
    ];

    const wishElement = document.querySelector('.wish-text');
    new TextAnimator(wishElement, wishTexts);

    // Initialize hearts and confetti
    createHearts();
    initConfetti();

    // Photo upload functionality
    const photoCircles = document.querySelectorAll('.photo-circle');
    photoCircles.forEach(circle => {
        circle.addEventListener('click', () => {
            gsap.to(circle, {
                scale: 0.95,
                duration: 0.1,
                yoyo: true,
                repeat: 1
            });
        });
    });

    // Add parallax effect to stars
    document.addEventListener('mousemove', (e) => {
        const stars = document.querySelector('.stars');
        const x = e.clientX / window.innerWidth;
        const y = e.clientY / window.innerHeight;
        
        gsap.to(stars, {
            duration: 1,
            x: x * 50,
            y: y * 50,
            ease: 'power1.out'
        });
    });

    // Initialize message text animation
    const messageText = document.getElementById('message-text');
    const messages = [
        "On this special day, I want to thank you for being such an amazing friend.",
        "Your friendship has brought so much joy and laughter to my life.",
        "May this year bring you endless happiness, success, and all the wonderful things you deserve!"
    ];

    let currentMessageIndex = 0;

    function animateMessage() {
        messageText.textContent = messages[currentMessageIndex];
        const splitText = new SplitText(messageText, { type: "chars" });
        
        gsap.from(splitText.chars, {
            opacity: 0,
            y: 20,
            duration: 0.8,
            stagger: 0.02,
            ease: "back.out",
            onComplete: () => {
                setTimeout(() => {
                    gsap.to(splitText.chars, {
                        opacity: 0,
                        y: -20,
                        duration: 0.5,
                        stagger: 0.02,
                        ease: "back.in",
                        onComplete: () => {
                            currentMessageIndex = (currentMessageIndex + 1) % messages.length;
                            animateMessage();
                        }
                    });
                }, 4000);
            }
        });
    }

    animateMessage();
});