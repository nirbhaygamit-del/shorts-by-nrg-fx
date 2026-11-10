document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons if any are used
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Video Hover Playback Logic
    const videoCards = document.querySelectorAll('.portfolio-item');

    videoCards.forEach(card => {
        const video = card.querySelector('video');
        if (!video) return;

        card.addEventListener('mouseenter', () => {
            video.play().catch(error => {
                // Handle browser autoplay restrictions smoothly if they occur
                console.log("Autoplay prevented:", error);
            });
        });

        card.addEventListener('mouseleave', () => {
            video.pause();
            video.currentTime = 0;
        });
    });

    // Simple Filter Switcher Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            // Remove active classes from all buttons
            filterButtons.forEach(btn => {
                btn.classList.remove('text-accent', 'border-accent');
                btn.classList.add('text-gray-400');
            });

            // Highlight clicked button
            e.target.classList.remove('text-gray-400');
            e.target.classList.add('text-accent', 'border-accent');

            const filterValue = e.target.getAttribute('data-filter');

            videoCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'block';
                } else {
                    card.style.display = 'none';
                }
            });
        });
    });
});