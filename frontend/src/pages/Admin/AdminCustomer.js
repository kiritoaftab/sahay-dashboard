import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { FaLocationDot } from "react-icons/fa6";

const AdminCustomer = () => {
  const [customerDoc, setCustomerDoc] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const getAllCustomersPagination = async () => {
    try {
      const response = await axios.get(
        `${BASE_URL}customer/getAllCustomers?page=${currentPage}&pageSize=10`
      );
      setCustomerDoc(response?.data?.customerDoc);
      console.log(response?.data);
      setTotalPages(response?.data?.pagination?.totalPages);
    } catch (error) {
      console.error(error, {
        success: false,
        msg: "Could not get all Customers",
      });
    }
  };

  useEffect(() => {
    getAllCustomersPagination();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage(currentPage + 1);
  };
  const prevPage = () => {
    setCurrentPage(currentPage - 1);
  };
  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
        <h1 className="text-2xl font-medium">All Customers</h1>
        <div className="relative border border-gray-300 overflow-x-auto shadow-md sm:rounded-lg">
          <table className="w-full text-sm text-left rtl:text-right text-gray-500">
            <thead className="text-xs text-gray-700 uppercase bg-slate-100 ">
              <tr>
                <th scope="col" className="p-4">
                  <div className="flex items-center">
                    <label htmlFor="checkbox-all-search" className="sr-only">
                      checkbox
                    </label>
                  </div>
                </th>
                <th scope="col" className="px-6 py-3">
                  Customer name
                </th>
                <th scope="col" className="px-6 py-3">
                  Phone
                </th>
                <th scope="col" className="px-6 py-3">
                  Email
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Type
                </th>
                <th scope="col" className="px-6 py-3">
                  Address
                </th>
              </tr>
            </thead>
            <tbody>
              {customerDoc && customerDoc.length > 0 ? (
                customerDoc.map((customer, index) => (
                  <tr
                    key={index}
                    className="bg-white border-b hover:bg-gray-50"
                  >
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only"
                        >
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap"
                    >
                      {customer?.user?.userName}
                    </th>
                    <td className="px-6 py-4">{customer?.user?.phone}</td>
                    <td className="px-6 py-4">{customer?.user?.email}</td>
                    <td className="px-6 py-4">{customer?.gender}</td>
                    <td className="px-6 py-4">
                      {
                        customer?.addresses[customer?.addresses.length - 1]
                          ?.addressType
                      }
                    </td>
                    <td className="px-6 py-4">
                      {Array.isArray(customer?.addresses) &&
                      customer?.addresses?.length > 0 ? (
                        <div key={index}>
                          <div className="font-bold">
                            <p className="font-light">
                              {
                                customer?.addresses[
                                  customer?.addresses.length - 1
                                ]?.address
                              }
                            </p>
                          </div>
                          <a
                            target="_blank"
                            href={`https://www.google.com/maps?q=${
                              customer?.addresses[
                                customer?.addresses.length - 1
                              ]?.latitude
                            },${
                              customer?.addresses[
                                customer?.addresses.length - 1
                              ]?.longitude
                            }`}
                          >
                            {/* <FaLocationDot />{" "} */}
                          </a>
                        </div>
                      ) : (
                        "No address available"
                      )}
                    </td>
                  </tr>
                ))
              ) : (
                <tr>No Data about Customers Available</tr>
              )}
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
        </div>
      </section>
    </>
  );
};

export default AdminCustomer;
