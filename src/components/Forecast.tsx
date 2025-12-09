import React from "react";
import { throttle } from "lodash";
import { ForecastSkeleton } from "./Skeletons";
import { useDataStore } from "../context/data/DataStoreContext";
import { DateGrouper, type ForecastWeather } from "../utility/DateGrouper";

const Forecast: React.FC = () => {
  const dataConsumer = useDataStore();
  const [width, setWidth] = React.useState(window.innerWidth);
  React.useEffect(()=>{
    window.onresize = throttle(() => setWidth(window.innerWidth), 1500);
    return () => { window.onresize = () => { } };
  },[]);
  if (dataConsumer.forecast == null) return <ForecastSkeleton />;
  return (
    <div className="tabs tabs-box">
      {DateGrouper(dataConsumer.forecast.list)
        .map((weathers,day) => {
          return (
            <React.Fragment key={`tab-frag-${day}`}>
              <input type="radio" name="active_tab" defaultChecked={day===0} className="tab" aria-label={weathers.dailyDate} />
              <div className={`tab-content bg-base-100 border-base-300 p-6 ${width<582?'max-h-[calc(100vh-112px)]':'max-h-[calc(100vh-72px)]'} overflow-y-auto shadow-lg`}>
                {weathers.data.map((weather,idx)=>(
                  <div  key={`card-${idx}`} className="mb-6 last:mb-0" >
                    <WeatherForecastCard {...weather} />
                  </div>
                ))}
              </div>
            </React.Fragment>
          )
        })}
    </div>
  );
};
export default Forecast;
const WeatherForecastCard: React.FC<ForecastWeather> = (forecast: ForecastWeather) => {
  const getTimeOfDay = () => {
    const hour = parseInt(forecast.dt_txt.split(" ")[1].slice(0, 2));
    if (hour >= 5 && hour < 12) return 'morning';
    if (hour >= 12 && hour < 17) return 'afternoon';
    if (hour >= 17 && hour < 21) return 'evening';
    return 'night';
  };

  const timeOfDay = getTimeOfDay();
  
  const gradientClasses = {
    morning: 'from-orange-200 to-yellow-100',
    afternoon: 'from-blue-200 to-cyan-100',
    evening: 'from-purple-200 to-pink-100',
    night: 'from-indigo-300 to-blue-200'
  };

  return (
    <div className={`card bg-linear-to-br ${gradientClasses[timeOfDay]} shadow-xl hover:shadow-2xl transition-all duration-300 hover:-translate-y-1`}>
      <div className="card-body">
        {/* Header with Time */}
        <div className="flex justify-between items-center mb-4">
          <h2 className="card-title text-3xl font-bold text-gray-800">
            {forecast.dt_txt.split(" ")[1].slice(0, 5)}
          </h2>
          <div className="badge badge-lg badge-primary capitalize">{timeOfDay}</div>
        </div>

        <div className="divider my-2"></div>

        {/* Weather Condition with Icons */}
        <div className="flex flex-wrap gap-4 justify-center items-center mb-6">
          {forecast.weather.map((w, idx) => (
            <div key={idx} className="flex items-center gap-3 bg-white/60 backdrop-blur-sm rounded-2xl p-4 shadow-md">
              <div className="avatar">
                <div className="w-20 h-20 rounded-xl bg-gray-400 p-1 shadow-inner">
                  <img
                    src={`https://openweathermap.org/img/wn/${w.icon}@2x.png`}
                    loading="lazy"
                    alt={w.description}
                    className="w-full h-full object-contain"
                  />
                </div>
              </div>
              <div>
                <p className="text-xl font-bold text-gray-800">{w.main}</p>
                <p className="text-sm text-gray-600 capitalize">{w.description}</p>
              </div>
            </div>
          ))}
        </div>

        <div className="divider my-2"></div>

        {/* Temperature Stats Grid */}
        <div className="stats stats-vertical sm:stats-horizontal shadow-lg bg-white/70 backdrop-blur-sm w-full">
          <div className="stat place-items-center">
            <div className="stat-title text-gray-600">Current</div>
            <div className="stat-value text-primary text-4xl">
              {Math.round(forecast.main.temp)}°
            </div>
            <div className="stat-desc text-gray-500">Temperature</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-gray-600">High</div>
            <div className="stat-value text-error text-3xl">
              {Math.round(forecast.main.temp_max)}°
            </div>
            <div className="stat-desc text-gray-500">Maximum</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-gray-600">Low</div>
            <div className="stat-value text-info text-3xl">
              {Math.round(forecast.main.temp_min)}°
            </div>
            <div className="stat-desc text-gray-500">Minimum</div>
          </div>

          <div className="stat place-items-center">
            <div className="stat-title text-gray-600">Feels Like</div>
            <div className="stat-value text-accent text-3xl">
              {Math.round(forecast.main.feels_like)}°
            </div>
            <div className="stat-desc text-gray-500">Apparent</div>
          </div>
        </div>

        {/* Additional Weather Details */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-3 mt-6">
          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <p className="text-sm text-gray-600 font-semibold mb-1">Humidity</p>
            <p className="text-2xl font-bold text-blue-600">{forecast.main.humidity}%</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <p className="text-sm text-gray-600 font-semibold mb-1">Wind Speed</p>
            <p className="text-2xl font-bold text-green-600">{forecast.wind.speed} m/s</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <p className="text-sm text-gray-600 font-semibold mb-1">Pressure</p>
            <p className="text-2xl font-bold text-purple-600">{forecast.main.pressure} hPa</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <p className="text-sm text-gray-600 font-semibold mb-1">Clouds</p>
            <p className="text-2xl font-bold text-gray-600">{forecast.clouds.all}%</p>
          </div>

          <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
            <p className="text-sm text-gray-600 font-semibold mb-1">Precipitation</p>
            <p className="text-2xl font-bold text-indigo-600">{Math.round(forecast.pop * 100)}%</p>
          </div>

          {forecast.visibility && (
            <div className="bg-white/70 backdrop-blur-sm rounded-xl p-4 shadow-md text-center">
              <p className="text-sm text-gray-600 font-semibold mb-1">Visibility</p>
              <p className="text-2xl font-bold text-teal-600">{(forecast.visibility / 1000).toFixed(1)} km</p>
            </div>
          )}
        </div>

        {/* Rain Information */}
        {forecast.rain && (
          <>
            <div className="divider my-4">
              <span className="badge badge-info badge-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707M16 12a4 4 0 11-8 0 4 4 0 018 0z" />
                </svg>
                Rain Data
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {forecast.rain["1h"] && (
                <div className="alert alert-info shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{forecast.rain["1h"]} mm</span>
                    <span className="text-sm">Last hour</span>
                  </div>
                </div>
              )}
              {forecast.rain["3h"] && (
                <div className="alert alert-info shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{forecast.rain["3h"]} mm</span>
                    <span className="text-sm">Last 3 hours</span>
                  </div>
                </div>
              )}
            </div>
          </>
        )}

        {/* Snow Information */}
        {forecast.snow && (
          <>
            <div className="divider my-4">
              <span className="badge badge-accent badge-lg gap-2">
                <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" className="w-4 h-4 stroke-current">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 2v20M2 12h20M4.93 4.93l14.14 14.14M4.93 19.07L19.07 4.93" />
                </svg>
                Snow Data
              </span>
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {forecast.snow["1h"] && (
                <div className="alert alert-accent shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{forecast.snow["1h"]} mm</span>
                    <span className="text-sm">Last hour</span>
                  </div>
                </div>
              )}
              {forecast.snow["3h"] && (
                <div className="alert alert-accent shadow-lg">
                  <div className="flex flex-col items-center w-full">
                    <span className="text-2xl font-bold">{forecast.snow["3h"]} mm</span>
                    <span className="text-sm">Last 3 hours</span>
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
