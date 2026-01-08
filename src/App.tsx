import useRipple from "use-ripple-hook";
import { IoMdClose } from "react-icons/io";
import { FaSearchLocation } from "react-icons/fa";
import WeatherCity from "./components/weather/City";
import ForecastCity from "./components/forecast/City";
import WeatherCoords from "./components/weather/Coords";
import { useModal } from "./context/modal/ModalContext";
import { useCachedCities } from "./hooks/useCachedCities";
import ForecastCoords from "./components/forecast/Coords";
import { useEffect, useRef, useState, type FC, type JSX } from "react";
import useGeolocation from "./context/geolocation/GeolocationContext";

const App: FC = () => {
  const cachedCities = useCachedCities();
  const { geolocation } = useGeolocation();
  const [city, setCity] = useState<string | null>(null);
  const { openModal, modalRef, closeModal } = useModal();
  const [searchHistory, setSearchHistory] = useState<string[]>([]);
  const [rippleClose, eventClose] = useRipple<HTMLButtonElement>();
  const [rippleSearch, eventSearch] = useRipple<HTMLButtonElement>();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => setSearchHistory(cachedCities), [cachedCities.toSorted().toString()]);

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
        <div className="fab">
          <button
            className="btn btn-accent btn-circle btn-md focus:outline-none! focus:ring-0 focus:ring-accent"
            ref={rippleSearch}
            onPointerDown={eventSearch}
            onClick={() => openModal()}
          >
            <FaSearchLocation className="text-lg" />
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
                  ref={inputRef}
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
            <ul tabIndex={-1} className="dropdown-content menu bg-base-300 rounded-box z-1 w-full p-2 mt-2.5 shadow-sm">
              {searchHistory.map((item, index) => (
                <li key={index} onClick={() => {
                  console.log(inputRef.current?.value);
                  inputRef.current && inputRef.current.setAttribute('value', item);
                }}>
                  <a>{item}</a>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default App;