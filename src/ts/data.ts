export async function currentCity() {
  try {
    const ipGeoPosition = await fetch('https://ipapi.co/json/');
    const data = await ipGeoPosition.json();
    return data.city;
  } catch {
    return new Error('Ошибка определения города по геолокации');
  }
}

export async function currentWeather(city: string) {
  const MAIN_PATH = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const API_KEY = 'ee1b612e4275f70a8d94e61043101407';

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
