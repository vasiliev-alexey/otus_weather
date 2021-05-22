import { getCityList, saveCity } from './storage';

let originalLocalStorage: Storage;

const localStorageMock = {
  getItem: jest.fn(),
  setItem: jest.fn(),
  clear: jest.fn(),
};

beforeAll(() => {
  originalLocalStorage = window.localStorage;
  Object.defineProperty(window, 'localStorage', {
    value: localStorageMock,
    configurable: true,
    writable: true,
  });
});

afterAll(() => {
  (window as any).localStorage = originalLocalStorage;
});

const KEY = 'cityList';

describe('test storage save', () => {
  beforeEach(() => {
    localStorage.clear();
    (localStorage.setItem as jest.Mock).mockClear();
  });

  test('should save to localStorage', () => {
    const VALUE = 'bar';
    const data = [VALUE];
    saveCity(VALUE);
    expect(localStorageMock.setItem).toHaveBeenLastCalledWith(
      KEY,
      JSON.stringify(data)
    );
  });

  test('should save to localStorage only 10 items', () => {
    for (let index = 0; index < 10; index += 1) {
      saveCity(index.toString());
    }

    expect(localStorageMock.setItem).toBeCalledTimes(10);
  });

  test('should not save to localStorage existing item', () => {
    const data = ['0', '1', '2'];

    data.forEach((el) => {
      saveCity(el);
    });

    expect(localStorageMock.setItem).toBeCalledTimes(3);
    data.forEach(() => {
      saveCity('1');
    });
  });
});

describe('Test storage get', () => {
  test('should  get existing items', () => {
    const data = ['0', '1', '2'];

    data.forEach((el) => {
      saveCity(el);
    });

    expect(localStorageMock.getItem).toBeCalledTimes(3);
  });
});

describe('Test getCityList', () => {
  test('getCityList', () => {
    localStorageMock.getItem = jest
      .fn()
      .mockReturnValue(JSON.stringify(['0', '1', '2']));
    const data = getCityList();
    expect(localStorageMock.getItem).toBeCalledTimes(1);
    expect(data).toEqual({
      cities: [{ name: '0' }, { name: '1' }, { name: '2' }],
    });
  });
});
