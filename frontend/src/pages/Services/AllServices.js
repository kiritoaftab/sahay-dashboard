import React, { useState, useEffect } from "react";
import axios from "axios";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import { BASE_URL } from "../../constants";
import { useNavigate } from "react-router-dom";

const AllServices = () => {
  const [services, setServices] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const navigate = useNavigate();

  useEffect(() => {
    fetchServices();
  }, [currentPage]);

  const fetchServices = async () => {
    try {
      const pageSize = 10;
      const url = `${BASE_URL}/service/getAllServices?page=${currentPage}&pageSize=${pageSize}`;
      const response = await axios.get(url);
      console.log("API Response:", response.data);
      setServices(response.data.serviceDoc);
      setTotalPages(Math.ceil(response.data.total / pageSize));
    } catch (error) {
      console.error("Error fetching services:", error);
    }
  };

  const nextPage = () => {
    setCurrentPage((prevPage) => Math.min(prevPage + 1, totalPages));
  };

  const prevPage = () => {
    setCurrentPage((prevPage) => Math.max(prevPage - 1, 1));
  };

  return (
    <section className="w-screen md:w-full lg:w-full h-full bg-background gap-4 flex flex-col">
      <div className="w-full bg-background p-3 flex flex-col md:flex-row justify-between px-5 md:px-10">
        <p className="text-xl md:text-2xl font-bold">Service Details</p>
      </div>
      <section className="w-full bg-background p-4 overflow-x-auto">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50 ">
            <tr>
              <th className="px-2 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Service Name</th>
              <th className="px-2 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">Price</th>
              <th className="px-2 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Banner Image
              </th>
              <th className="px-2 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center">
                Icon Image
              </th>
              <th className="px-2 md:px-6 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-start">Edit</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {services.map((service, index) => (
              <tr key={index}>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center">{service.name}</td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center">{service.price}</td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center">
                  <img src={service.bannerImage} alt={service.name} className="mx-auto max-w-24 max-h-24" />
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center">
                  <img src={service.iconImage} alt={`${service.name} icon`} className="mx-auto max-w-12 max-h-12" />
                </td>
                <td className="px-2 md:px-6 py-4 whitespace-nowrap text-center">
                  <button onClick={() => navigate(`/admin/updateServices/${service._id}`)} 
                  className="bg-blue-500 rounded-lg w-16 h-10 text-white flex items-center justify-center focus:outline-none">
                    Edit
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

export default AllServices;
