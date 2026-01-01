// WeatherNotFound.tsx
import { WiCloud } from "react-icons/wi";
import { FaSearchLocation } from "react-icons/fa";

export const WeatherNotFound = () => (
  <div className="card bg-linear-to-br from-base-200 to-base-300 shadow-xl text-base-content h-dvh rounded-none" id="Weather">
    <div className="card-body flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <WiCloud className="w-32 h-32 text-base-content opacity-20" />
            <FaSearchLocation className="w-16 h-16 text-error absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-base-content">
          Weather Data Not Found
        </h2>

        <p className="text-lg text-base-content/70 mb-6">
          Unable to fetch weather information for the requested location. Please try again or search for a different location.
        </p>

        <div className="alert alert-error shadow-lg mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>No weather data available</span>
        </div>
      </div>
    </div>
  </div>
);

// ForecastNotFound.tsx
import { WiDayCloudyGusts } from "react-icons/wi";
import { FaCalendarXmark } from "react-icons/fa6";

export const ForecastNotFound = () => (
  <div className="card bg-linear-to-br from-base-200 to-base-300 shadow-xl text-base-content h-dvh rounded-none overflow-y-auto" id="Forecast">
    <div className="card-body flex items-center justify-center">
      <div className="text-center max-w-md">
        <div className="flex justify-center mb-6">
          <div className="relative">
            <WiDayCloudyGusts className="w-32 h-32 text-base-content opacity-20" />
            <FaCalendarXmark className="w-16 h-16 text-error absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2" />
          </div>
        </div>

        <h2 className="text-3xl font-bold mb-4 text-base-content">
          Forecast Data Not Found
        </h2>

        <p className="text-lg text-base-content/70 mb-6">
          Unable to retrieve forecast information for this location. The data may be temporarily unavailable.
        </p>

        <div className="alert alert-error shadow-lg mb-6">
          <svg xmlns="http://www.w3.org/2000/svg" className="stroke-current shrink-0 h-6 w-6" fill="none" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span>No forecast data available</span>
        </div>
      </div>
    </div>
  </div>
);