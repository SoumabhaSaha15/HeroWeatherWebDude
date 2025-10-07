import React from "react";
import { ForecastSkeleton } from "./Skeletons";
import { useDataStore } from "../context/DataStoreContext";
import { Card, CardBody, CardHeader, Divider, Tab, Tabs } from "@heroui/react";
import { DateGrouper, type ForecastWeather } from "../utility/DateGrouper";

const Forecast: React.FC = () => {
  const dataConsumer = useDataStore();
  if (dataConsumer.forecast == null) return <ForecastSkeleton />;
  return (
    <>
      <Tabs
        className="w-full bg-white backdrop-blur-md rounded-2xl justify-around my-0.5"
        variant="light"
        classNames={{
          tabContent: "p-1 text-lg font-bold text-black",
          cursor: "bg-gray-400 rounded-xl",
        }}
      >
        {DateGrouper(dataConsumer.forecast.list).map((weathers, day) => {
          return (
            <Tab key={day} title={weathers.dailyDate}>
              <div className="overflow-y-auto overflow-x-hidden max-h-[calc(100vh-5.4rem)] h-[calc(100vh-5.4rem)] px-1">
                {weathers.data.map((weather, idx) => (
                  <WeatherForecastCard {...weather} key={`card-${idx}`} />
                ))}
              </div>
            </Tab>
          );
        })}
      </Tabs>
    </>
  );
};
export default Forecast;

const WeatherForecastCard: React.FC<ForecastWeather> = (
  forecast: ForecastWeather
) => {
  return (
    <Card className="w-full max-w-full rounded-2xl bg-white hover:bg-gray-400 hover:scale-95 backdrop-blur-md my-1">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-2xl font-bold">
          {forecast.dt_txt.split(" ")[1].slice(0, 5)}
        </h2>
      </CardHeader>
      <Divider />
      <CardBody>
        {/* Weather condition */}
        <div className="max-h-64 flex overflow-x-auto space-y-2 place-items-center justify-center text-2xl">
          {forecast.weather.map((w, idx) => (
            <React.Fragment key={idx}>
              <div>
                <div className="flex flex-row items-center justify-between p-2">
                  <div className="flex items-center gap-3">
                    <img
                      src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                      loading="lazy"
                      className="w-20 h-20 bg-gray-500/50 rounded-lg"
                      alt={w.description}
                    />
                    <div>
                      <p className="font-medium">{w.main}</p>
                      <p className="text-sm text-gray-800">{w.description}</p>
                    </div>
                  </div>
                </div>
              </div>
              {idx < forecast.weather.length - 1 && (
                <Divider orientation="vertical" className="mx-2 h-16" />
              )}
            </React.Fragment>
          ))}
        </div>
        <Divider />

        {/* Temperature grid */}
        <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
          <div className="flex flex-col items-center">
            <p className="text-2xl font-semibold">
              {Math.round(forecast.main.temp)}°C
            </p>
            <p className="text-sm text-gray-800">Current</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">
              {Math.round(forecast.main.temp_max)}°C
            </p>
            <p className="text-sm text-gray-800">Max</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">
              {Math.round(forecast.main.temp_min)}°C
            </p>
            <p className="text-sm text-gray-800">Min</p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-lg font-medium">
              {Math.round(forecast.main.feels_like)}°C
            </p>
            <p className="text-sm text-gray-800">Feels Like</p>
          </div>
        </div>
        {forecast.rain && (
          <React.Fragment>
            <Divider />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {forecast.rain["1h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold">
                    Rain: {forecast.rain["1h"]} mm
                  </p>
                  <p className="text-sm text-gray-800">in hour</p>
                </div>
              )}
              {forecast.rain["3h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-lg font-medium">
                    Rain: {forecast.rain["3h"]} mm
                  </p>
                  <p className="text-sm text-gray-800">in 3 hours</p>
                </div>
              )}
            </div>
          </React.Fragment>
        )}

        {/* Snow data */}
        {forecast.snow && (
          <React.Fragment>
            <Divider />
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 mb-4">
              {forecast.snow["1h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-2xl font-semibold">
                    Snow fall: {forecast.snow["1h"]} mm
                  </p>
                  <p className="text-sm text-gray-800">past hour</p>
                </div>
              )}
              {forecast.snow["3h"] && (
                <div className="flex flex-col items-center">
                  <p className="text-lg font-medium">
                    Snow fall: {forecast.snow["3h"]} mm
                  </p>
                  <p className="text-sm text-gray-800">in past 3 hours</p>
                </div>
              )}
            </div>
          </React.Fragment>
        )}
      </CardBody>
    </Card>
  );
};
