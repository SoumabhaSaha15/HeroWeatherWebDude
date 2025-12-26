import { z } from 'zod';
const baseSchema = z.object({
  units: z.enum(['metric', 'imperial']).default('metric'),
  lang: z.string().default('english'),
  appid: z.literal(import.meta.env.VITE_OW_API_KEY).default(import.meta.env.VITE_OW_API_KEY)
});

export const placeQuerySchema = baseSchema.extend({
  q: z.string().min(1, { message: "Place name (q) cannot be empty" }),
});

export const coordQuerySchema = baseSchema.extend({
  lat: z.number().min(-90).max(90),
  lon: z.number().min(-180).max(180),
}).transform(v => ({ ...v, lon: v.lon.toString(), lat: v.lat.toString() }));