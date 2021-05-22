import { Component, State } from './Component';
import { MAP_API_KEY, MAP_URL } from './Constants';

export class MapComponent extends Component<State> {
  render(): string {
    return this.templateEngine.template(
      `<div style="text-align: center"><img class="map" src="${MAP_URL}?center={{lat}},{{lon}}
         &zoom=12&size=1200x1200&key=${MAP_API_KEY}></div>`,
      this.state
    );
  }
}
