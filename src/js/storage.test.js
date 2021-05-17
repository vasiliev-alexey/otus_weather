/* eslint-disable no-underscore-dangle */
import { saveCity, getCityList } from '../ts/storage';

const KEY = 'cityList';

describe('test storage save', () => {
  beforeEach(() => {
    localStorage.clear();
  });

  test('should save to localStorage', () => {
    const VALUE = 'bar';
    const data = [VALUE];
    saveCity(VALUE);
    expect(localStorage.setItem).toHaveBeenLastCalledWith(
      KEY,
      JSON.stringify(data)
    );
    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(data));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });

  test('should save to localStorage only 10 items', () => {
    const data = ['0', '1', '2', '3', '4', '5', '6', '7', '8', '9'];

    for (let index = 0; index < 10; index += 1) {
      saveCity(index.toString());
    }

    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(data));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);

    saveCity('10');
    data.shift();
    data.push('10');
    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(data));
  });

  test('should not save to localStorage existing item', () => {
    const data = ['0', '1', '2'];

    data.forEach((el) => {
      saveCity(el);
    });

    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(data));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);

    data.forEach(() => {
      saveCity('1');
    });
    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(data));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });
});

describe('Test storage get', () => {
  test('should  get existing items', () => {
    const data = ['0', '1', '2'];

    data.forEach((el) => {
      saveCity(el);
    });

    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
    expect(getCityList()).toEqual(data);

    expect(localStorage.__STORE__[KEY]).toBe(JSON.stringify(data));
    expect(Object.keys(localStorage.__STORE__).length).toBe(1);
  });
});
