import React from "react";
import { ImLocation } from "react-icons/im";
import AxiosBase from "./../utility/AxiosBase";
import { placeQuerySchema } from "../validators/query";
import { useDataStore } from "./../context/DataStoreContext"
import { weatherResponseSchema } from "../validators/weather";
import { forecastResponseSchema } from "../validators/forecast";
import {Input, Button, addToast, Tooltip } from "@heroui/react";
type Props = { setDefaultLocation: () => void; };
const Search: React.FC<Props> = ({ setDefaultLocation }) => {
  const dataConsumer = useDataStore();
  const [location, setLocation] = React.useState<string>('');
  React.useEffect(() => {
    if (dataConsumer.weather)
      setLocation(dataConsumer.weather.name);
  }, [dataConsumer.weather]);

  return (
    <div className="grid grid-cols-[minmax(calc(100%-68px),_1fr)_64px] place-items-center justify-center h-[80px] gap-1 sticky top-0 z-10 bg-gray-800/30 hover:bg-gray-800/50 backdrop-blur-md rounded-3xl px-2">
      <Input
        size="lg"
        label="Location"
        type="text"
        className="rounded-3xl"
        color="primary"
        value={location}
        onInput={(e: React.FormEvent<HTMLInputElement>) => setLocation(e.currentTarget.value)}
        onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            try {
              const param = new URLSearchParams(placeQuerySchema.parse({ q: location }));
              const weatherResponse = await AxiosBase.get(import.meta.env.VITE_OW_WEATHER + `?${param.toString()}`);
              dataConsumer.setWeather(weatherResponseSchema.parse(weatherResponse.data));
              const forecastResponse = await AxiosBase.get(import.meta.env.VITE_OW_FORECAST + `?${param.toString()}`);
              dataConsumer.setForecast(forecastResponseSchema.parse(forecastResponse.data));
            } catch (error) {
              console.error(error);
              addToast({ title: 'Location not found', color: "danger" });
              setLocation(dataConsumer.weather ? dataConsumer.weather.name : "Kolkata");
            }
          }
        }}
      />
      <Tooltip content="Reset to current location" children={
        <Button
          className="h-16 w-16 bg-yellow-900/30 hover:bg-yellow-900/50 backdrop-blur-md rounded-3xl"
          isIconOnly={true}
          onPress={setDefaultLocation}
        >
          <ImLocation size={"32px"} color="yellow" />
        </Button>
      } />

    </div>);
}
export default Search