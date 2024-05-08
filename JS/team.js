const cardTeam = document.querySelector('#cardTeam');
const anzahlTeam = 3;
let allTeam = ['Yara', 'Moritz', 'Manuela']; // Beachte, dass die Namen als Strings definiert werden müssen

//dom loaded
document.addEventListener('DOMContentLoaded', function () {
    cardTeam.innerHTML = '';
    // Iteriere durch jedes Element in allTeam und rufe createCard für jedes Element auf
    allTeam.forEach(team => {
        createCard({ name: team }); // Annahme: createCard ist eine Funktion, die eine Karte für ein gegebenes Element erstellt
    });
});

//teamCard erstellen
function createCard(team) {
    let card = document.createElement('div');
    card.className = 'teamCard';

    // Header area with name and types
    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';

    let nameElement = document.createElement('h2');
    nameElement.textContent = team.name;
    cardHeader.appendChild(nameElement);
    card.appendChild(cardHeader);

    // Image
    let teamImage = document.createElement('img');
    teamImage.src =`../pictures/${team.name}.png`;
    teamImage.alt = team.name;
    teamImage.className = 'teamImage';
    card.appendChild(teamImage);

    cardTeam.appendChild(card);
}