import { expect } from '@jest/globals';
import { CityListComponent } from './CityListComponent';
import { CityState } from './Domain';
import { MapComponent } from './MapComponent';

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
    expect(MapComponent).toBeInstanceOf(Function);
    await  sleep(10)
    expect(new MapComponent(dummyElement)).toBeInstanceOf(
      MapComponent
    );
  });

  it('component render',   async () => {

    const component = new MapComponent(dummyElement, { lat : 1, lon:1} );
    await sleep(10)
    expect(component.render()).toBe(
      '<div style="text-align: center"><img class="map" \n' +
      '      src="https://maps.googleapis.com/maps/api/staticmap?center=1,1&zoom=12&size=1200x1200&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w">\n' +
      '</div>'
    );
  });
});
