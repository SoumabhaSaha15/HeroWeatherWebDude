import { z } from "zod"
import Forcast from "./Forecast";
import { useEffect, type FC } from "react";
import { ForecastSkeleton } from "../Loader";
import { ForecastNotFound } from "../NotFound";
import { placeSchema } from "../../validators/query";
import { useToast } from "../../context/toast/ToastContext";
import { useForecastByCity } from "../../hooks/forecastQuery";

const ForecastCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, error } = useForecastByCity(q);
  const toast = useToast();

  useEffect(() => {
    if (error) toast.open(error.message);
  }, [error]);
  return (
    <>
      {isLoading ? (<ForecastSkeleton />) : ((data) ? (<Forcast {...data} />) : (<ForecastNotFound />))}
    </>
  )
};
export default ForecastCity;