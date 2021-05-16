import { expect, jest } from '@jest/globals';
import { Component } from './Component';

const sleep = (x: number) => new Promise((resolve) => setTimeout(resolve, x));


describe('test constructor spec', () => {

    let dummyElement: HTMLElement;

    beforeEach(() => {
      dummyElement = document.createElement('div');
    });

    it('constructor should be function', () => {
      class DummyComponent extends Component<{ rnd: number }> {
        render(): string {
          return '';
        }
      }

      expect(DummyComponent).toBeInstanceOf(Function);

      expect(new DummyComponent(dummyElement)).toBeInstanceOf(DummyComponent);
    });

    it.skip('constructor should  render data  in html element', () => {

      const random = Math.random() * Math.PI + 100 + 1;

      class DummyComponent extends Component<{ random: number }> {
        render(): string {
          return `Simple data ${this.state.random}`;
        }
      }

      const dummyComponent = new DummyComponent(dummyElement, { random: random });
      expect(dummyComponent).toBeInstanceOf(Component);
      expect(dummyElement.innerHTML).toEqual(`Simple data ${random}`);
    });


    test('render partial state from class && constructor', async () => {

      const random = Math.random();
      const random2 = Math.random();

      class TestComponent extends Component<{
        random: number;
        random2?: number;
      }> {
        public state: { random: number, random2?: number } = {
          random
        };

        render() {
          console.log(this);
          return `simple data ${this.state.random2}, ${this.state.random}`;
        }
      }

      new TestComponent(dummyElement, { random2 });
      await sleep(10);
      console.log(dummyElement.innerHTML);
      expect(dummyElement.innerHTML).toBe(`simple data ${random2}, ${random}`);
    });


    it('updates the presentation on setState', async () => {
      const random = Math.random();
      const random2 = Math.random();

      class TestComponent extends Component<{
        random: number;
        random2?: number;
      }> {
        public state: { random: number, random2?: number } = {
          random
        };

        render() {
          console.log(this);
          return `Simple test, ${this.state.random2}, ${this.state.random}`;
        }
      }

      const el = document.createElement('div');
      const component = new TestComponent(el, { random2 });
      await sleep(10);
      expect(el.innerHTML).toBe(`Hola, ${random2}, ${random}`);
      component.setState({ random: 3 });
      expect(el.innerHTML).toBe(`Simple test, ${random2}, 3`);
    });


  }
);


describe('test event bind', () => {
  let dummyElement: HTMLElement;

  beforeEach(() => {
    dummyElement = document.createElement('div');
  });
  it('component must have events', () => {

    class DummyComponent extends Component<{ dummy: number }> {

      dummyVoid = (ev: Event) => jest.fn();

      events = {
        'click@.btn': this.dummyVoid
      };

      render(): string {
        return '';
      }
    }

    const dummyComp = new DummyComponent(dummyElement);
    expect(dummyComp.events).not.toBeNull();
  });


  it ("test for subsckribe method"  , async () => {


    const dummyFunc  = jest.fn();

    const dummyBtn = document.createElement('button');
    dummyBtn.classList.add('btn')
    document.body.append(dummyBtn)
    class DummyComponent extends Component<{ dummy: number }> {


      dummyVoid = (ev: Event) => dummyFunc();

      events = {
        'click@.btn': dummyFunc
      };

      render(): string {
        return '';
      }
    }

    const  dummuComponent = new DummyComponent(dummyElement , {dummy: 1})
    await sleep(10);
    expect(dummyFunc).not.toHaveBeenCalled();
    const event1 = new Event("click");
    dummyBtn.dispatchEvent(event1);
    expect(dummyFunc).toHaveBeenCalledWith(event1);

  } )

});


