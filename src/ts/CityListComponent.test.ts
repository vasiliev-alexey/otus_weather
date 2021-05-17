import { expect } from '@jest/globals';
import { CityListComponent } from './CityListComponent';
import { WeatherState } from './Domain';

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe('test constructor spec', () => {
  let dummyElement: HTMLDivElement;
  const citiList: { name: string }[] = [];

  beforeEach(() => {
    dummyElement = document.createElement('div');

    for (let i = 0; i < 3; i++) {
      citiList.push({ name: `city${i}` });
    }
  });

  it('constructor should be function', () => {
    expect(CityListComponent).toBeInstanceOf(Function);
    expect(new CityListComponent(dummyElement)).toBeInstanceOf(
      CityListComponent
    );
  });

  it('component renderList', async () => {
    const city: WeatherState = {
      cities: citiList,
    };

    const component = new CityListComponent(dummyElement, city);
    await sleep(10);
    expect(component.render()).toBe(
      '<table class="cityList"><th><tbody>' +
        '<tr><td>city0</td></tr>' +
        '<tr><td>city1</td></tr>' +
        '<tr><td>city2</td></tr>' +
        '</tbody></th></table>'
    );
  });
});
