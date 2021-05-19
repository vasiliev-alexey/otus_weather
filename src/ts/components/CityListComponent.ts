import { Component } from './Component';
import { CityState } from '../libs/Domain';
import { getCityList } from '../libs/storage';
import { renderData } from '../renderData';

export class CityListComponent extends Component<CityState> {
  public async onClick(event: Event): Promise<void> {
    const eventTarget = event.target as HTMLElement;
    if (event.target) {
      console.log(eventTarget.innerText);
      await renderData(eventTarget.innerText);
    }
    return;
  }
  events = {
    'click@.list': this.onClick,
  };

  async onMount(el: HTMLElement): Promise<void> {
    super.onMount(el);
    const data = await getCityList();
    if (data) {
      this.state = data;
    }
  }

  render(): string {
    return this.templateEngine.template(
      '{{for cities}}<tr><td>{{name}}</td></tr>{{end for}}',
      this.state
    );
  }
}
