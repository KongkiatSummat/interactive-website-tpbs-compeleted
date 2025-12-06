// เริ่มต้น Icons
lucide.createIcons();

// ลงทะเบียน Plugin ScrollTrigger
gsap.registerPlugin(ScrollTrigger);

// 1. Header Animation (Load ปุ๊บขึ้นปั๊บ)
gsap.to(".header-content", {
    opacity: 1,
    y: 0,
    duration: 1.5,
    ease: "power3.out",
    delay: 0.2
});

// 2. Golden Line Animation (ยืดตามการ Scroll)
gsap.to(".golden-line", {
    scaleY: 1,
    ease: "none",
    scrollTrigger: {
        trigger: ".timeline-container",
        start: "top center",
        end: "bottom center",
        scrub: true
    }
});

// 3. Card Animations (Fade In ทีละใบ)
const cards = document.querySelectorAll('.card');
cards.forEach((card) => {
    gsap.to(card, {
        opacity: 1,
        y: 0,
        duration: 1,
        scrollTrigger: {
            trigger: card,
            start: "top 80%",
            toggleActions: "play none none reverse"
        }
    });
});

// 4. Parallax Ingredients Effect (ของลอยๆ)
const ingredients = document.querySelectorAll('.ingredient');
ingredients.forEach((item) => {
    const speed = item.getAttribute('data-speed');
    gsap.to(item, {
        y: -200 * speed,
        rotation: 360,
        ease: "none",
        scrollTrigger: {
            trigger: "body",
            start: "top top",
            end: "bottom bottom",
            scrub: 1
        }
    });
});
