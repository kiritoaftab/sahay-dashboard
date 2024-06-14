import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatDuration } from "../../constants";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

const AdminRanger = () => {
  const [rangerList, setRangerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [category, setCategory] = useState("All");
  const [dropdown, setDropdown] = useState(false);
  const categoryList = [
    "All",
    "Electrician",
    "Ac Repair",
    "Plumber",
    "Carpenter",
    "Pest Control",
  ];

  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchRangers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}ranger/getAllRanger?page=${currentPage}&pageSize=10`
      );
      console.log(res.data);
      setRangerList(res.data.rangerDoc);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRangers();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  const updateCategory = (e) => {
    const selectedCat = e.target.getAttribute("name");
    setCategory(selectedCat);
    setDropdown(false);
    // Filter logic can be added here based on the category
  };
  

  return (
    <section className="w-screen md:w-full h-full bg-background gap-4 flex flex-col p-5">
      <div className="w-screen md:w-full bg-white p-5 flex justify-between px-10">
        <p className="text-2xl font-bold">Ranger Details</p>
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setDropdown(!dropdown)}
            >
              {category === "All" ? "Select Category" : category}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className={
              dropdown
                ? `absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`
                : "hidden"
            }
            role="menu"
            aria-orientation="vertical"
          >
            <div className="py-1" role="none">
              {categoryList.map((cat, index) => (
                <a
                  href="#"
                  key={index}
                  className="text-gray-700 block px-4 py-2 text-sm hover:underline"
                  onClick={updateCategory}
                  name={cat}
                >
                  {cat}
                </a>
              ))}
            </div>
          </div>
        </div>
      </div>
      <section className="w-screen md:w-full bg-background p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Name</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Phone</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Services</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Booking</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Revenue</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Details</th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rangerList.map((ranger, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                  {/* <img
                    src={ranger.bannerImage}
                    className="h-10 w-10 rounded-full object-cover mr-4"
                    alt={ranger.name}
                  /> */}
                  <span className="text-sm font-medium text-gray-900">
                    {ranger.firstName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ranger?.user?.phone}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-center bg-[#FFB0153D] rounded-xl font-semibold">{ranger.category}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{ranger.noOfBooking}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">{formatDuration(ranger?.vendor?.amountEarned)}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => navigate(`/admin/rangers/${ranger.id}`)}
                    className="text-white px-2 py-2 whitespace-nowrap text-sm rounded-xl bg-indigo-500"
                  >
                    View More
                  </button>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button>
                    <TrashIcon className="h-5 w-5 mr-2 text-red-500" />
                  </button>
                  <button>
                    <label className="inline-flex items-center cursor-pointer">
                      <input
                        type="checkbox"
                        value=""
                        className="sr-only peer"
                      />
                      <div className="relative w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                    </label>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
        <div className="mt-10 p-5 flex justify-center">
          <button
            className={`focus:outline-none text-white bg-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 mb-2 mx-2`}
            onClick={prevPage}
            disabled={currentPage === 1}
          >
            Previous
          </button>
          <span>
            Showing {currentPage} of {totalPages}
          </span>
          <button
            className={`focus:outline-none text-white bg-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 mb-2 mx-2`}
            onClick={nextPage}
            disabled={currentPage === totalPages}
          >
            Next
          </button>
        </div>
      </section>
    </section>
  );
};

export default AdminRanger;
