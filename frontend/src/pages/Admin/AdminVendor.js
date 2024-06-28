import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import debounce from "lodash.debounce";

const AdminVendor = () => {
  const [vendorDoc, setVendorDoc] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");

  const navigate = useNavigate();

  const fetchVendors = async (query = "") => {
    try {
      const url = query
        ? `${BASE_URL}vendor/getByName/${query}`
        : `${BASE_URL}vendor/paginate?page=${currentPage}&pageSize=10&sortField=firstName&sortOrder=asc`;
      const res = await axios.get(url);
      console.log("API Response:", res.data);
      if (query) {
        setVendorDoc(res.data.vendors);
        setTotalPages(1);
      } else {
        setVendorDoc(res.data.vendors);
        setTotalPages(res.data.pagination.totalPages);
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVendors();
  }, [currentPage]);

  const handleSearchChange = debounce((event) => {
    const query = event.target.value;
    setSearchQuery(query);
    setCurrentPage(1);
    fetchVendors(query);
  }, 300);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
      <div className="w-full bg-background p-3 flex flex-col md:flex-row justify-between px-5 md:px-10">
        <p className="text-xl md:text-2xl font-bold">Vendor Details</p>
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
      <div className="relative border border-gray-300 overflow-x-auto shadow-md sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500">
          <thead className="text-xs text-gray-700 uppercase bg-slate-100">
            <tr>
              <th scope="col" className="p-4">
                <div className="flex items-center">
                  <label htmlFor="checkbox-all-search" className="sr-only">
                    checkbox
                  </label>
                </div>
              </th>
              <th scope="col" className="px-6 py-3">Vendor name</th>
              <th scope="col" className="px-6 py-3">Phone</th>
              <th scope="col" className="px-6 py-3">Shop Name</th>
              <th scope="col" className="px-6 py-3">Bookings</th>
              <th scope="col" className="px-6 py-3">Revenue</th>
              <th scope="col" className="px-6 py-3">Details</th>
              <th scope="col" className="px-6 py-3">Actions</th>
            </tr>
          </thead>
          <tbody>
            {vendorDoc && vendorDoc.length > 0 ? (
              vendorDoc.map((vendor, index) => (
                <tr className="bg-white border-b hover:bg-gray-50" key={index}>
                  <td className="w-4 p-4">
                    <div className="flex items-center">
                      <label htmlFor="checkbox-all-search" className="sr-only">
                        checkbox
                      </label>
                    </div>
                  </td>
                  <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                    {vendor?.user?.userName}
                  </th>
                  <td className="px-6 py-4">{vendor?.user?.phone}</td>
                  <td className="px-6 py-4">{vendor?.shopName}</td>
                  <td className="px-6 py-4">{vendor?.noOfBooking}</td>
                  <td className="px-6 py-4">{vendor?.noOfRanger}</td>
                  <td className="px-6 py-4">
                    <button
                      className="bg-indigo-700 hover:bg-indigo-500 text-white text-xs font-normal p-1.5 rounded-md"
                      onClick={() => navigate(`/admin/editVendor/${vendor?._id}`)}
                    >
                      View More
                    </button>
                  </td>
                  <td className="px-6 py-4">
                    {/* <button>
                      <TrashIcon className="h-5 w-5 text-red-500" />
                    </button> */}
                    <button>
                      <label className="inline-flex items-center cursor-pointer">
                        <input type="checkbox" value="" className="sr-only peer" />
                        <div className="relative w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="8" className="text-center py-4">No Data about Vendors Available</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
      <div className="mt-10 flex justify-center">
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
    </section>
  );
};

export default AdminVendor;
