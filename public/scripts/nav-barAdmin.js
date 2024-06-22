// nav-barAdmin.js

document.addEventListener('DOMContentLoaded', () => {
    const navLinks = document.querySelectorAll('aside .sidebar a');
    const indicator = document.querySelector('.indicator');
    const sidebar = document.querySelector('aside .sidebar');

    // Initialize indicator position on page load
    moveIndicator(getActiveLink());

    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            // Remove active class from all links
            navLinks.forEach(link => link.classList.remove('active'));
            // Add active class to the clicked link
            e.currentTarget.classList.add('active');

            // Move the indicator to the clicked link
            moveIndicator(e.currentTarget);
        });
    });

    // Handle indicator position on window resize
    window.addEventListener('resize', () => {
        moveIndicator(getActiveLink());
    });

    // Handle indicator position on scroll (if sidebar is scrollable)
    sidebar.addEventListener('scroll', () => {
        moveIndicator(getActiveLink());
    });

    function moveIndicator(link) {
        const offsetTop = link.offsetTop - sidebar.scrollTop;
        indicator.style.top = `${offsetTop}px`;
    }

    function getActiveLink() {
        return document.querySelector('aside .sidebar a.active');
    }
});
