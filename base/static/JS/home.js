let nextDom = document.getElementById('next');
let prevDom = document.getElementById('prev');

let carouselDom = document.querySelector('.carousel');
let SliderDom = carouselDom.querySelector('.carousel .list');
let thumbnailBorderDom = document.querySelector('.carousel .thumbnail');
let thumbnailItemsDom = thumbnailBorderDom.querySelectorAll('.item');
let timeDom = document.querySelector('.carousel .time');

thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
let timeRunning = 3000;
let timeAutoNext = 7000;

nextDom.onclick = function () {
    showSlider('next');
}

prevDom.onclick = function () {
    showSlider('prev');
}
let runTimeOut;
let runNextAuto = setTimeout(() => {
    next.click();
}, timeAutoNext)
function showSlider(type) {
    let SliderItemsDom = SliderDom.querySelectorAll('.carousel .list .item');
    let thumbnailItemsDom = document.querySelectorAll('.carousel .thumbnail .item');

    if (type === 'next') {
        SliderDom.appendChild(SliderItemsDom[0]);
        thumbnailBorderDom.appendChild(thumbnailItemsDom[0]);
        carouselDom.classList.add('next');
    } else {
        SliderDom.prepend(SliderItemsDom[SliderItemsDom.length - 1]);
        thumbnailBorderDom.prepend(thumbnailItemsDom[thumbnailItemsDom.length - 1]);
        carouselDom.classList.add('prev');
    }
    clearTimeout(runTimeOut);
    runTimeOut = setTimeout(() => {
        carouselDom.classList.remove('next');
        carouselDom.classList.remove('prev');
    }, timeRunning);

    clearTimeout(runNextAuto);
    runNextAuto = setTimeout(() => {
        next.click();
    }, timeAutoNext)
}



// code for number counting
const counters = document.querySelectorAll(".counters span");
const container = document.querySelector(".counters");

// variable that tracks if the counters have been activated
let activated = false;

// add scroll event to the page
window.addEventListener("scroll", () => {
    if (
        pageYOffset > container.offsetTop - container.offsetHeight - 200 && activated === false
    ) {
        counters.forEach(counter => {
            counter.innerText = 0;
            let count = 0;


            function updateCount() {
                const target = parseInt(counter.dataset.count);
                if (count < target) {
                    count++;
                    counter.innerText = count;
                    setTimeout(updateCount, 10);
                } else {
                    counter.innerText = target;
                }
            }
            updateCount();
            activated = true;
        });
    } else if (
        pageYOffset < container.offsetTop - container.offsetHeight - 500 || pageYOffset === 0 && activated === true
    ) {
        counters.forEach(counter => {
            counter.innerText = 0;
        });
        activated = false;
    }
});






// Card Script
const wrapper = document.querySelector(".wrapper");
const cardBox = document.querySelector(".card-box");
const arrowBtns = document.querySelectorAll(".wrapper i");
let firstCardWidth = cardBox.querySelector(".card").offsetWidth;
const cardBoxChildrens = [...cardBox.children];

let isDragging = false, startX, startScrollLeft, timeoutId;

let cardPerView = Math.round(cardBox.offsetWidth / firstCardWidth);

// Duplicate cards for infinite scrolling
cardBoxChildrens.slice(-cardPerView).reverse().forEach(card => {
    cardBox.insertAdjacentHTML("afterbegin", card.outerHTML);
});
cardBoxChildrens.slice(0, cardPerView).forEach(card => {
    cardBox.insertAdjacentHTML("beforeend", card.outerHTML);
});

// Arrow button functionality
arrowBtns.forEach(btn => {
    btn.addEventListener("click", () => {
        cardBox.scrollLeft += btn.id === "left" ? -firstCardWidth : firstCardWidth;
    });
});

// Drag functionality
const dragStart = (e) => {
    isDragging = true;
    cardBox.classList.add("dragging");
    startX = e.pageX || e.touches[0].pageX;
    startScrollLeft = cardBox.scrollLeft;
};

const dragging = (e) => {
    if (!isDragging) return;
    const x = e.pageX || e.touches[0].pageX;
    cardBox.scrollLeft = startScrollLeft - (x - startX);
};

const dragStop = () => {
    isDragging = false;
    cardBox.classList.remove("dragging");
};

// Autoplay functionality
const autoPlay = () => {
    clearTimeout(timeoutId); 
    if(window.innerWidth < 600) return;  // Disable autoplay for smaller screens
    timeoutId = setTimeout(() => {
        cardBox.scrollLeft += firstCardWidth;
    }, 2500);
};

// Infinite scrolling logic
const infinitescroll = () => {
    if (cardBox.scrollLeft === 0) {
        cardBox.classList.add("no-transition");
        cardBox.scrollLeft = cardBox.scrollWidth - (2 * cardBox.offsetWidth);
        cardBox.classList.remove("no-transition");
    } else if (Math.ceil(cardBox.scrollLeft) === cardBox.scrollWidth - cardBox.offsetWidth) {
        cardBox.classList.add("no-transition");
        cardBox.scrollLeft = cardBox.offsetWidth;
        cardBox.classList.remove("no-transition");
    }

    clearTimeout(timeoutId);
    if (!wrapper.matches(":hover")) autoPlay();
};

// Event listeners
window.addEventListener("resize", () => {
    clearTimeout(timeoutId);  
    firstCardWidth = cardBox.querySelector(".card").offsetWidth;
    autoPlay();
});

cardBox.addEventListener("mousedown", dragStart);
cardBox.addEventListener("mousemove", dragging);
document.addEventListener("mouseup", dragStop);

cardBox.addEventListener("touchstart", dragStart); 
cardBox.addEventListener("touchmove", dragging); 
document.addEventListener("touchend", dragStop);

cardBox.addEventListener("scroll", infinitescroll);
wrapper.addEventListener("mouseenter", () => clearTimeout(timeoutId));
wrapper.addEventListener("mouseleave", autoPlay);

autoPlay();
