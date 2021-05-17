import { Component, State } from './Component';
import { TemplateEngine } from './TemplateEngine';
import { WeatherState } from './Domain';

export class CityListComponent extends Component<WeatherState> {
  private templateEngine = new TemplateEngine();

  render(): string {
    return this.templateEngine.template(
      '<table class="cityList3"><th><tbody>' +
        '{{for cities}}<tr><td>{{name}}</td></tr>{{end for}}' +
        '</tbody></th></table>',
      this.state
    );
  }
}
