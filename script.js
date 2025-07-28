// to get india only - https://restcountries.com/v3.1/name/Republic%20of%20India
//all indipendent country - https://restcountries.com/v3.1/independent
// all country name and flag - https://restcountries.com/v3.1/all?fields=name,flags
console.log("hi")
let url = "https://restcountries.com/v3.1/all?fields=name,flags,population,region,capital,cca3"
console.log("hi2")
const cardContainer = document.querySelector(".country-container")

const filter = document.querySelector("#filter");
const search = document.querySelector('#inp')
const body = document.querySelector('body')
const darkMode = document.querySelector("#dark")

let isFirst = true
let allCountryData;

async function allCountry() {
    let res = await axios.get(url);
    let data = res.data
    if(isFirst) {
        allCountryData = data;
        isFirst = false;
    }
    console.log(data)
    makeAllCards(data);
}
function makeAllCards(data){
    data.forEach((country) => {
        let cca3 = country.cca3;
        let flagSvg = country.flags.svg;
        let countryName = country.name.common;
        let population = country.population.toLocaleString('en-IN')
        let region = country.region;
        let capital = country.capital ? country.capital.join(", ") : "none"
        makeNewCard(cca3, flagSvg, countryName, population, region, capital)
    })
}
function makeNewCard(cca3, flagSvg ,countryName, population, region, capital) {
    const countryCard = document.createElement("a")
    countryCard.classList.add("country-card")
    countryCard.href = `/country.html?alpha=${cca3}`

    countryCard.innerHTML = 
    `
        <img src=${flagSvg} alt="flag">
        <div class="country-info">
        <h3><b>${countryName}</b></h3>
        <div class="country-details">
            <p><b>Population: </b>${population}</p>
            <p><b>Region: </b>${region}</p>
            <p><b>Capital: </b>${capital}</p>
        </div>
        </div>
    `
    cardContainer.appendChild(countryCard)
}

filter.addEventListener("change" , (event) => {
    url = `https://restcountries.com/v3.1/region/${filter.value}`
    cardContainer.innerHTML = ``
    allCountry()
})
search.addEventListener("input", function(event) {
    let userInp = event.target.value.trim()
    console.log(event.target.value)

    if(userInp != '') {
        let searchCountry = [];
        for(let data of allCountryData){
            let currCountryName = data.name.common
            if(isSubsequence(userInp, currCountryName)){
                searchCountry.push(data)
            }
        }
        cardContainer.innerHTML = ``
        makeAllCards(searchCountry)
    }
})
darkMode.addEventListener("click", (event) => {
    body.classList.toggle("dark")
})

function isSubsequence(small, big){
    small = small.toLowerCase()
    big = big.toLowerCase()
    let i = 0, j = 0;
    while(i<small.length && j<big.length){
        if(small[i] == big[j]) i++;
        j++;
    }
    return i == small.length
}
const isSubString = (small, big) => big.toLowerCase().includes(small.toLowerCase())


allCountry();