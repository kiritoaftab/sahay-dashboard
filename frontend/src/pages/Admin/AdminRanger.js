import React, { useState, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { MdKeyboardArrowRight, MdKeyboardArrowLeft } from "react-icons/md";
import debounce from "lodash.debounce";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "../../axiosInstance/axiosApi";
import useAuth from "../../hooks/useAuth";
import { formatDuration, BASE_URL } from "../../constants";

const AdminRanger = () => {
  const [rangerList, setRangerList] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [searchQuery, setSearchQuery] = useState("");
  const { auth } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const basePath = location.pathname.includes("/vro") ? "/vro" : "/admin";
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

  const toggleStatus = async (userId, currentStatus) => {
    console.log("User ID:", userId);
    if (!userId) {
      console.error("User ID is undefined");
      return;
    }

    const newStatus = currentStatus === "ACTIVE" ? "INACTIVE" : "ACTIVE";
    console.log("Toggling status for user ID:", userId, "to", newStatus);

    try {
      const res = await axios.post(`${BASE_URL}user/updateStatus`, {
        userId,
        status: newStatus,
      });
      console.log("Status update response:", res.data);

      // Update the status in the local state
      setRangerList((prevList) =>
        prevList.map((ranger) =>
          ranger.user._id === userId
            ? { ...ranger, user: { ...ranger.user, status: newStatus } }
            : ranger
        )
      );
    } catch (error) {
      console.error("Error updating status:", error);
      console.error("Request details:", {
        url: `${BASE_URL}user/updateStatus`,
        userId,
        status: newStatus,
      });
    }
  };

  return (
    <section className="w-screen md:w-full lg:w-full h-full bg-background gap-4 flex flex-col">
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
        {/* Table for larger screens */}
        <div className="hidden md:block">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                {[
                  "Name",
                  "Phone",
                  "Services",
                  "Booking",
                  "Duration",
                  "Details",
                  "Action",
                ].map((heading) => (
                  <th
                    key={heading}
                    className="px-2 md:px-4 py-3 text-xs font-medium text-gray-500 uppercase tracking-wider text-center"
                  >
                    {heading}
                  </th>
                ))}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {rangerList.map((ranger, index) => (
                <tr key={index} className="text-sm">
                  <td className="px-2 md:px-4 py-4 whitespace-nowrap text-center">
                    <span className="font-medium text-gray-900">
                      {ranger.firstName}
                    </span>
                  </td>
                  <td className="px-2 md:px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                    {ranger?.user?.phone}
                  </td>
                  {/* <td className="px-2 md:px-4 py-4 whitespace-nowrap text-black text-center bg-[#FFB0153D] rounded-xl font-semibold">
                    {Array.isArray(ranger?.servicesDetails)
                      ? ranger.servicesDetails
                          .map((service) => service.name)
                          .join(", ")
                      : ""}
                  </td> */}

                  <td className="px-6 py-3 text-black text-lg justify-center items-center text-center">
                    <button className="bg-[rgba(255,176,21,0.24)] text-black text-xs font-medium p-1.5 rounded-md">
                      {Array.isArray(ranger?.servicesDetails)
                        ? ranger.servicesDetails
                            .map((service) => service.name)
                            .join(", ")
                        : ""}
                    </button>
                  </td>
                  <td className="px-2 md:px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                    {ranger.noOfBooking}
                  </td>
                  <td className="px-2 md:px-4 py-4 whitespace-nowrap text-gray-500 text-center">
                    {formatDuration(ranger?.workedDuration)}
                  </td>
                  <td className="px-2 md:px-4 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() =>
                        navigate(`${basePath}/rangers/${ranger._id}`)
                      }
                      className="text-white px-2 py-1 rounded-xl bg-indigo-500"
                    >
                      View More
                    </button>
                  </td>
                  <td className="px-2 md:px-4 py-4 whitespace-nowrap text-center">
                    <button
                      onClick={() =>
                        toggleStatus(ranger.user._id, ranger.user.status)
                      }
                    >
                      <label className="inline-flex items-center cursor-pointer">
                        <input
                          type="checkbox"
                          checked={ranger.user.status === "ACTIVE"}
                          className="sr-only peer"
                          readOnly
                        />
                        <div className="relative w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                      </label>
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Card view for mobile */}
        <div className="md:hidden grid grid-cols-1 gap-4">
          {rangerList.map((ranger, index) => (
            <div key={index} className="bg-white p-4 rounded-lg shadow-md">
              <h3 className="font-medium text-lg">{ranger.firstName}</h3>
              <p className="text-gray-500">Phone: {ranger?.user?.phone}</p>
              <p className="text-black font-semibold bg-[#FFB0153D] rounded-xl p-1">
                Services:{" "}
                {Array.isArray(ranger?.servicesDetails)
                  ? ranger.servicesDetails
                      .map((service) => service.name)
                      .join(", ")
                  : ""}
              </p>
              <p className="text-gray-500">Bookings: {ranger.noOfBooking}</p>
              <p className="text-gray-500">
                Duration: {formatDuration(ranger?.workedDuration)}
              </p>
              <div className="flex justify-between mt-2">
                <button
                  onClick={() => navigate(`${basePath}/rangers/${ranger._id}`)}
                  className="text-white px-3 py-1 rounded-xl bg-indigo-500"
                >
                  View More
                </button>
                <button
                  onClick={() =>
                    toggleStatus(ranger.user._id, ranger.user.status)
                  }
                  className="flex items-center"
                >
                  <label className="inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={ranger.user.status === "ACTIVE"}
                      className="sr-only peer"
                      readOnly
                    />
                    <div className="relative w-11 h-6 bg-red-500 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                  </label>
                </button>
              </div>
            </div>
          ))}
        </div>

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

export default AdminRanger;
