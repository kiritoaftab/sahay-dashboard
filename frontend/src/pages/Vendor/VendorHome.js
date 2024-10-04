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
} from "../../constants";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";

const VendorHome = () => {
  const [totals, setTotals] = useState(null);
  const [topVendors, setTopVendors] = useState([]);
  const [topRangers, setTopRangers] = useState([]);

  const [vendorDoc, setVendorDoc] = useState(null);

  const fetchTopVendorsRangers = async (vendorId) => {
    try {
      const res = await axios.get(
        `${BASE_URL}metrics/fetchTopRangers/${vendorId}`
      );
      console.log(res.data);
      setTopRangers(res.data.topRangers);
    } catch (error) {
      console.log(error);
    }
  };

  const fetchVendor = async () => {
    try {
      const userId = sessionStorage.getItem("auth");
      const res = await axios.get(`${BASE_URL}vendor/getByUserId/${userId}`);
      console.log(res.data);
      setVendorDoc(res.data.vendorDoc);
      fetchTopVendorsRangers(res.data.vendorDoc._id);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    fetchVendor();
  }, []);

  return (
    <section className="p-5 w-screen h-full md:w-full bg-[#EDEDFF] gap-6">
    <div className="bg-white p-5 rounded-2xl shadow-md">
      <p className="font-medium tracking-wide text-3xl my-2">
        Have a great day {vendorDoc?.firstName}!
      </p>
      <p className="font-light text-[#7E7E7E] my-2 text-xl">
        Your clever approach and capabilities have led to these fantastic results.
      </p>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-2 gap-8 my-5">
        <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
          <p className="font-medium text-[#5A5A5A] text-lg">Total Rangers</p>
          <p className="font-medium text-[#6556F5] text-4xl my-2">
            {vendorDoc?.noOfRanger}
          </p>
        </div>
        <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
          <p className="font-medium text-[#5A5A5A] text-lg">Total Bookings</p>
          <p className="font-medium text-[#6556F5] text-4xl my-2">
            {vendorDoc?.noOfBooking}
          </p>
        </div>
      </div>
    </div>
  
    <div className="overflow-x-auto my-5 min-w-full">
  <div className="bg-white min-w-full rounded-3xl p-5 shadow-md">
    <p className="font-semibold mb-5 text-lg">Most Booked Rangers</p>
    <table className="min-w-full table-auto border-collapse">
      <thead>
        <tr className="bg-gray-100">
          <th className="px-4 py-2 text-left text-[#5A5A5A] font-semibold">Name</th>
          <th className="px-4 py-2 text-left text-[#5A5A5A] font-semibold">Phone No</th>
          <th className="px-4 py-2 text-left text-[#5A5A5A] font-semibold">Bookings</th>
          <th className="px-4 py-2 text-left text-[#5A5A5A] font-semibold">Duration</th>
        </tr>
      </thead>
      <tbody className="bg-white"> {/* Set background color for the entire tbody */}
        {topRangers?.map((data, index) => (
          <tr key={index} className="border-b hover:bg-gray-50 transition duration-200">
            <td className="px-4 py-2">{data?.firstName} {data?.lastName}</td>
            <td className="px-4 py-2">{data?.user?.phone}</td>
            <td className="px-4 py-2 font-semibold">{data?.noOfBooking}</td>
            <td className="px-4 py-2 font-semibold">{formatDuration(data?.workedDuration)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
</div>
  </section>
  
  
  );
};

export default VendorHome;
