import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { BASE_URL } from "../../constants";
import { useNavigate, useParams } from "react-router-dom";

const BookingDetails = () => {
  const [bookingDoc, setbookingDoc] = useState({});

  const { id } = useParams();
  const navigate = useNavigate();

  const getBookingDetailsById = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}booking/specificId?type=BOOKING&id=${id}`
      );
      console.log(response?.data);
      setbookingDoc(response?.data?.bookingDocs);

      if (bookingDoc === null) {
        console.log("No data available");
      } else {
        console.log(bookingDoc);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getBookingDetailsById();
  }, [id]);

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

  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
        <GoArrowLeft
          className="text-xl"
          onClick={() => navigate(`/vendor/bookings`)}
        />

        <h1 className="text-2xl font-medium px-10">Booking Details</h1>
        <div className="flex flex-wrap justify-between m-8">
          <div className="max-w-sm w-full lg:max-w-full lg:flex m-4">
            <div className="lg:border-l-0 lg:border-t lg:border-gray-400 bg-white lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
              <div className="mb-8 flex items-center">
                <img
                  className="w-10 h-10 rounded-full mr-4"
                  src={bookingDoc?.ranger?.user?.profilePic}
                  alt="Avatar of Jonathan Reinink"
                />
                <div>
                  <div className="text-lg font-medium">
                    {bookingDoc?.ranger?.user?.userName}
                  </div>
                  <div className="text-sm text-gray-600">
                    {bookingDoc?.ranger?.user?.role}
                  </div>
                </div>
              </div>

              <div className="flex flex-wrap items-center gap-8 p-4">
                <div className="flex flex-col px-5">
                  <h5 className="text-sm font-semibold text-gray-700">
                    Service
                  </h5>
                  <p className="text-base text-gray-900">
                    {bookingDoc?.service?.name}
                  </p>
                </div>

                <div className="flex flex-col px-20">
                  <h5 className="text-sm font-semibold text-gray-700">
                    Booking Date
                  </h5>
                  <p className="text-base text-gray-900">
                    {new Date(bookingDoc?.bookingDateTime).toLocaleDateString(
                      "en-US",
                      {
                        year: "numeric",
                        month: "short",
                        day: "numeric",
                      }
                    )}
                  </p>
                </div>

                <div className="flex flex-col px-20">
                  <h5 className="text-sm font-semibold text-gray-700">
                    Booking Time
                  </h5>
                  <p className="text-base text-gray-900">
                    {new Date(bookingDoc?.bookingDateTime).toLocaleTimeString(
                      "en-US",
                      {
                        hour: "numeric",
                        minute: "numeric",
                        second: "numeric",
                        hour12: true,
                      }
                    )}
                  </p>
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-8 p-4 ">
                <div className="flex flex-col px-5">
                  <p className="text-base text-gray-900">
                    Start time :
                    <span className="text-sm">
                      {new Date(bookingDoc?.startTime).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </p>
                  <p className="text-base text-gray-900">
                    End time :
                    <span className="text-sm">
                      {new Date(bookingDoc?.endTime).toLocaleDateString(
                        "en-US",
                        {
                          year: "numeric",
                          month: "short",
                          day: "numeric",
                        }
                      )}
                    </span>
                  </p>
                </div>

                <div className="flex flex-col">
                  <p className="text-base text-gray-900">
                    Start OTP:
                    <span className="text-sm">{bookingDoc?.startOtp}</span>
                  </p>
                  <p className="text-base text-gray-900">
                    End OTP:
                    <span className="text-sm">{bookingDoc?.endOtp}</span>
                  </p>
                </div>

                <div className="flex flex-col px-32">
                  <p className="text-base text-gray-900">Duration</p>
                  <p className="text-base text-gray-900">
                    {getTimeDifference(
                      bookingDoc?.startTime,
                      bookingDoc?.endTime
                    )}
                    Hrs
                  </p>
                </div>
              </div>
            </div>
          </div>

          <div className="max-w-sm w-full lg:max-w-full lg:flex m-4">
            <div className="flex flex-col items-center bg-white border border-gray-200 rounded-lg shadow md:flex-row md:max-w-xl hover:bg-gray-100 ">
              <img
                className="object-cover w-full rounded-t-lg h-96 md:h-auto md:w-48 md:rounded-none md:rounded-s-lg"
                src={bookingDoc?.ranger?.user?.profilePic}
                alt=""
              />
              <div className="flex flex-col justify-between p-4 leading-normal">
                <p className="mb-3 font-normal text-gray-700 ">
                  {bookingDoc?.customer?.user?.userName}
                  <span className="text-sm text-gray-50">
                    {bookingDoc?.customer?.user?.role}
                  </span>
                </p>
                <p className="mb-3 font-normal text-gray-700 ">
                  Location : {bookingDoc?.address?.address}
                </p>
                <p className="mb-3 font-normal text-gray-700 ">
                  Number : + 91 {bookingDoc?.customer?.user?.phone}
                </p>
              </div>
            </div>
          </div>
        </div>

        <h2 className="text-2xl font-medium px-10">Payment Details</h2>
        <div className="max-w-sm w-full lg:max-w-full lg:flex m-8">
          <div className="lg:border-l-0 lg:border-t lg:border-gray-400 bg-white lg:rounded-b-none lg:rounded-r p-4 flex flex-col justify-between leading-normal">
            <div className="flex flex-wrap items-center gap-8 p-4">
              <div className="flex flex-col px-5">
                <h3 className="text-xl font-semibold text-gray-700">
                  Service Name
                </h3>
                <p className="text-base text-gray-900">
                  <span className="text-xl block">
                    {bookingDoc?.service?.name}
                    <span className="text-md pl-4 sm:pl-80">
                      ₹{bookingDoc?.service?.price}
                    </span>
                  </span>
                  <span className="text-xl block mt-4 border border-gray-600 p-2 rounded-md">
                    Total Price
                    <span className="text-md pl-4 sm:pl-80">
                      ₹{bookingDoc?.totalPrice}
                    </span>
                  </span>
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingDetails;
