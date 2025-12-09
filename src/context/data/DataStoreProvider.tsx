import React from "react";
import { DataStoreContext, type ForecastType, type WeatherType } from "./DataStoreContext";
const DataStoreProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [weatherData, setWaetherData] = React.useState<WeatherType | null>(null);
  const [forecastData, setForecastData] = React.useState<ForecastType | null>(null);
  return (
    <DataStoreContext.Provider value={{
      weather: weatherData,
      forecast: forecastData,
      setWeather: setWaetherData,
      setForecast: setForecastData
    }}>
      {children}
    </DataStoreContext.Provider>
  );
}
export default DataStoreProvider;