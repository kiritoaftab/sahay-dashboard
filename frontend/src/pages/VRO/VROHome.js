import React, { useEffect, useState } from "react";
import { BASE_URL, formatDuration, formatDurationToHours } from "../../constants";
import axios from "../../axiosInstance/axiosApi";

const VROHome = () => {
  const [totals, setTotals] = useState(null);
  const [topVendors, setTopVendors] = useState([]);
  const [topRangers, setTopRangers] = useState([]);
  const [userDoc, setUserDoc] = useState(null);

  const fetchUser = async () => {
    try {
      const userId = sessionStorage.getItem("auth");
      const res = await axios.get(`${BASE_URL}user/getUserById/${userId}`);
      setUserDoc(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  };

  const getMetrics = async () => {
    try {
      const res = await axios.get(`${BASE_URL}metrics/total`);
      console.log(res.data);
      setTotals({
        rangers: res.data.totalRangers,
        vendors: res.data.totalVendors,
        bookings: res.data.totalBookings,
      });
    } catch (error) {
      console.log(error);
    }
  };

  const fetchTopVendorsRangers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}metrics/fetchTopVendorsRangers`);
      console.log(res.data);
      setTopRangers(res.data.topRangers);
      setTopVendors(res.data.topVendors);
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getMetrics();
    fetchTopVendorsRangers();
    fetchUser();
  }, []);

  return (
    <section className="p-4 sm:p-6 md:p-8 w-full h-full bg-[#EDEDFF] gap-4 sm:gap-6 md:gap-8">
      {/* Welcome Card */}
      <div className="bg-white p-4 sm:p-5 md:p-6 rounded-2xl w-full">
        <p className="font-medium tracking-wide text-xl sm:text-2xl md:text-3xl my-2">
          Have a great day {userDoc?.userName}!
        </p>
        <p className="font-light text-[#7E7E7E] my-2 text-base sm:text-lg md:text-xl">
          Your clever approach and capabilities have led to these fantastic
          results.
        </p>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 sm:gap-6 md:gap-8 my-4 sm:my-6 md:my-8">
          {/* Total Vendors */}
          <div
            style={{ border: "2px solid #6556F529" }}
            className="rounded-2xl shadow-lg p-4 sm:p-5 md:p-6"
          >
            <p className="font-medium text-[#5A5A5A] text-base sm:text-lg md:text-xl">
              Total Vendors
            </p>
            <p className="font-medium text-[#6556F5] text-2xl sm:text-3xl md:text-4xl my-2">
              {totals?.vendors}
            </p>
          </div>
          {/* Total Rangers */}
          <div
            style={{ border: "2px solid #6556F529" }}
            className="rounded-2xl shadow-lg p-4 sm:p-5 md:p-6"
          >
            <p className="font-medium text-[#5A5A5A] text-base sm:text-lg md:text-xl">
              Total Rangers
            </p>
            <p className="font-medium text-[#6556F5] text-2xl sm:text-3xl md:text-4xl my-2">
              {totals?.rangers}
            </p>
          </div>
          {/* Total Bookings */}
          <div
            style={{ border: "2px solid #6556F529" }}
            className="rounded-2xl shadow-lg p-4 sm:p-5 md:p-6"
          >
            <p className="font-medium text-[#5A5A5A] text-base sm:text-lg md:text-xl">
              Total Bookings
            </p>
            <p className="font-medium text-[#6556F5] text-2xl sm:text-3xl md:text-4xl my-2">
              {totals?.bookings}
            </p>
          </div>
        </div>
      </div>

      {/* Table Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 sm:gap-6 md:gap-8 my-4 sm:my-6 md:my-8 w-full">
        {/* Top Vendors */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 w-full overflow-x-auto">
          <p className="font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-5">
            Top Vendors
          </p>
          <table className="min-w-full bg-white text-xs sm:text-sm md:text-base">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Phone No</th>
                <th className="text-left py-2">Bookings</th>
                <th className="text-left py-2">Revenue</th>
              </tr>
            </thead>
            <tbody>
              {topVendors?.map((data, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">
                    {data?.firstName} {data?.lastName}
                  </td>
                  <td className="py-2">{data?.user?.phone}</td>
                  <td className="py-2 font-semibold text-center">{data?.noOfBooking}</td>
                  <td className="py-2 font-semibold">
                    <span className="font-Inter">₹ </span>
                    {data?.amountEarned}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Most Booked Rangers */}
        <div className="bg-white rounded-2xl p-4 sm:p-5 md:p-6 w-full overflow-x-auto">
          <p className="font-semibold text-base sm:text-lg md:text-xl mb-3 sm:mb-4 md:mb-5">
            Most Booked Rangers
          </p>
          <table className="min-w-full bg-white text-xs sm:text-sm md:text-base">
            <thead>
              <tr>
                <th className="text-left py-2">Name</th>
                <th className="text-left py-2">Phone No</th>
                <th className="text-left py-2">Bookings</th>
                <th className="text-left py-2">Duration</th>
              </tr>
            </thead>
            <tbody>
              {topRangers?.map((data, index) => (
                <tr key={index} className="border-t">
                  <td className="py-2">
                    {data?.firstName} {data?.lastName}
                  </td>
                  <td className="py-2">{data?.user?.phone}</td>
                  <td className="py-2 font-semibold text-center">{data?.noOfBooking}</td>
                  <td className="py-2 font-semibold">
                    {formatDurationToHours(data?.workedDuration)}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </section>
  );
};
export default VROHome;
