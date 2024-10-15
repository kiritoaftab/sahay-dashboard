import React from "react";
import axios from "axios";
import { BASE_URL } from "../constants";
import { useNavigate } from "react-router-dom";
import confirm from "../constants/images/confirm.png";

const Modal = ({
  isOpen,
  onClose,
  onConfirm,
  bookingId,
  rangerId,
  vendorId,
}) => {
  const navigate = useNavigate();
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await axios.post(`${BASE_URL}booking/assignRanger`, {
        bookingId,
        rangerId,
        vendorId,
      });
      onConfirm();
      alert("Ranger assigned successfully");
      navigate(`/vendor/bookings`);
    } catch (error) {
      console.error("Error assigning ranger:", error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50 ">
      <div className="bg-white p-4 rounded-lg shadow-lg w-80">
        <div className="flex justify-center items-center">
          <img src={confirm} alt="Confirm Assignment" className="mx-auto" />
        </div>

        <h2 className="font-semibold">
          {" "}
          You are assigning the ranger for plumbering, are you sure?
        </h2>
        <div className="mt-4 flex flex-col items-center justify-center space-y-2">
          <div>
            <button
              className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800 w-52"
              onClick={handleConfirm}
            >
              Confirm
            </button>
          </div>

          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400 w-52"
            onClick={onClose}
          >
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
