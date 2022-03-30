# Javascript: Weather Finder
Complete a partially completed JavaScript list view application. Complete the application as shown below in order to pass all the unit tests.

## Environment 

- Node Version: 12(LTS)
- Default Port: 8000

## Application Demo:
![](https://hrcdn.net/s3_pub/istreet-assets/G_42eeQTJrFkNYNoBDw3aw/1062827-vanillajs-weather-finder-easy.gif)

## Application description

Weather finder is a web application that allows users to find the details of the weather based on a particular city. Here, the user types the name of a city and clicks on it to get the weather details about that city.

- A form with a single Field (Name of the city)
- It should autosuggest city names as and when the user keys in some input.
- It should hit an API with a debounce limit of 1000ms. Such that, no API call is made unless the pause between the keystrokes are at least 1000ms.
- The API URL to call is https://jsonmock.hackerrank.com/api/weather?name=<name>. Here, <name> is the city name entered into the text box. For example, for the value Dallas, the API hit has to be https://jsonmock.hackerrank.com/api/weather?name=Dallas. 
- The response contains a data field, where data is an array of objects, and each object is a weather record. The sample format of the data field is given below:

```
"data": [
    {
      "name": "Dallas",
      "weather": "12 degree", // Format is always "<value> degree"
      "status": [
        "Wind: 2Kmph", // String
        "Humidity: 5%" // String
      ]
    },
    ...
  ]
```

- Finally, when the user clicks on any city the name of the City should be on the input box and the weather details should be shown right below that in the Details section.
- Fields with id #selectedCity, #selctedWeather and #selectedStatus should be populated with a selected city information.



## Test Cases:

- It should suggest city names on typing, showing the results returned by the API.
- Selecting a suggestion should change the input field value to the selected city's name.
- It should add the contents to the Details section. Where you will have to update the (city name, weather, and status) on selecting an option from the suggestion.
    - city name should be updated inside the span with id `selectedCity`
    - Weather should be updated inside the span with id `selectedWeather`
    - status should be updated inside the span with id `selectedStatus`
- It should debounce before making API calls
- It should show "No results" message if the data is empty.


## Project Specifications

**Read Only Files**
- `test/*`
- `src/index.js`
- `src/index.html`
- `app.js`

**Commands**
- run: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm start
```
- install: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm install
```
- test: 
```bash
bash bin/env_setup && . $HOME/.nvm/nvm.sh && npm test
```
