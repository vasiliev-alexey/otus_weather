// eslint-disable-next-line import/extensions

export async function currentCity() {
  try {
    const ipGeoPosition = await fetch('http://ip-api.com/json');
    const data = await ipGeoPosition.json();
    return data.city;
  } catch {
    return null;
  }
}

export async function currentWeather(city) {
  const mainPath = 'https://api.openweathermap.org/data/2.5/weather?q=';
  const apiKey = 'ee1b612e4275f70a8d94e61043101407';

  try {
    const weatherService = await fetch(
      `${mainPath}${city}&appid=${apiKey}&units=metric&lang=ru`
    );
    const data = await weatherService.json();
    return data;
  } catch {
    return null;
  }
}
