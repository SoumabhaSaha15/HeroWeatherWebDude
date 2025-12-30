import { z } from "zod";
import { useState, type FC } from "react";
import { placeSchema } from "./validators/query";
import useRipple from "use-ripple-hook";
import { IoMdClose } from "react-icons/io";
import { useModal } from "./context/modal/ModalContext";
import { useWeatherByCity, useWeatherByCoords } from "./hooks/weatherQuery";
import { FaSearch, FaSearchLocation } from "react-icons/fa";
import useGeolocation, { type GeolocationType } from "./context/geo-location/GeolocationContext";

const WrapperCoords: FC<Exclude<GeolocationType, null>> = (coords) => {
  const { isLoading, data, error } = useWeatherByCoords(coords);
  return (
    <>
      {isLoading ? (<>loading</>) : (!error) ? (JSON.stringify(data)) : (error.message)}
    </>
  )
}

const WrapperCity: FC<z.infer<typeof placeSchema>> = ({ q }) => {
  const { isLoading, data, error } = useWeatherByCity(q);
  return (
    <>
      {isLoading ? (<>loading</>) : (!error) ? (JSON.stringify(data)) : (error.message)}
    </>
  )
}

const NewApp: FC = () => {
  const [ripple, event] = useRipple();
  const { openModal, modalRef, closeModal } = useModal();
  const { geolocation } = useGeolocation();
  const [city, setCity] = useState<string>("Kolkata");

  return (
    <>
      <div className="min-h-dvh bg-transparent overflow-y-auto">
        {geolocation ? (<WrapperCoords {...geolocation} />) : <WrapperCity q={city} />}
      </div>
      <div className="fab">
        <button
          className="btn btn-lg btn-circle btn-accent"
          ref={ripple}
          onPointerDown={event}
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
              ref={ripple}
              onPointerDown={event}
              onClick={() => closeModal()}
            >
              <IoMdClose className="text-2xl font-black" />
            </button>
          </h3>

          <div className="py-4">
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
                    if (key === "Enter") setCity(currentTarget.value || '');
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

