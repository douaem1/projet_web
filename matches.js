const header = document.querySelector(".calendar h3");
const dates = document.querySelector(".dates");
const navs = document.querySelectorAll("#prev, #next");

const months = [
  "January",
  "February",
  "March",
  "April",
  "May",
  "June",
  "July",
  "August",
  "September",
  "October",
  "November",
  "December",
];

// Ajout des matchs
const matchs = {
  "2025-01-13": [
    { teams: "Maroc 🇲🇦 vs Égypte 🇪🇬", place: "Casablanca", time: "20h00" },
  ],
  "2025-01-14": [
    { teams: "Sénégal 🇸🇳 vs Algérie 🇩🇿", place: "Rabat", time: "18h00" }
  ],
  // Ajoute d'autres matchs ici manuellement
};

let date = new Date();
let month = date.getMonth();
let year = date.getFullYear();

function renderCalendar() {
  // premier jour du mois
  const start = new Date(year, month, 1).getDay();
  // dernier jour du mois
  const endDate = new Date(year, month + 1, 0).getDate();
  // dernier jour de la semaine du mois
  const end = new Date(year, month, endDate).getDay();
  // dernier jour du mois précédent
  const endDatePrev = new Date(year, month, 0).getDate();

  let datesHtml = "";

  // Ajoute les jours du mois précédent (inactifs)
  for (let i = start; i > 0; i--) {
    datesHtml += `<li class="inactive">${endDatePrev - i + 1}</li>`;
  }

  // Génère les jours du mois actuel dynamiquement
  for (let i = 1; i <= endDate; i++) {
    const fullDate = `${year}-${String(month + 1).padStart(2, "0")}-${String(i).padStart(2, "0")}`;
    let className =
      i === date.getDate() &&
      month === new Date().getMonth() &&
      year === new Date().getFullYear()
        ? ' class="today"'
        : "";
    datesHtml += `<li${className} data-date="${fullDate}">${i}</li>`;
  }

  // Ajoute les jours du mois suivant (inactifs)
  for (let i = end; i < 6; i++) {
    datesHtml += `<li class="inactive">${i - end + 1}</li>`;
  }

  dates.innerHTML = datesHtml;
  header.textContent = `${months[month]} ${year}`;

  // Ajoute un écouteur de clic à chaque jour
  document.querySelectorAll(".dates li").forEach((li) => {
    li.addEventListener("click", () => {
      const selectedDate = li.getAttribute("data-date");
      const matchList = document.getElementById("matches");
      matchList.innerHTML = ""; // Vide l'ancienne liste

      if (matchs[selectedDate]) {
        matchs[selectedDate].forEach((match) => {
          const item = document.createElement("li");
          item.innerHTML = `<strong>${match.teams}</strong> – ${match.place} à ${match.time}`;
          matchList.appendChild(item);
        });
      } else {
        matchList.innerHTML = "<li>Aucun match prévu ce jour-là ! </li>";
      }
    });
  });
}

// Navigation pour changer de mois
navs.forEach((nav) => {
  nav.addEventListener("click", (e) => {
    const btnId = e.target.id;

    if (btnId === "prev" && month === 0) {
      year--;
      month = 11;
    } else if (btnId === "next" && month === 11) {
      year++;
      month = 0;
    } else {
      month = btnId === "next" ? month + 1 : month - 1;
    }

    date = new Date(year, month, new Date().getDate());
    year = date.getFullYear();
    month = date.getMonth();

    renderCalendar();
  });
});

renderCalendar();
