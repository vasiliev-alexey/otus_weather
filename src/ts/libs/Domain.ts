export type CityState = {
  cities: { name: string }[];
};

export type MetricState = {
  // isOk: boolean;
  message?: string;
  weathers?: { icon: string }[];
};

export type WeatherResponse = {
  name?: string;
  main: { temp: number };
  coord: { lon: number; lat: number };
  weather: { icon: undefined }[];
  cod: number;
};

export type MapState = {
  lon?: number;
  lat?: number;
};
