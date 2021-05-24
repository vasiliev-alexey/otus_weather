import { expect } from '@jest/globals';
import { MapComponent } from './MapComponent';
import { MAP_API_KEY, MAP_URL } from './Constants';
import { sleep } from '../libs/utils';

describe('test constructor spec', () => {
  let dummyElement: HTMLDivElement;
  let mapElement: HTMLDivElement;
  let mainElement: HTMLDivElement;
  const citiList: { name: string }[] = [];

  beforeEach(() => {
    dummyElement = document.createElement('div');
    mapElement = document.createElement('div');
    mapElement.classList.add('map');
    mainElement = document.createElement('div');
    mainElement.classList.add('main');

    document.body.append(mainElement, mapElement);

    for (let i = 0; i < 3; i++) {
      citiList.push({ name: `city${i}` });
    }
  });

  it('constructor should be function', async () => {
    expect(MapComponent).toBeInstanceOf(Function);
    await sleep(10);
    expect(new MapComponent(dummyElement)).toBeInstanceOf(MapComponent);
  });

  it('component render', async () => {
    const component = new MapComponent(dummyElement, { lat: 1, lon: 1 });
    await sleep(100);

    const expectedString = `<div style="text-align: center"><img class="map" src="${MAP_URL}?center=1,1
         &zoom=12&size=1200x1200&key=${MAP_API_KEY}></div>`;
    expect(component.render()).toEqual(expectedString);
  });
});
