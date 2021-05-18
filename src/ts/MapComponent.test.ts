import { expect } from '@jest/globals';
import { CityListComponent } from './CityListComponent';
import { CityState } from './Domain';

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));

describe('test constructor spec', () => {
  let dummyElement: HTMLDivElement;
  let mapElement: HTMLDivElement;
  let mainElement: HTMLDivElement;
  const citiList: { name: string }[] = [];

  beforeEach(() => {
    dummyElement = document.createElement('div');
    mapElement = document.createElement('div');
    mapElement.classList.add('map')
    mainElement = document.createElement('div');
    mainElement.classList.add('main')

    document.body.append(mainElement, mapElement);

    for (let i = 0; i < 3; i++) {
      citiList.push({ name: `city${i}` });
    }
  });

  it('constructor should be function', async () => {
    expect(CityListComponent).toBeInstanceOf(Function);
    await  sleep(10)
    expect(new CityListComponent(dummyElement)).toBeInstanceOf(
      CityListComponent
    );
  });

  it('component renderList',   async () => {
    const city: CityState = {
      cities: citiList,
    };

    const component = new CityListComponent(dummyElement, city);
    await sleep(10)
    expect(component.render()).toBe(
      '<tr><td>city0</td></tr><tr>' +
      '<td>city1</td></tr><tr><td>city2</td></tr>'
    );
  });
});
