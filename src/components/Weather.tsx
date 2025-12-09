import React from "react";
import { WeatherSkeleton } from "./Skeletons";
import { useDataStore } from "./../context/data/DataStoreContext";

export default function Weather() {
  const { weather } = useDataStore();
  if (weather === null) return <WeatherSkeleton />;

  return (
    <div className="card w-full max-w-full rounded-2xl shadow-xl bg-base-300 hover:bg-base-200 hover:scale-95 transition-transform duration-200 my-1">
      {/* Header Section */}
      <div className="flex justify-between items-center p-4 pb-0">
        <h2 className="card-title text-2xl font-bold">
          {weather.name + ", " + weather.sys.country}
        </h2>
        
        {/* Vertical Divider */}
        <div className="divider divider-horizontal h-12 mx-1 m-0"></div>
        
        <p className="text-sm text-base-content">
          {new Date(weather.dt * 1000).toLocaleString("en-IN")}
        </p>
      </div>

      {/* Horizontal Divider */}
      <div className="divider m-0"></div>

      {/* Body Section */}
      <div className="card-body py-4">
        {/* Scrollable container */}
        <div className="max-h-64 flex overflow-x-auto space-y-2 place-items-center justify-center text-2xl">
          {weather.weather.map((w, idx) => (
            <React.Fragment key={idx}>
              <div>
                <div className="flex flex-row items-center justify-between p-2">
                  {/* Left side: icon + main */}
                  <div className="flex items-center gap-3">
                    <img
                      src={w.icon}
                      loading="lazy"
                      alt={w.main}
                      className="w-20 h-20 bg-gray-400 rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{w.main}</p>
                      <p className="text-sm text-base-content">{w.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {/* Divider (except after last item) */}
              {idx < weather.weather.length - 1 && (
                <div className="divider divider-horizontal mx-2 h-16"></div>
              )}
            </React.Fragment>
          ))}
        </div>

        <div className="divider m-0"></div>

        {/* Summary grid (not scrollable) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">{weather.main.temp}°C</p>
            <p className="text-sm text-base-content">Current</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">{weather.main.temp_max}°C</p>
            <p className="text-sm text-base-content">Max</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">{weather.main.temp_min}°C</p>
            <p className="text-sm text-base-content">Min</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">{weather.main.feels_like}°C</p>
            <p className="text-sm text-base-content">Feels Like</p>
          </div>
        </div>

        {/* rain data */}
        {weather.rain && (
          <React.Fragment>
            <div className="divider m-0"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 mt-4">
              {weather.rain["1h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold">
                    Rain: {weather.rain?.["1h"]} mm
                  </p>
                  <p className="text-sm text-base-content">past hour</p>
                </div>
              )}
              {weather.rain["3h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-lg font-medium">
                    Rain: {weather.rain["3h"]} mm
                  </p>
                  <p className="text-sm text-base-content">in past 3 hours</p>
                </div>
              )}
            </div>
          </React.Fragment>
        )}

        {/* snow fall data */}
        {weather.snow && (
          <React.Fragment>
            <div className="divider m-0"></div>
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4 mt-4">
              {weather.snow["1h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold">
                    Snow fall: {weather.snow?.["1h"]} mm
                  </p>
                  <p className="text-sm text-base-content">past hour</p>
                </div>
              )}
              {weather.snow["3h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-lg font-medium">
                    Snow fall: {weather.snow["3h"]} mm
                  </p>
                  <p className="text-sm text-base-content">in past 3 hours</p>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </div>
    </div>
  );
}