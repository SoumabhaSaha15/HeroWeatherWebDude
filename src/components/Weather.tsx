import React from "react";
import { useDataStore } from "./../context/DataStoreContext";
import { WeatherSkeleton } from "./Skeletons";
import { Card, CardHeader, CardBody, Divider } from "@heroui/react";
export default function Weather() {
  const { weather } = useDataStore();
  if (weather === null) return (<WeatherSkeleton />);
  return (
    <Card className="w-full max-w-full shadow-lg rounded-3xl bg-white hover:bg-gray-400 my-1">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">{weather.name + ", " + weather.sys.country}</h2>
        <Divider orientation="vertical" className="h-12" />
        <p className="text-sm text-gray-800">{new Date((weather.dt) * 1000).toLocaleString('en-IN')}</p>
      </CardHeader>
      <Divider />
      <CardBody>
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
                      className="w-20 h-20 bg-gray-500/50 rounded-lg"
                    />
                    <div>
                      <p className="font-medium">{w.main}</p>
                      <p className="text-sm text-gray-800">{w.description}</p>
                    </div>
                  </div>
                </div>
                {/* Divider (except after last item) */}
              </div>
              {idx < weather.weather.length - 1 && <Divider orientation="vertical" className="mx-2 h-16" />}
            </React.Fragment>
          ))}
        </div>
        <Divider />
        {/* Summary grid (not scrollable) */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          {/* <Divider orientation="vertical" className="mx-4 h-6" /> */}
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">{weather.main.temp}°C</p>
            <p className="text-sm text-gray-800">Current</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">{weather.main.temp_max}°C</p>
            <p className="text-sm text-gray-800">Max</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">{weather.main.temp_min}°C</p>
            <p className="text-sm text-gray-800">Min</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">{weather.main.feels_like}°C</p>
            <p className="text-sm text-gray-800">Feels Like</p>
          </div>
        </div>
          {/* rain data */}
          {weather.rain && (
            <React.Fragment>
              <Divider />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {weather.rain["1h"] && (<div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold">Rain: {weather.rain?.["1h"]} mm</p>
                  <p className="text-sm text-gray-800">past hour</p>
                </div>)}
                {weather.rain["3h"] && (<div className="flex flex-col items-center">
                  <p className="text-lg font-medium">Rain: {weather.rain["3h"]} mm</p>
                  <p className="text-sm text-gray-800">in past 3 hours</p>
                </div>)}
              </div>
            </React.Fragment>
          )}
          {/*snow fall data */}
          {weather.snow && (
            <React.Fragment>
              <Divider />
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
                {weather.snow["1h"] && (<div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold">Snow fall: {weather.snow?.["1h"]} mm</p>
                  <p className="text-sm text-gray-800">past hour</p>
                </div>)}
                {weather.snow["3h"] && (<div className="flex flex-col items-center">
                  <p className="text-lg font-medium">Snow fall: {weather.snow["3h"]} mm</p>
                  <p className="text-sm text-gray-800">in past 3 hours</p>
                </div>)}
              </div>
            </React.Fragment>
          )}
      </CardBody>
    </Card>
  );
}
