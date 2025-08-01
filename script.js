document.addEventListener('DOMContentLoaded', function() {
    // Preloader
    const preloader = document.querySelector('.preloader');
    window.addEventListener('load', function() {
        preloader.classList.add('fade-out');
        setTimeout(() => {
            preloader.style.display = 'none';
        }, 500);
    });

    // Header Scroll Effect
    const header = document.querySelector('.header');
    window.addEventListener('scroll', function() {
        header.classList.toggle('sticky', window.scrollY > 100);
    });

    // Mobile Menu Toggle
    const menuIcon = document.querySelector('#menu-icon');
    const navbar = document.querySelector('.navbar');
    
    menuIcon.addEventListener('click', function() {
        menuIcon.classList.toggle('bx-x');
        navbar.classList.toggle('active');
    });

    // Close menu when clicking on a link
    const navLinks = document.querySelectorAll('.nav-link');
    navLinks.forEach(link => {
        link.addEventListener('click', function() {
            menuIcon.classList.remove('bx-x');
            navbar.classList.remove('active');
        });
    });

    // Language Tabs
    const tabBtns = document.querySelectorAll('.tab-btn');
    const contents = document.querySelectorAll('.content');
    
    tabBtns.forEach((btn, index) => {
        btn.addEventListener('click', () => {
            // Remove active class from all buttons and contents
            tabBtns.forEach(btn => btn.classList.remove('active'));
            contents.forEach(content => content.classList.remove('active'));
            
            // Add active class to clicked button and corresponding content
            btn.classList.add('active');
            contents[index].classList.add('active');
        });
    });

    // Testimonial Slider
    const testimonialSlides = document.querySelectorAll('.testimonial-slide');
    const dots = document.querySelectorAll('.dot');
    let currentSlide = 0;

    function showSlide(index) {
        testimonialSlides.forEach(slide => slide.classList.remove('active'));
        dots.forEach(dot => dot.classList.remove('active'));
        
        testimonialSlides[index].classList.add('active');
        dots[index].classList.add('active');
        currentSlide = index;
    }

    document.querySelector('.testimonial-next').addEventListener('click', () => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    document.querySelector('.testimonial-prev').addEventListener('click', () => {
        currentSlide = (currentSlide - 1 + testimonialSlides.length) % testimonialSlides.length;
        showSlide(currentSlide);
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            showSlide(index);
        });
    });

    // Auto slide change every 5 seconds
    setInterval(() => {
        currentSlide = (currentSlide + 1) % testimonialSlides.length;
        showSlide(currentSlide);
    }, 5000);

    // Scroll Reveal Animation
    ScrollReveal({
        reset: true,
        distance: '80px',
        duration: 2000,
        delay: 200
    });

    ScrollReveal().reveal('.animate__animated', { 
        origin: 'bottom',
        interval: 200
    });





document.addEventListener('DOMContentLoaded', function() {
    const audio = document.getElementById('quranAudio');
    const audioIndicator = document.createElement('div');
    audioIndicator.id = 'audio-indicator';
    document.body.appendChild(audioIndicator);
    
    let audioAllowed = false;
    let isHomePage = true;
    
    // Styles for audio indicator
    const style = document.createElement('style');
    style.textContent = `
        #audio-indicator {
            position: fixed;
            bottom: 20px;
            right: 20px;
            width: 40px;
            height: 40px;
            background: rgba(0, 171, 240, 0.7);
            border-radius: 50%;
            display: flex;
            justify-content: center;
            align-items: center;
            color: white;
            font-size: 18px;
            cursor: pointer;
            z-index: 1000;
            transition: all 0.3s ease;
            box-shadow: 0 2px 10px rgba(0, 0, 0, 0.2);
        }
        #audio-indicator:hover {
            transform: scale(1.1);
            background: rgba(0, 171, 240, 1);
        }
        #audio-indicator.playing {
            background: #4CAF50;
        }
        #audio-indicator.muted {
            background: #f44336;
        }
    `;
    document.head.appendChild(style);
    
    function checkHomeSection() {
        const homeSection = document.getElementById('home');
        const rect = homeSection.getBoundingClientRect();
        isHomePage = (rect.top >= -100 && rect.bottom <= window.innerHeight + 100);
        return isHomePage;
    }
    
    function updateAudioIndicator() {
        audioIndicator.innerHTML = audio.paused ? '🔈' : '🔊';
        audioIndicator.className = '';
        if (!audio.paused) audioIndicator.classList.add('playing');
        if (audio.muted) audioIndicator.classList.add('muted');
    }
    
    function handleAudio() {
        if (!audioAllowed) return;
        
        if (checkHomeSection()) {
            audio.play().then(() => {
                updateAudioIndicator();
            }).catch(e => {
                console.log('Audio play error:', e);
                audioIndicator.classList.add('muted');
            });
        } else {
            audio.pause();
            updateAudioIndicator();
        }
    }
    
    // Click handler for audio indicator
    audioIndicator.addEventListener('click', function() {
        if (audio.paused) {
            audio.play().then(() => {
                updateAudioIndicator();
            }).catch(e => {
                console.log('Audio play error:', e);
            });
        } else {
            audio.pause();
            updateAudioIndicator();
        }
    });
    
    // Right click to mute/unmute
    audioIndicator.addEventListener('contextmenu', function(e) {
        e.preventDefault();
        audio.muted = !audio.muted;
        updateAudioIndicator();
    });
    
    function requestAudioPermission() {
        const AudioContext = window.AudioContext || window.webkitAudioContext;
        const audioContext = new AudioContext();
        const oscillator = audioContext.createOscillator();
        oscillator.connect(audioContext.destination);
        
        audioContext.resume().then(() => {
            audioAllowed = true;
            handleAudio();
        }).catch(e => {
            console.log('Audio permission denied:', e);
            audioIndicator.classList.add('muted');
        });
    }
    
    document.body.addEventListener('click', function initAudio() {
        if (!audioAllowed) {
            audio.play()
                .then(() => {
                    audioAllowed = true;
                    handleAudio();
                })
                .catch(e => {
                    console.log('Autoplay blocked, requesting permission:', e);
                    requestAudioPermission();
                });
        }
        document.body.removeEventListener('click', initAudio);
    }, { once: true });
    
    window.addEventListener('scroll', handleAudio);
    handleAudio();
    updateAudioIndicator();
    
    // Handle audio events
    audio.addEventListener('play', updateAudioIndicator);
    audio.addEventListener('pause', updateAudioIndicator);
    audio.addEventListener('volumechange', updateAudioIndicator);
});



    
    // Audio Control
    const audio = document.getElementById('quranAudio');
    const aboutSection = document.getElementById('about');
    
    // Play audio when in home section
    function handleScroll() {
        const homeSection = document.getElementById('home');
        const homeRect = homeSection.getBoundingClientRect();
        
        if (homeRect.top >= -100 && homeRect.bottom <= window.innerHeight + 100) {
            audio.play().catch(e => console.log('Autoplay prevented:', e));
        } else {
            audio.pause();
        }
    }
    
    window.addEventListener('scroll', handleScroll);
    
    // Initialize audio with user interaction
    document.body.addEventListener('click', function initAudio() {
        audio.play().catch(e => console.log('Audio play prevented:', e));
        document.body.removeEventListener('click', initAudio);
    }, { once: true });

    

    // Smooth Scrolling for all links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function(e) {
            e.preventDefault();
            
            const targetId = this.getAttribute('href');
            if (targetId === '#') return;
            
            const targetElement = document.querySelector(targetId);
            if (targetElement) {
                window.scrollTo({
                    top: targetElement.offsetTop - 70,
                    behavior: 'smooth'
                });
            }
        });
    });
});