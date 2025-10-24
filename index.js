const openButton = document.getElementById('open-menu-button');
const navbar = document.getElementById('navbar');
const media = window.matchMedia("(width < 700px)");

/* if the Escape key is pressed with the mobile menu deployed, the menu is closed */
window.addEventListener("keyup", (e) => {
    console.log('pressed ' + e.key);
    if (e.key === 'Escape' && openButton.getAttribute('aria-expanded') === 'true') {
        /* console.log('menu is open = ' + openButton.getAttribute('aria-expanded')); */
        closeMenu();
        updateNavbar(e);
    }
    /* console.log('menu currently is ' + (openButton.getAttribute('aria-expanded') === 'true' ? 'open' : 'closed')); */
});

/* code within setTimeout is to prevent the 'flash' of the mobile menu as viewport is resized */
/* without it, as the viewport is resized, inert renders the menu items unselectable */
media.addEventListener('change', (e) => {
    /* console.log('We\'ve moved in/out of 700px: ', e.target); */
    setTimeout(function () {
        navbar.classList.remove('animate', 'show');
    }, 300);
    updateNavbar(e);
});

function updateNavbar(e) {
    const isMobile = e.matches;
    /* console.log('isMobile=' + isMobile); */
    if (isMobile || window.innerWidth < 700) {
        navbar.setAttribute('inert', '');
        /* console.log('inert is ' + navbar.hasAttribute('inert')); */
    }
    else {
        // desktop mode
        window.removeEventListener("scroll", scrollEventHandler);
        navbar.removeAttribute('inert');
        /* console.log('inert is ' + navbar.hasAttribute('inert')); */
    }
}

/* A combination of tips from: https://developer.mozilla.org/en-US/docs/Web/API/Document/scroll_event */
/* and https://www.onlywebpro.com/tutorials/javascript/optimize-scrolling-performance-by-debouncing-scroll-event-calls */
var debounce_timer;
function scrollEventHandler() {
    if (debounce_timer) {
        window.clearTimeout(debounce_timer);
        console.log('inside scrollEventHandler but not closing yet...debounce_timer is ' + debounce_timer);
    }
    /* window.removeEventListener("scroll", scrollEventHandler); Better to remove here and move down in closeSidebar*/
    /* closeMenu() can also be here */
    debounce_timer = window.setTimeout(function () {
        // run your actual function here
        closeMenu();
        /* console.log(debounce_timer); */
        /* console.log('...gone through setTimeout and inert is ' + navbar.hasAttribute('inert')); */
    }, 50);
}
/* tip ends here */


/* FIXED: there's case where if the click is outside the menu, it closes but eventlistener is still active */
function openMenu() {
    navbar.classList.add('animate', 'show');
    openButton.setAttribute('aria-expanded', 'true');
    navbar.removeAttribute('inert');
    window.addEventListener("scroll", scrollEventHandler);
    /* console.log('menu open and inert is ' + navbar.hasAttribute('inert')); */
}

function closeMenu() {
    navbar.classList.remove('show');
    openButton.setAttribute('aria-expanded', 'false');
    navbar.setAttribute('inert', '');
    window.removeEventListener("scroll", scrollEventHandler);
    /* console.log('menu is closed and inert is ' + navbar.hasAttribute('inert')); */
}

updateNavbar(media);