import { useQueryClient } from '@tanstack/react-query';
import { type WeatherResponse } from '../validators/weather';

export const useCachedCities = (max = 5) => {
  const queryClient = useQueryClient();

  const queries = queryClient.getQueryCache().findAll({
    queryKey: ['weather', 'city'],
    fetchStatus: 'idle',
  });

  const cities = queries
    .map((query) => {
      const data = query.state.data as WeatherResponse | undefined;
      return data?.name;
    })
    .filter((name): name is string => !!name);
  return cities.reverse().slice(0, max);
};