import { IoMdClose } from "react-icons/io";
import { FaSearch } from "react-icons/fa";
import { type FC } from "react";
import { useModal } from "./context/Modal/ModalContext";
import useRipple from "use-ripple-hook";
const App: FC = () => {
  const [ripple, event] = useRipple();
  const { openModal, modalRef, closeModal } = useModal();
  return (
    <>
      <div className="min-h-dvh bg-transparent overflow-y-auto">
        {/* app here */}

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
      {/* Open the modal using document.getElementById('ID').showModal() method */}
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
            <div>
              <label className="floating-label" htmlFor="NameInput">
                <span
                  children="Search Place"
                  className="text-sm ml-2"
                />
                <input
                  type="text"
                  className="validator input input-bordered w-full focus:outline-none focus:ring-0 focus:ring-accent rounded-full"
                  id="NameInput"
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

export default App