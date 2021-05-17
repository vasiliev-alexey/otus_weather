const KEY = 'cityList';

export function saveCity(city : string) {
  const storageData = localStorage.getItem(KEY);

  if(storageData === null) {
    return;
  }

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
  localStorage.setItem(KEY, JSON.stringify(data));
}

export function getCityList() : string[] | undefined {
  const storageData = localStorage.getItem(KEY);
  if(storageData === null) {
    return;
  }


  return JSON.parse(storageData);
}
