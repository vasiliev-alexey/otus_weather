export type  State = Record<string, unknown>;

export abstract class Component<State> {
  public state: State = {} as State;
  /**
   * Список событий для подписок на элементы
   */
  protected events: {
    [key: string]: (ev: Event) => void;
  };
  private el: HTMLElement;

  constructor(el: HTMLElement, initialState: Partial<State> = {}) {
    this.el = el;
   // console.log(JSON.stringify(this.state , null, 2))

    setTimeout(() => {
      this.setState(initialState);
      this.subscribeToEvents();
      this.el.innerHTML = this.render();

    });

   // this.setState(initialState);


  }


  /**
   * Обработка подписок на событие
   *
   */
  subscribeToEvents(): void {

    Object.entries(this.events).forEach( (el) => {
const arr = el[0].split('@');
      console.log(arr[0], arr[1])


      const element = [...document.querySelectorAll(arr[1])];

      element.forEach(  (child) => {
        child.addEventListener(arr[0],  el[1])
        console.log( child, arr[0], el[1]);
      })


    })

  };


  /**
   *
   * @param patch - partial state for merge
   */
  public setState(patch: Partial<State>): void {

    this.state = { ...this.state, ...patch };

  }


  /**
   * @param el - anchor element for render  ui elements from component
   */

  public onMount(el: HTMLElement): void {
    return;
  }

  /**
   *
   * @returns  string  for render engine
   * pattern or plain text
   */

   abstract render(): string;
}

//
// export class Component<State> {
//   protected events: Record<string, (ev: Event) => void> = {};
//
//   public state: State = {} as State;
//
//   constructor(public el: HTMLElement, initialState: Partial<State> = {}) {
//     setTimeout(() => {
//       this.setState(initialState);
//     });
//   }
//
//   render(): string {
//     return "";
//   }
//
//   public setState(partialState: Partial<State>) {
//     this.state = Object.assign({}, this.state, partialState);
//     this.el.innerHTML = this.render();
//     this.subscribeToEvents();
//   }
//
//   protected subscribeToEvents(): void {
//     Object.keys(this.events).forEach((item) => {
//       const [event, selector] = item.split("@");
//       //const elements = [...this.el.querySelectorAll(selector)];
//       // elements.forEach((el) => el.addEventListener(event, this.events[item]));
//     });
//   }
// }
//
//
//
