import React, { useState, useEffect } from "react";
import axios from "../../axiosInstance/axiosApi";
import { BASE_URL } from "../../constants";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";

const AdminVRO = () => {
  const [vroList, setVroList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchVROs = async () => {
    try {
      const url = `${BASE_URL}user/getAllVRO?page=${currentPage}&pageSize=10`;
      const res = await axios.get(url);
      console.log("API Response:", res.data);
      setVroList(res.data.userDoc);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVROs();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="w-screen md:w-full lg:w-full h-full bg-background gap-4 flex flex-col">
      <div className="w-full bg-background p-3 flex flex-col md:flex-row justify-between px-5 md:px-10">
        <p className="text-xl md:text-2xl font-bold">VRO Details</p>
      </div>
      <section className="w-full bg-background p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              {["Username", "Email", "Phone"].map((heading) => (
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
            {vroList.map((vro, index) => (
              <tr key={index}>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center">
                  <span className="text-sm font-medium text-gray-900">
                    {vro.userName}
                  </span>
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {vro.email}
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {vro.phone}
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

export default AdminVRO;
