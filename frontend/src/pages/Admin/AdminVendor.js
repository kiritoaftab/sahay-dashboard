import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { TrashIcon } from "@heroicons/react/24/outline";

const AdminVendor = () => {
  const [vendorDoc, setVendorDoc] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  const getAllVendorsPagination = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}vendor/paginate?page=${currentPage}&pageSize=10&sortField=firstName&sortOrder=asc`
      );
      console.log(res.data);
      setVendorDoc(res?.data?.vendors);
      setTotalPages(res?.data?.pagination?.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getAllVendorsPagination();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col">
        <div class="relative overflow-x-auto shadow-md sm:rounded-lg">
          <table class="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead class="text-xs text-gray-700 uppercase bg-gray-50 ">
              <tr>
                <th scope="col" class="p-4">
                  <div class="flex items-center">
                    <label for="checkbox-all-search" class="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" class="px-6 py-3">
                  Vendor name
                </th>
                <th scope="col" class="px-6 py-3">
                  Phone
                </th>
                <th scope="col" class="px-6 py-3">
                  Shop Name
                </th>
                <th scope="col" class="px-6 py-3">
                  Bookings
                </th>
                <th scope="col" class="px-6 py-3">
                  Revenue
                </th>
                <th scope="col" class="px-6 py-3">
                  Details
                </th>
                <th scope="col" class="px-6 py-3">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody>
              {vendorDoc && vendorDoc.length > 0 ? (
                vendorDoc.map((vendor, index) => (
                  <tr class="bg-white border-b hover:bg-gray-50">
                    <td class="w-4 p-4">
                      <div class="flex items-center">
                        <label for="checkbox-all-search" class="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      class="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {vendor?.user?.userName}
                    </th>
                    <td class="px-6 py-4">{vendor?.user?.phone}</td>
                    <td class="px-6 py-4">{vendor?.shopName}</td>
                    <td class="px-6 py-4">{vendor?.noOfBooking}</td>
                    <td class="px-6 py-4">{vendor?.noOfRanger}</td>
                    <td class="px-6 py-4">
                      <button
                        className="bg-indigo-700 hover:bg-indigo-500 text-white text-xs font-normal p-1.5 rounded-md"
                        onClick={() =>
                          navigate(`/admin/editVendor/${vendor?._id}`)
                        }>
                        View More
                      </button>
                    </td>
                    <td class="px-6 py-4">
                      <button>
                        <TrashIcon className="h-5 w-5 text-red-500" />
                      </button>
                      <button>
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                          />
                          <div class="relative w-11 h-6 bg-red-500  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>No Data about Vendors Available</tr>
              )}
            </tbody>
          </table>
          <div className="mt-10 p-5 flex justify-center fixed bottom-0 left-0 w-full ">
            <button
              className={`focus:outline-none text-white bg-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 mb-2 mx-2`}
              onClick={prevPage}
              disabled={currentPage === 1}>
              Previous
            </button>
            <span>
              Showing {currentPage} of {totalPages}
            </span>
            <button
              className={`focus:outline-none text-white bg-purple-500 hover:bg-purple-500 focus:ring-4 focus:ring-purple-300 font-medium rounded-lg text-sm px-4 py-2 mb-2 mx-2`}
              onClick={nextPage}
              disabled={currentPage === totalPages}>
              Next
            </button>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminVendor;
