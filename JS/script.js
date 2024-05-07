//Konstanten und Variablen definieren
const searchBox = document.querySelector('#search');
const app = document.querySelector('#app');
const searchOptions = document.querySelector("#sortOptions");
const anzahlFrucht = 49;
let allFrucht = [];

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

    
    // const fruchtCard = document.querySelectorAll('.fruchtCard');
    // fruchtCard.forEach(element => {
    //     element.addEventListener('click', function() {
    //         if (this.classList.contains('clicked')) {
    //             fruchtCard.forEach(card => {
    //                 card.classList.remove('clicked');
    //             });
    //         } else {
    //             fruchtCard.forEach(card => {
    //                 card.classList.remove('clicked');
    //             });
    //             this.classList.add('clicked');
                
    //         }
            
    //     });
    // });
       
    
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
async function sucheFrucht(searchInput) {
    // Konvertiere den Suchbegriff in Kleinbuchstaben
    searchInput = searchInput.toLowerCase();
    // Filtere das Array `allFrucht`, indem die Groß- und Kleinschreibung ignoriert wird
    let filteredFrucht = allFrucht.filter(frucht => frucht.name.toLowerCase().includes(searchInput));
    // Leere den Inhalt des app-Elements
    app.innerHTML = '';
    // Erstelle Karten für jedes gefilterte Frucht-Objekt
    filteredFrucht.forEach(frucht => {
        createCard(frucht);
    });
}

// Sortierung A-Z, Z-A
function sortList(searchInput) {
    // Filtere die Liste, um sicherzustellen, dass nur Zeichenfolgen vorhanden sind

    // Zugriff auf deine Liste von Elementen, die sortiert werden sollen
    if (searchInput === "aufsteigend") {
        allFrucht.sort((a, b) => a.name.localeCompare(b.name));
    } else if (searchInput === "absteigend") {
        allFrucht.sort((a, b) => b.name.localeCompare(a.name));
    }
    // // Leere den Inhalt des app-Elements
    app.innerHTML = '';

    // Erstelle Karten für jedes Element in der sortierten Liste
    allFrucht.forEach(frucht => {
     createCard(frucht); // Annahme: createCard ist eine Funktion, die eine Karte für ein gegebenes Element erstellt
    });
}

//___________________________________________________________
//Eventlistener
//___________________________________________________________

//dom loaded
document.addEventListener('DOMContentLoaded', function () { //wenn die Seite geladen ist, wird die Funktion init aufgerufen
    
    var buttons = document.getElementById('filter');
    let filteredFrucht;
    buttons.addEventListener('click', function(e) {
        if(e.target.nodeName != "BUTTON") {
            return;
            //filteredFrucht = allFrucht;
        }
        buttons.querySelectorAll('button').forEach(function(el) {
            el.classList.remove("clicked");
        });
        e.target.classList.add("clicked");

        if (e.target.id != "all") {
            filteredFrucht = filterByFamily(e.target.id)
            
        } else {
            filteredFrucht = allFrucht;
        }
        app.innerHTML = '';
            // Erstelle Karten für jedes Element in der sortierten Liste
            filteredFrucht.forEach(frucht => {
                createCard(frucht); // Annahme: createCard ist eine Funktion, die eine Karte für ein gegebenes Element erstellt
        });

    //     let filteredFrucht = filterByFamily('Moraceae');
        // alert('Button clicked');
        
       //init();
       
    });

    init();
    popupCard();

        
});

//eventlistener searchBox input
searchBox.addEventListener('input', function () { //wenn in das Suchfeld etwas eingegeben wird, wird die Funktion sucheFrucht aufgerufen
    sucheFrucht(searchBox.value);
    
});

searchOptions.addEventListener("change", function() {
    sortList(searchOptions.value);
});


async function popupCard() {
    await init();
    const popup = document.getElementById('popup');
    const popupContent = document.getElementById('popup-fruitCard');
    const closeBtn = document.querySelector('.close');
    const fruchtCard = document.querySelectorAll('.fruchtCard');
    console.log(fruchtCard);

    fruchtCard.forEach(element => {
        element.addEventListener('click', function(event) {
            console.log(event.target);
                const clickedCard = this.cloneNode(true); // Clone the clicked card
                console.log(clickedCard);
                popupContent.innerHTML = ''; // Clear previous content
                popupContent.appendChild(clickedCard); // Add clicked card to the popup
                popup.style.display = 'block'; // Display the popup
            
            
        });
    });


    // Event listener to close the popup when close button is clicked
    closeBtn.addEventListener('click', function() {
        popup.style.display = 'none';
    });

    // Event listener to close the popup when clicking outside the popup content
    window.addEventListener('click', function(event) {
        if (event.target === popup) {
            popup.style.display = 'none';
        }
    });
}





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
}
// filter
function filterByFamily(familyparameter) {
   return allFrucht.filter(frucht => frucht.family === familyparameter);
}



       


