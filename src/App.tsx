import useRipple from "use-ripple-hook";
import { IoMdClose } from "react-icons/io";
import { FaSearchLocation } from "react-icons/fa";
import WeatherCity from "./components/weather/City";
import ForecastCity from "./components/forecast/City";
import WeatherCoords from "./components/weather/Coords";
import { useModal } from "./context/modal/ModalContext";
import { useCachedCities } from "./hooks/useCachedCities";
import ForecastCoords from "./components/forecast/Coords";
import { WiDayStormShowers, WiTime3 } from "react-icons/wi";
import { useEffect, useState, type FC, type JSX } from "react";
import useGeolocation from "./context/geolocation/GeolocationContext";

const App: FC = () => {
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [rippleClose, eventClose] = useRipple<HTMLButtonElement>();
  const [rippleSearch, eventSearch] = useRipple<HTMLButtonElement>();
  const [rippleWeather, eventWeather] = useRipple<HTMLButtonElement>();
  const [rippleForecast, eventForecast] = useRipple<HTMLButtonElement>();
  const { openModal, modalRef, closeModal } = useModal();
  const cachedCities = useCachedCities();
  const [city, setCity] = useState<string | null>(null);
  const { geolocation } = useGeolocation();
  useEffect(() => setSearchHistory(cachedCities), [cachedCities]);

  const renderContent = (): JSX.Element => {
    if (city === null && geolocation === null)
      return (
        <>
          <WeatherCity q={"kolkata"} />
          <ForecastCity q={"kolkata"} />
        </>
      );
    else if (city === null && geolocation !== null)
      return (
        <>
          <WeatherCoords {...geolocation} />
          <ForecastCoords {...geolocation} />
        </>
      );
    else return (
      <>
        <WeatherCity q={city as string} />
        <ForecastCity q={city as string} />
      </>
    );
  }

  return (
    <>
      <div className="min-h-dvh bg-transparent overflow-y-auto">
        {renderContent()}

        {/*dock*/}
        <div className="dock dock-md">
          <button id="WeatherButton"
            ref={rippleWeather}
            onPointerDown={eventWeather}
            className="dock-active"
            onClick={({ currentTarget }) => {
              currentTarget.classList.add('dock-active');
              document.getElementById('ForecastButton')?.classList.remove('dock-active');
              document.getElementById("Weather")?.classList.remove('hidden');
              document.getElementById("Forecast")?.classList.add('hidden');
            }}
          >
            <WiDayStormShowers />
            <span className="dock-label">Weather</span>
          </button>

          <button
            className="btn btn-accent btn-circle btn-md focus:outline-none! focus:ring-0 focus:ring-accent"
            ref={rippleSearch}
            onPointerDown={eventSearch}
            onClick={() => openModal()}
          >
            <FaSearchLocation className="text-lg" />
          </button>

          <button
            id="ForecastButton"
            ref={rippleForecast}
            onPointerDown={eventForecast}
            onClick={({ currentTarget }) => {
              currentTarget.classList.add('dock-active');
              document.getElementById('WeatherButton')?.classList.remove('dock-active');
              document.getElementById("Weather")?.classList.add('hidden');
              document.getElementById("Forecast")?.classList.remove('hidden');
            }}
          >
            <WiTime3 />
            <span className="dock-label">Forecast</span>
          </button>
        </div>
      </div>

      <dialog ref={modalRef} className="modal">
        <div className="modal-box h-80">
          <h3 className="font-bold text-lg flex items-center gap-2 w-full justify-between px-2">
            Search Wheather
            <button
              className="btn btn-md btn-circle btn-error focus:outline-none! focus:ring-0 focus:ring-accent"
              id="ModalClose"
              ref={rippleClose}
              onPointerDown={eventClose}
              onClick={() => closeModal()}
            >
              <IoMdClose className="text-2xl font-black" />
            </button>
          </h3>

          <div className="py-4 dropdown dropdown-center w-full" >
            <div className="flex justify-center">
              <label
                className="input rounded-full w-[calc(100%-8px)] px-2 focus-within:outline-none! focus-within:ring-0 focus-within:ring-accent"
                htmlFor="NameInput"
                tabIndex={0}
              >
                <FaSearchLocation className="text-lg" />
                <input
                  type="search"
                  id="NameInput"
                  onKeyDown={(e) => {
                    if (e.key === "Enter") {
                      e.preventDefault();
                      setCity(e.currentTarget.value || '');
                      document.getElementById("WeatherButton")?.click();
                      closeModal();
                      e.currentTarget.blur();
                    }
                  }}
                  placeholder="Search Place"
                  required
                />
              </label>
            </div>
            <ul tabIndex={-1} className="dropdown-content menu bg-base-100 rounded-box z-1 w-full p-2 shadow-sm">
              {searchHistory.map((item, index) => (<li key={index} onClick={() => {
                document.querySelector("input#NameInput")?.setAttribute('value', item);
              }}><a>{item}</a></li>))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default App;