import { useQueryClient } from '@tanstack/react-query';
import { type WeatherResponse } from '../validators/weather';

export const useCachedCities = () => {
  const queryClient = useQueryClient();

  // 1. Get all queries that match the weather key
  const queries = queryClient.getQueryCache().findAll({
    queryKey: ['weather', 'city'],
    fetchStatus: 'idle', // Only get queries that have finished loading
  });

  // 2. Map over them to extract the Real Name from the API response
  const cities = queries
    .map((query) => {
      const data = query.state.data as WeatherResponse | undefined;
      return data?.name; // e.g. "London" (Not "london")
    })
    .filter((name): name is string => !!name); // Remove undefined/null

  // 3. Remove duplicates (Set) and Sort
  return cities;
  // return [...new Set(cities)].sort();
};