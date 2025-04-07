// Dynamic features for the About Us page
document.addEventListener("DOMContentLoaded", function () {
    const members = document.querySelectorAll(".team-member");

    members.forEach(member => {
        member.addEventListener("mouseover", () => {
            member.style.transform = "scale(1.05)";
            member.style.transition = "transform 0.3s ease-in-out";
        });

        member.addEventListener("mouseout", () => {
            member.style.transform = "scale(1)";
        });
    });

    // Dynamic year update in footer
    const yearElement = document.createElement("span");
    yearElement.textContent = new Date().getFullYear();
    document.querySelector("footer p").append(` ${yearElement.textContent}`);

    // Impact Counter Animation
    const counters = document.querySelectorAll(".counter");

    const animateCounter = (counter) => {
        const target = +counter.getAttribute("data-target");
        let count = 0;
        const increment = target / 100;

        const updateCounter = () => {
            count += increment;
            if (count < target) {
                counter.textContent = Math.floor(count);
                requestAnimationFrame(updateCounter);
            } else {
                counter.textContent = target;
            }
        };
        updateCounter();
    };

    counters.forEach(counter => animateCounter(counter));

    // Testimonials Carousel
    let index = 0;
    const testimonials = document.querySelectorAll(".testimonial");

    function showTestimonial() {
        testimonials.forEach((testimonial, i) => {
            testimonial.style.display = i === index ? "block" : "none";
        });
        index = (index + 1) % testimonials.length;
    }

    setInterval(showTestimonial, 4000);

    showTestimonial();
});
