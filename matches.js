const header = document.querySelector(".calendar h3"); // Sélectionne le titre du calendrier
const dates = document.querySelector(".dates"); // Sélectionne la liste des dates
const navs = document.querySelectorAll("#prev, #next"); // Sélectionne les boutons de navigation
 
const months = [   // Tableau des noms de mois en français
  "Janvier",
  "Février",
  "Mars",
  "Avril",
  "Mai",
  "Juin",
  "Juillet",
  "Août",
  "Septembre",
  "Octobre",
  "Novembre",
  "Décembre",
];

const weekDays = [ // Tableau des jours de la semaine en français
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];

// Structure complète des matchs
const matchs = { 
  "2025-12-21": [ // Matchs du 21 décembre 2025
    {
      id: "match-2025-12-21", // Identifiant du match
      homeTeam: {  // Équipe à domicile
        name: "Maroc", // Nom de l'équipe
        flag: "images/teams/Maroc.jpg"// Drapeau de l'équipe
      },
      awayTeam: { // Équipe à l'extérieur
        name: "Comores",  // Nom de l'équipe
        flag: "images/teams/Comores.jpg"  // Drapeau de l'équipe
      },  
      time: "20:00",  // Heure du match
      stadium: "Stade Moulay Abdellah, Rabat" // Stade où se déroule le match
    }
  ],
  "2025-12-22": [ // Matchs du 22 décembre 2025
    {
      id: "match-2025-12-22-1",
      homeTeam: {
        name: "Mali",
        flag: "images/teams/Mali.jpg"
      },
      awayTeam: {
        name: "Zambie",
        flag: "images/teams/Zambie.jpg"
      },
      time: "15:30",
      stadium: "Stade Mohamed V, Casablanca"
    },
    {
      id: "match-2025-12-22-2",
      homeTeam: {
        name: "Egypte",
        flag: "images/teams/egypte.jpg"
      },
      awayTeam: {
        name: "Zimbabwe",
        flag: "images/teams/zimbabwe.jpg"
      },
      time: "18:00",
      stadium: "Stade Adrar, Agadir"
    },
    {
      id: "match-2025-12-22-3",
      homeTeam: {
        name: "Afrique du Sud",
        flag: "images/teams/Afrique du sud.jpg"
      },
      awayTeam: {
        name: "Angola",
        flag: "images/teams/Angola.jpg"
      },
      time: "20:30",
      stadium: "Stade de Marrakech"
    }
  ],
  "2025-12-23": [
    {
      id: "match-2025-12-23-1",
      homeTeam: {
        name: "Nigeria",
        flag: "images/teams/nigeria.jpg"
      },
      awayTeam: {
        name: "Tanzanie",
        flag: "images/teams/tanzanie.jpg"
      },
      time: "13:00",
      stadium: "Stade du Fes"
    },
    {
      id: "match-2025-12-23-2",
      homeTeam: {
        name: "Tunisie",
        flag: "images/teams/tunisie.jpg"
      },
      awayTeam: {
        name: "Ouganda",
        flag: "images/teams/ouganda.jpg"
      },
      time: "15:30",
      stadium: "Stade Prince Moulay Abdellah Olympique Annexe, Rabat"
    },
    {
      id: "match-2025-12-23-3",
      homeTeam: {
        name: "Sénégal",
        flag: "images/teams/senegal.jpg"
      },
      awayTeam: {
        name: "Botswana",
        flag: "images/teams/botswana.jpg"
      },
      time: "18:00",
      stadium: "Stade Ibn Batouta, Tanger"
    }
  ],
  "2025-12-24": [ // Matchs du 24 décembre 2025
    {
      id: "match-2025-12-24", // Identifiant du match
      matches: true // Placeholder pour le match
    }
  ],
  "2025-12-26": [
    {
      id: "match-2025-12-26",
      matches: true
    }
  ],
  "2025-12-27": [
    {
      id: "match-2025-12-27",
      matches: true
    }
  ],
  "2025-12-28": [
    {
      id: "match-2025-12-28",
      matches: true
    }
  ],
  "2025-12-29": [
    {
      id: "match-2025-12-29",
      matches: true
    }
  ],
  "2025-12-30": [
    {
      id: "match-2025-12-30",
      matches: true
    }
  ],
  "2025-12-31": [
    {
      id: "match-2025-12-31",
      matches: true
    }
  ]
};

let date = new Date(); // Date actuelle
let month = date.getMonth(); // Mois actuel
let year = date.getFullYear();  // Année actuelle

function scrollToMatch(dateStr) {   
  const matchBox = document.getElementById(`match-${dateStr}`);   // Récupère la boîte du match correspondant à la date
  if (matchBox) { 
    // Défilement fluide vers la boîte de match
    window.scrollTo({   
      top: matchBox.offsetTop,      // Position verticale de la boîte
      behavior: 'smooth'            // Défilement en douceur
    });
    
    // Effet visuel de surbrillance sur la boîte de match
    matchBox.classList.add('highlight');
    setTimeout(() => {
      matchBox.classList.remove('highlight'); // Retire l'effet après 2 secondes
    }, 2000);
  }
}

// Fonction pour formater une date en texte lisible
function formatDate(date) {   
  const day = weekDays[date.getDay()];        // Récupère le nom du jour
  const monthName = months[date.getMonth()];  // Récupère le nom du mois
  return `${day} ${date.getDate()} ${monthName} ${date.getFullYear()}`; // Retourne la date formatée
}

// Fonction pour afficher le calendrier du mois courant
function renderCalendar() {
  const start = new Date(year, month, 1).getDay();           // Jour de la semaine du 1er du mois
  const endDate = new Date(year, month + 1, 0).getDate();    // Dernier jour du mois
  const end = new Date(year, month, endDate).getDay();       // Jour de la semaine du dernier jour du mois
  const endDatePrev = new Date(year, month, 0).getDate();    // Dernier jour du mois précédent
  
  let datesHtml = ""; // Chaîne HTML pour les jours du calendrier

  // Ajoute les jours inactifs du mois précédent
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  // Ajoute les jours du mois courant
  for (let i = 1; i <= endDate; i++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`; // Format AAAA-MM-JJ
    let className = i === date.getDate() && 
                   month === new Date().getMonth() && 
                   year === new Date().getFullYear()
      ? ' class="today"'    // Ajoute la classe "today" si c'est aujourd'hui
      : "";
    
    if (matchs[fullDate]) {
      // Ajoute la classe "has-matches" si des matchs existent ce jour-là
      className = className ? className.replace('"', ' has-matches"') : ' class="has-matches"';
    }
    
    datesHtml += `<li${className} data-date="${fullDate}">${i}</li>`; // Ajoute le jour au HTML
  }

  // Ajoute les jours inactifs du mois suivant pour compléter la semaine
  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml; // Insère le HTML dans la liste des dates
  header.textContent = `${months[month]} ${year}`; // Met à jour le titre du calendrier

  // Ajoute les événements de clic sur chaque jour actif
  document.querySelectorAll(".dates li:not(.inactive)").forEach((li) => {
    li.addEventListener("click", () => {
      const selectedDate = li.getAttribute("data-date"); // Récupère la date sélectionnée
      if (selectedDate) {
        scrollToMatch(selectedDate); // Fait défiler jusqu'au match du jour sélectionné
      }
    });
  });
}

// Fonction pour afficher les matchs d'une date sélectionnée
function showMatches(selectedDate) {
  const matchList = document.getElementById("matches"); // Récupère le conteneur des matchs
  matchList.innerHTML = ""; // Vide le contenu précédent

  if (matchs[selectedDate]) { // Si des matchs existent ce jour-là
    const matchBox = document.createElement("div"); // Crée une boîte pour les matchs
    matchBox.className = "match-box";
    matchBox.id = `match-${selectedDate}`;

    // Ajoute l'en-tête de la date
    const dateHeader = document.createElement("div");
    dateHeader.className = "match-date";
    dateHeader.textContent = formatDate(new Date(selectedDate));
    matchBox.appendChild(dateHeader);

    // Parcourt tous les matchs du jour
    matchs[selectedDate].forEach((match, index) => {
      if (match.matches === true) return; // Ignore les placeholders

      // Crée le conteneur du contenu du match
      const matchContent = document.createElement("div");
      matchContent.className = "match-content";

      // Équipe à domicile
      const homeTeam = document.createElement("div");
      homeTeam.className = "team team-home";
      homeTeam.innerHTML = `
        <span class="team-name">${match.homeTeam.name}</span>
        <div class="team-flag">
          <img src="${match.homeTeam.flag}" alt="Drapeau de ${match.homeTeam.name}">
        </div>
      `;

      // Heure du match
      const matchTime = document.createElement("div");
      matchTime.className = "match-time";
      matchTime.innerHTML = `<span>${match.time}</span>`;

      // Équipe à l'extérieur
      const awayTeam = document.createElement("div");
      awayTeam.className = "team team-away";
      awayTeam.innerHTML = `
        <div class="team-flag">
          <img src="${match.awayTeam.flag}" alt="Drapeau de ${match.awayTeam.name}">
        </div>
        <span class="team-name">${match.awayTeam.name}</span>
      `;

      // Ajoute les équipes et l'heure au contenu du match
      matchContent.appendChild(homeTeam);
      matchContent.appendChild(matchTime);
      matchContent.appendChild(awayTeam);

      // Ajoute le contenu du match à la boîte du match
      matchBox.appendChild(matchContent);

      // Ajoute les infos du stade
      const stadiumInfo = document.createElement("div");
      stadiumInfo.className = "match-stadium";
      stadiumInfo.innerHTML = `
        <i class="fas fa-map-marker-alt"></i>
        <span>${match.stadium}</span>
      `;
      matchBox.appendChild(stadiumInfo);

      // Ajoute un séparateur si ce n'est pas le dernier match
      if (index < matchs[selectedDate].length - 1 && matchs[selectedDate][index + 1].matches !== true) {
        const separator = document.createElement("div");
        separator.className = "match-separator";
        matchBox.appendChild(separator);
      }
    });

    matchList.appendChild(matchBox); // Ajoute la boîte des matchs au conteneur principal
  }
}

// Ajoute les écouteurs d'événements sur les boutons de navigation du calendrier
navs.forEach(nav => {
  nav.addEventListener("click", () => {
    if (nav.id === "prev") { // Si bouton précédent
      month--;
      if (month < 0) {       // Si on dépasse janvier, on passe à décembre de l'année précédente
        month = 11;
        year--;
      }
    } else {                 // Sinon bouton suivant
      month++;
      if (month > 11) {      // Si on dépasse décembre, on passe à janvier de l'année suivante
        month = 0;
        year++;
      }
    }
    renderCalendar();        // Met à jour le calendrier
  });
});

// Affiche le calendrier au chargement de la page
renderCalendar();
