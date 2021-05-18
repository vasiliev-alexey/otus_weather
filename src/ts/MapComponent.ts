import { Component, State } from './Component';

export class MapComponent extends Component<State> {
  render(): string {
    const utlRoot = 'https://maps.googleapis.com/maps/api/staticmap?center=';
    const apiSuffix =
      '&zoom=12&size=1200x1200&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w';
    console.log(`${utlRoot}${this.state.lat}, ${this.state.lon}${apiSuffix}`);
    return this.templateEngine.template(
      '<div style="text-align: center"><img class="map" \n' +
        '      src="https://maps.googleapis.com/maps/api/staticmap?center={{lat}},{{lon}}' +
        '&zoom=12&size=1200x1200&key=AIzaSyAoHdEh_Eb_8xXLNi9802SEyZJj6epr04w">\n' +
        '</div>',
      this.state
    );
  }
}
