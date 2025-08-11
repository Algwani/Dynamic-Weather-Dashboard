// ON GOD
const API_KEY = "412b52a082e82b12e71ed9eb1479482b";

let cityInput = document.getElementById("cityName");
let addBtn = document.getElementById("addBtn");
let cards = document.getElementById("cards");

let savedCities = JSON.parse(localStorage.getItem("myCities")) || [];

// function to get data from API
async function getData(city) {
    // let url = "https://wrongapi.com/data"  
    // let url = `https://api.openweathermap.org/data/2.5/weather?name=${city}&appid=${API_KEY}` // wrong param name

    let url = `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`;

    let res = await fetch(url);
    if (!res.ok) {
        alert("City not found");
        return null;
    }
    return await res.json();
}

// function to show all cities
function showCities() {
    cards.innerHTML = "";
    savedCities.forEach(async (city) => {
        let data = await getData(city);
        if (!data) return;

        let div = document.createElement("div");
        div.className = "card";

        // div.innerHTML = city; // it only showed city name 
        div.innerHTML = `
            <h3>${data.name}</h3>
            <img src="https://openweathermap.org/img/wn/${data.weather[0].icon}.png">
            <p>${data.weather[0].description}</p>
            <p>${data.main.temp} °C</p>
            <button class="remove">Remove</button>
        `;

        div.querySelector(".remove").addEventListener("click", () => {
            // savedCities.pop(city) // <-- wrong, removed last item only
            savedCities = savedCities.filter(c => c !== city);
            localStorage.setItem("myCities", JSON.stringify(savedCities));
            showCities();
        });

        cards.appendChild(div);
    });
}

// when Add button is clicked
addBtn.addEventListener("click", () => {
    let city = cityInput.value.trim();
    // if (city) savedCities.push(city) // <-- no check for duplicates before
    if (city && !savedCities.includes(city)) {
        savedCities.push(city);
        localStorage.setItem("myCities", JSON.stringify(savedCities));
        showCities();
    }
    cityInput.value = "";
});

// show saved cities on page load
showCities();
