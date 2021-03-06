import { Component } from './Component';
import { MetricState } from '../libs/Domain';

export class MetricComponent extends Component<MetricState> {
  render(): string {
    return this.templateEngine.template(
      '<div class="main"><div class="icon">' +
        '{{for weathers}}<img src="https://openweathermap.org/img/wn/{{icon}}@2x.png"{{end for}}>' +
        '<p class="cityLabel">{{message}}</p></div><div class="icon"><p class="label_city"></p></div></div>',
      this.state
    );
  }
}
