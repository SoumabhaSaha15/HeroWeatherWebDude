import useRipple from "use-ripple-hook";
import { IoMdClose } from "react-icons/io";
import { useState, type FC, type JSX } from "react";
import { useModal } from "./context/modal/ModalContext";
import WeatherCity from "./new-components/weather/city";
import { FaSearch, FaSearchLocation } from "react-icons/fa";
import WeatherCoords from "./new-components/weather/Coords";
import useGeolocation from "./context/geo-location/GeolocationContext";

const NewApp: FC = () => {
  const [rippleClose, eventClose] = useRipple<HTMLButtonElement>();
  const [rippleFloat, eventFloat] = useRipple<HTMLButtonElement>({ color: "var(--color-primary-content)" });
  const { openModal, modalRef, closeModal } = useModal();
  const { geolocation } = useGeolocation();
  const [city, setCity] = useState<string | null>(null);

  const renderContent = (): JSX.Element => {
    if (city === null && geolocation === null)
      return (<WeatherCity q={'kolkata'} />);
    else if (city === null && geolocation !== null)
      return (<WeatherCoords {...geolocation} />);
    else return (<WeatherCity q={city as string} />)
  }

  return (
    <>
      <div className="min-h-dvh bg-transparent overflow-y-auto">
        {renderContent()}
      </div>
      <div className="fab">
        <button
          className="btn btn-lg btn-circle btn-primary focus:outline-none"
          ref={rippleFloat}
          onPointerDown={eventFloat}
          onClick={() => openModal()}
        >
          <FaSearch className="text-xl" />
        </button>
      </div>
      <dialog ref={modalRef} className="modal">
        <div className="modal-box">
          <h3 className="font-bold text-lg flex items-center gap-2 w-full justify-between px-2">
            Search Wheather
            <button
              className="btn btn-md btn-circle btn-error"
              ref={rippleClose}
              onPointerDown={eventClose}
              onClick={() => closeModal()}
            >
              <IoMdClose className="text-2xl font-black" />
            </button>
          </h3>

          <div className="py-4" >
            <div className="flex justify-center">
              <label
                className="input rounded-full w-[calc(100%-8px)] px-2 focus-within:outline-none! focus-within:ring-0 focus-within:ring-accent"
                htmlFor="NameInput"
              >
                <FaSearchLocation className="text-lg" />
                <input
                  type="search"
                  id="NameInput"
                  onKeyDown={({ currentTarget, key }) => {
                    if (key === "Enter") {
                      setCity(currentTarget.value || '');
                      closeModal();
                    }
                  }}
                  placeholder="Search Place"
                  required
                />
              </label>
            </div>
          </div>
        </div>
      </dialog>
    </>
  )
}

export default NewApp

