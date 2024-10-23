import React, { useEffect, useState } from "react";
import classNames from "classnames";
import {
  admin,
  sales,
  orders,
  box,
  productsLive,
  ordersPending,
  inventory,
  taxes,
  bannerMan,
  vroVector,
  formatIndianRupee,
  BASE_URL,
  formatDuration,
  formatDurationToHours,
} from "../../constants";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const AdminHome = () => {
  const [totals, setTotals] = useState(null);
  const [topVendors, setTopVendors] = useState([]);
  const [topRangers, setTopRangers] = useState([]);
  const [userDoc, setUserDoc] = useState(null);

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

  const fetchUser = async () => {
    try {
      const userId = sessionStorage.getItem("auth");
      const res = await axios.get(`${BASE_URL}user/getUserById/${userId}`);
      console.log(res.data);
      setUserDoc(res.data.userDoc);
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
    <section className="p-5 w-screen h-full md:w-full bg-[#EDEDFF] gap-6">
      {/* Welcome card */}
      <div className="bg-white p-5 rounded-2xl">
        <p className="font-medium tracking-wide text-3xl my-2">
          Have a great day {userDoc?.userName}!
        </p>
        <p className="font-light text-[#7E7E7E] my-2 text-xl">
          Your clever approach and capabilities have led to these fantastic
          results.
        </p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
          <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Vendors</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">
              {totals?.vendors}
            </p>
          </div>
          <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Rangers</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">
              {totals?.rangers}
            </p>
          </div>
          <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Bookings</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">
              {totals?.bookings}
            </p>
          </div>
        </div>
      </div>

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
                  <td className="py-2 font-semibold text-center">
                    {data?.noOfBooking}
                  </td>
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
                  <td className="py-2 font-semibold text-center">
                    {data?.noOfBooking}
                  </td>
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

export default AdminHome;
