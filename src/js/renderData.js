// eslint-disable-next-line import/extensions
import { getCityList, saveCity } from './storage.js';
// eslint-disable-next-line import/extensions
import { currentCity, currentWeather } from './data.js';

export async function renderData(city) {
  const mainPoint = document.querySelector('.main');
  const mapPoint = document.querySelector('.map');
  mainPoint.innerHTML = '';
  mapPoint.src = '';

  const div = document.createElement('div');
  div.classList.add('icon');
  const p = document.createElement('p');
  p.classList.add('cityLabel');
  div.appendChild(p);

  const currWeather = await currentWeather(city);

  if (currWeather instanceof Error) {
    p.innerText = currWeather.message;
  } else if (currWeather.cod === '404') {
    p.innerText = 'Город не найден';
  } else if (currWeather.cod !== 200) {
    p.innerText = 'Ошибка работы сервиса геолокации';
  } else {
    p.innerText = `${currWeather.name}  ${currWeather.main.temp}`;

    currWeather.weather.forEach((w) => {
      const img = document.createElement('img');
      img.src = `http://openweathermap.org/img/wn/${w.icon}@2x.png`;
      div.appendChild(img);
    });

    const utlRoot = 'https://maps.googleapis.com/maps/api/staticmap?center=';
    const apiSuffix =
      '&zoom=12&size=1200x1200&key=AIzaSyAPubPBOtMn4EiVxxZ1ySt32GSX5yd1bIs';
    mapPoint.src = `${utlRoot}${currWeather.coord.lat},
  ${currWeather.coord.lon}${apiSuffix}`;
    saveCity(city);
  }

  div.appendChild(p);
  mainPoint.appendChild(div);
}

export function renderCityList() {
  const mainPoint = document.querySelector('.cityList');

  mainPoint.innerHTML = '';
  const table = document.createElement('table');
  table.classList.add('city-list');
  const tr = document.createElement('tr');

  const th = document.createElement('th');
  th.textContent = 'Ранее было';
  tr.appendChild(th);
  table.appendChild(th);

  const data = getCityList();

  const cityTableBody = document.createElement('tbody');

  data.forEach((c) => {
    const trd = document.createElement('tr');
    trd.classList.add('trd-1');
    const thd = document.createElement('td');
    trd.appendChild(thd);
    thd.textContent = c;
    cityTableBody.appendChild(trd);
  });
  cityTableBody.addEventListener('click', (event) => {
    renderData(event.target.outerText);
  });
  table.appendChild(cityTableBody);
  mainPoint.appendChild(table);
}

export async function renderInitialData() {
  const mainPoint = document.querySelector('.main');

  mainPoint.innerHTML = '';

  const div = document.createElement('div');
  div.classList.add('icon');

  const p = document.createElement('p');
  p.classList.add('label_city');

  try {
    const curCity = await currentCity();

    if (curCity instanceof Error) {
      p.innerText = `Ошибка при попытке установить местоположение`;
    } else {
      await renderData(curCity);
    }
  } catch (e) {
    p.innerText = `Ошибка при попытке установить местоположения \n${e}`;
  }

  div.appendChild(p);
  mainPoint.appendChild(div);
}

export function renderSearchForm() {
  const mainPoint = document.querySelector('.searchDiv');
  const div = document.createElement('div');
  div.classList.add('search');

  const form = document.createElement('div');

  const inputSearchParagraph = document.createElement('p');
  const searchButton = document.createElement('searchButton');
  searchButton.innerText = 'Введите город';
  inputSearchParagraph.appendChild(searchButton);

  const inputSearchCity = document.createElement('textarea');
  inputSearchCity.classList.add('searchCity');
  inputSearchCity.rows = 1;
  inputSearchCity.cols = 10;
  inputSearchCity.classList.add('ta');

  inputSearchCity.addEventListener('keyup', () => {
    const srchButton = document.querySelector('.btnWeather');
    const inpArea = document.querySelector('.ta');
    if (inpArea.value.trim().length > 0) {
      srchButton.hidden = false;
    } else {
      srchButton.hidden = true;
    }
  });

  const btnShowWeather = document.createElement('button');
  btnShowWeather.textContent = 'Найти';
  btnShowWeather.cols = 10;
  btnShowWeather.classList.add('btnWeather');
  btnShowWeather.hidden = true;
  btnShowWeather.addEventListener('click', () => {
    const inpArea = document.querySelector('.ta');
    if (inpArea.value.trim().length > 0) {
      renderData(inputSearchCity.value);
      renderCityList();
      inpArea.value = '';
      inpArea.dispatchEvent(new Event('keyup'));
    } else {
      searchButton.innerText = 'Город не указан';
    }
  });

  const p2 = document.createElement('p');
  p2.append(btnShowWeather);
  form.append(inputSearchParagraph, inputSearchCity, p2);
  div.appendChild(form);
  mainPoint.appendChild(div);
}
