const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
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

const weekDays = [
  "Dimanche",
  "Lundi",
  "Mardi",
  "Mercredi",
  "Jeudi",
  "Vendredi",
  "Samedi"
];

// Simplified match data structure
const matchs = {
  "2025-12-21": [
    {
      id: "match-2025-12-21",
      homeTeam: {
        name: "Maroc",
        flag: "images/Maroc.png"
      },
      awayTeam: {
        name: "Comores",
        flag: "images/Comoros.png"
      },
      time: "20:00",
      stadium: "Stade Mohammed V, Casablanca"
    }
  ],
  "2025-12-22": [
    {
      id: "match-2025-12-22",
      homeTeam: {
        name: "Mali",
        flag: "images/teams/Mali.jpg"
      },
      awayTeam: {
        name: "Zambie",
        flag: "images/teams/Zambie.jpg"
      },
      time: "15:30",
      stadium: "Stade Ibn Batouta, Tanger"
    },
    {
      homeTeam: {
        name: "Sénégal",
        flag: "images/teams/Senegal.jpg"
      },
      awayTeam: {
        name: "Algérie",
        flag: "images/teams/Algerie.jpg"
      },
      time: "18:00",
      stadium: "Stade Adrar, Agadir"
    }
  ]
};

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function scrollToMatch(dateStr) {
  const matchId = `match-${dateStr}`;
  const matchElement = document.getElementById(matchId);
  if (matchElement) {
    matchElement.scrollIntoView({ behavior: 'smooth', block: 'center' });
    matchElement.classList.add('highlight');
    setTimeout(() => {
      matchElement.classList.remove('highlight');
    }, 2000);
  }
}

function formatDate(date) {
  const day = weekDays[date.getDay()];
  const monthName = months[date.getMonth()];
  return `${day} ${date.getDate()} ${monthName} ${date.getFullYear()}`;
}

function renderCalendar() {
  const start = new Date(year, month, 1).getDay();
  const endDate = new Date(year, month + 1, 0).getDate();
  const end = new Date(year, month, endDate).getDay();
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  for (let i = 1; i <= endDate; i++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    let className = i === date.getDate() && 
                   month === new Date().getMonth() && 
                   year === new Date().getFullYear()
      ? ' class="today"'
      : "";
    
    if (matchs[fullDate]) {
      className = className ? className.replace('"', ' has-matches"') : ' class="has-matches"';
    }
    
    datesHtml += `<li${className} data-date="${fullDate}">${i}</li>`;
  }

  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

  // Add click events to dates
  document.querySelectorAll(".dates li:not(.inactive)").forEach((li) => {
    li.addEventListener("click", () => {
      const selectedDate = li.getAttribute("data-date");
      if (selectedDate) {
        scrollToMatch(selectedDate);
      }
    });
  });
}

function showMatches(selectedDate) {
  const matchList = document.getElementById("matches");
  const template = document.getElementById("match-template");
  matchList.innerHTML = "";

  if (matchs[selectedDate]) {
    matchs[selectedDate].forEach((match) => {
      const matchElement = template.content.cloneNode(true);
      
      // Date du match
      matchElement.querySelector(".match-date").textContent = formatDate(new Date(selectedDate));
      
      // Équipe à domicile
      const homeTeam = matchElement.querySelector(".team-home");
      homeTeam.querySelector(".team-name").textContent = match.homeTeam.name;
      homeTeam.querySelector(".team-flag img").src = match.homeTeam.flag;
      homeTeam.querySelector(".team-flag img").alt = `${match.homeTeam.name} flag`;
      
      // Heure du match
      const [time, period] = match.time.split(" ");
      matchElement.querySelector(".match-time").innerHTML = `
        <span>${time}</span>
        <span>${period}</span>
      `;
      
      // Équipe à l'extérieur
      const awayTeam = matchElement.querySelector(".team-away");
      awayTeam.querySelector(".team-name").textContent = match.awayTeam.name;
      awayTeam.querySelector(".team-flag img").src = match.awayTeam.flag;
      awayTeam.querySelector(".team-flag img").alt = `${match.awayTeam.name} flag`;
      
      matchList.appendChild(matchElement);
    });
  } else {
    const noMatch = document.createElement("div");
    noMatch.className = "match-box";
    noMatch.innerHTML = `
      <div class="match-date">${formatDate(new Date(selectedDate))}</div>
      <div class="match-content">
        <div class="team">
          <span class="team-name">Aucun match prévu ce jour</span>
        </div>
      </div>
    `;
    matchList.appendChild(noMatch);
  }
}

// Add navigation event listeners
navs.forEach(nav => {
  nav.addEventListener("click", () => {
    if (nav.id === "prev") {
      month--;
      if (month < 0) {
        month = 11;
        year--;
      }
    } else {
      month++;
      if (month > 11) {
        month = 0;
        year++;
      }
    }
    renderCalendar();
  });
});

// Initial render
renderCalendar();
