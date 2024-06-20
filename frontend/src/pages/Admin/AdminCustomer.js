import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";

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
                  Address
                </th>
                <th scope="col" className="px-6 py-3">
                  Gender
                </th>
                <th scope="col" className="px-6 py-3">
                  Role
                </th>
              </tr>
            </thead>
            <tbody>
              {customerDoc && customerDoc.length > 0 ? (
                customerDoc.map((customer, index) => (
                  <tr className="bg-white border-b hover:bg-gray-50">
                    <td className="w-4 p-4">
                      <div className="flex items-center">
                        <label
                          htmlFor="checkbox-all-search"
                          className="sr-only">
                          checkbox
                        </label>
                      </div>
                    </td>
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                      {customer?.user?.userName}
                    </th>
                    <td className="px-6 py-4">{customer?.user?.phone}</td>
                    <td className="px-6 py-4">{customer?.user?.email}</td>
                    <td className="px-6 py-4">
                      {customer?.addresses?.length > 0
                        ? customer?.addresses.map((address, index) => (
                            <div key={index}>
                              <div className="font-bold">Location:<p className="font-light">{address?.address}</p></div>
                              <div className="font-bold">Type:<p className="font-light">{address?.addressType}</p></div>
                            </div>
                          ))
                        : "No address available"}
                    </td>
                    <td className="px-6 py-4">{customer?.gender}</td>
                    <td className="px-6 py-4">{customer?.user?.role}</td>
                  </tr>
                ))
              ) : (
                <tr>No Data about Customers Available</tr>
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

export default AdminCustomer;
