import { type FC } from "react";
import Forcast from "./Forecast";
import { useForecastByCoordinates } from "../../hooks/forecastQuery";
import type { GeolocationType } from "../../context/geolocation/GeolocationContext";
const ForecastCoords: FC<Exclude<GeolocationType, null>> = (coords) => {
  const { isLoading, data, error } = useForecastByCoordinates(coords);
  return (
    <>
      {isLoading ? (<>loading</>) : ((data) ? (<Forcast {...data} />) : (error))}
    </>
  )
};
export default ForecastCoords;