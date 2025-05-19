// Attend que le DOM soit complètement chargé avant d'exécuter le code
document.addEventListener('DOMContentLoaded', function() {
    // Sélectionne tous les éléments avec la classe 'slide'
    const slides = document.querySelectorAll('.slide');
    // Variable pour suivre l'index du slide actuel, commence à 0
    let currentSlide = 0;

    function showSlide(index) {
        // Retire la classe 'active' de tous les slides
        slides.forEach(slide => slide.classList.remove('active'));
        // Ajoute la classe 'active' au slide sélectionné
        slides[index].classList.add('active');
    }

    /*
        Fonction pour passer au slide suivant
        Utilise l'opérateur modulo pour revenir au début après le dernier slide
    */

    function nextSlide() {
        // Calcule l'index du prochain slide
        currentSlide = (currentSlide + 1) % slides.length;
        // Affiche le nouveau slide
        showSlide(currentSlide);
    }

    // Configure un intervalle pour changer automatiquement de slide toutes les 5 secondes
    setInterval(nextSlide, 5000);
});

