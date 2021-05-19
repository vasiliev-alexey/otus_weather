import { currentWeather, currentCity } from './data';
import fetchMock from 'jest-fetch-mock';
import { expect } from '@jest/globals';

global.fetch = fetchMock;

describe('Test currentCity', () => {
  beforeEach(() => {
    fetchMock.resetMocks();
  });

  test('should return fake data', async () => {
    const dummyData = 'test city';
    fetchMock.mockResponseOnce(JSON.stringify({ city: dummyData }));

    const a = await currentCity();
    expect(a).toEqual(dummyData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should return trouble data', async () => {
    fetchMock.mockImplementationOnce(() =>
      Promise.reject(new Error('API is down'))
    );

    const a = await currentCity();

    expect(a).toBeInstanceOf(Error);
    const err = a as Error;

    expect(err.message).toEqual('Ошибка определения города по геолокации');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('Test currentWeather', () => {
  beforeEach(() => {
    fetchMock.mockClear();
  });

  test('should return fake data', async () => {
    const dummyData = 'test city';
    const mockResponce = {
      coord: { lon: 37.4375, lat: 55.9017 },
      weather: [
        {
          icon: '13d',
        },
      ],

      main: {
        temp: 261.15,
      },
      name: 'TestCity',
      cod: 200,
    };
    fetchMock.mockResponseOnce(JSON.stringify(mockResponce));

    const a = await currentWeather(dummyData);
    expect(a).toEqual(mockResponce);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should not  return for exception', async () => {
    const dummyData = 'test city';
    fetchMock.mockResponseOnce(() => Promise.reject(new Error('API is down')));
    const a = await currentWeather(dummyData);
    expect(a).toBeInstanceOf(Error);
    const b = a as Error;
    expect(b.message).toBe('Ошибка работы сервиса данных о погоде');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
