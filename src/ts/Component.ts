import { TemplateEngine } from './TemplateEngine';

export type State = Record<string, unknown>;

export abstract class Component<State> {
  public state: State = {} as State;
  /**
   */
  /**
   * Список событий для подписок на элементы
   */

  protected templateEngine: TemplateEngine;

  public events?: {
    [key: string]: (ev: Event) => void;
  };
  private el: HTMLElement;
  private isMounted = false;

  constructor(el: HTMLElement, initialState: Partial<State> = {}) {
    this.el = el;
    this.templateEngine = new TemplateEngine();
    setTimeout(() => {
      this.setState(initialState);
      this.subscribeToEvents();
    });
  }

  /**
   * Обработка подписок на событие
   *
   */
  subscribeToEvents(): void {
    if (!this.events) {
      return;
    }

    Object.entries(this.events).forEach((el) => {
      const arr = el[0].split('@');
      const element = document.querySelectorAll(arr[1]);
      element.forEach((child) => {
        child.addEventListener(arr[0], el[1]);
      });
    });
  }

  /**
   *
   * @param patch - partial state for merge
   */
  public setState(patch: Partial<State>): void {
    this.state = { ...this.state, ...patch };
    this.el.innerHTML = this.render();
  }

  /**
   * @param el - anchor element for render  ui elements from component
   */

  // eslint-disable-next-line @typescript-eslint/no-unused-vars
  public onMount(el: HTMLElement): void {
    if (this.isMounted) {
      return;
    }
    this.isMounted = true;
  }

  /**
   *
   * @returns  string  for render engine
   * pattern or plain text
   */

  abstract render(): string;
}
