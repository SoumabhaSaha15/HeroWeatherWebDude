import { z } from 'zod';
const baseSchema = z.strictObject({
  units: z.enum(['metric', 'imperial']).default('metric'),
  lang: z.string().default('en'),
  appid: z.literal(import.meta.env.VITE_OW_API_KEY).default(import.meta.env.VITE_OW_API_KEY)
});
export const placeSchema = z.strictObject({
  q: z.string().min(1, { message: "Place name (q) cannot be empty" }),
});
export const coordSchema = z.strictObject({
  lat: z.number().min(-90).max(90).transform(v => v.toFixed(2)),
  lon: z.number().min(-180).max(180).transform(v => v.toFixed(2)),
});

export const placeQuerySchema = baseSchema.extend(placeSchema.shape);

export const coordQuerySchema = baseSchema.extend(coordSchema.shape);
