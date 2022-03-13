const cityForm = document.querySelector("form");
const card = document.querySelector(".card");
const details = document.querySelector(".details");
const time = document.querySelector("img.time");
const icon = document.querySelector(".icon img");

const updateUI = (data) => {
  //destructure properties
  const { cityDetails, weather } = data;

  //update detaails template
  details.innerHTML = `
    <h5 class="my-3">${cityDetails.EnglishName}</h5>
    <div class="my-3">${weather.WeatherText}</div>
    <div class="display-4 my-4">
        <span>${weather.Temperature.Metric.Value}</span>
        <span>&deg;C</span>
    </div>
    `;

  //update niight/day & icon image

  const iconSource = `img/icons/${weather.WeatherIcon}.svg`;
  icon.setAttribute("src", iconSource);

  let timeSource = weather.IsDayTime ? "img/day.svg" : "img/night.svg";

  time.setAttribute("src", timeSource);

  //remoce the d-none class if city exits
  if (card.classList.contains("d-none")) {
    card.classList.remove("d-none");
  }
};

const updateCity = async (city) => {
  const cityDetails = await getCity(city);
  const weather = await getWeather(cityDetails.Key);

  return { cityDetails, weather };
};

cityForm.addEventListener("submit", (e) => {
  e.preventDefault();

  //get city input value
  const city = cityForm.city.value.trim();
  cityForm.reset();

  //update UI with the city input
  updateCity(city)
    .then((data) => updateUI(data))
    .catch((err) => console.log(err));

  //set local storage
  localStorage.setItem('city', city);
});

if(localStorage.getItem('city')){
  updateCity(localStorage.getItem('city'))
  .then(data => updateUI(data))
  .catch(err => console.log(err))
};
