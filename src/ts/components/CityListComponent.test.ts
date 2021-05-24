import { CityListComponent } from './CityListComponent';
import { CityState } from '../libs/Domain';

import { sleep } from '../libs/utils';

describe('test constructor spec', () => {
  let dummyElement: HTMLDivElement;
  let mapElement: HTMLDivElement;
  let mainElement: HTMLDivElement;
  let citiList: { name: string }[] = [];

  beforeEach(() => {
    mapElement = document.createElement('div');
    mapElement.classList.add('map');
    mainElement = document.createElement('div');
    mainElement.classList.add('main');
    dummyElement = document.createElement('div');

    document.body.append(mainElement, mapElement);
    citiList = [];
    for (let i = 0; i < 3; i++) {
      citiList.push({ name: `city${i}` });
    }
  });

  it('constructor should be function', async () => {
    expect(CityListComponent).toBeInstanceOf(Function);
    expect(new CityListComponent(dummyElement)).toBeInstanceOf(
      CityListComponent
    );
  });

  it('component renderList', async () => {
    const city: CityState = {
      cities: citiList,
    };

    const component = new CityListComponent(dummyElement, city);
    await sleep(100);
    expect(component.render()).toBe(
      '<tr><td>city0</td></tr><tr>' +
        '<td>city1</td></tr><tr><td>city2</td></tr>'
    );
  });
});
