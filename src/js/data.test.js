import { currentWeather, currentCity } from './data';

global.fetch = jest.fn();

describe('Test currentCity', () => {
  beforeEach(() => {
    fetch.mockClear();
  });

  test('should return fake data', async () => {
    const dummyData = 'test city';
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve({ city: dummyData }),
      })
    );

    const a = await currentCity();
    expect(a).toEqual(dummyData);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should return trouble data', async () => {
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API is down'))
    );

    const a = await currentCity();
    expect(a.message).toEqual('Ошибка определения города по геолокации');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});

describe('Test currentWeather', () => {
  beforeEach(() => {
    fetch.mockClear();
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
    fetch.mockImplementationOnce(() =>
      Promise.resolve({
        json: () => Promise.resolve(mockResponce),
      })
    );

    const a = await currentWeather(dummyData);
    expect(a).toEqual(mockResponce);
    expect(fetch).toHaveBeenCalledTimes(1);
  });

  test('should not  return for exception', async () => {
    const dummyData = 'test city';
    fetch.mockImplementationOnce(() =>
      Promise.reject(new Error('API is down'))
    );
    const a = await currentWeather(dummyData);
    expect(a.message).toBe('Ошибка работы сервиса данных о погоде');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
});
