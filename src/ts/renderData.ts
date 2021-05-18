import { getCityList, saveCity } from './storage';
import { currentCity, currentWeather } from './data';
import { MapState, MetricState } from './Domain';
import { CityListComponent } from './CityListComponent';
import { MetricComponent } from './MetricComponent';
import { MapComponent } from './MapComponent';

const cityListComponent = new CityListComponent(
  document.querySelector<HTMLDivElement>('.list')! // eslint-disable-line @typescript-eslint/no-non-null-assertion
);
const metricComponent = new MetricComponent(
  document.querySelector<HTMLDivElement>('.main')! // eslint-disable-line @typescript-eslint/no-non-null-assertion
);
const mapComponent = new MapComponent(
  document.querySelector<HTMLDivElement>('.map')! // eslint-disable-line @typescript-eslint/no-non-null-assertion
);

export async function renderData(city: string): Promise<void> {
  const data: MetricState = {};
  const cord: MapState = {};
  const currWeather = await currentWeather(city);

  if (currWeather instanceof Error) {
    data.message = currWeather.message;
  } else if (currWeather.cod === 404) {
    data.message = 'Город не найден';
  } else if (currWeather.cod !== 200) {
    data.message = 'Ошибка работы сервиса геолокации';
  } else {
    data.message = `${currWeather.name}  ${currWeather.main.temp}`;
    data.weathers = currWeather?.weather.map(
      (el: Record<string, undefined>) => {
        return { icon: String(el.icon) };
      }
    );
    cord.lon = currWeather.coord.lon;
    cord.lat = currWeather.coord.lat;
    saveCity(city);
  }
  metricComponent.setState(data);
  mapComponent.setState(cord);
}

export async function renderCityList(): Promise<void> {
  const data = getCityList();
  if (data) {
    cityListComponent.setState(data);
  }
}

export async function renderInitialData(): Promise<void> {
  const data: MetricState = {
    message: '',
    weathers: [],
  };

  try {
    const curCity = await currentCity();

    if (curCity instanceof Error) {
      data.message = `Ошибка при попытке установить местоположение`;
    } else {
      await renderData(curCity);
    }
  } catch (e) {
    data.message = `Ошибка при попытке установить местоположения \n${e}`;
  }
  await renderCityList();
}

export function renderSearchForm(): void {
  const mainPoint = document.querySelector('.searchDiv')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
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
    const searchButton =
      document.querySelector<HTMLButtonElement>('.btnWeather')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    const inpArea = document.querySelector<HTMLTextAreaElement>('.ta')!; // eslint-disable-line @typescript-eslint/no-non-null-assertion
    if (inpArea.value.trim().length > 0) {
      searchButton.hidden = false;
    } else {
      searchButton.hidden = true;
    }
  });

  const btnShowWeather = document.createElement('button');
  btnShowWeather.textContent = 'Найти';
  // btnShowWeather.cols = 10;
  btnShowWeather.classList.add('btnWeather');
  btnShowWeather.hidden = true;
  btnShowWeather.addEventListener('click', () => {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const inpArea = document.querySelector<HTMLTextAreaElement>('.ta')!;
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
