import { z } from "zod";
import { createContext, useContext, type Context } from "react";
export const ThemeOptionsValidator = z.enum(["light", "dark"]);
export type ThemeOptionsType = z.infer<typeof ThemeOptionsValidator>;
export type ThemeContextProps = {
  theme: ThemeOptionsType;
  applyTheme: (theme: ThemeOptionsType) => void;
}
export const ThemeContext: Context<ThemeContextProps> = createContext<ThemeContextProps>({
  theme: "dark",
  applyTheme: (theme: ThemeOptionsType) => { console.log(theme); },
});
export const useTheme = () => useContext(ThemeContext);