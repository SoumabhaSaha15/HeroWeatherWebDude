import React from "react";
import { WeatherDetailsSkeleton } from "./Skeletons";
import { useDataStore } from "../context/data/DataStoreContext";
import {
  FaMapPin,
  FaWind,
  FaEye,
  FaWater,
  FaClock,
  FaSun,
  FaCloud,
  FaGauge,
} from "react-icons/fa6";

const WeatherDetails: React.FC = () => {
  const { weather } = useDataStore();
  if (weather === null) return <WeatherDetailsSkeleton />;

  // Helper for the icon containers (formerly disabled Buttons)
  const IconContainer = ({ className, children }: { className: string, children: React.ReactNode }) => (
    <div className={`w-10 h-10 rounded-full flex items-center justify-center shrink-0 ${className}`}>
      {children}
    </div>
  );

  return (
    <div className="card w-full rounded-2xl bg-base-300 shadow-xl hover:bg-base-200 hover:scale-95 transition-transform duration-200 backdrop-blur-md">
      
      {/* Header */}
      <div className="flex justify-between items-center p-4 pb-0">
        <h2 className="card-title text-xl font-medium">
          More on {weather.name} weather
        </h2>
      </div>

      <div className="divider m-0"></div>

      {/* Body */}
      <div className="card-body py-4">
        <div className="grid grid-cols-1 gap-4 text-2xl">
          
          {/* Latitude / Longitude */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-sky-200">
              <FaMapPin className="text-sky-500 hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>Lat: {weather.coord.lat}</span>
            <div className="divider divider-horizontal mx-2 h-8 m-0"></div>
            <span>Lon: {weather.coord.lon}</span>
          </div>
          
          <div className="divider m-0"></div>

          {/* Wind */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-teal-200">
              <FaWind className="text-teal-500 aspect-square hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>Wind: {weather.wind.speed} m/s</span>
            <div className="divider divider-horizontal mx-2 h-8 m-0"></div>
            <span>Direction: {weather.wind.deg}°</span>
          </div>

          <div className="divider m-0"></div>

          {/* Visibility */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-indigo-200">
              <FaEye className="text-indigo-500 hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>Visibility: {weather.visibility / 1000} km</span>
          </div>

          <div className="divider m-0"></div>

          {/* Humidity */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-blue-100">
              <FaWater className="text-blue-400 hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>Humidity: {weather.main.humidity}%</span>
          </div>

          <div className="divider m-0"></div>

          {/* Pressure */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-purple-200">
              <FaGauge className="text-purple-500 hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>Pressure: {weather.main.pressure}mbar</span>
          </div>

          <div className="divider m-0"></div>

          {/* Clouds */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-pink-200">
              <FaCloud className="text-pink-500 hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>Clouds: {weather.clouds.all}%</span>
          </div>

          <div className="divider m-0"></div>

          {/* Timezone */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-teal-200">
              <FaClock className="text-teal-500 hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>
              Time zone:{" "}
              {Math.trunc(weather.timezone / 3600) +
                ":" +
                Math.trunc((weather.timezone % 3600) / 60)}{" "}
              GMT
            </span>
          </div>

          <div className="divider m-0"></div>

          {/* Sunrise / Sunset */}
          <div className="flex items-center gap-2">
            <IconContainer className="bg-yellow-100">
              <FaSun className="text-yellow-500 hover:scale-75 transition-transform" size={"20px"} />
            </IconContainer>
            <span>
              Sun rise:{" "}
              {new Date(weather.sys.sunrise * 1000).toLocaleTimeString("en-IN")}
            </span>
            <div className="divider divider-horizontal mx-2 h-8 m-0"></div>
            <span>
              Sun set:{" "}
              {new Date(weather.sys.sunset * 1000).toLocaleTimeString("en-IN")}
            </span>
          </div>
        </div>
      </div>

      <div className="divider m-0"></div>

      {/* Footer */}
      <div className="flex items-center justify-center p-4 pt-0">
        <h2 className="text-sm font-bold mt-2">powered by Open Weather</h2>
      </div>
    </div>
  );
};
export default WeatherDetails;