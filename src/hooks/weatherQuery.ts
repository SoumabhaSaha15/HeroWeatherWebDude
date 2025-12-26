
import base from "../utility/AxiosBase";
import { type AxiosResponse } from "axios";
import { placeQuerySchema, coordQuerySchema } from "./../validators/query";
import { type WeatherResponse, weatherResponseSchema } from "./../validators/weather";
/**
 * @name fetchWeatherByPlaceName takes placeName as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<WeatherResponse>}
 */
export const fetchWeatherByPlaceName = async (placeName: string): Promise<WeatherResponse> => {
  const response: AxiosResponse<unknown> = await base.get<unknown>(import.meta.env.VITE_OW_WEATHER, { params: placeQuerySchema.parse({ q: placeName }) });
  return weatherResponseSchema.parse(response.data);
};
/**
 * @name fetchWeatherByCoordinates takes coordinates as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<WeatherResponse>}
 */
export const fetchWeatherByCoordinates = async (coord: { lat: number, lon: number }): Promise<WeatherResponse> => {
  const response: AxiosResponse<unknown> = await base.get<unknown>(import.meta.env.VITE_OW_WEATHER, { params: coordQuerySchema.parse(coord) });
  return weatherResponseSchema.parse(response.data);
};