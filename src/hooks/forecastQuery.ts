
import base from "../utility/AxiosBase";
import { type AxiosResponse } from "axios";
import { placeQuerySchema, coordQuerySchema } from "./../validators/query";
import { type ForecastResponse, forecastResponseSchema } from "./../validators/forecast";
// import { useQuery } from "@tanstack/react-query";
/**
 * @name fetchWeatherByPlaceName takes placeName as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<ForecastResponse>}
 */
export const fetchForecastByPlaceName = async (placeName: string): Promise<ForecastResponse> => {
  const response: AxiosResponse<unknown> = await base.get<unknown>(import.meta.env.VITE_OW_FORECAST, { params: placeQuerySchema.parse({ q: placeName }) });
  return forecastResponseSchema.parse(response.data);
};
/**
 * @name fetchWeatherByCoordinates takes coordinates as input and fetches weather data from OpenWeather API
 * @throws {ZodError | AxiosError}
 * @returns {Promise<ForecastResponse>}
 */
export const fetchForecastByCoordinates = async (coord: { lat: number, lon: number }): Promise<ForecastResponse> => {
  const response: AxiosResponse<unknown> = await base.get<unknown>(import.meta.env.VITE_OW_FORECAST, { params: coordQuerySchema.parse(coord) });
  return forecastResponseSchema.parse(response.data);
};

