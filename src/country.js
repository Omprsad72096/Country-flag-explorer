import './country.scss'

const cca3 = new URLSearchParams(location.search).get("alpha")
let url = `https://restcountries.com/v3.1/alpha/${cca3}`;
let urlBorder = `https://restcountries.com/v3.1/alpha/`

const flagImg = document.querySelector(".flag-img")
const countryName = document.querySelector(".country-name")
const nativeName = document.querySelector("#nativeName")
const popu = document.querySelector("#popu")
const region = document.querySelector("#reg")
const subRegion = document.querySelector("#sub-reg")
const capital = document.querySelector("#cap")
const tld = document.querySelector("#tld")
const currencies = document.querySelector("#currencies")
const lang = document.querySelector("#lang")
const borderCounty = document.querySelector('.border-country')

const body = document.querySelector('body')
const darkMode = document.querySelector("#dark")

const back = document.querySelector(".back")
back.addEventListener("click", () => history.back());

async function fetchAll(borders) {
    for(const br of borders) {
        const res = await axios.get(urlBorder+br)
        const [data] = res.data
        const ancor = document.createElement("a");
        ancor.innerHTML = `<a href="country.html?alpha=${data.cca3}" class="button">${data.name.common}</a>`
        borderCounty.append(ancor)
    }
}
async function showCountry() {
    let res = await axios.get(url)
    let [data] = res.data;

    console.log(data)
    flagImg.src =  data.flags.svg
    countryName.innerText = data.name.common
    nativeName.innerText =  data.name.nativeName ? Object.values(data.name.nativeName)[0]?.common : "none";
    popu.innerText = data.population.toLocaleString('en-IN')
    region.innerText = data.region
    subRegion.innerText = data.subregion ? data.subregion : "none";
    capital.innerText = data.capital ? data.capital.join(", ") : "none";
    
    tld.innerText = data.tld.join(", ")
    currencies.innerText = data.currencies ? Object.values(data.currencies).map((curr) => curr.name).join(", ") : "none";
    lang.innerText = data.languages ? Object.values(data.languages).join(", ") : ["none"]

    let borders = data.borders ? data.borders : ["none"]
    if(borders[0] != 'none') {
        await fetchAll(borders);
    }
    else {
        let p = document.createElement("p")
        p.innerHTML = `<p>&nbsp;None</p>`
        borderCounty.append(p)
    }
}

darkMode.addEventListener("click", (event) => {
    body.classList.toggle("dark")
})

showCountry();


//Object.values(data.name.nativeName) -> convert the objects in nativeName to array [{},  {}, {}]
// "name": {
//     "common": "India",
//     "official": "Republic of India",
//     "nativeName": {
//         "eng": {
//             "official": "Republic of India",
//             "common": "India"
//         },
//         "hin": {
//             "official": "भारत गणराज्य",
//             "common": "भारत"
//         },
//         "tam": {
//             "official": "இந்தியக் குடியரசு",
//             "common": "இந்தியா"
//         }
//     }
// },



//Object.values(data.currencies).map((curr) => curr.name) - convert the data currencies in array, then in that array i seletes the name key and return array of that
// Object.values(data.currencies) --> [{}, {}]

// map exchange curr obj {} with curr.name
// Object.values(data.currencies).map((curr) => curr.name) --> ["Indian rupee", "Indian rupee 2"]
// "currencies": {
//     "INR": {
//         "symbol": "₹",
//         "name": "Indian rupee"
//     }
//     "INR 2": {
//         "symbol": "₹ 2",
//         "name": "Indian rupee 2"
//     }
// },




// let border = ["France", "India", "Nepal"];
// let borderContainer = document.querySelector(".border-country");
// borderContainer.innerHTML = `<p><b>Border Countries: </b></p>` +
// border.map(country => `<a href="#" class="button">${country}</a>`).join("");

// border.map(...) creates an array like:

// [
//   '<a href="#" class="button">France</a>',
//   '<a href="#" class="button">India</a>',
//   '<a href="#" class="button">Nepal</a>'
// ]