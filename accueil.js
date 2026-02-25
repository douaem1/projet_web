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

// Date cible pour la CAN 2025
const endDate = new Date('2025-12-20T20:00:00').getTime();

// Fonction pour ajouter un zéro devant les nombres < 10
function padZero(num) {
    return num < 10 ? '0' + num : num;
}


document.addEventListener('DOMContentLoaded', () => {
    // Date cible pour la CAN 2025
    const endDate = new Date('2025-12-20T20:00:00').getTime();
    const countdownElement = document.querySelector('.countdown');
    
    // Initialiser le timer structure
    setupTimerElements();
    
    // Première exécution immédiate
    updateTimer();
    
    // Mise à jour toutes les secondes
    setInterval(updateTimer, 1000);
    
    // Fonction pour ajouter un zéro devant les nombres < 10
    function padZero(num) {
        return num < 10 ? '0' + num : num;
    }
    
    // Configuration initiale des éléments du timer
    function setupTimerElements() {
        if (!countdownElement) return;
        
        // Attribuer l'indice à chaque élément pour l'animation décalée
        const items = countdownElement.querySelectorAll('.countdown-item');
        items.forEach((item, index) => {
            item.style.setProperty('--item-index', index);
        });
        
        // Ajout d'attributs data pour améliorer l'accessibilité
        const labels = ['jours', 'heures', 'minutes', 'secondes'];
        const digits = countdownElement.querySelectorAll('.countdown-digit');
        
        digits.forEach((digit, index) => {
            if (index < labels.length) {
                digit.setAttribute('aria-label', `${digit.textContent} ${labels[index]}`);
                digit.setAttribute('data-unit', labels[index]);
            }
        });
    }
    
    // Fonction pour mettre à jour les chiffres avec animation améliorée
    function setDigit(id, value) {
        const el = document.getElementById(id);
        if (!el) return;
    
        // Conversion des valeurs en nombres avant comparaison
        const currentNumber = parseInt(el.textContent, 10) || 0;
        const newNumber = parseInt(value, 10);
    
        if (currentNumber !== newNumber) { // Compare les nombres, pas les strings
            el.classList.add('smooth-hide');
            setTimeout(() => {
                el.textContent = value; // Affiche le format à deux chiffres
                el.classList.remove('smooth-hide');
            }, 300);
        }
    }
    
    // Fonction principale du compte à rebours amélioré
    function updateTimer() {
        const now = new Date().getTime();
        const remaining = Math.floor((endDate - now) / 1000);
        
        // Vérifier si le compte à rebours est terminé
        if (remaining <= 0) {
            setDigit("day", "00");
            setDigit("hour", "00");
            setDigit("min", "00");
            setDigit("sec", "00");
            
            // Ajouter une classe pour montrer que l'événement a commencé
            if (countdownElement) {
                countdownElement.classList.add('event-started');
                
                // Remplacer le contenu du compte à rebours (facultatif)
                const eventStartedMessage = document.createElement('div');
                eventStartedMessage.className = 'event-started-message';
                eventStartedMessage.textContent = 'La CAN 2025 a commencé!';
                
                if (!document.querySelector('.event-started-message')) {
                    countdownElement.parentNode.insertBefore(eventStartedMessage, countdownElement.nextSibling);
                }
            }
            return;
        }
        
        // Calculer les valeurs
        const days = Math.floor(remaining / (3600 * 24));
        const hours = Math.floor((remaining % (3600 * 24)) / 3600);
        const minutes = Math.floor((remaining % 3600) / 60);
        const seconds = Math.floor(remaining % 60);
        
        // Mettre à jour les chiffres avec animation
        setDigit("day", padZero(days));
        setDigit("hour", padZero(hours));
        setDigit("min", padZero(minutes));
        setDigit("sec", padZero(seconds));
        
        // Ajouter des classes pour les périodes spéciales
        if (countdownElement) {
            // Mode urgent pour les 7 derniers jours
            if (days <= 7) {
                countdownElement.classList.add('countdown-urgent');
            } else {
                countdownElement.classList.remove('countdown-urgent');
            }
            
            // Mode dernier jour
            if (days === 0) {
                countdownElement.classList.add('last-day');
            } else {
                countdownElement.classList.remove('last-day');
            }
        }
    }
    
    // Ajouter des interactions sur les éléments du timer (facultatif)
    const timerItems = document.querySelectorAll('.countdown-item');
    timerItems.forEach(item => {
        item.addEventListener('click', function() {
            this.style.transform = 'scale(1.1) translateY(-10px)';
            setTimeout(() => {
                this.style.transform = '';
            }, 300);
        });
    });
});

// Fonction pour améliorer la présentation du compte à rebours
function enhanceCountdown() {
    const countdown = document.querySelector('.countdown');
    if (!countdown) return;
    
    // Vérifier si la structure du compte à rebours est correcte
    const items = countdown.querySelectorAll('.countdown-item');
    items.forEach(item => {
        const digit = item.querySelector('span:first-child');
        if (digit) {
            // Ajouter la classe countdown-digit si elle n'existe pas
            if (!digit.classList.contains('countdown-digit')) {
                digit.classList.add('countdown-digit');
                
                // Ajouter un ID si nécessaire
                if (!digit.id) {
                    const label = item.querySelector('span:last-child');
                    if (label) {
                        const labelText = label.textContent.trim().toLowerCase();
                        if (labelText.includes('jour')) digit.id = 'day';
                        else if (labelText.includes('heure')) digit.id = 'hour';
                        else if (labelText.includes('minute')) digit.id = 'min';
                        else if (labelText.includes('seconde')) digit.id = 'sec';
                    }
                }
            }
        }
        
        const label = item.querySelector('span:last-child');
        if (label && !label.classList.contains('countdown-label')) {
            label.classList.add('countdown-label');
        }
    });
    
    // Ajouter un titre au compte à rebours si nécessaire
    if (!document.querySelector('.countdown-title')) {
        const title = document.createElement('h3');
        title.className = 'countdown-title';
        title.textContent = 'Coup d\'envoi dans';
        countdown.parentNode.insertBefore(title, countdown);
    }
}

// Appeler cette fonction après le chargement du DOM
document.addEventListener('DOMContentLoaded', enhanceCountdown);

// Démarrer le compte à rebours
document.addEventListener('DOMContentLoaded', function() {
    // Première exécution immédiate
    timer();
    
    // Mise à jour toutes les secondes
    setInterval(timer, 1000);
});

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

// Ajout du script pour agrandir les stats au clic sur le bouton highlight
function toggleStats2023() {
    const stats = document.querySelector('.archive-stats-2023');
    if (!stats) return;
    stats.classList.toggle('stats-expanded');
}

// Ajout de l'écouteur sur le bouton highlight CAN2023
window.addEventListener('DOMContentLoaded', function() {
    const btn = document.querySelector('.btn-highlight-2023');
    if (btn) {
        btn.addEventListener('click', function(e) {
            e.preventDefault();
            toggleStats2023();
        });
    }

    // Correction : retirer l'animation auto après affichage CAN2023
    const stats = document.querySelector('.archive-stats-2023');
    if (stats) {
        stats.classList.remove('stats-expanded');
    }
});

// Ajout du script pour agrandir les stats au clic sur le bouton highlight CAN2021
function toggleStats2021() {
    const stats = document.querySelector('.archive-stats-2021');
    if (!stats) return;
    stats.classList.toggle('stats-expanded');
}

// Ajout de l'écouteur sur le bouton highlight CAN2021
window.addEventListener('DOMContentLoaded', function() {
    const btn2021 = document.querySelector('.btn-highlight-2021');
    if (btn2021) {
        btn2021.addEventListener('click', function(e) {
            e.preventDefault();
            toggleStats2021();
        });
    }
    // Correction : retirer l'animation auto après affichage CAN2021
    const stats2021 = document.querySelector('.archive-stats-2021');
    if (stats2021) {
        stats2021.classList.remove('stats-expanded');
    }
});

// Correction : retirer l'animation si on change d'onglet
function updateArchiveTabIndicator() {
    const indicator = document.querySelector('.archive-tabs-indicator');
    const tab2023 = document.getElementById('tab-2023');
    const tab2021 = document.getElementById('tab-2021');
    if (!indicator || !tab2023 || !tab2021) return;
    const activeTab = tab2023.classList.contains('active') ? tab2023 : tab2021;
    const rect = activeTab.getBoundingClientRect();
    const parentRect = activeTab.parentElement.getBoundingClientRect();
    indicator.style.width = rect.width + 'px';
    indicator.style.left = (rect.left - parentRect.left) + 'px';
}
window.addEventListener('DOMContentLoaded', updateArchiveTabIndicator);
window.addEventListener('resize', updateArchiveTabIndicator);
window.showArchive = function(year) {
    document.getElementById('archive-2023').style.display = year === '2023' ? 'block' : 'none';
    document.getElementById('archive-2021').style.display = year === '2021' ? 'block' : 'none';
    document.getElementById('tab-2023').classList.toggle('active', year === '2023');
    document.getElementById('tab-2021').classList.toggle('active', year === '2021');
    updateArchiveTabIndicator();
};

// Gestion du menu langue
const langMenu = document.getElementById('langMenu');
const langIcon = document.getElementById('langIcon');
if(langIcon && langMenu) {
    langIcon.addEventListener('click', function(e) {
        e.stopPropagation();
        langMenu.style.display = langMenu.style.display === 'block' ? 'none' : 'block';
    });
    langMenu.querySelectorAll('li').forEach(function(item) {
        item.addEventListener('click', function() {
            // Ici, ajouter la logique de changement de langue si besoin
            langMenu.style.display = 'none';
        });
    });
    document.addEventListener('click', function() {
        langMenu.style.display = 'none';
    });
}

// Slider automatique pour la section Maroc accueille la CAN
(function() {
  const slides = document.querySelectorAll('.maroc-slide');
  let idx = 0;
  if (slides.length > 1) {
    setInterval(() => {
      slides[idx].classList.remove('active');
      idx = (idx + 1) % slides.length;
      slides[idx].classList.add('active');
    }, 2500);
  }
})();