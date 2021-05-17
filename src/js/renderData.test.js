import * as data from './data';
import {
  renderData,
  renderCityList,
  renderInitialData,
  renderSearchForm,
} from '../ts/renderData';
import * as storage from '../ts/storage';

function makeMockResponse() {
  return {
    coord: { lon: 37.4375, lat: 55.9017 },
    weather: [
      {
        icon: '13d',
      },
    ],
    main: {
      temp: 261.15,
    },
    name: 'qwerty',
    cod: 200,
  };
}

function clearBeforeRun() {
  const rootElements = ['main', 'searchDiv', 'cityList', 'map'];

  rootElements.forEach((el) => {
    const container = document.querySelector(`.${el}`);
    if (container != null) {
      container.innerHTML = '';
    }
    const divP = document.createElement('div');
    divP.classList.add(el);
    document.body.append(divP);
  });
}

describe('Test renderData', () => {
  beforeEach(() => {
    clearBeforeRun();
  });

  test('Render main data for page', async () => {
    const dummyData = 'test city';
    const mockResponse = makeMockResponse();

    const spy = jest.spyOn(data, 'currentWeather');
    spy.mockReturnValue(mockResponse);

    await renderData(dummyData);

    const p = document.querySelector('.cityLabel');

    const mainPoint = document.querySelector('.main');
    expect(mainPoint.children.length).toBe(1);
    expect(p.innerText).toBe(`${mockResponse.name}  ${mockResponse.main.temp}`);
  });

  test('Render main data for page', async () => {
    const dummyData = 'test city';
    const mockResponce = {
      cod: 400,
    };

    const spy = jest.spyOn(data, 'currentWeather');
    spy.mockReturnValue(mockResponce);
    await renderData(dummyData);

    const lable = document.querySelector('.cityLabel');
    expect(lable.innerText).toBe('Ошибка работы сервиса геолокации');
  });
});

describe('Test render List City', () => {
  beforeEach(() => {
    clearBeforeRun();
  });

  test('Render list city block', async () => {
    const spy = jest.spyOn(storage, 'getCityList');
    spy.mockReturnValue(['1', '2']);
    renderCityList();

    const mainPoint = document.querySelector('.cityList');

    const table = document.querySelector('.city-list');

    expect(table.children.length).toBe(2); // h + b
    expect(spy).toHaveBeenCalledTimes(1);
    expect(mainPoint.childNodes[0]).toEqual(table);
  });

  test('Render list city block with click', async () => {
    const spy = jest.spyOn(storage, 'getCityList');
    spy.mockReturnValue(['1', '2']);
    renderCityList();

    const tr = document.querySelector('.trd-1');

    const event = new Event('click');
    event.path = ['dummy'];

    tr.dispatchEvent(event);
    const table = tr.parentNode;
    expect(table.children.length).toBe(2); // h + b
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('Test render Initial Data', () => {
  beforeEach(() => {
    clearBeforeRun();
  });

  test('Render Initial Data block', async () => {
    const spy = jest.spyOn(data, 'currentCity');
    spy.mockReturnValue(['fake']);

    const mockResponse = makeMockResponse();
    const spyWeather = jest.spyOn(data, 'currentWeather');
    spyWeather.mockReturnValue(mockResponse);

    renderInitialData();
    expect(spy).toHaveBeenCalledTimes(1);
  });

  test('Render Eroor Initial Data block', async () => {
    const spy = jest.spyOn(data, 'currentCity');
    spy.mockRejectedValue(new Error('api error'));
    const spyWeather = jest.spyOn(data, 'currentWeather');
    spyWeather.mockReturnValue(null);
    renderInitialData();
    expect(spy).toHaveBeenCalledTimes(1);
  });
});

describe('Test render Search Form', () => {
  beforeEach(() => {
    clearBeforeRun();
  });

  test('Render Search Form  block', async () => {
    const spy = jest.spyOn(data, 'currentCity');
    spy.mockReturnValue(['fake']);

    renderSearchForm();

    const btn = document.querySelector('.btnWeather');
    const ta = document.querySelector('.ta');

    expect(btn).not.toBeNull();
    expect(ta).not.toBeNull();
    expect(btn.hidden).toBe(true);
  });

  test('Render key up for text area in Search Form  block', async () => {
    renderSearchForm();

    const textArea = document.querySelector('.searchCity');
    const event = new Event('keyup');

    textArea.dispatchEvent(event);
    textArea.value = 'dummy';
    textArea.dispatchEvent(event);

    const btn = document.querySelector('.btnWeather');

    expect(btn).not.toBeNull();
    expect(textArea).not.toBeNull();
    expect(btn.hidden).toBe(false);
  });

  test('Render button for text area in Search Form  block', async () => {
    const spy = jest.spyOn(storage, 'getCityList');
    spy.mockReturnValue(['dummy', '2']);

    renderSearchForm();

    const ta = document.querySelector('.ta');
    expect(ta).not.toBeNull();
    const btnShowWeather = document.querySelector('.btnWeather');
    ta.value = '';
    const event = new Event('click');

    expect(btnShowWeather.hidden).toBe(true);

    // Вызов кнопки
    ta.value = 'dummy';
    btnShowWeather.dispatchEvent(event);

    const pCity = document.querySelector('.main');

    expect(pCity).not.toBeNull();
  });

  test('Render button for text area 2 in Search Form  block', async () => {
    const spy = jest.spyOn(storage, 'getCityList');
    spy.mockReturnValue(['dummy', '2']);

    renderSearchForm();

    const ta = document.querySelector('.ta');
    expect(ta).not.toBeNull();
    const btnShowWeather = document.querySelector('.btnWeather');

    expect(btnShowWeather.hidden).toBe(true);
    ta.value = null;
    const event = new Event('click');
    btnShowWeather.dispatchEvent(event);
  });
});
