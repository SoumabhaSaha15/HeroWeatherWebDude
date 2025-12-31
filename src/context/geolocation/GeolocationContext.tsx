import { createContext, type Context, useContext } from "react";
export type GeolocationType = { lon: number; lat: number; } | null;
type GeolocationProp = {
  geolocation: GeolocationType;
  // setGeolocation: (value: GeolocationType | null | ((prev: GeolocationType | null) => GeolocationType | null)) => void;
};

export const GeolocationContext: Context<GeolocationProp> = createContext<GeolocationProp>({
  geolocation: null,
  // setGeolocation: console.log
});

const useGeolocation = () => useContext<GeolocationProp>(GeolocationContext);

export default useGeolocation;