import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import { useParams } from "react-router-dom";
import Modal from "../../components/Modal";
import { FaLocationDot, FaLocationPin } from "react-icons/fa6";

const AssignRanger = () => {
  const [rangers, setRangers] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [showModal, setShowModal] = useState(false);
  const [rangerId, setrangerId] = useState();
  const [vendorId, setvendorId] = useState();
  const [bookingDoc, setBookingDoc] = useState(null);
  const [vendorDoc, setVendorDoc] = useState(null);
 

  const [bookingId, setbookingId]=useState(null)

  const { id } = useParams();

  console.log(id, rangerId, vendorId);




  const handleConfirm = async () => {
    try {
    } catch (error) {
      console.error(error);
    }
  };

  const closeModal = () => {
    setShowModal(false);
  };

  const fetchBookingById = async (bookingId, vendorId) => {
    try {
      const res = await axios.get(`${BASE_URL}booking/specificId`, {
        params: {
          type: "BOOKING",
          id: bookingId,
        },
      });
      console.log(res.data);
      setBookingDoc(res.data.bookingDocs);
      fetchRangersByVendorAndService(
        vendorId,
        res.data.bookingDocs?.service?._id
      );
    } catch (error) {
      console.log(error);
    }
  };

  const fetchRangersByVendorAndService = async (vendorId, serviceId) => {

    console.log(vendorId);
    console.log(serviceId);
    try {
      const res = await axios.get(
        `${BASE_URL}ranger/getRangersByVendorIdAndServiceId`,
        {
          params: {
            vendorId,
            serviceId,
          },
        }
      );
      console.log("vendor", res.data);
      setRangers(res.data.rangers);
    } catch (error) {
      console.log(error);
      alert("No rangers found for the service");
    }
  };

  const fetchVendorByUser = async () => {
    try {
      const userId = sessionStorage.getItem("auth");
      const res = await axios.get(`${BASE_URL}vendor/getByUserId/${userId}`);
      console.log(res.data);
      setVendorDoc(res.data.vendorDoc);
    
      fetchBookingById(id, res.data.vendorDoc._id);

      setbookingId(res.data.vendorDoc._id)



    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    fetchVendorByUser();
  }, []);



  const addbooking=async()=>{
    try {
      const res=await axios
    } catch (error) {
      
    }
  }




  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
        <h1 className="text-xl font-medium">Assign Ranger</h1>
        <div className="bg-white p-6 rounded-lg shadow-md max-w-md  mt-6">
          <p className="text-lg font-semibold mb-2">
            Customer name:{" "}
            <span className="font-normal">
              {bookingDoc?.customer?.firstName}
            </span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Address:{" "}
            <span className="font-normal">{bookingDoc?.address?.address}</span>
          </p>
          <p className="text-lg font-semibold mb-2">
            Address Type:{" "}
            <span className="font-normal">
              {bookingDoc?.address?.addressType}
            </span>
          </p>
          <a
            className="inline-flex items-center text-blue-500 hover:text-blue-700 mb-2"
            target="_blank"
            rel="noopener noreferrer"
            href={`https://www.google.com/maps?q=${bookingDoc?.address?.latitude},${bookingDoc?.address?.longitude}`}
          >
            <FaLocationDot className="mr-1" /> View on Map
          </a>
          <p className="text-lg font-semibold mb-2">
            Service:{" "}
            <span className="font-normal">{bookingDoc?.service?.name}</span>
          </p>
        </div>
        <div className="relative border border-gray-300 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100 ">
              <tr>
                <th scope="col" className="px-6 py-3">
                  Ranger name
                </th>
                <th scope="col" className="px-6 py-3">
                  Ranger Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Service
                </th>
                <th scope="col" className="px-6 py-3">
                  Vendor Name 
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
                rangers.map((ranger) => (
                  <tr key={ranger._id}>
                    <td className="px-6 py-3 text-lg text-black">{`${ranger?.firstName} ${ranger?.lastName}`}</td>
                    <td className="px-6 py-3 text-lg text-black">
                      {ranger?.user?.phone}
                    </td>
                    <td className="px-6 py-3">
                      <button className="bg-purple-200 bg-opacity-14 text-black text-xs font-medium p-1.5 rounded-md">
                        {ranger?.service?.name}
                      </button>
                    </td>
                    <td className="px-6 py-3 text-lg text-black">
                      {`${ranger?.vendor?.firstName}${ranger?.vendor?.lastName} `}
                    </td>
                    <td className="px-6 py-3 text-lg text-black">
                      {ranger?.status}
                    </td>
                    <td className="px-9 py-3 text-lg text-black">
                      <button
                        className="text-indigo-700 text-sm font-normal p-1.5 rounded-md flex items-center"
                        onClick={() => {
                          setShowModal(true);
                          setvendorId(ranger?.vendor?._id);
                          setrangerId(ranger?._id);
                        }}
                      >
                        Assign Ranger
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          strokeWidth={1.5}
                          stroke="currentColor"
                          className="ml-2 w-4 h-4"
                        >
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
