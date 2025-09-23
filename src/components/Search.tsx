import React from "react";
import { ImLocation } from "react-icons/im";
import AxiosBase from "./../utility/AxiosBase";
import { placeQuerySchema } from "../validators/query";
import { useDataStore } from "./../context/DataStoreContext"
import { weatherResponseSchema } from "../validators/weather";
import { forecastResponseSchema } from "../validators/forecast";
import { Input, Button, addToast, Tooltip } from "@heroui/react";
type Props = { setDefaultLocation: () => void; };
const Search: React.FC<Props> = ({ setDefaultLocation }) => {
  const dataConsumer = useDataStore();
  const [location, setLocation] = React.useState<string>('');
  React.useEffect(() => {
    if (dataConsumer.weather)
      setLocation(dataConsumer.weather.name);
  }, [dataConsumer.weather]);

  return (
    <div className="grid grid-cols-[minmax(calc(100%-68px),_1fr)_64px] place-items-center justify-center h-[80px] gap-1  bg-gray-800/30 hover:bg-gray-800/50 backdrop-blur-md rounded-3xl px-2">
      <Input
        size="lg"
        label="Location"
        type="text"
        classNames={{
          inputWrapper: "bg-white rounded-2xl",
          input: "text-black font-black",
          label: "text-black font-medium",
        }}
        color="primary"
        value={location}
        onInput={(e: React.FormEvent<HTMLInputElement>) => setLocation(e.currentTarget.value)}
        onKeyDown={async (e: React.KeyboardEvent<HTMLInputElement>) => {
          if (e.key === "Enter") {
            dataConsumer.setWeather(null);
            dataConsumer.setForecast(null);
            try {
              const param = new URLSearchParams(placeQuerySchema.parse({ q: location }));
              const weatherResponse = await AxiosBase.get(import.meta.env.VITE_OW_WEATHER + `?${param.toString()}`);
              const forecastResponse = await AxiosBase.get(import.meta.env.VITE_OW_FORECAST + `?${param.toString()}`);
              dataConsumer.setWeather(weatherResponseSchema.parse(weatherResponse.data));
              dataConsumer.setForecast(forecastResponseSchema.parse(forecastResponse.data));
            } catch (error) {
              console.error(error);
              addToast({ title: `${location} not found.`, color: "danger" });
              setDefaultLocation();
              setLocation(dataConsumer.weather ? dataConsumer.weather.name : "Kolkata");
            }
          }
        }}
      />
      <Tooltip 
        className="bg-white"
        content="Reset to your current/default location"
        children={
          <Button
            className="h-16 w-16 bg-white backdrop-blur-md rounded-3xl"
            isIconOnly={true}
            onPress={setDefaultLocation}
          >
            <ImLocation size={"32px"} color="red" />
          </Button>
        } />

    </div>);
}
export default Search