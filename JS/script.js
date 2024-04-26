//Konstanten und Variablen definieren
const searchBox = document.querySelector('#search');
const app = document.querySelector('#app');
const anzahlFrucht = 49;
let allFrucht = [];

//___________________________________________________________
//Kernfunktionen
//___________________________________________________________

//Die ursprünglichen 151 werden geladen, in allFrucht gespeichert und die Karten erstellt
async function init() {
    let url = `https://www.fruityvice.com/api/fruit/all`;
    let fruchtWithoutDetails = await fetchData(url);
    allFrucht = await Promise.all(fruchtWithoutDetails.results.map(async (frucht) => {
        let detailedData = await fetchData(frucht.url); // Fetch detailed data for each Frucht
        return detailedData; // Return detailed data instead of basic
    }));
    allFrucht.forEach(frucht => {
        createCard(frucht);
    });
}


//Eingabe wird geprüft, das Array gefiltert und die Karten neu erstellt
async function sucheFrucht(searchInput) {
    let filteredFrucht = allFrucht.filter(wantedFrucht => wantedFrucht.name.includes(searchInput));
    app.innerHTML = '';
    filteredFrucht.forEach(frucht => {
        createCard(frucht);
    });
}



//___________________________________________________________
//Eventlistener
//___________________________________________________________

//dom loaded
document.addEventListener('DOMContentLoaded', function () {
    init();
});

//eventlistener searchBox input
searchBox.addEventListener('input', function () {
    sucheFrucht(searchBox.value);
});


//___________________________________________________________
//Grundfunktionen
//___________________________________________________________

//Fetch
async function fetchData(url) {  // asynchrone Funktion, die auf ein Promise wartet
    try { // try-catch-Block, um Fehler abzufangen
        let response = await fetch(url); // auf das Promise warten und dann die Response in die Variable speichern
        let data = await response.json(); // Extract JSON from the http response
        return data;
    }
    catch (error) { // Fehlerbehandlung
        console.log(error);
    }
}

//FruchtCard erstellen
function createCard(frucht) {
    let card = document.createElement('div');
    card.className = 'fruchtCard';

    // Header area with name and types
    let cardHeader = document.createElement('div');
    cardHeader.className = 'cardHeader';

    let nameElement = document.createElement('h2');
    nameElement.textContent = frucht.name;
    cardHeader.appendChild(nameElement);

    let typesContainer = document.createElement('div');
    typesContainer.className = 'typesContainer';

    frucht.types.forEach(item => {
        let typeIcon = document.createElement('div');
        typeIcon.className = `icon ${item.type.name}`; // Use the class for the type
        let typeSVG = document.createElement('img');
        typeSVG.src = `icons/${item.type.name}.svg`; // Assuming you have SVGs named after types
        typeSVG.alt = item.type.name;
        typeIcon.appendChild(typeSVG);
        typesContainer.appendChild(typeIcon);
    });

    cardHeader.appendChild(typesContainer);
    card.appendChild(cardHeader);

    // Image
    let fruchtImage = document.createElement('img');
    fruchtImage.src = frucht.sprites.other.home.front_default; //hier ist in der API das Bild der Frucht hinterlegt
    fruchtImage.alt = frucht.name;
    fruchtImage.className = 'fruchtImage';
    card.appendChild(fruchtImage);

    // Details area with stats
    let detailsDiv = document.createElement('div');
    detailsDiv.className = 'detailsDiv';

    let statsList = document.createElement('ul');
    statsList.className = 'statsList';

    frucht.stats.forEach(stat => {
        let statItem = document.createElement('li');
        let statName = document.createElement('strong');
        statName.textContent = `${stat.stat.name}: `;
        statItem.appendChild(statName);
        statItem.appendChild(document.createTextNode(stat.base_stat));
        statsList.appendChild(statItem);
    });

    detailsDiv.appendChild(statsList);
    card.appendChild(detailsDiv);

    app.appendChild(card);
}