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

  if (currWeather.cod !== 200) {
    p.innerText = 'Ошибка при определении города';
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
  }

  div.appendChild(p);
  mainPoint.appendChild(div);
  saveCity(city);
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
  data.forEach((c) => {
    const trd = document.createElement('tr');
    trd.classList.add('trd-1');
    const thd = document.createElement('td');
    thd.textContent = c;
    trd.addEventListener('click', (event) => {
      renderData(event.path[0].textContent);
    });
    trd.appendChild(thd);
    table.appendChild(trd);
  });

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
    renderData(curCity);
  } catch (e) {
    p.innerText = `Ошибка при попытке установить местоположение${e}`;
  }

  div.appendChild(p);
  mainPoint.appendChild(div);
}

export function renderSearchForm() {
  const mainPoint = document.querySelector('.searchDiv');
  const div = document.createElement('div');
  div.classList.add('search');

  const form = document.createElement('div');

  const p1 = document.createElement('p');
  const b = document.createElement('b');
  b.innerText = 'Введите город';
  p1.appendChild(b);

  const textArea = document.createElement('textarea');
  textArea.classList.add('searchCity');
  textArea.rows = 1;
  textArea.cols = 10;
  textArea.classList.add('ta');

  textArea.addEventListener('keyup', () => {
    const btn = document.querySelector('.btnWeather');
    const ta = document.querySelector('.ta');
    if (ta.value.trim().length > 0) {
      btn.hidden = false;
    } else {
      btn.hidden = true;
    }
  });

  const btnShowWeather = document.createElement('button');
  btnShowWeather.textContent = 'Найти';
  btnShowWeather.cols = 10;
  btnShowWeather.classList.add('btnWeather');
  btnShowWeather.hidden = true;
  btnShowWeather.addEventListener('click', () => {
    const ta = document.querySelector('.ta');
    if (ta.value.trim().length > 0) {
      renderData(textArea.value);
      renderCityList();
      ta.value = '';
      ta.dispatchEvent(new Event('keyup'));
    } else {
      b.innerText = 'Город не указан';
    }
  });

  const p2 = document.createElement('p');
  p2.append(btnShowWeather);
  form.append(p1, textArea, p2);
  div.appendChild(form);
  mainPoint.appendChild(div);
}
