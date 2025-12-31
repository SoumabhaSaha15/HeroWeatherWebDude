import { type FC } from "react";
import Weather from "./Weather";
import { useWeatherByCoords } from "../../hooks/weatherQuery";
import type { GeolocationType } from "../../context/geo-location/GeolocationContext";
const WeatherCoords: FC<Exclude<GeolocationType, null>> = (coords) => {
  const { isLoading, data, error } = useWeatherByCoords(coords);
  return (
    <>
      {isLoading ? (<>loading</>) : ((data) ? (<Weather {...data} />) : (error))}
    </>
  )
};
export default WeatherCoords;