export type  State = Record<string, unknown>;

export   abstract class AbstractComponent<State> {
 protected state:  State = {} as State;
  /**
   * Список событий для подписок на элементы
   */
  protected events: {
    [key: string]: (ev: Event) => void;
  };
  private el: HTMLElement;

  constructor(el: HTMLElement, initialState: Partial<State> = {}) {
     this.el = el;
     this.state = {...this.state,  ...initialState};
  }
  /**
   * Обработка подписок на событие
   *
   */
  subscribeToEvents(): void {

  };


  /**
   *
   * @param patch - partial state for merge
   */
  public  setState(patch: Partial<T>): void {

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