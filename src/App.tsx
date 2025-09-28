import React from "react";
import { prettifyError, z } from "zod";
import { addToast } from "@heroui/react";
import Search from "./components/Search";
import Weather from "./components/Weather";
import AxiosBase from "./utility/AxiosBase";
import Forecast from "./components/Forecast";
import GetLocation from "./utility/GetLocationAccess";
import WeatherDetails from "./components/WeatherDetails";
import { useDataStore } from "./context/DataStoreContext";
import { weatherResponseSchema } from "./validators/weather";
import { forecastResponseSchema } from "./validators/forecast";
import { coordQuerySchema, placeQuerySchema } from "./validators/query";
import { motion, type Variants } from "framer-motion"; // <-- Framer Motion Imports
const cardRevealVariants: Variants = {
  // Starting state (hidden)
  hidden: { opacity: 0, y: 50, scale: 0.95 },
  // Target state (visible). 'custom' is used to apply a stagger delay.
  visible: (custom: number) => ({
    opacity: 1,
    y: 0,
    scale: 1,
    transition: {
      delay: custom * 0.1, // Stagger delay: 100ms per card
      duration: 0.5,
      ease: "easeOut",
      type: "spring",
      stiffness: 200,
    },
  }),
};

const App: React.FC = () => {
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
        addToast({ title: e.message, color: "warning" });
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
  const scrollRef = React.useRef(null);
  return (
    <div className="h-screen max-h-screen w-full grid grid-cols-1 md:grid-cols-2 md:gap-2">
      <div className="p-2 h-screen max-h-screen overflow-y-auto" id="Weather">
        <Search setDefaultLocation={setDefaultLocation} />
        <div className="h-[calc(100%-5.5rem)] max-h-[calc(100%-5.5rem)] overflow-y-auto my-1  p-1">
          <motion.div
            variants={cardRevealVariants}
            initial="hidden" // Set starting animation state
            whileInView="visible" // Animate to 'visible' when in view
            viewport={{
              amount: 0.2, // Trigger when 20% of the card is visible
              root: scrollRef, // Use the tab's internal scrollbar
            }}
          >
            <Weather />
            <WeatherDetails />
          </motion.div>
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
