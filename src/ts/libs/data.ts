import { WeatherResponse } from './Domain';
import { API_IP_URL, API_KEY, MAIN_PATH } from '../components/Constants';

export async function currentCity(): Promise<string | Error> {
  try {
    const ipGeoPosition = await fetch(`${API_IP_URL}`);
    const data = await ipGeoPosition.json();
    return data.city;
  } catch {
    return new Error('Ошибка определения города по геолокации');
  }
}

export async function currentWeather(
  city: string
): Promise<WeatherResponse | Error> {
  try {
    const weatherService = await fetch(
      `${MAIN_PATH}${city}&appid=${API_KEY}&units=metric&lang=ru`
    );
    const data = await weatherService.json();
    return data;
  } catch {
    return new Error('Ошибка работы сервиса данных о погоде');
  }
}
