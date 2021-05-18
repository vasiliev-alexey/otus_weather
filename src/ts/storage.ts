import { CityState } from './Domain';

const KEY = 'cityList';

export function saveCity(city: string): void {
  const storageData = localStorage.getItem(KEY);

  // if (!storageData) {
  //   return;
  // }
  let data = [];
  if (storageData !== null && storageData !== undefined) {
    data = JSON.parse(storageData);
  }

  if (data === null) {
    data = [];
  }
  if (!data.includes(city)) {
    if (data.length === 10) {
      data.shift();
    }
    data.push(city);
  } else {
    return;
  }
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getCityList(): CityState | undefined {
  const storageData = localStorage.getItem(KEY);
  if (storageData === null) {
    return;
  }

  const data: string[] = JSON.parse(storageData);

  const citiArray = data
    .filter((c) => c !== null)
    .map((namecity) => {
      return { name: namecity };
    });

  return { cities: citiArray };
}
