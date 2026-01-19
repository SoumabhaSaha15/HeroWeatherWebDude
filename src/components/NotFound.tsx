import { type FC } from "react";
import { TbCloudOff, TbSearch } from "react-icons/tb";

export const WeatherNotFound: FC<{ message?: string }> = ({ message = "City not found" }) => {
  return (
    // Spans 3 columns to fill the main weather area, keeping the layout intact
    <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 md:col-span-2 xl:col-span-3 min-h-72 m-4">
      <div className="card-body items-center justify-center text-center space-y-4">

        {/* Animated Icon Container */}
        <div className="relative">
          <div className="w-24 h-24 rounded-full bg-base-content/5 flex items-center justify-center">
            <TbCloudOff className="text-5xl text-base-content/30" />
          </div>
          <div className="absolute -bottom-2 -right-2 w-10 h-10 rounded-full bg-error/10 flex items-center justify-center animate-bounce">
            <TbSearch className="text-xl text-error" />
          </div>
        </div>

        <div>
          <h2 className="card-title text-xl justify-center opacity-80">{message}</h2>
          <p className="text-sm opacity-50 max-w-xs mx-auto mt-1">
            We couldn't find weather data for this location. Please check the spelling and try again.
          </p>
        </div>

        {/* Optional Action Hint */}
        <div className="badge badge-neutral badge-outline gap-2 mt-2 opacity-60 font-mono text-xs">
          <span>Error 404</span>
        </div>
      </div>
    </div>
  );
};

import { TbCalendarOff } from "react-icons/tb";

export const ForecastNotFound: FC = () => {
  return (
    // Matches the exact dimensions of the Forecast Card (Tall)
    <div className="card bg-base-200/50 backdrop-blur-md shadow-sm border border-base-content/5 col-span-1 md:row-span-2 m-4">
      <div className="card-body items-center justify-center text-center p-6">

        <div className="w-16 h-16 rounded-2xl bg-base-content/5 flex items-center justify-center mb-4 rotate-3">
          <TbCalendarOff className="text-3xl text-base-content/30" />
        </div>

        <h3 className="font-bold text-base opacity-70">No Forecast</h3>
        <p className="text-xs opacity-40 mt-1">
          Forecast data is currently unavailable.
        </p>

        {/* Visual Decoration line */}
        <div className="w-12 h-1 rounded-full bg-base-content/10 mt-6"></div>
      </div>
    </div>
  );
};