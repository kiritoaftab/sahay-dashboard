import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance/axiosApi";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import {
  accessorriesImg,
  formatDate,
  formatIndianRupee,
  admin,
  BASE_URL,
  formatDateV2,
} from "../../constants";

import cn from "classnames";

const AdminBookings = () => {

  const [bookings,setBookings] = useState([]);
  const [startDate,setStartDate] = useState(new Date());
  const [endDate,setEndDate] = useState(new Date());
  const [dropdown,setDropdown] = useState(false);
  const [noOfDays,setNoOfDays] = useState(7);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  useEffect(() => {
    // Calculate the start date as 7 days before the end date
    const end = new Date();
    const start = new Date();
    start.setDate(end.getDate() - noOfDays);
    start.setHours(0, 0, 0, 0);

    setEndDate(formatDateV2(end));
    setStartDate(formatDateV2(start));
  }, [noOfDays]);

  const fetchBookings = async () => {
    try {
      console.log(startDate,endDate);
      const res = await axios.get(`${BASE_URL}booking/getAllBookingBetweenDatesPagination`, {
        params: {
          startDate: startDate, 
          endDate: endDate,
          page:currentPage,
        }
      });
      console.log(res.data);
      setBookings(res.data.bookings);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    if (startDate && endDate) {
      fetchBookings();
    }
  }, [startDate, endDate,currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="p-10  w-screen md:w-full bg-background">
      <p className="font-medium text-xl mb-5">All Bookings</p>

      <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
        <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
          <div>
            <button
              id="dropdownRadioButton"
              data-dropdown-toggle="dropdownRadio"
              className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
              type="button"
              onClick={()=> setDropdown(!dropdown)}
            >
              <svg
                className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
              </svg>
              {noOfDays == 0 ? `Today` : `Last ${noOfDays} Days`}
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
            {dropdown ? (
              <div
              id="dropdown"
              className="z-20 bg-white divide-y divide-gray-100 rounded-lg shadow w-44 dark:bg-gray-700"
            >
              <ul
                className="py-2 text-sm text-gray-700 dark:text-gray-200"
                aria-labelledby="dropdownDefaultButton"
              >
                <li>
                  <button
                    onClick={() => {setNoOfDays(0);setDropdown(false)}}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Today
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>{setNoOfDays(7);setDropdown(false)}}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 7 Days
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>{setNoOfDays(14);setDropdown(false)}}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 14 Days
                  </button>
                </li>
                <li>
                  <button
                    onClick={() =>{setNoOfDays(30);setDropdown(false)}}
                    className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                  >
                    Last 30 Days
                  </button>
                </li>
              </ul>
            </div>
            ):``
            }
            
          </div>
          <label for="table-search" className="sr-only">
            Search
          </label>
          <div className="relative">
            <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
              <svg
                className="w-5 h-5 text-gray-500 dark:text-gray-400"
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
              className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
              placeholder="Search for items"
            />
          </div>
        </div>
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
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
              <tr key={index} className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <th
                scope="row"
                className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
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
        <div className="mt-5 flex justify-center ">
        <div className="border bg-[#D9D9D9] rounded-full flex justify-center">
          <button
            className="focus:outline-none text-black p-2 text-2xl"
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            <MdKeyboardArrowLeft />
          </button>
          <p className="p-2">
            {currentPage} / {totalPages}
          </p>
          <button
            className="focus:outline-none text-black p-2 text-2xl"
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            <MdKeyboardArrowRight />
          </button>
        </div>
      </div>
      </div>
    </section>
  );
};

export default AdminBookings;
