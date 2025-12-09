import React from "react";
import { prettifyError, z } from "zod";
import AxiosBase from "./../utility/AxiosBase";
import { FaMapMarkerAlt } from "react-icons/fa";
import { placeQuerySchema } from "../validators/query";
import { useToast } from "../context/toast/ToastContext";
import { weatherResponseSchema } from "../validators/weather";
import { forecastResponseSchema } from "../validators/forecast";
import { useDataStore } from "./../context/data/DataStoreContext";

type Props = { setDefaultLocation: () => void };

const Search: React.FC<Props> = ({ setDefaultLocation }) => {
  const toast = useToast();
  const dataConsumer = useDataStore();
  const [location, setLocation] = React.useState<string>("");
  const EnterLocation = async (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      dataConsumer.setWeather(null);
      dataConsumer.setForecast(null);
      try {
        const param = new URLSearchParams(
          placeQuerySchema.parse({ q: location })
        );
        const weatherResponse = await AxiosBase.get(
          import.meta.env.VITE_OW_WEATHER + `?${param.toString()}`
        );
        const forecastResponse = await AxiosBase.get(
          import.meta.env.VITE_OW_FORECAST + `?${param.toString()}`
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
        toast.open(`${location} not found.`,true,2000,{toastVariant:"alert-error",toastPosition:["toast-end","toast-bottom"]});
        setDefaultLocation();
        setLocation(
          dataConsumer.weather ? dataConsumer.weather.name : "Kolkata"
        );
      }
    }
  }
  React.useEffect(() => {
    if (dataConsumer.weather) setLocation(dataConsumer.weather.name);
  }, [dataConsumer.weather]);

  return (
    <div className="grid grid-cols-[minmax(calc(100%-68px),1fr)_64px] place-items-center justify-center h-16 gap-1 hover:bg-base-200 backdrop-blur-md rounded-full px-2">
      <div className="form-control w-full">
        <div className="relative w-full">
          <input
            type="text"
            placeholder="Location"
            className="input input-lg w-full rounded-full font-black focus:outline-none focus:ring-0 focus:ring-accent"
            value={location}
            onChange={(e) => setLocation(e.target.value)} // Changed onInput to onChange for React standard
            onKeyDown={EnterLocation} // Changed onKeyPress to onKeyDown for better compatibility
          />
        </div>
      </div>

      {/* Tooltip & Button Replacement */}
      <div className="tooltip tooltip-left" data-tip="Reset to your current/default location">
        <button
          className="btn btn-circle btn-lg backdrop-blur-md rounded-full border-none hover:bg-accent p-0 flex items-center justify-center"
          onClick={setDefaultLocation}
        >
          <FaMapMarkerAlt color="red" />
        </button>
      </div>
    </div>
  );
};
export default Search;