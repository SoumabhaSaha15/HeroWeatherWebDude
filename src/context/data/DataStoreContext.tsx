import { z } from 'zod';
import { createContext, useContext, type Context } from "react";
import { weatherResponseSchema } from '../../validators/weather';
import { forecastResponseSchema } from '../../validators/forecast';
export type WeatherType = z.infer<typeof weatherResponseSchema>;
export type ForecastType = z.infer<typeof forecastResponseSchema>;
type DataStoreContextProps = {
  weather: WeatherType | null;
  setWeather: (value: WeatherType | null | ((prev: WeatherType | null) => WeatherType | null)) => void;
  forecast: ForecastType | null;
  setForecast: (value: ForecastType | null | ((prev: ForecastType | null) => ForecastType | null)) => void;
};
export const DataStoreContext: Context<DataStoreContextProps> = createContext<DataStoreContextProps>({
  weather: null,
  setWeather: console.log,
  forecast: null,
  setForecast: console.log
});
export const useDataStore = () => useContext<DataStoreContextProps>(DataStoreContext);