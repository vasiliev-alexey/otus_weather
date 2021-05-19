import { getCityList } from './libs/storage';
import { currentCity } from './libs/data';
import { MetricState } from './libs/Domain';
import { CityListComponent } from './components/CityListComponent';
import { renderData } from './render2';
import { SearchComponent } from './components/SearchComponent';

const cityListComponent = new CityListComponent(
  document.querySelector<HTMLDivElement>('.list')! // eslint-disable-line @typescript-eslint/no-non-null-assertion
);

const searchComp = new SearchComponent(document.querySelector('.searchDiv')!);

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
  searchComp.render();
}
