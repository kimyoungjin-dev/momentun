const weather = document.querySelector(".js-weather");
const API_KEY = "1cce20274897538f27f72a370b9bb045";
const COORDS = "coords";

const getWeather = (lat, lng) => {
  fetch(
    `https://api.openweathermap.org/data/2.5/weather?lat=${lat}&lon=${lng}&appid=${API_KEY}&units=metric`
  )
    .then(function (response) {
      return response.json();
    })
    .then(function (json) {
      const temperature = json.main.temp;
      const place = json.name;
      weather.innerText = `현재온도 : ${temperature} @  지역 : ${place}`;
    });
};

const saveCoords = (coordsObj) => {
  localStorage.setItem(COORDS, JSON.stringify(coordsObj));
};

const handleSuccess = (position) => {
  const latitude = position.coords.latitude;
  const longitude = position.coords.longitude;
  const coordsObj = {
    latitude,
    longitude,
  };
  saveCoords(coordsObj);
  getWeather(latitude, longitude);
};

const handleError = () => {
  console.log("Cant access geo location");
};

const askForCoords = () => {
  navigator.geolocation.getCurrentPosition(handleSuccess, handleError);
};

const loadCoords = () => {
  const loadedCoords = localStorage.getItem("COORDS");
  if (loadedCoords === null) {
    askForCoords();
  } else {
    const parsedCoords = JSON.parse(loadedCoords);
    getWeather(parsedCoords.latitude, parsedCoords.longitude);
  }
};

function init() {
  loadCoords();
}

init();
