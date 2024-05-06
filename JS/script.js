//Konstanten und Variablen definieren
const searchBox = document.querySelector('#search');
const app = document.querySelector('#app');
const anzahlFrucht = 49;
let allFrucht = [];

//___________________________________________________________
//Kernfunktionen
//___________________________________________________________

//Die ursprünglichen 49 werden geladen, in allFrucht gespeichert und die Karten erstellt
async function init() {
    let FruchtDetails = await fetchData('https://www.fruityvice.com/api/fruit/all');
    allFrucht = await Promise.all(FruchtDetails.results.map(async (frucht) => {
        let fruchtDetails = await fetchData(frucht.url);
        return fruchtDetails;
    }));
    allFrucht.forEach(frucht => {
        createCard(frucht);
    });
}

async function fetchData(url) {
    try {
        let response = await fetch(url);
        let data = await response.json();
        return data;
    } catch (error) {
        console.log(error);
    }
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


