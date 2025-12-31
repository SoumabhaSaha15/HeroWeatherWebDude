import { type FC } from "react";
import Forcast from "./Forecast";
import { z } from "zod"
import { useForecastByCity } from "../../hooks/forecastQuery";
import { placeSchema } from "../../validators/query";
const ForecastCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, error } = useForecastByCity(q);
  return (
    <>
      {isLoading ? (<>loading</>) : ((data) ? (<Forcast {...data} />) : (error))}
    </>
  )
};
export default ForecastCity;