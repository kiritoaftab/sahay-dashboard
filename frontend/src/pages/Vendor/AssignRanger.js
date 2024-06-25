import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal";

const AssignRanger = () => {
  const [rangers, setRangers] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rangerId, setrangerId] = useState();
  const [vendorId, setvendorId] = useState();

  const { id } = useParams();

  console.log(id, rangerId, vendorId);
  const getAllRangers = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}ranger/getAllRanger?page=${currentPage}&pageSize=10`
      );
      console.log(response?.data);
      setRangers(response?.data?.rangerDoc);
      setCurrentPage(response?.data?.pagination?.page)
      await console.log(rangers);
    } catch (error) {
      console.error(error);
    }
  };

  const handleConfirm = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllRangers();
  }, [currentPage]);

  const closeModal = () => {
    setShowModal(false);
  };

  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
        <h1 className="text-xl font-medium">Assign Ranger</h1>
        <div className="relative border border-gray-300 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Customer name
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Service
                </th>
                <th scope="col" className="px-6 py-3">
                  Vendor Name -ID
                </th>
                <th scope="col" className="px-6 py-3">
                  Status
                </th>
                <th scope="col" className="px-6 py-3">
                  Assign
                </th>
              </tr>
            </thead>
            <tbody>
              {rangers &&
                rangers.map((booking) => (
                  <tr key={booking._id}>
                    <td className="px-6 py-3 text-lg text-black">{`${booking?.firstName} ${booking?.lastName}`}</td>
                    <td className="px-6 py-3 text-lg text-black">
                      {booking?.user?.phone}
                    </td>
                    <td className="px-6 py-3">
                      <button className="bg-purple-200 bg-opacity-14 text-black text-xs font-medium p-1.5 rounded-md">
                        {booking?.service?.name}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-lg text-black">
                      {`${booking?.vendor?.firstName}${booking?.vendor?.lastName} ${booking?.vendor?._id}`}
                    </td>
                    <td className="px-6 py-3 text-lg text-black">
                      {booking?.status}
                    </td>
                    <td className="px-9 py-3 text-lg text-black">
                      <button
                        className="text-indigo-700 text-sm font-normal p-1.5 rounded-md flex items-center"
                        onClick={() => {
                          setShowModal(true);
                          setvendorId(booking?.vendor?._id)
                          setrangerId(booking?._id)
                        }}>
                        Assign Ranger
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="ml-2 w-4 h-4">
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            d="M17.25 8.25 21 12m0 0-3.75 3.75M21 12H3"
                          />
                        </svg>
                      </button>
                    </td>
                  </tr>
                ))}
            </tbody>
          </table>
          {showModal && (
            <Modal
              isOpen={showModal}
              onClose={closeModal}
              onConfirm={handleConfirm}
              bookingId={id}
              rangerId={rangerId}
              vendorId={vendorId}
            />
          )}
        </div>
      </section>
    </>
  );
};

export default AssignRanger;
