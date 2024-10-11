import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";


const VendorBooking = () => {
  const [status, setStatus] = useState("INITIATED");
  const [activeTab, setActiveTab] = useState("INITIATED");
  const [bookingDoc, setBookingDoc] = useState([]);
  const [initiatedBookings, setInitiatedBookings] = useState([]);
  const [completedBookings, setCompletedBookings] = useState([]);
  const [vendorDoc, setVendorDoc] = useState(null);

  const navigate = useNavigate();

  const getBookingsByStatus = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}booking/getBookingByStatus/${status}`
      );
      console.log(res?.data);
      setBookingDoc(res?.data?.bookingDoc);
    } catch (error) {
      console.error(error);
    }
  };

  // useEffect(() => {
  //   getBookingsByStatus(status);
  //   console.log(bookingDoc);
  // }, [status]);


  const handleStatusChange = (newStatus) => {
    setStatus(newStatus);
    setActiveTab(newStatus); // Update active tab when clicked
    if (newStatus === "INITIATED" || newStatus === "COMPLETED") {
      fetchBookingsByVendor(vendorDoc?._id, newStatus);
    } else {
      fetchOngoingBookingsByVendor(vendorDoc?._id);
    }
  };

  const getTimeDifference = (start, end) => {
    const startTime = new Date(start);
    const endTime = new Date(end);
    const diffMs = endTime - startTime;
    const diffSecs = Math.floor(diffMs / 1000);
    const hours = Math.floor(diffSecs / 3600);
    const minutes = Math.floor((diffSecs % 3600) / 60);
    const seconds = diffSecs % 60;
    const formattedDiff = `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
    return formattedDiff;
  };

  const fetchOngoingBookingsByVendor = async (vendorId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}booking/getBookingByOnGoingStatusAndVendor`,
        {
          params: {
            vendorId: vendorId,
          },
        }
      );
      console.log(res.data);
      setBookingDoc(res.data.bookingDocs);
    } catch (error) {
      console.log(error);
      alert("No Ongoing Bookings");
    }
  };
  const fetchBookingsByVendor = async (vendorId, status) => {
    try {
      console.log(vendorId);
      const res = await axios.get(
        `${BASE_URL}booking/getBookingByVendorAndStatus`,
        {
          params: {
            status: status,
            vendorId: vendorId,
          },
        }
      );
      console.log(res.data);
      if (status == "INITIATED") {
        setInitiatedBookings(res.data.bookingDocs);
      }
      if (status == "COMPLETED") {
        setCompletedBookings(res.data.bookingDocs);
      }
    } catch (error) {
      console.log(error);
      alert(`No ${status} Bookings found`);
    }
  };

  const fetchVendorByUser = async () => {
    try {
      const userId = sessionStorage.getItem("auth");
      const res = await axios.get(`${BASE_URL}vendor/getByUserId/${userId}`);
      console.log(res.data);
      setVendorDoc(res.data.vendorDoc);
      fetchBookingsByVendor(res.data.vendorDoc._id, "INITIATED");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendorByUser();
  }, []);



  const StyledTab = ({ isActive, children, onClick }) => (
    <button
      onClick={onClick}
      className={`${
        isActive
          ? "bg-white text-[#5032A0]"
          : "bg-transparent text-[#A6A6A6]"
      } hover:bg-white hover:text-[#5032A0]
      rounded-t-lg text-center normal-case m-0 p-2 font-poppins transition-colors duration-300`}
    >
      {children}
    </button>
  );
  


  return (
    <>
      <section className="w-screen md:w-full bg-background flex flex-col p-5">
        <h1 className="text-2xl font-medium">All Bookings</h1>

        <div className="flex flex-wrap space-x-4 p-4">
          <StyledTab
            isActive={activeTab === "INITIATED"} 
            onClick={() => handleStatusChange("INITIATED")}
          >
            Initiated ({initiatedBookings.length})
          </StyledTab>

          <StyledTab
            isActive={activeTab === "COMPLETED"}
            onClick={() => handleStatusChange("COMPLETED")}
          >
            Completed ({completedBookings.length})
          </StyledTab>

          <StyledTab
            isActive={
              activeTab === "BOOKING_STARTED" || activeTab === "ONGOING"
            } 
            onClick={() => handleStatusChange("BOOKING_STARTED")}
          >
            On-going ({bookingDoc.length})
          </StyledTab>
        </div>

   
   
        <div className="w-full bg-white p-4 overflow-x-auto">
          <div className="relative border border-gray-300 overflow-x-auto shadow-md sm:rounded-lg">
            {status === "INITIATED" && (
              <div>
                <h2 className="ml-5 mt-3">Initiated Bookings</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-3">
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
                        Booking Date-Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Location
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Assign
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {initiatedBookings &&
                      initiatedBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-3 text-lg text-black">{`${booking?.customer?.firstName} ${booking?.customer?.lastName}`}</td>
                          <td className="px-6 py-3 text-lg text-black">
                            {booking?.customer?.user?.phone}
                          </td>
                          <td className="px-6 py-3">
                            <button className="bg-purple-200 bg-opacity-14 text-black text-xs font-medium p-1.5 rounded-md">
                              {booking?.service?.name}
                            </button>
                          </td>
                          <td className="px-6 py-3 text-lg text-black">
                            {new Date(
                              new Date(booking?.bookingDateTime).getTime() -
                                5.5 * 60 * 60 * 1000
                            ).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: true,
                            })}
                          </td>

                          <td className="px-6 py-3 text-lg text-black">
                            {booking?.address?.address}
                          </td>
                          <td className="px-9 py-3 text-lg text-black">
                            <button
                              className="text-indigo-700 text-sm font-normal p-1.5 rounded-md flex items-center"
                              onClick={() => {
                                navigate(
                                  `/vendor/bookings/assignRanger/${booking._id}`
                                );
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
              </div>
            )}

            {status === "COMPLETED" && (
              <div>
                <h2 className="ml-5 mt-3">Completed Bookings</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-3">
                  <thead className="text-xs text-gray-700 uppercase bg-slate-100 ">
                    <tr>
                      <th scope="col" className="px-6 py-3">
                        Customer Name
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Book Date-Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Start-End Time
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Start-End OTP
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Duration
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Item
                      </th>
                      <th scope="col" className="px-6 py-3">
                        Total Price
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {completedBookings &&
                      completedBookings.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-3 text-black text-lg">{`${booking?.customer?.firstName} ${booking?.customer?.lastName}`}</td>
                          <td className="px-6 py-3 text-black text-lg">
                            <button
                              className="bg-[rgba(255,176,21,0.24)] text-black text-xs font-medium p-1.5 rounded-md"
                              onClick={() => {
                                navigate(
                                  `/vendor/bookingDetails/${booking._id}`
                                );
                              }}
                            >
                              {booking?.service?.name}
                            </button>
                          </td>
                          <td className="px-6 py-3 text-lg text-black">
                            {new Date(
                              new Date(booking?.bookingDateTime).getTime() -
                                5.5 * 60 * 60 * 1000
                            ).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: true,
                            })}
                          </td>

                          <td className="px-6 py-3 text-black text-lg">
                            {new Date(booking?.startTime).toLocaleTimeString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true,
                              }
                            )}
                            -
                            {new Date(booking?.endTime).toLocaleTimeString(
                              "en-IN",
                              {
                                timeZone: "Asia/Kolkata",
                                hour: "numeric",
                                minute: "numeric",
                                second: "numeric",
                                hour12: true,
                              }
                            )}
                          </td>
                          <td className="px-6 py-3 text-black text-lg">{`${booking?.startOtp} - ${booking?.endOtp}`}</td>
                          <td className="px-6 py-3 text-black text-lg">
                            {getTimeDifference(
                              booking?.startTime,
                              booking?.endTime
                            )}
                            Hrs
                          </td>
                          <td className="px-6 py-3 text-black text-lg">
                            ₹{booking?.service?.price}
                          </td>
                          <td className="px-6 py-3 text-black text-lg ">
                            ₹{booking?.totalPrice}
                            <button
                              className="text-indigo-700"
                              onClick={() => {
                                navigate(
                                  `/vendor/bookingDetails/${booking._id}`
                                );
                              }}
                            >
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
              </div>
            )}

            {status === "BOOKING_STARTED" && (
              <div>
                <h2 className="ml-5 mt-3">On-going</h2>
                <table className="w-full text-sm text-left rtl:text-right text-gray-500 mt-3">
                  <thead className="text-xs text-gray-700 uppercase bg-slate-100 ">
                    <tr>
                      <th scope="col" className="px-3 py-0 md:px-6 md:py-3 sm:px-3 sm:py-3">
                        Customer Name
                      </th>
                      <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                        Service
                      </th>
                      <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                        Booking Date-Time
                      </th>
                      <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                        Customer Phone
                      </th>
                      <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                        Ranger
                      </th>
                      <th scope="col" className="px-6 py-3 md:px-6 md:py-3">
                        Location
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {bookingDoc &&
                      bookingDoc.map((booking) => (
                        <tr key={booking._id}>
                          <td className="px-6 py-3 text-black text-lg">{`${booking?.customer?.firstName} ${booking?.customer?.lastName}`}</td>
                          <td className="px-6 py-3 text-black text-lg">
                            <button className="bg-[rgba(255,176,21,0.24)] text-black text-xs font-medium p-1.5 rounded-md">
                              {booking?.service?.name}
                            </button>
                          </td>
                          <td className="px-6 py-3 text-lg text-black">
                            {new Date(
                              new Date(booking?.bookingDateTime).getTime() -
                                5.5 * 60 * 60 * 1000
                            ).toLocaleDateString("en-IN", {
                              year: "numeric",
                              month: "short",
                              day: "numeric",
                              hour: "numeric",
                              minute: "numeric",
                              second: "numeric",
                              hour12: true,
                            })}
                          </td>
                          <td className="px-6 py-3 text-black text-lg">
                            {booking?.customer?.user?.phone}
                          </td>
                          <td className="px-6 py-3 text-black text-lg">{`${booking?.ranger?.firstName} ${booking?.ranger?.lastName}`}</td>
                          <td className="px-6 py-3 text-black text-lg">
                            {booking?.address?.address}
                          </td>
                        </tr>
                      ))}
                  </tbody>
                </table>
              </div>
            )}
          </div>
        </div>



      </section>
    </>
      );
    };


export default VendorBooking;
