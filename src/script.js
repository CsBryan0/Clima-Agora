const apiKey = "9b51eadf6ed81c1dba5349e3ee3c024a"

const cityInput = document.querySelector("#city-input")
const searchBtn = document.querySelector("#search")


let cityElement = document.querySelector('#city')
let tempElement = document.querySelector('#temperature span')
let descElement = document.querySelector('#description')
let weatherIconElement = document.querySelector('#weather-icon')
let humidityElement = document.querySelector('#humidity span')
let windElement = document.querySelector('#wind span')


const weatherContainer = document.querySelector('#weather-data')


const errorMenssageContainer = document.querySelector('#error-message')
const loader = document.querySelector("#loader")

const suggestionContainer = document.querySelector('#suggestions')
const suggestionButtons = document.querySelectorAll('#suggestions button')


const toggleLoader = () => {
    loader.classList.toggle("hide")
}

// Funções
const getWeatherData = async(city) => {
    toggleLoader()

    const apiWeatherURL = `https://api.openweathermap.org/data/2.5/weather?q=${city}&units=metric&appid=${apiKey}&lang=pt_br`


    const res = await fetch(apiWeatherURL)
    const data = await res.json()

    toggleLoader()
    
    return data

}

// Error
const showErrorMenssage = () => {
    errorMenssageContainer.classList.remove("hide")
}

const hideInformation = () => {
    errorMenssageContainer.classList.add("hide")
    weatherContainer.classList.add("hide")

    suggestionContainer.classList.add("hide")
}

const showWeatherData = async (city) => {
    hideInformation()

    const data = await getWeatherData(city)

    if(data.cod === "404") {
        showErrorMenssage()
        return
    }

    cityElement.innerText = data.name;
    tempElement.innerText = parseInt(data.main.temp);
    descElement.innerText = data.weather[0].description;
    weatherIconElement.setAttribute("src", `http://openweathermap.org/img/wn/${data.weather[0].icon}.png`);
    
    humidityElement.innerText = `${data.main.humidity}%`
    windElement.innerText = `${data.wind.speed}km/h`

    weatherContainer.classList.remove('hide')
}

// Eventos

searchBtn.addEventListener('click', (e) =>{

    e.preventDefault()

    let city = cityInput.value

    showWeatherData(city)
    
})

cityInput.addEventListener('keyup', (e) => {
    if (e.code === 'Enter') {
        const city = e.target.value

        showWeatherData(city)
    }
})


suggestionButtons.forEach((btn) => {
    btn.addEventListener("click", () => {
      const city = btn.getAttribute("id");
  
      showWeatherData(city);
    });
  });