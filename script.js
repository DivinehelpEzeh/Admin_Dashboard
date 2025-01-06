const mobileNavToggle = document.querySelector('.mobile-nav-toggle');
    const sidebar = document.querySelector('.sidebar');
    const overlay = document.querySelector('.sidebar-overlay');
    const body = document.body;

    // Toggle sidebar function
    function toggleSidebar() {
        sidebar.classList.toggle('active');
        overlay.classList.toggle('active');
        body.style.overflow = sidebar.classList.contains('active') ? 'hidden' : '';
    }

    // Event listeners for mobile menu toggle
    mobileNavToggle.addEventListener('click', toggleSidebar);
    overlay.addEventListener('click', toggleSidebar);

    // Close sidebar when clicking links (mobile only)
    const sidebarLinks = sidebar.querySelectorAll('li');
    sidebarLinks.forEach(link => {
        link.addEventListener('click', () => {
            if (window.innerWidth <= 768) {
                toggleSidebar();
            }
        });
    });

    // Handle window resize
    window.addEventListener('resize', () => {
        if (window.innerWidth > 768) {
            sidebar.classList.remove('active');
            overlay.classList.remove('active');
            body.style.overflow = '';
        }
    });

    // Handle dropdown menus
    const dropdowns = document.querySelectorAll('.dropdown');
    dropdowns.forEach(dropdown => {
        if (window.innerWidth <= 768) {
            const button = dropdown.querySelector('button');
            const menu = dropdown.querySelector('.dropdown-menu');
            
            button.addEventListener('click', (e) => {
                e.preventDefault();
                menu.style.display = menu.style.display === 'block' ? 'none' : 'block';
                
                // Close other dropdowns
                dropdowns.forEach(otherDropdown => {
                    if (otherDropdown !== dropdown) {
                        otherDropdown.querySelector('.dropdown-menu').style.display = 'none';
                    }
                });
            });
        }
    });

    // Close dropdowns when clicking outside
    document.addEventListener('click', (e) => {
        if (!e.target.closest('.dropdown')) {
            document.querySelectorAll('.dropdown-menu').forEach(menu => {
                menu.style.display = 'none';
            });
        }
    });

    // Handle touch events for better mobile experience
    let touchStartX = 0;
    let touchEndX = 0;

    document.addEventListener('touchstart', (e) => {
        touchStartX = e.changedTouches[0].screenX;
    }, false);

    document.addEventListener('touchend', (e) => {
        touchEndX = e.changedTouches[0].screenX;
        handleSwipe();
    }, false);

    function handleSwipe() {
        const swipeThreshold = 50;
        const swipeDistance = touchEndX - touchStartX;
        
        // Swipe right to open sidebar
        if (swipeDistance > swipeThreshold && !sidebar.classList.contains('active')) {
            toggleSidebar();
        }
        // Swipe left to close sidebar
        else if (swipeDistance < -swipeThreshold && sidebar.classList.contains('active')) {
            toggleSidebar();
        }
    }