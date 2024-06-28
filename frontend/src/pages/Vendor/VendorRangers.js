import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatDuration } from "../../constants";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import debounce from "lodash.debounce";

const VendorRangers = () => {
  const [rangerList, setRangerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchRangers = async (query = "") => {
    try {
      const url = query
        ? `${BASE_URL}ranger/getByName/${query}`
        : `${BASE_URL}rangerService/populateServices?page=${currentPage}&pageSize=10`;
      const res = await axios.get(url);
      console.log("API Response:", res.data); 
      if (query) {
        setRangerList(res.data.rangers);
        setTotalPages(1);
      } else {
        setRangerList(res.data.rangers);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRangers();
  }, [currentPage]);

  const handleSearchChange = debounce((event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    fetchRangers(query);
  }, 300);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="w-screen md:w-full lg:w-full h-full bg-background flex flex-col">
      <div className="w-full bg-background p-3 flex flex-col md:flex-row justify-between px-5 md:px-10">
        <p className="text-xl md:text-2xl font-bold">Ranger Details</p>
        <div className="relative mt-2 md:mt-0 w-full md:w-auto">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 border rounded-md focus:outline-none"
            onChange={handleSearchChange}
          />
          <FaSearch
            className="absolute left-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
      </div>
      <section className="w-full bg-background p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Name", "Phone", "Services", "Booking", "Duration", "Details", "Action"].map((heading) => (
                <th
                  key={heading}
                  className="px-2 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                >
                  {heading}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rangerList.map((ranger, index) => (
              <tr key={index}>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap flex items-center justify-center">
                  <span className="text-sm font-medium text-gray-900">
                    {ranger.firstName}
                  </span>
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {ranger?.userDetails?.phone}
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-black text-center bg-[#FFB0153D] rounded-xl font-semibold">
                {Array.isArray(ranger?.servicesDetails) ? 
                    ranger.servicesDetails.map((service) => service.name).join(", ") : 
                    ""
                  }
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {ranger.noOfBooking}
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {formatDuration(ranger?.workedDuration)}
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => navigate(`/admin/rangers/${ranger._id}`)}
                    className="text-white px-2 py-2 whitespace-nowrap text-sm rounded-xl bg-indigo-500"
                  >
                    View More
                  </button>
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-center">
                  {/* <button>
                    <TrashIcon className="h-5 w-5 mr-2 text-red-500" />
                  </button> */}
                  <button>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10 flex justify-center">
          <div className="border bg-[#D9D9D9] rounded-full flex justify-center">
            <button
              className={`focus:outline-none text-black p-2 text-2xl`}
              onClick={prevPage}
              disabled={currentPage === 1}
            >
              <MdKeyboardArrowLeft />
            </button>
            <p className="p-2">
              {currentPage} / {totalPages}
            </p>
            <button
              className={`focus:outline-none text-black p-2 text-2xl`}
              onClick={nextPage}
              disabled={currentPage === totalPages}
            >
              <MdKeyboardArrowRight />
            </button>
          </div>
        </div>
      </section>
    </section>
  );
};

export default VendorRangers;
