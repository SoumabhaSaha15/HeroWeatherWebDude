import { type FC } from "react";
import { type WeatherResponse } from "../../validators/weather";
import {
  WiThermometer,
  WiHumidity,
  WiStrongWind,
  WiBarometer,
  WiCloud,
  WiFog,
  WiRaindrops,
  WiSnowflakeCold,
  WiSunrise,
  WiSunset
} from "react-icons/wi";
import {
  FaLocationDot,
  FaTemperatureHigh,
  FaTemperatureLow,
  FaWind
} from "react-icons/fa6";

const Weather: FC<WeatherResponse> = (weather) => {
  return (
    <div className="card bg-linear-to-br from-base-200 to-base-300 shadow-xl hover:shadow-2xl transition-all duration-300 text-base-content h-dvh rounded-none" id="Weather">
      <div className="card-body">
        <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center gap-2 mb-4">
          <div className="flex items-center gap-3">
            <div className="avatar placeholder">
              <div className="bg-primary text-primary-content rounded-full w-12 grid place-items-center">
                <FaLocationDot className="w-6 h-6" />
              </div>
            </div>
            <div>
              <h2 className="card-title text-2xl sm:text-3xl font-bold text-base-content">
                {weather.name}
              </h2>
              <p className="text-sm text-secondary-content">{weather.sys.country}</p>
            </div>
          </div>
          <div className="flex flex-col items-start sm:items-end">
            <p className="text-xs sm:text-sm text-primary-content">
              {new Date(weather.dt * 1000).toLocaleString("en-IN")}
            </p>
          </div>
        </div>

        <div className="divider my-2"></div>

        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          {weather.weather.map((w, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-accent backdrop-blur-sm rounded-2xl p-4 shadow-md">
              <div className="avatar">
                <div className="w-20 h-20 rounded-xl bg-accent p-1">
                  <img
                    src={w.icon}
                    loading="lazy"
                    alt={w.description}
                    className="w-full h-full object-contain bg-accent"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-accent-content">{w.main}</p>
                <p className="text-sm text-accent-content capitalize">{w.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider my-2" />

        <div className="stats stats-vertical md:stats-horizontal shadow-lg bg-base-100 backdrop-blur-sm w-full mb-4">
          <div className="stat place-items-center">
            <div className="stat-figure text-primary">
              <WiThermometer className="w-8 h-8" />
            </div>
            <div className="stat-title text-base-content">Current</div>
            <div className="stat-value text-primary text-4xl">
              {Math.round(weather.main.temp)}°
            </div>
            <div className="stat-desc text-base">Temperature</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-figure text-error">
              <FaTemperatureHigh className="w-6 h-6" />
            </div>
            <div className="stat-title text-base-content">High</div>
            <div className="stat-value text-error text-3xl">
              {Math.round(weather.main.temp_max)}°
            </div>
            <div className="stat-desc text-base">Maximum</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-figure text-info">
              <FaTemperatureLow className="w-6 h-6" />
            </div>
            <div className="stat-title text-base-content">Low</div>
            <div className="stat-value text-info text-3xl">
              {Math.round(weather.main.temp_min)}°
            </div>
            <div className="stat-desc text-base">Minimum</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-figure text-accent">
              <WiThermometer className="w-8 h-8" />
            </div>
            <div className="stat-title text-base-content">Feels Like</div>
            <div className="stat-value text-accent text-3xl">
              {Math.round(weather.main.feels_like)}°
            </div>
            <div className="stat-desc text-base">Apparent</div>
          </div>
        </div>

        <div className="grid grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-3">

          <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2 hover:scale-110">
              <WiHumidity className="w-8 h-8 text-accent-content" />
            </div>
            <p className="text-sm text-secondary-content font-semibold mb-1">Humidity</p>
            <p className="text-2xl font-bold text-secondary-content">{weather.main.humidity}%</p>
          </div>

          <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2 hover:scale-110">
              <WiStrongWind className="w-8 h-8 text-accent-content" />
            </div>
            <p className="text-sm text-base-content font-semibold mb-1">Wind Speed</p>
            <p className="text-2xl font-bold text-secondary-content">{weather.wind.speed} m/s</p>
          </div>

          <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2 hover:scale-110">
              <WiBarometer className="w-8 h-8 text-accent-content" />
            </div>
            <p className="text-sm text-base-content font-semibold mb-1">Pressure</p>
            <p className="text-2xl font-bold text-base-content">{weather.main.pressure} hPa</p>
          </div>

          <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2 hover:scale-110">
              <WiCloud className="w-8 h-8 text-accent-content" />
            </div>
            <p className="text-sm text-base-content font-semibold mb-1">Clouds</p>
            <p className="text-2xl font-bold text-base-content">{weather.clouds.all}%</p>
          </div>

          <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2 hover:scale-110">
              <WiFog className="w-8 h-8 text-accent-content" />
            </div>
            <p className="text-sm text-base-content font-semibold mb-1">Visibility</p>
            <p className="text-2xl font-bold text-base-content">{(weather.visibility / 1000).toFixed(1)} km</p>
          </div>

          {weather.wind.gust && (
            <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
              <div className="flex justify-center mb-2 hover:scale-110">
                <FaWind className="w-6 h-6 text-accent-content" />
              </div>
              <p className="text-sm text-base-content font-semibold mb-1">Wind Gust</p>
              <p className="text-2xl font-bold text-secondary-content">{weather.wind.gust} m/s</p>
            </div>
          )}

          <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2 hover:scale-110">
              <WiSunrise className="w-8 h-8 text-accent-content" />
            </div>
            <p className="text-sm text-base-content font-semibold mb-1">Sunrise</p>
            <p className="text-2xl font-bold text-base-content">
              {(new Date(weather.sys.sunrise).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }))}
            </p>
          </div>

          <div className="bg-accent backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <div className="flex justify-center mb-2 hover:scale-110">
              <WiSunset className="w-8 h-8 text-accent-content" />
            </div>
            <p className="text-sm text-base-content font-semibold mb-1">Sunset</p>
            <p className="text-2xl font-bold text-base-content">
              {(new Date(weather.sys.sunset).toLocaleTimeString("en-IN", { hour: "2-digit", minute: "2-digit" }))}
            </p>
          </div>

        </div>

        {weather.rain && (
          <>
            <div className="divider my-4">
              <span className="badge badge-info badge-lg gap-2">
                <WiRaindrops className="w-5 h-5" />
                Rain Data
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weather.rain["1h"] && (
                <div className="alert alert-info shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{weather.rain["1h"]} mm</span>
                    <span className="text-sm">Past hour</span>
                  </div>
                </div>
              )}
              {weather.rain["3h"] && (
                <div className="alert alert-info shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{weather.rain["3h"]} mm</span>
                    <span className="text-sm">Past 3 hours</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {weather.snow && (
          <>
            <div className="divider my-4">
              <span className="badge badge-accent badge-lg gap-2">
                <WiSnowflakeCold className="w-5 h-5" />
                Snow Data
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {weather.snow["1h"] && (
                <div className="alert alert-accent shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{weather.snow["1h"]} mm</span>
                    <span className="text-sm">Past hour</span>
                  </div>
                </div>
              )}
              {weather.snow["3h"] && (
                <div className="alert alert-accent shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{weather.snow["3h"]} mm</span>
                    <span className="text-sm">Past 3 hours</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default Weather;