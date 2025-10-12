const openButton = document.getElementById('open-sidebar-button');
const navbar = document.getElementById('navbar');
const media = window.matchMedia("(width < 700px)");

/* A combination of tips from: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event */
/* and https://www.onlywebpro.com/tutorials/javascript/optimize-scrolling-performance-by-debouncing-scroll-event-calls */
var debounce_timer;
window.addEventListener("scroll", (e) => {
    if (debounce_timer) {
        window.clearTimeout(debounce_timer);
    }
    debounce_timer = window.setTimeout(function () {
        // run your actual function here
        closeSidebar()
        updateNavbar(e);
        console.log('passed through onscroll function');
        console.log('inert is ' + navbar.hasAttribute('inert'));
    }, 60);
});
/* tip ends here */

/* if the Escape key is pressed with the mobile menu deployed, the menu is closed */
window.addEventListener("keyup", (e) => {
    console.log('pressed ' + e.key);
    console.log(openButton.getAttribute('aria-expanded'));
    if (e.key === 'Escape') {
        closeSidebar();
        updateNavbar(e);
    }
});

/* code within setTimeout is to prevent the 'flash' of the mobile menu as viewport is resized */
media.addEventListener('change', (e) => {
    console.log('We\'ve moved in/out of 700px: ', e.target);
    setTimeout(function () {
        navbar.classList.remove('animate', 'show');
    }, 300);
    updateNavbar(e);
});

function updateNavbar(e) {
    const isMobile = e.matches;
    console.log('isMobile=' + isMobile);
    if (isMobile || window.innerWidth < 700) {
        navbar.setAttribute('inert', '');
        console.log('inert is ' + navbar.hasAttribute('inert'));
    }
    else {
        // desktop mode
        navbar.removeAttribute('inert');
        console.log('inert is ' + navbar.hasAttribute('inert'));
    }
}

function openSidebar() {
    navbar.classList.add('animate', 'show');
    openButton.setAttribute('aria-expanded', 'true');
    navbar.removeAttribute('inert');
    console.log('sidebar open and inert is ' + navbar.hasAttribute('inert'));
}

function closeSidebar() {
    navbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
    navbar.setAttribute('inert', '');
    console.log('sidebar is closed and inert is ' + navbar.hasAttribute('inert'));
}

/* updateNavbar(media) */