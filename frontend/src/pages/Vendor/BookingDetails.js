import axios from "axios";
import React, { useState, useEffect } from "react";
import { GoArrowLeft } from "react-icons/go";
import { BASE_URL } from "../../constants";
import { AiFillStar, AiOutlineStar } from "react-icons/ai";
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
      console.log("booking details", response?.data);
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

  const renderStars = (rating) => {
    const roundedRating = Math.round(rating);
    return (
      <div className="flex items-center">
        {[...Array(5)].map((_, index) =>
          index < roundedRating ? (
            <AiFillStar key={index} className="text-yellow-500" />
          ) : (
            <AiOutlineStar key={index} className="text-yellow-500" />
          )
        )}
      </div>
    );
  };

  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
        <GoArrowLeft
          className="text-xl"
          onClick={() => navigate(`/vendor/bookings`)}
        />

        <h1 className="text-2xl font-medium px-5 md:px-10 text-center">
          Booking Details
        </h1>

        <div className="flex flex-wrap justify-center m-4 md:m-8 gap-6">
          {/* Booking Details Card */}
          <div className="w-full md:max-w-lg bg-white border border-gray-200 rounded-lg shadow-lg p-6">
            {/* User Info */}
            <div className="flex items-center mb-6">
              <img
                className="w-12 h-12 rounded-full mr-4"
                src={bookingDoc?.ranger?.user?.profilePic}
                alt="Avatar"
              />
              <div>
                <div className="text-lg font-semibold text-gray-800">
                  {bookingDoc?.ranger?.user?.userName}
                </div>
                <div className="text-sm text-gray-500">
                  {bookingDoc?.ranger?.user?.role}
                </div>
                <div className="flex items-left mt-1">
                  {renderStars(bookingDoc?.ranger?.rating)}
                </div>
              </div>
            </div>

            {/* Booking Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <h5 className="text-xs font-medium text-gray-500">Service</h5>
                <p className="text-sm text-gray-800">
                  {bookingDoc?.service?.name}
                </p>
              </div>

              <div className="flex flex-col">
                <h5 className="text-xs font-medium text-gray-500">
                  Booking Date
                </h5>
                <p className="text-sm text-gray-800">
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

              <div className="flex flex-col">
                <h5 className="text-xs font-medium text-gray-500">
                  Booking Time
                </h5>
                <p className="text-sm text-gray-800">
                  {new Date(bookingDoc?.bookingDateTime).toLocaleTimeString(
                    "en-US",
                    {
                      hour: "numeric",
                      minute: "numeric",
                      hour12: true,
                      timeZone: "UTC",
                    }
                  )}
                </p>
              </div>
            </div>

            {/* Timing & OTP Info */}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mb-6">
              <div className="flex flex-col">
                <h5 className="text-xs font-medium text-gray-500">
                  Start Time
                </h5>
                <p className="text-sm text-gray-800">
                  {new Date(bookingDoc?.startTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    timeZone: "UTC",
                  })}
                </p>
                <h5 className="text-xs font-medium text-gray-500">End Time</h5>
                <p className="text-sm text-gray-800">
                  {new Date(bookingDoc?.endTime).toLocaleString("en-US", {
                    year: "numeric",
                    month: "short",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                    hour12: true,
                    timeZone: "UTC",
                  })}
                </p>
              </div>

              <div className="flex flex-col">
                <h5 className="text-xs font-medium text-gray-500">Start OTP</h5>
                <p className="text-sm text-gray-800">{bookingDoc?.startOtp}</p>
                <h5 className="text-xs font-medium text-gray-500">End OTP</h5>
                <p className="text-sm text-gray-800">{bookingDoc?.endOtp}</p>
              </div>

              <div className="flex flex-col">
                <h5 className="text-xs font-medium text-gray-500">Duration</h5>
                <p className="text-sm text-gray-800">
                  {getTimeDifference(
                    bookingDoc?.startTime,
                    bookingDoc?.endTime
                  )}{" "}
                  Hrs
                </p>
              </div>
            </div>

            {/* Item Details */}
            <div>
              <h3 className="text-lg font-semibold text-gray-800 mb-3">
                Item Details
              </h3>
              {bookingDoc?.items?.length > 0 ? (
                <div className="space-y-2">
                  {bookingDoc.items.map((item) => (
                    <div
                      key={item._id}
                      className="flex justify-between border-t border-gray-200 py-2 text-gray-700"
                    >
                      <span>{item.title}</span>
                      <span>₹{item.price}</span>
                    </div>
                  ))}
                </div>
              ) : (
                <p className="text-sm text-gray-500">No items available</p>
              )}
            </div>
          </div>
        </div>

        {/* Payment Details */}
        <h2 className="text-2xl text-center font-medium px-5 md:px-10">
          Payment Details
        </h2>
        <div className="container flex justify-center">
          <div className="md:max-w-sm lg:max-w-lg flex  md:m-8 w-full">
            <div className="border border-gray-400 bg-white rounded-lg p-4 flex flex-col justify-between leading-normal w-full">
              <div className="flex flex-wrap items-center gap-8 p-4">
                <div className="flex flex-col">
                  <h3 className="text-xl font-semibold text-gray-700">
                    Service Name
                  </h3>
                  <p className="text-base text-gray-900">
                    <span className="text-xl block">
                      {bookingDoc?.service?.name}
                      <span className="text-md pl-4 sm:pl-10 lg:pl-20">
                        ₹{bookingDoc?.service?.price}
                      </span>
                    </span>
                    <span className="text-xl block mt-4 border border-gray-600 p-1 rounded-md bg-gray-100">
                      Total Price
                      <span className="text-md pl-4 sm:pl-10 lg:pl-16">
                        ₹{bookingDoc?.totalPrice}
                      </span>
                    </span>
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default BookingDetails;
