import React from 'react';
import axios from 'axios';
import { BASE_URL } from '../constants';
import { useNavigate } from 'react-router-dom';

const Modal = ({ isOpen, onClose, onConfirm, bookingId, rangerId, vendorId }) => {

    const navigate =  useNavigate()
  if (!isOpen) return null;

  const handleConfirm = async () => {
    try {
      await axios.post(`${BASE_URL}booking/assignRanger`, {
        bookingId,
        rangerId,
        vendorId,
      });
      onConfirm();
      alert("Ranger assigned successfully")
      navigate(`/vendor/bookings`)
    } catch (error) {
      console.error('Error assigning ranger:', error);
    } finally {
      onClose();
    }
  };

  return (
    <div className="fixed top-0 left-0 right-0 bottom-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="bg-white p-4 rounded-lg shadow-lg">
        <h2 className="text-lg font-semibold mb-4">Confirm Assignment</h2>
        <p>Are you sure you want to assign this ranger?</p>
        <div className="mt-4 flex justify-end space-x-2">
          <button
            className="px-4 py-2 bg-gray-300 rounded-md hover:bg-gray-400"
            onClick={onClose}
          >
            Cancel
          </button>
          <button
            className="px-4 py-2 bg-indigo-700 text-white rounded-md hover:bg-indigo-800"
            onClick={handleConfirm}
          >
            Confirm
          </button>
        </div>
      </div>
    </div>
  );
};

export default Modal;
