const key = 'cityList';

export function saveCity(city) {
  const storageData = localStorage.getItem(key);
  let data = JSON.parse(storageData);
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
  localStorage.setItem(key, JSON.stringify(data));
}

export function getCityList() {
  const storageData = localStorage.getItem(key);
  return JSON.parse(storageData);
}
