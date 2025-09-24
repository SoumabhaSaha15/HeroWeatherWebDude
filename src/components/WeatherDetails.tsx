import React from "react";
import { WeatherDetailsSkeleton } from "./Skeletons";
import { useDataStore } from "../context/DataStoreContext";
import {
  Card,
  CardHeader,
  CardBody,
  Divider,
  Button,
  CardFooter,
} from "@heroui/react";
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
  return (
    <>
      <Card className="w-full rounded-2xl bg-white hover:bg-gray-400 hover:scale-95 backdrop-blur-md">
        <CardHeader className="flex justify-between items-center">
          <h2 className="text-xl font-medium">
            More on {weather.name} weather
          </h2>
        </CardHeader>
        <Divider />
        <CardBody>
          <div className="grid grid-cols-1 gap-4 text-2xl">
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-sky-200"
              >
                <FaMapPin
                  className="text-sky-500 hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>Lat: {weather.coord.lat}</span>
              <Divider orientation="vertical" className="mx-2 h-8" />
              <span>Lon: {weather.coord.lon}</span>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-teal-200"
              >
                <FaWind
                  className="text-teal-500 aspect-square hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>Wind: {weather.wind.speed} m/s</span>
              <Divider orientation="vertical" className="mx-2 h-8" />
              <span>Direction: {weather.wind.deg}°</span>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-indigo-200"
              >
                <FaEye
                  className="text-indigo-500 hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>Visibility: {weather.visibility / 1000} km</span>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-blue-100"
              >
                <FaWater
                  className="text-blue-400 hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>Humidity: {weather.main.humidity}%</span>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-purple-200"
              >
                <FaGauge
                  className="text-purple-500 hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>Pressure: {weather.main.pressure}mbar</span>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-pink-200"
              >
                <FaCloud
                  className="text-pink-500 hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>Clouds: {weather.clouds.all}%</span>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-teal-200"
              >
                <FaClock
                  className="text-teal-500 hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>
                Time zone:{" "}
                {Math.trunc(weather.timezone / 3600) +
                  ":" +
                  Math.trunc((weather.timezone % 3600) / 60)}{" "}
                GMT
              </span>
            </div>
            <Divider />
            <div className="flex items-center gap-2">
              <Button
                radius="full"
                isIconOnly
                disabled
                size="md"
                className="bg-yellow-100"
              >
                <FaSun
                  className="text-yellow-500 hover:scale-75"
                  size={"20px"}
                />
              </Button>
              <span>
                Sun rise:{" "}
                {new Date(weather.sys.sunrise * 1000).toLocaleTimeString(
                  "en-IN"
                )}
              </span>
              <Divider orientation="vertical" className="mx-2 h-8" />
              <span>
                Sun set:{" "}
                {new Date(weather.sys.sunset * 1000).toLocaleTimeString(
                  "en-IN"
                )}
              </span>
            </div>
          </div>
        </CardBody>
        <Divider />
        <CardFooter className="items-center justify-center">
          <h2 className="text-sm font-bold mt-2">powered by Open Weather</h2>
        </CardFooter>
      </Card>
    </>
  );
};
export default WeatherDetails;
