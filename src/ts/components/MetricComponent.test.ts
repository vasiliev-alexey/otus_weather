import { expect } from '@jest/globals';
import { MetricComponent } from './MetricComponent';
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
    expect(MetricComponent).toBeInstanceOf(Function);
    await sleep(10);
    expect(new MetricComponent(dummyElement)).toBeInstanceOf(MetricComponent);
  });

  it('component render', async () => {
    const component = new MetricComponent(dummyElement);
    await sleep(10);
    component.setState({ message: 'message' });
    await sleep(10);
    expect(component.render()).toBe(
      '<div class="main"><div class="icon">><p class="cityLabel">message</p>' +
        '</div><div class="icon"><p class="label_city"></p></div></div>'
    );
  });
});
