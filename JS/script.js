//Konstanten und Variablen definieren
const searchBox = document.querySelector('#search');
const app = document.querySelector('#app');
const searchOptions = document.querySelector("#sortOptions");
const anzahlFrucht = 49;
let allFrucht = [];
let filteredFrucht = [];

//___________________________________________________________
//Kernfunktionen
//___________________________________________________________

//Die ursprünglichen 49 werden geladen, in allFrucht gespeichert und die Karten erstellt
async function init() {
    let fruit = await fetchData('API/api_extract.php'); //hier wird die fetch Funktion aufgerufen
    //console.log(fruit);
    fruit.sort((a, b) => a.name.localeCompare(b.name));
    fruit.forEach(frucht => {
        createCard(frucht);
    });
    
}    


async function fetchData(url) { //die fetch Funktion wird aufgerufen
    try { 
        let response = await fetch(url); 
        let data = await response.json(); 
        allFrucht = data;
        return data; 
    } catch (error) { 
        console.log(error);
    }
}


//Eingabe wird geprüft, das Array gefiltert und die Karten neu erstellt
async function sucheFrucht(searchInput, fruechte) {
    // Konvertiere den Suchbegriff in Kleinbuchstaben
    searchInput = searchInput.toLowerCase();
    // Filtere das Array `allFrucht`, indem die Groß- und Kleinschreibung ignoriert wird
    let filteredFrucht = fruechte.filter(frucht => frucht.name.toLowerCase().includes(searchInput));
    // Leere den Inhalt des app-Elements
    app.innerHTML = '';
    // Erstelle Karten für jedes gefilterte Frucht-Objekt
    filteredFrucht.forEach(frucht => {
        createCard(frucht);
    });

}

// Sortierung A-Z, Z-A
function sortList(searchInput, fruechte) {
    // Filtere die Liste, um sicherzustellen, dass nur Zeichenfolgen vorhanden sind

    let currentSearchInput = searchBox.value

    // Zugriff auf deine Liste von Elementen, die sortiert werden sollen
    if (searchInput === "aufsteigend") {
        fruechte.sort((a, b) => a.name.localeCompare(b.name));
    } else if (searchInput === "absteigend") {
        fruechte.sort((a, b) => b.name.localeCompare(a.name));
    }
    // // Leere den Inhalt des app-Elements
    app.innerHTML = '';

    // Erstelle Karten für jedes Element in der sortierten Liste
    fruechte.forEach(frucht => {
        createCard(frucht); // Annahme: createCard ist eine Funktion, die eine Karte für ein gegebenes Element erstellt
    });

    sucheFrucht(currentSearchInput, fruechte)
}



//___________________________________________________________
//Eventlistener
//___________________________________________________________

//dom loaded
document.addEventListener('DOMContentLoaded', function () { //wenn die Seite geladen ist, wird die Funktion init aufgerufen
    // Fruchtfamilie filtern
    var buttons = document.getElementById('filter');

    buttons.addEventListener('click', function(e) {
        console.log("Kategorie Button gedrückt")
        
        
        if(e.target.nodeName != "BUTTON") { //damit man den bereich um die Familien herum (das ganze div) nicht klicken kann
            return;
            //filteredFrucht = allFrucht;
        }

        


        buttons.querySelectorAll('button').forEach(function(el) {//hier wird die klasse klicked entfernet
            el.classList.remove("clicked");
        });


        e.target.classList.add("clicked");

        if (e.target.id != "all") {
            filteredFrucht = filterByFamily(e.target.id)
            
        } else {
            filteredFrucht = allFrucht;
        }

        //doko added
        sortList(searchOptions.value, filteredFrucht) // damit die Sortierung beibehalten bleibt!

        //steht etwas in search bar
        //falls ja, filteredfrucht auch nach dem buchstaben suchen
        if(searchBox.value != "") {
            sucheFrucht(searchBox.value, filteredFrucht); //überprüfen
        } else {
            app.innerHTML = '';
            // Erstelle Karten für jedes Element in der sortierten Liste
            filteredFrucht.forEach(frucht => {
                createCard(frucht); // Annahme: createCard ist eine Funktion, die eine Karte für ein gegebenes Element erstellt
            });
        }

    });

    init();

        
});

//eventlistener searchBox input
searchBox.addEventListener('input', function () { //wenn in das Suchfeld etwas eingegeben wird, wird die Funktion sucheFrucht aufgerufen
    if (filteredFrucht.length >0){
        sucheFrucht(searchBox.value, filteredFrucht);
    } else {                
        sucheFrucht(searchBox.value, allFrucht);
    }
    
});

searchOptions.addEventListener("change", function() {
    if (filteredFrucht.length >0){
        sortList(searchOptions.value, filteredFrucht);
    } else {                
        sortList(searchOptions.value, allFrucht);
    }
    
});

function popupCard() {
    //timeout function (workaround for the popup not working because objects are not loaded yet)
    // setTimeout(function() {

    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-fruitCard');
    const fruchtCard = document.querySelectorAll('.fruchtCard');
    const closeBtn = document.createElement('span');
    closeBtn.innerHTML = '✖';
    closeBtn.classList.add('close');

    fruchtCard.forEach(element => {
        element.addEventListener('click', function(event) {
                const clickedCard = this.cloneNode(true); // Clone the clicked card
                clickedCard.appendChild(closeBtn); // Add close button to the clicked card
                popupContent.innerHTML = ''; // Clear previous content
                popupContent.appendChild(clickedCard); // Add clicked card to the popup
                popup.style.display = 'block'; // Display the popup
        });
    });


    // Event listener to close the popup when close button is clicked
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none'; 
    });

    document.addEventListener('keydown', function(event) {
        if (event.key === 'Escape') {
            popup.style.display = 'none';
        }
    });

}

popup.style.display = 'none';
//___________________________________________________________
//Grundfunktionen
//___________________________________________________________

//FruchtCard erstellen
function createCard(frucht) { //hier wird die Karte erstellt
    let card = document.createElement('div');
    card.className = 'fruchtCard';

    // Header area with name and types
    let cardHeader = document.createElement('div'); //hier wird der Header der Karte erstellt
    cardHeader.className = 'cardHeader';

    let nameElement = document.createElement('h2'); //hier wird die Überschrift der Frucht erstellt
    nameElement.textContent = frucht.name; //hier wird der Name der Frucht eingefügt
    cardHeader.appendChild(nameElement); //für jedes Element wird ein Kind erstellt
    card.appendChild(cardHeader);


    // // Image
    let fruchtImage = document.createElement('img');
    fruchtImage.src =`../pictures/${frucht.name}.png`; //hier ist in der API das Bild der Frucht hinterlegt
    fruchtImage.alt = frucht.name;
    fruchtImage.className = 'fruchtImage';
    card.appendChild(fruchtImage);
    
    // Nutrition List
    let list = document.createElement('ul');
    list.className = 'NutritionList';
    card.appendChild(list);

    let Familie = document.createElement('li');
    Familie.textContent = `Family: ${frucht.family}`;
    list.appendChild(Familie);

    let Kalorien = document.createElement('li');
    Kalorien.textContent = `Calories: ${frucht.nutritions.calories}`;
    list.appendChild(Kalorien);

    let Fett = document.createElement('li');
    Fett.textContent = `Fat: ${frucht.nutritions.fat}`;
    list.appendChild(Fett);

    let Protein = document.createElement('li');
    Protein.textContent = `Protein: ${frucht.nutritions.protein}`;
    list.appendChild(Protein);

    let Kohlenhydrate = document.createElement('li');
    Kohlenhydrate.textContent = `Carbohydrates: ${frucht.nutritions.carbohydrates}`;
    list.appendChild(Kohlenhydrate);

    let Zucker = document.createElement('li');
    Zucker.textContent = `Sugar: ${frucht.nutritions.sugar}`;
    list.appendChild(Zucker);

    app.appendChild(card);
    popupCard();
}
// filter
function filterByFamily(familyparameter) {
   return allFrucht.filter(frucht => frucht.family === familyparameter);
}



       


