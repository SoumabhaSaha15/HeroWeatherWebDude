import { type FC } from "react";
import { z } from "zod";
import { placeSchema } from "../../validators/query";
import Weather from "./Weather";
import { useWeatherByCity } from "../../hooks/weatherQuery";
const WeatherCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, error } = useWeatherByCity(q);
  return (
    <>
      {isLoading ? (<>loading</>) : ((data) ? (<Weather {...data} />) : (error))}
    </>
  )
};
export default WeatherCity;