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

  const getMetrics = async () => {
    try {
      const res = await axios.get(`${BASE_URL}metrics/total`);
      console.log(res.data);
      setTotals({
        rangers: res.data.totalRangers,
        vendors: res.data.totalVendors,
        bookings: res.data.totalBookings
      });
    } catch (error) {
      console.log(error);
    }
  }

  const fetchTopVendorsRangers = async () => {
    try {
      const res = await axios.get(`${BASE_URL}metrics/fetchTopVendorsRangers`);
      console.log(res.data);
      setTopRangers(res.data.topRangers);
      setTopVendors(res.data.topVendors);

    } catch (error) {
      console.log(error);
    }
  }

  useEffect(() => {
    getMetrics();
    fetchTopVendorsRangers();
  }, []);

  return (
    <section className="p-5 w-screen h-full md:w-full bg-[#EDEDFF] gap-6">
      {/* Welcome card */}
      <div className="bg-white p-5 rounded-2xl">
        <p className="font-medium tracking-wide text-3xl my-2">Have a great day Saif!</p>
        <p className="font-light text-[#7E7E7E] my-2 text-xl">Your clever approach and capabilities have led to these fantastic results.</p>
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 my-5">
          <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Vendors</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">{totals?.vendors}</p>
          </div>
          <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Rangers</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">{totals?.rangers}</p>
          </div>
          <div className="rounded-3xl shadow-xl p-5 border-2 border-[#6556F529]">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Bookings</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">{totals?.bookings}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 my-5">
        <div className="bg-white rounded-3xl p-5">
          <p className="font-semibold mb-5">Top Vendors</p>
          <div className="grid grid-cols-1 md:grid-cols-4 place-items-start">
            <p className="text-[#5A5A5A]">Name</p>
            <p className="text-[#5A5A5A]">Phone No</p>
            <p className="text-[#5A5A5A]">Bookings</p>
            <p className="text-[#5A5A5A]">Revenue</p>
            {topVendors?.map((data, index) => (
              <React.Fragment key={index}>
                <p className="my-2">{data?.firstName} {data?.lastName}</p>
                <p className="my-2">{data?.user?.phone}</p>
                <p className="font-semibold my-2">{data?.noOfBooking}</p>
                <p className="font-semibold my-2"> <span className="font-Inter">₹ </span>{data?.amountEarned}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5">
          <p className="font-semibold mb-5">Most Booked Rangers</p>
          <div className="grid grid-cols-1 md:grid-cols-4 place-items-start">
            <p className="text-[#5A5A5A]">Name</p>
            <p className="text-[#5A5A5A]">Phone No</p>
            <p className="text-[#5A5A5A]">Bookings</p>
            <p className="text-[#5A5A5A]">Duration</p>
            {topRangers?.map((data, index) => (
              <React.Fragment key={index}>
                <p className="my-2">{data?.firstName} {data?.lastName}</p>
                <p className="my-2">{data?.user?.phone}</p>
                <p className="font-semibold my-2">{data?.noOfBooking}</p>
                <p className="font-semibold my-2">{formatDuration(data?.workedDuration)}</p>
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorHome;
