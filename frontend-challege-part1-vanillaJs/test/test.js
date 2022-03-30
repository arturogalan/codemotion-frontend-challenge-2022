import {fireEvent, getByTestId, getByText, waitFor} from "@testing-library/dom"
import "@testing-library/jest-dom/extend-expect"
import jsdom, {JSDOM} from "jsdom"
import path from "path"
import request from "request"

const BASE = path.resolve(__dirname, "../src");

let virtualConsole
let dom, body
let city;

const wait = ms => new Promise(resolve => setTimeout(resolve, ms));

describe("Weather app \n", function () {
  beforeEach(async () => {
    virtualConsole = new jsdom.VirtualConsole();
    virtualConsole.on("error", console.error);
    dom = await JSDOM.fromFile(`${BASE}/index.html`, {
      runScripts: "dangerously",
      resources: "usable",
      pretendToBeVisual: true,
      virtualConsole
    })
    await loadDom(dom)

    body = dom.window.document.body
    city = getByTestId(body, "city")
  })

  it("should suggest items on typing city name", async function () {
    typeText(city, "da")
    const responsePromise = new Promise((resolve, reject) => {
      request.get("https://jsonmock.hackerrank.com/api/weather?name=da",
        (err, response, body) => {
          resolve(body);
        }
      );
    });

    let response = await responsePromise;

    let data = JSON.parse(response).data;
    await wait(1000);

    const suggestions = getByTestId(body, "suggestions")
    const suggestionItems = suggestions.children
    expect(innerText(suggestionItems[0])).toEqual(data[0].name)
    expect(innerText(suggestionItems[1])).toEqual(data[1].name)
    expect(innerText(suggestionItems[2])).toEqual(data[2].name)
  });


  it("selecting a suggestion should change the input field value to the selected city's name", async function () {
    typeText(city, "dall")

    await wait(1000);

    await waitFor(() => {
      const suggestions = getByTestId(body, "suggestions")
      const suggestionItems = suggestions.children
      fireEvent.click(suggestionItems[0])
      const cityName = innerText(suggestionItems[0])
      expect(getByTestId(body, "city").value).toEqual(cityName)
    })
  });

  it("should add the contents to the selected section on selecting an option", async function () {
    typeText(city, "dall")

    await wait(1000);

    await waitFor(() => {
      const suggestions = getByTestId(body, "suggestions")
      const suggestionItems = suggestions.children
      fireEvent.click(suggestionItems[0])

      expect(innerText(getByTestId(body, "selectedCity"))).toEqual("Dallas")
      expect(innerText(getByTestId(body, "selectedWeather"))).toEqual("12 degree")
      expect(innerText(getByTestId(body, "selectedStatus"))).toEqual("Wind: 2Kmph,Humidity: 5%")
    })
  });

  it("should debounce before making API calls - no result found", async function () {
    typeText(city, "x")
    typeText(city, "xy")
    typeText(city, "xyz")
    typeText(city, "xyzz")

    const suggestions = getByTestId(body, "suggestions")
    const suggestionItems = suggestions.children
    expect(suggestionItems.length).toEqual(1)
    expect(innerText(suggestionItems[0])).toEqual("No Info available!")

    await wait(1000);
    await waitFor(() => {
      const finalSuggestions = getByTestId(body, "suggestions")
      expect(finalSuggestions.children[0].innerText).toEqual("No results")
    })
  });

  it("should debounce before making API calls - result should have final call results", async function () {
    typeText(city, "a")
    typeText(city, "ab")
    typeText(city, "abe")
    typeText(city, "aber")

    const suggestions = getByTestId(body, "suggestions")
    const suggestionItems = suggestions.children
    expect(suggestionItems.length).toEqual(1)
    expect(innerText(suggestionItems[0])).toEqual('No Info available!')

    await wait(1000);

    let finalSuggestions
    await waitFor(() => {
      finalSuggestions = getByTestId(body, "suggestions")
      expect(finalSuggestions.children.length).toEqual(2)
      expect(finalSuggestions.children[0].innerText).toEqual("Aberdeen")
    })

    typeText(city, "dall")
    await wait(1000);

    await waitFor(() => {
      finalSuggestions = getByTestId(body, "suggestions")
      expect(finalSuggestions.children.length).toEqual(2)
      expect(innerText(finalSuggestions.children[0])).toEqual("Dallas")
      expect(innerText(finalSuggestions.children[1])).toEqual("Dallupura")
    })
  });

  it("should show 'No results' message if the data is empty", async function () {
    typeText(city, "xyz")

    await wait(1000);

    await waitFor(() => {
      const suggestions = getByTestId(body, "suggestions")
      const suggestionItems = suggestions.children
      expect(suggestionItems.length).toEqual(1)
      expect(innerText(suggestionItems[0])).toEqual("No results")
    })
  });
});

function typeText(input, text) {
  fireEvent.input(input, {target: {value: text}})
  fireEvent.change(input, {target: {value: text}})
}

function loadDom(dom) {
  return new Promise((resolve, _) => {
    virtualConsole.on("log", log => {
      if (log === "DOM Loaded") resolve(dom)
    })
  })
}

function innerText(element) {
  return (element.textContent || '').trim() || element.innerText
}