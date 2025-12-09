import React from "react";
import { prettifyError, z } from "zod";
import Search from "./components/Search";
import Weather from "./components/Weather";
import AxiosBase from "./utility/AxiosBase";
import Forecast from "./components/Forecast";
import GetLocation from "./utility/GetLocationAccess";
import { useTheme } from "./context/theme/ThemeContext";
import WeatherDetails from "./components/WeatherDetails";
import { useDataStore } from "./context/data/DataStoreContext";
import { weatherResponseSchema } from "./validators/weather";
import { forecastResponseSchema } from "./validators/forecast";
import { coordQuerySchema, placeQuerySchema } from "./validators/query";

const App: React.FC = () => {
  const { applyTheme } = useTheme();
  const dataConsumer = useDataStore();
  const setDefaultLocation = () =>
    GetLocation(
      async ({ coords: { longitude, latitude } }) => {
        try {
          const paramsString = new URLSearchParams(
            coordQuerySchema.parse({ lon: longitude, lat: latitude })
          ).toString();
          const weatherResponse = await AxiosBase.get(
            import.meta.env.VITE_OW_WEATHER + `?${paramsString}`
          );
          const forecastResponse = await AxiosBase.get(
            import.meta.env.VITE_OW_FORECAST + `?${paramsString}`
          );
          dataConsumer.setWeather(
            weatherResponseSchema.parse(weatherResponse.data)
          );
          dataConsumer.setForecast(
            forecastResponseSchema.parse(forecastResponse.data)
          );
        } catch (error) {
          console.error(
            error instanceof z.ZodError ? prettifyError(error) : error
          );
        }
      },
      async (e) => {
        // HeroUI addToast removed. 
        // You can use a library like react-hot-toast or simple alert(e.message)
        console.warn(e.message);
        try {
          const paramsString = new URLSearchParams(
            placeQuerySchema.parse({ q: "Kolkata" })
          ).toString();
          const weatherResponse = await AxiosBase.get(
            import.meta.env.VITE_OW_WEATHER + `?${paramsString}`
          );
          const forecastResponse = await AxiosBase.get(
            import.meta.env.VITE_OW_FORECAST + `?${paramsString}`
          );
          dataConsumer.setWeather(
            weatherResponseSchema.parse(weatherResponse.data)
          );
          dataConsumer.setForecast(
            forecastResponseSchema.parse(forecastResponse.data)
          );
        } catch (error) {
          console.error(
            error instanceof z.ZodError ? prettifyError(error) : error
          );
        }
      }
    );

  React.useEffect(() => {
    setDefaultLocation();
  }, []);

  React.useEffect(() => {
    if (dataConsumer.weather !== null) {
      const hour = new Date(dataConsumer.weather.dt * 1000).getHours();
      document.documentElement.style.backgroundImage =
        hour >= 5 && hour < 16 ? "var(--morning)" : "var(--evening)";
    }
  }, [dataConsumer.weather]);

  React.useEffect(()=>{
    const hour = new Date().getHours();
    applyTheme(hour>=6 && hour<18 ? 'light':'dark');
  },[])

  return (
    <div className="h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2 md:gap-2">
      <div className="p-2 h-screen max-h-screen" id="Weather">
        <Search setDefaultLocation={setDefaultLocation} />
        <div className="h-[calc(100%-4.5rem)] max-h-[calc(100%-5.5rem)] overflow-y-auto my-1 p-1">
          <Weather />
          <WeatherDetails />
        </div>
      </div>

      <div
        id="Forecast"
        className="relative p-2 h-screen max-h-screen overflow-y-auto"
      >
        <Forecast />
      </div>
    </div>
  );
};

export default App;