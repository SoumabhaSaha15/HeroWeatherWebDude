import { type FC } from "react";
import { type ForecastResponse } from "../../validators/forecast";
import { LuCalendarClock } from "react-icons/lu";
import { DateGrouper, type ForecastWeather } from "../../utility/DateGrouper"
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiCloud,
  WiFog,
  WiRaindrops,
  WiSnowflakeCold
} from "react-icons/wi";
import {
  FaTemperatureHigh,
  FaTemperatureLow,
} from "react-icons/fa6";

const ForecastCard: FC<ForecastWeather> = (forecast) => {
  return (
    <div className="carousel-item w-full xl:w-1/2 2xl:w-1/3">
      <div className="card bg-accent shadow-lg w-full">
        <div className="card-body">
          <div className="flex justify-between items-center mb-4">
            <h3 className="card-title text-xl font-bold text-accent-content">
              {forecast.dt_txt.split(" ")[1].slice(0, 5)}
            </h3>
          </div>

          <div className="flex flex-wrap gap-4 justify-center items-center mb-4">
            <div className="flex items-center gap-3 bg-base-100 rounded-xl p-3 shadow-md">
              <div className="avatar placeholder">
                <div className="w-16 h-16 rounded-lg grid place-items-center">
                  <WiRaindrops className="w-full h-full text-info" />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-base-content">Rain</p>
                {forecast.rain ? (
                  <p className="text-sm text-base-content">
                    {forecast.rain["1h"] ? `${forecast.rain["1h"]} mm/hr` : forecast.rain["3h"] ? `${forecast.rain["3h"]} mm/3hr` : "No record"}
                  </p>
                ) : (
                  <p className="text-sm text-base-content/70">No record</p>
                )}
              </div>
            </div>

            {forecast.weather.map((w, idx) => (
              <div key={idx} className="flex items-center gap-3 bg-base-100 rounded-xl p-3 shadow-md">
                <div className="avatar">
                  <div className="w-16 h-16 rounded-lg bg-base-200 p-1">
                    <img
                      src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                      loading="lazy"
                      alt={w.description}
                      className="w-full h-full object-contain"
                    />
                  </div>
                </div>
                <div>
                  <p className="text-lg font-bold text-base-content">{w.main}</p>
                  <p className="text-sm text-base-content capitalize">{w.description}</p>
                </div>
              </div>
            ))}

            <div className="flex items-center gap-3 bg-base-100 rounded-xl p-3 shadow-md">
              <div className="avatar placeholder">
                <div className="w-16 h-16 rounded-lg grid place-items-center">
                  <WiSnowflakeCold className="w-full h-full text-accent" />
                </div>
              </div>
              <div>
                <p className="text-lg font-bold text-base-content">Snow</p>
                {forecast.snow ? (
                  <p className="text-sm text-base-content">
                    {forecast.snow["1h"] ? `${forecast.snow["1h"]} mm/hr` : forecast.snow["3h"] ? `${forecast.snow["3h"]} mm/3hr` : "No record"}
                  </p>
                ) : (
                  <p className="text-sm text-base-content/70">No record</p>
                )}
              </div>
            </div>
          </div>

          <div className="stats stats-vertical xl:stats-horizontal shadow-lg bg-base-100 w-full mb-4">
            <div className="stat place-items-center">
              <div className="stat-figure text-primary">
                <WiThermometer className="w-6 h-6" />
              </div>
              <div className="stat-title">Current</div>
              <div className="stat-value text-primary text-3xl">
                {Math.round(forecast.main.temp)}°
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-figure text-error">
                <FaTemperatureHigh className="w-5 h-5" />
              </div>
              <div className="stat-title">High</div>
              <div className="stat-value text-error text-2xl">
                {Math.round(forecast.main.temp_max)}°
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-figure text-info">
                <FaTemperatureLow className="w-5 h-5" />
              </div>
              <div className="stat-title">Low</div>
              <div className="stat-value text-info text-2xl">
                {Math.round(forecast.main.temp_min)}°
              </div>
            </div>

            <div className="stat place-items-center">
              <div className="stat-figure text-accent">
                <WiThermometer className="w-6 h-6" />
              </div>
              <div className="stat-title">Feels Like</div>
              <div className="stat-value text-accent text-2xl">
                {Math.round(forecast.main.feels_like)}°
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-3 gap-3">
            <div className="bg-base-100 rounded-xl p-3 shadow-md text-center">
              <div className="flex justify-center mb-2">
                <WiHumidity className="w-7 h-7 text-blue-600" />
              </div>
              <p className="text-xs font-semibold mb-1">Humidity</p>
              <p className="text-xl font-bold">{forecast.main.humidity}%</p>
            </div>

            <div className="bg-base-100 rounded-xl p-3 shadow-md text-center">
              <div className="flex justify-center mb-2">
                <WiStrongWind className="w-7 h-7 text-green-600" />
              </div>
              <p className="text-xs font-semibold mb-1">Wind Speed</p>
              <p className="text-xl font-bold">{forecast.wind.speed} m/s</p>
            </div>

            <div className="bg-base-100 rounded-xl p-3 shadow-md text-center">
              <div className="flex justify-center mb-2">
                <WiBarometer className="w-7 h-7 text-purple-600" />
              </div>
              <p className="text-xs font-semibold mb-1">Pressure</p>
              <p className="text-xl font-bold">{forecast.main.pressure} hPa</p>
            </div>

            <div className="bg-base-100 rounded-xl p-3 shadow-md text-center">
              <div className="flex justify-center mb-2">
                <WiCloud className="w-7 h-7 text-gray-600" />
              </div>
              <p className="text-xs font-semibold mb-1">Clouds</p>
              <p className="text-xl font-bold">{forecast.clouds.all}%</p>
            </div>

            <div className="bg-base-100 rounded-xl p-3 shadow-md text-center">
              <div className="flex justify-center mb-2">
                <WiFog className="w-7 h-7 text-teal-600" />
              </div>
              <p className="text-xs font-semibold mb-1">Precipitation</p>
              <p className="text-xl font-bold">{Math.round(forecast.pop * 100)}%</p>
            </div>

            {forecast.visibility && (
              <div className="bg-base-100 rounded-xl p-3 shadow-md text-center">
                <div className="flex justify-center mb-2">
                  <WiFog className="w-7 h-7 text-teal-600" />
                </div>
                <p className="text-xs font-semibold mb-1">Visibility</p>
                <p className="text-xl font-bold">{(forecast.visibility / 1000).toFixed(1)} km</p>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

const Forecast: FC<ForecastResponse> = (forecast) => {
  return (
    <div className="card bg-linear-to-br from-base-200 to-base-300 shadow-xl text-base-content rounded-none">
      <div className="card-body">
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-3xl font-bold text-pretty text-primary">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-12 grid place-items-center">
                <LuCalendarClock className="w-6 h-6" />
              </div>
            </div>
            Forecast : {forecast.city.name}, {forecast.city.country}
          </h2>
        </div>

        <div className="divider my-1" />

        <div className="space-y-4">
          {DateGrouper(forecast.list).map((group, index) => (
            <details key={index} className="collapse collapse-arrow bg-base-100 shadow-lg" open={index === 0}>
              <summary className="collapse-title text-xl font-bold text-base-content cursor-pointer">
                {new Date(group.dailyDate).toLocaleDateString("en-IN", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric"
                })}
                <span className="badge badge-primary ml-3">{group.data.length} forecasts</span>
              </summary>
              <div className="collapse-content">
                <div className="carousel carousel-center w-full space-x-4 p-4">
                  {group.data.map((item, idx) => (
                    <ForecastCard key={idx} {...item} />
                  ))}
                </div>
              </div>
            </details>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Forecast;