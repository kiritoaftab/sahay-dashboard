import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import {
  accessorriesImg,
  formatDate,
  formatIndianRupee,
  admin,
  BASE_URL,
} from "../../constants";

import cn from "classnames";

const AdminBookings = () => {

  const [bookings,setBookings] = useState([]);
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());

  useEffect(() => {
    // Calculate the start date as 7 days before the end date
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - 7);

    setEndDate(end);
    setStartDate(start);
  }, []);

  const fetchBookings = async () => {
    try {
      console.log(startDate,endDate);
      const res = await axios.get(`${BASE_URL}booking/getAllBookingBetweenDatesPagination`, {
        params: {
          startDate: startDate, 
          endDate: endDate 
        }
      });
      console.log(res.data);
      setBookings(res.data.bookings);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (startDate && endDate) {
      fetchBookings();
    }
  }, [startDate, endDate]);

  return (
    <section className="p-10  w-screen md:w-full bg-background">
      <p className="font-medium text-xl mb-5">All Bookings</p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <button
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownRadio"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 "
              type="button"
            >
              <svg
                className="w-3 h-3 text-gray-500  me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              Last 30 days
              <svg
                className="w-2.5 h-2.5 ms-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 10 6"
              >
                <path
                  stroke="currentColor"
                  stroke-linecap="round"
                  stroke-linejoin="round"
                  stroke-width="2"
                  d="m1 1 4 4 4-4"
                />
              </svg>
            </button>
            <div
              id="dropdown"
              className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow w-44 "
            >
              <ul
                className="py-2 text-sm text-gray-700 "
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Dashboard
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Settings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Earnings
                  </a>
                </li>
                <li>
                  <a
                    href="#"
                    className="block px-4 py-2 hover:bg-gray-100 "
                  >
                    Sign out
                  </a>
                </li>
              </ul>
            </div>
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 "
                aria-hidden="true"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fill-rule="evenodd"
                  d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                  clip-rule="evenodd"
                ></path>
              </svg>
            </div>
            <input
              type="text"
              id="table-search"
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 "
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 ">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 ">
            <tr>
              <th scope="col" className="px-6 py-3">
                Customer Name
              </th>
              <th scope="col" className="px-6 py-3">
                Service
              </th>
              <th scope="col" className="px-6 py-3">
                Booking Date Time
              </th>
              <th scope="col" className="px-6 py-3">
                Ranger
              </th>
              
              <th scope="col" className="px-6 py-3">
                Start End OTP
              </th>
              <th scope="col" className="px-6 py-3">
                Duration
              </th>
              <th scope="col" className="px-6 py-3">
                Total
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
            </tr>
          </thead>
          <tbody>
            
            {bookings?.map((booking,index) => {
             return(
              <tr key={index} className="bg-white border-b  hover:bg-gray-50 ">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap "
              >
                {booking?.customer?.firstName}
              </th>
              <td className="px-6 py-4"><span className="px-2 py-1 rounded-full font-semibold bg-[#FFB0153D] text-[#1E1E1E]">{booking?.service?.name}</span></td>
              <td className="px-6 py-4 text-black">{formatDate(booking?.bookingDateTime)}</td>
              <td className="px-6 py-4 text-black">{booking?.ranger?.firstName ? booking?.ranger?.firstName : `Yet to be Assigned` }</td>
              
              <td className="px-6 py-4 text-black">{booking?.startOtp} - {booking?.endOtp}</td>
              <td className="px-6 py-4 text-green-500 font-semibold">{booking?.duration ? booking?.duration : `0 mins`}</td>
              <td className="text-black text-lg">{booking?.totalPrice ? booking?.totalPrice : 0}</td>
              <td className="text-black">{booking?.status}</td>
            </tr>
             )
            })

            }
           
          </tbody>
        </table>
      </div>
    </section>
  );
};

export default AdminBookings;
