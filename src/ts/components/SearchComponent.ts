import { Component } from './Component';
import { renderData } from '../render2';
import { renderCityList } from '../renderData';

export class SearchComponent extends Component<any> {
  events = {
    'click@.btnWeather': this.onClick,
  };

  private onClick(): void {
    // eslint-disable-next-line @typescript-eslint/no-non-null-assertion
    const inpArea = document.querySelector<HTMLTextAreaElement>('.ta')!;
    const searchButton =
      document.querySelector<HTMLTextAreaElement>('.searchbutton')!;
    if (inpArea.value.trim().length > 0) {
      renderData(inpArea.value);
      renderCityList();
      inpArea.value = '';
      inpArea.dispatchEvent(new Event('keyup'));
    } else {
      searchButton.innerText = 'Город не указан';
    }
  }

  render(): string {
    return (
      '<div class="search"><div><p class=\'searchbutton\'>Введите город</p>\n' +
      '<textarea class="searchCity ta" rows="1" cols="10"></textarea><p>\n' +
      '<button class="btnWeather" >Найти</button></p></div></div>'
    );
  }
}
