// Js code goes here
const city = document.getElementById('city')
let lastFetchedData = [];

city.addEventListener('input', (event)=> 
  handleCityInput(event.target.value)
)
const handleChildClick = (cityName)=> {
  return ()=> {
    const clickedCity = lastFetchedData.find((el)=> el.name === cityName)
    document.getElementById('selectedCity').innerHTML = `${cityName}`
    document.getElementById('selectedWeather').innerHTML = `${clickedCity.weather}`
    document.getElementById('selectedStatus').innerHTML = `${Object.values(clickedCity.status)}`
    document.getElementById("city").value = cityName;

  }
}
const handleCityInput = debounce((countryText)=> {
  return fetchCountries(countryText).then(({data})=> {
    const suggestionsEl = document.getElementById('suggestions')
    suggestionsEl.innerHTML = '';
    lastFetchedData = data;
    if (data.length) {
      for (const city of data) {
        const countryChild = document.createElement('div')
        countryChild.classList.add('suggestionItem')
        countryChild.addEventListener('click', handleChildClick(city.name))
        countryChild.innerText = city.name;
        suggestionsEl.appendChild(countryChild)
      }
    } else {
      const countryChild = document.createElement('div')
      countryChild.classList.add('suggestionItem')
      countryChild.innerText = 'No results';
      suggestionsEl.appendChild(countryChild)
    }

  })
}, 1000)

const fetchCountries = (countryText) => {
  return fetch(`https://jsonmock.hackerrank.com/api/weather?name=${countryText}`)
  .then(response => response.json())
  .then(data => data)
}

function debounce(func, timeout = 300){
  let timer;
  return (...args) => {
    clearTimeout(timer);
    timer = setTimeout(() => { 
      return func.apply(this, args); 
    }, timeout);
  };
}
