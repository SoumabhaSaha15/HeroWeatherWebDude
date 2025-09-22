import { z } from 'zod';
const baseSchema = z.object({
  units: z.enum(['metric', 'imperial']).default('metric'),
  lang: z.string().default('english'),
});

export const placeQuerySchema = baseSchema.extend({
  q:z.string().min(1, { message: "Query cannot be empty" }),
}).transform(v => {
  return { ...v, appid: import.meta.env.VITE_OW_API_KEY }
});

export const coordQuerySchema = baseSchema.extend({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
}).transform(v => {
  return { ...v, appid: import.meta.env.VITE_OW_API_KEY,lon:v.lon.toString(),lat:v.lat.toString() }
});