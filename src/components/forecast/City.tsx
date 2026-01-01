import { type FC } from "react";
import Forcast from "./Forecast";
import { z } from "zod"
import { useForecastByCity } from "../../hooks/forecastQuery";
import { placeSchema } from "../../validators/query";
const ForecastCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, error } = useForecastByCity(q);
  console.log(data)
  return (
    <>
      {isLoading ? (<>loading</>) : ((data) ? (<Forcast forecast={data} />) : (error?.message ?? "Error fetching forecast"))}
    </>
  )
};
export default ForecastCity;