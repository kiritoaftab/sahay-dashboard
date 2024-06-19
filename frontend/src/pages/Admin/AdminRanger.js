import React, { useState, useEffect } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import { FaSearch } from "react-icons/fa";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatDuration } from "../../constants";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../../constants";

const AdminRanger = () => {
  const [rangerList, setRangerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [services, setServices] = useState([]);

  // const serviceDetails = services.map(serv => serv.servicesDetails);
  // const flattenedServiceDetails = services.flatMap(
  //   (serv ) => serv.servicesDetails
  // );

  // console.log("flattenedServiceDetails", flattenedServiceDetails);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchRangers = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}ranger/getAllRanger?page=${currentPage}&pageSize=10`
      );
      console.log(res.data.rangerDoc);
      setRangerList(res.data.rangerDoc);
      setTotalPages(res.data.pagination.totalPages);
    } catch (error) {
      console.error(error);
    }
  };

  const fetchServices = async () => {
    try {
      const res = await axios.get(
        `${BASE_URL}rangerService/populateServices?page=1&pageSize=2`
      );
      console.log(res.data.rangers);
      setServices(res.data.rangers);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchRangers();
    fetchServices();
  }, [currentPage]);

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="w-screen md:w-full h-full bg-background gap-4 flex flex-col ">
      <div className="w-screen md:w-full bg-background p-3 flex justify-between px-10">
        <p className="text-2xl font-bold">Ranger Details</p>
        <div className="relative inline-block text-left">
          <div className="relative inline-block text-left">
            <input
              type="text"
              placeholder="Search..."
              // value={searchTerm}
              // onChange={handleChange}
              className="w-full p-2 pl-10 border rounded-md focus:outline-none"
            />
            <FaSearch
              className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
              size={20}
            />
          </div>
        </div>
      </div>
      <section className="w-screen md:w-full bg-background p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Name
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Phone
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Services
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Booking
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Duration
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Details
              </th>
              <th className="px-6 py-3  text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Action
              </th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {rangerList.map((ranger, index) => (
              <tr key={index}>
                <td className="px-6 py-4 whitespace-nowrap flex items-center justify-center">
                  {/* Uncomment if you need to display images
        <img
          src={ranger.bannerImage}
          className="h-10 w-10 rounded-full object-cover mr-4"
          alt={ranger.name}
        /> */}
                  <span className="text-sm font-medium text-gray-900">
                    {ranger.firstName}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {ranger?.user?.phone}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-black text-center bg-[#FFB0153D] rounded-xl font-semibold">
                  {services.map((service, serviceIndex) => (
                    <div key={serviceIndex}>
                      {service?.servicesDetails?.map((item, itemIndex) => (
                        <div key={itemIndex}>{item.name}</div>
                      ))}
                    </div>
                  ))}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {ranger.noOfBooking}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 text-center">
                  {formatDuration(ranger?.vendor?.amountEarned)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-center">
                  <button
                    onClick={() => navigate(`/admin/rangers/${ranger._id}`)}
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
