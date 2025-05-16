// Palette CAN 2025
const palette = {
    darkGreen: "#04361D",
    cambridgeBlue: "#76BA9D",
    beige: "#F0F2D5",
    red: "#EF233C",
    carmine: "#97051D"
};

// Animation principale
document.addEventListener('DOMContentLoaded', () => {
    // Animation bannière
    const banner = document.querySelector('.creative-banner');
    if (banner) {
        // Animation couleur
        setInterval(() => {
            banner.style.color = banner.style.color === palette.red ? palette.carmine : palette.red;
        }, 900);

        // Animation emojis
        const emojis = banner.querySelectorAll('span');
        emojis.forEach((emoji, index) => {
            emoji.style.animation = `bounce 2s infinite ${index * 0.3}s alternate`;
            emoji.addEventListener('mouseover', () => {
                emoji.style.transform = 'scale(1.5) rotate(15deg)';
                emoji.style.transition = 'transform 0.3s ease';
                emoji.style.color = palette.cambridgeBlue;
            });
            emoji.addEventListener('mouseout', () => {
                emoji.style.transform = '';
                emoji.style.color = '';
            });
        });
    }

    // Animation CTA
    const ctaBtn = document.querySelector('.cta-btn');
    if (ctaBtn) {
        ctaBtn.addEventListener('click', (e) => {
            e.preventDefault();
            ctaBtn.classList.add('pulse');
            setTimeout(() => {
                ctaBtn.classList.remove('pulse');
                alert('Le calendrier complet sera bientôt disponible !');
            }, 600);
        });
    }

    // Animation des matchs
    const matches = document.querySelectorAll('.match');
    if (matches.length) {
        matches.forEach(match => {
            // Hover effects
            match.addEventListener('mouseenter', () => {
                match.style.transform = 'scale(1.05) rotate(-1deg)';
                match.style.boxShadow = `0 8px 25px ${palette.carmine}33`;
                match.style.background = palette.carmine;
            });
            
            match.addEventListener('mouseleave', () => {
                match.style.transform = '';
                match.style.boxShadow = '';
                match.style.background = palette.red;
            });

            // Apparition progressive
            match.style.opacity = '0';
            match.style.transform = 'translateY(20px)';
            match.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
            setTimeout(() => {
                match.style.opacity = '1';
                match.style.transform = 'translateY(0)';
            }, 300 + (index * 200));
        });
    }

    // Animation logo (corrigée)
    const logo = document.querySelector('.logo');
    if (logo) {
        logo.addEventListener('click', () => {
            logo.style.transform = 'scale(1.2) rotate(360deg)';
            logo.style.boxShadow = `0 0 40px 0 ${palette.cambridgeBlue}`; // Template literal corrigé
            setTimeout(() => {
                logo.style.transform = '';
                logo.style.boxShadow = '';
            }, 1000);
        });
    }

    // Parallaxe
    const bgAnimated = document.querySelector('.background-animated');
    if (bgAnimated) {
        window.addEventListener('mousemove', (e) => {
            const x = e.clientX / window.innerWidth;
            const y = e.clientY / window.innerHeight;
            bgAnimated.style.background = `
                radial-gradient(
                    circle at ${70 + x * 10}% ${20 + y * 10}%, 
                    ${palette.red}33 0, 
                    transparent 60%
                ),
                radial-gradient(
                    circle at ${20 - x * 10}% ${80 - y * 10}%, 
                    ${palette.cambridgeBlue}44 0, 
                    transparent 70%
                )`;
        });
    }

    // Désactivation mobile
    if (window.innerWidth < 768) {
        if (bgAnimated) bgAnimated.style.animation = 'none';
    }
});

// Compte à rebours (optimisé)
const countdownDate = new Date("2025-01-15T20:00:00").getTime();
const countdownElements = {
    days: document.getElementById("days"),
    hours: document.getElementById("hours"),
    minutes: document.getElementById("minutes"),
    seconds: document.getElementById("seconds")
};

function updateCountdown() {
    const now = Date.now();
    const diff = countdownDate - now;

    if (diff < 0) {
        Object.values(countdownElements).forEach(el => el.textContent = '00');
        return clearInterval(countdownInterval);
    }

    const days = Math.floor(diff / 86400000);
    const hours = Math.floor((diff % 86400000) / 3600000);
    const minutes = Math.floor((diff % 3600000) / 60000);
    const seconds = Math.floor((diff % 60000) / 1000);

    Object.entries({ days, hours, minutes, seconds }).forEach(([key, val]) => {
        if (countdownElements[key]) {
            countdownElements[key].textContent = String(val).padStart(2, '0');
        }
    });
}

const countdownInterval = setInterval(updateCountdown, 1000);
updateCountdown();

// Animation au scroll (améliorée)
const animateOnScroll = () => {
    const animateElements = document.querySelectorAll(".animate-fadeIn");
    const windowHeight = window.innerHeight;

    animateElements.forEach(element => {
        const elementTop = element.getBoundingClientRect().top;
        const elementVisible = 150;

        if (elementTop < windowHeight - elementVisible) {
            element.style.opacity = "1";
            element.style.transform = "translateY(0)";
        }
    });
};

window.addEventListener('scroll', animateOnScroll);
window.addEventListener('resize', animateOnScroll);
animateOnScroll();