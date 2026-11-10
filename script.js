document.addEventListener('DOMContentLoaded', () => {
    // Initialize Lucide icons if any are used
    if (typeof lucide !== 'undefined') {
        lucide.createIcons();
    }

    // Video Play/Pause & Volume Logic
    const videoCards = document.querySelectorAll('.portfolio-item');

    videoCards.forEach(card => {
        const video = card.querySelector('video');
        const btn = card.querySelector('.play-pause-btn');
        const playIcon = btn.querySelector('.play-icon');
        const pauseIcon = btn.querySelector('.pause-icon');
        if (!video || !btn) return;

        // Ensure video has audio enabled at 100% volume
        video.volume = 1.0;

        function togglePlay(e) {
            e.stopPropagation();
            if (video.paused) {
                // Pause all other videos first
                document.querySelectorAll('.preview-video').forEach(v => {
                    if (v !== video) {
                        v.pause();
                        v.currentTime = 0;
                        const otherBtn = v.closest('.portfolio-item').querySelector('.play-pause-btn');
                        otherBtn.querySelector('.play-icon').classList.remove('hidden');
                        otherBtn.querySelector('.pause-icon').classList.add('hidden');
                        otherBtn.style.opacity = '1';
                    }
                });

                video.play().then(() => {
                    playIcon.classList.add('hidden');
                    pauseIcon.classList.remove('hidden');
                    btn.style.opacity = '0'; // Hide button while playing so it doesn't block the video
                }).catch(err => console.log("Playback error:", err));
            } else {
                video.pause();
                playIcon.classList.remove('hidden');
                pauseIcon.classList.add('hidden');
                btn.style.opacity = '1';
            }
        }

        btn.addEventListener('click', togglePlay);
        video.addEventListener('click', togglePlay);

        // Show button again when video ends
        video.addEventListener('ended', () => {
            playIcon.classList.remove('hidden');
            pauseIcon.classList.add('hidden');
            btn.style.opacity = '1';
            video.currentTime = 0;
        });

        // Hover effect for button visibility when paused
        card.addEventListener('mouseenter', () => {
            if (video.paused) {
                btn.style.opacity = '1';
            }
        });

        card.addEventListener('mouseleave', () => {
            if (!video.paused) {
                btn.style.opacity = '0';
            }
        });
    });

    // Category Filter Switcher Logic
    const filterButtons = document.querySelectorAll('.filter-btn');
    
    filterButtons.forEach(button => {
        button.addEventListener('click', (e) => {
            filterButtons.forEach(btn => {
                btn.classList.remove('text-accent', 'border-accent');
                btn.classList.add('text-gray-400');
            });

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