// Palette CAN 2025
const palette = {
    darkGreen: "#04361D",
    cambridgeBlue: "#76BA9D",
    beige: "#F0F2D5",
    red: "#EF233C",
    carmine: "#97051D",
    candle: "#F1ECDB",
    bow: "#7E2625"
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
    const matchCards = document.querySelectorAll('.match-card');
    if (matchCards.length) {
        matchCards.forEach((card, index) => {
            // Appliquer le délai d'animation en fonction de l'index
            card.style.animationDelay = `${index * 0.2}s`;
            
            // Ajouter une animation de surlignage aléatoire sur les cartes
            setInterval(() => {
                if (Math.random() > 0.7 && !card.classList.contains('hover-effect')) {
                    const flags = card.querySelectorAll('.team-flag');
                    const randomFlag = flags[Math.floor(Math.random() * flags.length)];
                    if (randomFlag) {
                        randomFlag.style.transform = 'scale(1.1) rotate(5deg)';
                        setTimeout(() => {
                            randomFlag.style.transform = '';
                        }, 600);
                    }
                }
            }, 3000 + (index * 1000));
            
            // Animations de survol des matchs (laissez le CSS gérer la plupart des effets)
            card.addEventListener('mouseenter', () => {
                card.classList.add('hover-effect');
            });
            
            card.addEventListener('mouseleave', () => {
                card.classList.remove('hover-effect');
                setTimeout(() => {
                    // Réinitialiser tous les styles inline qui pourraient interférer avec les transitions CSS
                    const elements = card.querySelectorAll('*[style]');
                    elements.forEach(el => {
                        if (el.style.transform) el.style.transform = '';
                    });
                }, 300);
            });
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
    
    // Effet de parallaxe légère sur les cartes de match
    const matchSection = document.querySelector('.matches-section');
    if (matchSection && matchCards.length) {
        matchSection.addEventListener('mousemove', (e) => {
            const sectionRect = matchSection.getBoundingClientRect();
            const xCenter = sectionRect.left + sectionRect.width / 2;
            const yCenter = sectionRect.top + sectionRect.height / 2;
            
            const xOffset = (e.clientX - xCenter) / 40;
            const yOffset = (e.clientY - yCenter) / 40;
            
            matchCards.forEach(card => {
                if (!card.classList.contains('hover-effect')) {
                    card.style.transform = `perspective(1000px) translate3d(${xOffset}px, ${yOffset}px, 0) rotateX(${-yOffset/2}deg) rotateY(${xOffset/2}deg)`;
                }
            });
        });
        
        matchSection.addEventListener('mouseleave', () => {
            matchCards.forEach(card => {
                if (!card.classList.contains('hover-effect')) {
                    card.style.transform = '';
                }
            });
        });
    }

    // Désactivation mobile
    if (window.innerWidth < 768) {
        if (bgAnimated) bgAnimated.style.animation = 'none';
        // Désactiver les effets de parallaxe sur mobile
        if (matchSection) {
            matchSection.onmousemove = null;
            matchSection.onmouseleave = null;
        }
    }
});

// Compte à rebours (optimisé)
// ... rest of the code remains unchanged ...
