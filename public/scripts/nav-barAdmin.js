

        document.addEventListener('DOMContentLoaded', () => {
            const navLinks = document.querySelectorAll('aside .sidebar a');
        
            navLinks.forEach(link => {
                link.addEventListener('click', (e) => {
                    // Remove active class from all links
                    navLinks.forEach(link => link.classList.remove('active'));
                    // Add active class to the clicked link
                    e.currentTarget.classList.add('active');
                });
            });
        });
