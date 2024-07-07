import React, { useEffect, useState } from "react";
import { BASE_URL, formatDuration } from "../../constants";
import axios from "../../axiosInstance/axiosApi";

const VROHome = () => {
  const [totals, setTotals] = useState(null);
  const [topVendors, setTopVendors] = useState([]);
  const [topRangers, setTopRangers] = useState([]);
  const [userDoc,setUserDoc] = useState(null);

  const fetchUser = async () => {
    try {
      const userId = sessionStorage.getItem('auth');
      const res = await axios.get(`${BASE_URL}user/getUserById/${userId}`);
      setUserDoc(res.data.userDoc);
    } catch (error) {
      console.log(error);
    }
  }

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
    <section className="p-5 w-screen h-full md:w-full bg-[#EDEDFF] gap-6">
      {/* welcome card */}
      <div className="bg-white p-5 rounded-2xl w-screen md:w-full">
        <p className="font-medium tracking-wide text-3xl my-2">
          Have a great day {userDoc?.userName}!
        </p>
        <p className="font-light text-[#7E7E7E] my-2 text-xl">
          Your clever approach and capabilities have led to these fantastic
          results.
        </p>
        <div className="grid grid-cols-3 gap-8 my-5">
          <div
            style={{ border: "2px solid #6556F529" }}
            className="rounded-3xl shadow-xl p-5">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Vendors</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">
              {totals?.vendors}
            </p>
          </div>
          <div
            style={{ border: "2px solid #6556F529" }}
            className="rounded-3xl shadow-xl p-5">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Rangers</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">
              {totals?.rangers}
            </p>
          </div>
          <div
            style={{ border: "2px solid #6556F529" }}
            className="rounded-3xl shadow-xl p-5">
            <p className="font-medium text-[#5A5A5A] text-lg">Total Bookings</p>
            <p className="font-medium text-[#6556F5] text-4xl my-2">
              {totals?.bookings}
            </p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-8 my-5 w-screen md:w-full">
        <div className="bg-white rounded-3xl p-5 w-screen md:w-full">
          <p className="font-semibold mb-5">Top Vendors</p>
          <div className="grid grid-cols-4 place-items-start">
            <p className="text-[#5A5A5A]">Name</p>
            <p className="text-[#5A5A5A]">Phone No</p>
            <p className="text-[#5A5A5A]">Bookings</p>
            <p className="text-[#5A5A5A]">Revenue</p>
            {/* map vendors here */}
            {topVendors?.map((data, index) => {
              return (
                <>
                  <p className=" my-2">
                    {data?.firstName} {data?.lastName}
                  </p>
                  <p className=" my-2">{data?.user?.phone}</p>
                  <p className=" font-semibold my-2">{data?.noOfBooking}</p>
                  <p className=" font-semibold my-2">
                    {" "}
                    <span className="font-Inter">₹ </span>
                    {data?.amountEarned}
                  </p>
                </>
              );
            })}
          </div>
        </div>
        <div className="bg-white rounded-3xl p-5 w-screen md:w-full">
          <p className="font-semibold mb-5">Most Booked Rangers</p>
          <div className="grid grid-cols-4 place-items-start">
            <p className="text-[#5A5A5A]">Name</p>
            <p className="text-[#5A5A5A]">Phone No</p>
            <p className="text-[#5A5A5A]">Bookings</p>
            <p className="text-[#5A5A5A]">Duration</p>
            {/* map Rangers here */}
            {topRangers?.map((data, index) => {
              return (
                <>
                  <p className=" my-2">
                    {data?.firstName} {data?.lastName}
                  </p>
                  <p className=" my-2">{data?.user?.phone}</p>
                  <p className=" font-semibold my-2">{data?.noOfBooking}</p>
                  <p className=" font-semibold my-2">
                    {formatDuration(data?.workedDuration)}
                  </p>
                </>
              );
            })}
          </div>
        </div>
      </div>
    </section>
  );
};
export default VROHome;
