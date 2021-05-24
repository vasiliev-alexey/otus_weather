import { MapComponent } from './components/MapComponent';
import { MetricComponent } from './components/MetricComponent';
import { MapState, MetricState } from './libs/Domain';
import { currentWeather } from './libs/data';
import { saveCity } from './libs/storage';

export async function renderData(city: string): Promise<void> {
  const metricComponent = new MetricComponent(
    document.querySelector<HTMLDivElement>('.main')! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  );
  const mapComponent = new MapComponent(
    document.querySelector<HTMLDivElement>('.map')! // eslint-disable-line @typescript-eslint/no-non-null-assertion
  );

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
