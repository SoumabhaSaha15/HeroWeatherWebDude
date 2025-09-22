import React from "react";
import { FaMapMarkerAlt, FaWind, FaEye, FaWater, FaClock, FaSun, } from "react-icons/fa";
import { FaGauge } from "react-icons/fa6";
import { Card, CardHeader, CardBody, Divider, Button } from "@heroui/react";
import { useDataStore } from "../context/DataStoreContext";

const WeatherDetails: React.FC = () => {
  const { weather } = useDataStore();
  if (weather === null) return (<></>);
  return (<>
    <Card className="w-full shadow-lg rounded-3xl bg-gray-900/30 hover:bg-gray-900/50 backdrop-blur-md">
      <CardHeader className="flex justify-between items-center">
        <h2 className="text-xl font-medium">More on {weather.name} weather</h2>
      </CardHeader>
      <Divider />
      <CardBody>
        <div className="grid grid-cols-1 gap-4 text-2xl">
          <div className="flex items-center gap-2">
            <Button radius="full" isIconOnly disabled size="md" className="bg-sky-200">
              <FaMapMarkerAlt className="text-sky-500" size={"20px"} />
            </Button>
            <span>Lat: {weather.coord.lat}</span>
            <Divider orientation="vertical" className="mx-2 h-8" />
            <span>Lon: {weather.coord.lon}</span>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <Button radius="full" isIconOnly disabled size="md" className="bg-teal-200">
              <FaWind className="text-teal-500 aspect-square" size={"20px"} />
            </Button>
            <span>Wind: {weather.wind.speed} m/s</span>
            <Divider orientation="vertical" className="mx-2 h-8" />
            <span>Direction: {weather.wind.deg}°</span>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <Button radius="full" isIconOnly disabled size="md" className="bg-indigo-200" >
              <FaEye className="text-indigo-500" size={"20px"} />
            </Button>
            <span>Visibility: {weather.visibility / 1000} km</span>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <Button radius="full" isIconOnly disabled size="md" className="bg-blue-100">
              <FaWater className="text-blue-400" size={"20px"} />
            </Button>
            <span>Humidity: {weather.main.humidity}%</span>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <Button radius="full" isIconOnly disabled size="md" className="bg-purple-200">
              <FaGauge className="text-purple-500" size={"20px"} />
            </Button>
            <span>Pressure: {weather.main.pressure} hPa</span>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <Button radius="full" isIconOnly disabled size="md" className="bg-teal-200">
              <FaClock className="text-teal-500" size={"20px"} />
            </Button>
            <span>Time zone: {Math.trunc(weather.timezone / 3600) + ":" + Math.trunc((weather.timezone % 3600) / 60)} GMT</span>
          </div>
          <Divider />
          <div className="flex items-center gap-2">
            <Button radius="full" isIconOnly disabled size="md" className="bg-yellow-100">
              <FaSun className="text-yellow-500" size={"20px"} />
            </Button>
            <span>Sun rise: {new Date((weather.sys.sunrise) * 1000).toLocaleTimeString('en-IN')}</span>
            <Divider orientation="vertical" className="mx-2 h-8" />
            <span>Sun set: {new Date((weather.sys.sunset) * 1000).toLocaleTimeString('en-IN')}</span>
          </div>
        </div>
      </CardBody>
    </Card>
  </>)
}
export default WeatherDetails;