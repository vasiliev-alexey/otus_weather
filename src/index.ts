import {
  renderInitialData,
  renderSearchForm,
  renderCityList,
} from './ts/renderData';
import { CityListComponent } from './ts/CityListComponent';
import { getCityList } from './ts/storage';
import { WeatherState } from './ts/Domain';

renderInitialData();

renderSearchForm();

renderCityList();

const mainPoint = document.querySelector<HTMLDivElement>('.cityList2')!;

const data = getCityList();

if (data) {
  console.log(data);
  const c = new CityListComponent(mainPoint, data);
}
