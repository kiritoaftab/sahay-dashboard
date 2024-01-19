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
} from "../../constants";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { ArrowTrendingUpIcon } from "@heroicons/react/24/outline";
const StatCard = ({ heading, number, icon }) => {
  return (
    <section className="flex flex-col p-8 w-44 max-w-xs p-2 bg-white border border-indigo-300 rounded-lg shadow font-Montserrat ">
      <img src={icon} className="h-12 w-12" />
      <h5 className="p-0.5 mt-2 ml  text-lg  font-semibold tracking-tight text-gray-900  font-Montserrat">
        {heading}
      </h5>
      <p className="text-lg text-justify  text-violet-800  font-bold font-Montserrat">
        {number}
      </p>
    </section>
  );
};
const AdminHome = () => {
  const RangerData = [
    { name: "Rithesh D", service: "Cleaning", bookings: 10, revenue: 500 },
    { name: "Rithesh D", service: "Cleaning", bookings: 10, revenue: 500 },
    { name: "Rithesh D", service: "Cleaning", bookings: 10, revenue: 500 },
  ];

  const perform = [
    { service: "Maid", ranger: "30" },
    { service: "Kitechen Cleaning", ranger: "30" },
    { service: "Maid", ranger: "40" },
    { service: "Maid", ranger: "30" },
    { service: "A/C service", ranger: "30" },
    { service: "Kitechen Cleaning", ranger: "30" },
    { service: "Maid", ranger: "40" },
    { service: "Maid", ranger: "30" },
  ];
  const { auth } = useAuth();
  console.log(auth);
  const salePercent = "+20%";
  const [vendorDoc, setVendorDoc] = useState(null);
  const [vroDoc, setVroDoc] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  const [topProd, setTopProd] = useState(null);
  const [inventoryHealth, setInventoryHealth] = useState(0);
  useEffect(() => {
    if (Array.isArray(topProducts) && topProducts.length > 0) {
      setTopProd(topProducts[0]);
      let a = 0;
      let b = 0;
      topProducts.forEach((prod, index) => {
        a += prod?.currentUnit || 0;
        b += prod?.addedUnit || 0;
      });
      setInventoryHealth((a / b) * 100); // total Current Unit / total added Unit of top 3 products
    }
  }, [topProducts]);
  const fetchTopProduct = async (vendorId) => {
    if (vendorId) {
      try {
        const res = await axios.get(
          "/products/vendor/fetchTopProduct/" + vendorId
        );
        console.log(res.data);
        setTopProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const fetchVroData = async (vroId) => {
    if (vroId) {
      try {
        const res = await axios.get("/vro/vro/" + vroId);
        console.log(res.data);
        setVroDoc(res.data?.vroDoc);
      } catch (error) {
        console.error(error);
      }
    }
  };
  const fetchVendorData = async (userId) => {
    try {
      const res = await axios.get("/vendor/getVendorByUserId/" + userId);
      fetchVroData(res.data?.userDoc?.vro_id);
      fetchTopProduct(res.data?.userDoc?._id);
      console.log(res.data?.userDoc);
      setVendorDoc(res.data?.userDoc);
    } catch (error) {
      console.error(error);
    }
  };
  useEffect(() => {
    fetchVendorData(auth?._id);
  }, []);
  //NEED TO ADD style : w-screen md:w-full, for all components in home to render properly
  return (
    <section className="grid grid-cols-3 grid-rows-2 p-5 w-screen h-full md:w-full bg-background gap-6 max-md:grid-cols-2 place-items-center">
      {/* welcome card */}
      <div className="flex flex-col col-span-2 p-5  max-md:col-span-2  w-full bg-white rounded-[40px]  ">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-3xl font-semibold tracking-tight text-gray-900 ">
            Welcome back, Aesha Upadhyay ! {vendorDoc?.shopName}
          </h5>
          <p className="mb-3 font-semibold text-gray-500  text-balance ">
            Your smart work and skills have led to the following stats
          </p>
        </div>
        <div className="w-100 flex flex-row justify-around gap-5 max-md:flex-col ">
          <div className="flex flex-row border-2 flex flex-col border-background w-3/6 max-md:w-full p-5 rounded-3xl gap-2">
            <h5 className="font-bold">Today's Revenue</h5>
            <h5 className="text-4xl text-primary font-semibold text-primary">
              Rs 20,000
            </h5>
            <p className="flex flex-row gap-2 text-gray-500 font-semibold">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 font-semibold" />{" "}
              <span className="text-green-500"> 5% </span> since yesterday
            </p>
          </div>
          <div className="flex flex-row border-2 flex flex-col border-background w-3/6 max-md:w-full p-5 rounded-3xl gap-2">
            <h5 className="font-bold">Today's Orders</h5>
            <h5 className="text-4xl text-primary font-semibold text-primary">
              30
            </h5>
            <p className="flex flex-row gap-2 text-gray-500 font-semibold">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-400 font-semibold" />{" "}
              <span className="text-green-500"> 2% </span> since yesterday
            </p>
          </div>
        </div>
      </div>

      {/* performance */}
      <div className="flex flex-col p-1 row-span-2 justify-around w-full max-md:col-span-2 h-fit w-full bg-white rounded-[40px]  ">
        <div className="flex flex-col  p-4 leading-normal">
          <div className="flex flex-col gap-5 justify-center p-4 leading-normal">
            <h5 className=" text-3xl text-center font-semibold tracking-tight text-gray-900 ">
              Performance
            </h5>

            <div className="flex flex-row border-2 flex flex-col border-background w-6/6 p-5 rounded-3xl ">
              <h5 className="font-semibold">Total Orders</h5>
              <h5 className="text-2xl text-primary font-semibold text-violet-700 mb-5">
                2090
              </h5>

              <h5 className="font-semibold">Total Customers</h5>
              <h5 className="text-2xl text-primary font-semibold text-violet-700">
                500
              </h5>
            </div>

            <div className="flex flex-row border-2 flex flex-col border-background w-8/6 p-5 rounded-3xl  ">
              <h5 className="font-semibold">Total Rangers</h5>
              <h5 className="text-3xl text-primary font-semibold text-violet-700">
                300
              </h5>
              <table className="w-full ">
              <thead className=" text-gray-600 text-[16px]  ">
                <tr>
                  <th scope="col" className="p-2 text-left">
                    Name
                  </th>
                  <th scope="col" className="p-2 text-left">
                    Service
                  </th>
                  
                </tr>
              </thead>
              <tbody className="overflow-y-auto">
                {perform.map((item, idx) => {
                  return (
                    <tr className=" font-semibold text-black">
                      <td className="px-1 py-1 items-center">
                        {item.service}
                      </td>
                      <td className="px-1 py-1 text-left">{item.ranger}</td>
                      
                    </tr>
                  );
                })}
              </tbody>
            </table>
              
            </div>
          </div>
        </div>
      </div>

      {/* booked ranger */}
      <div className="flex flex-col col-span-2 p-5  max-md:col-span-2  w-full bg-white rounded-[40px]  ">
        <div className="flex flex-col justify-between leading-normal">
          <div className="flex flex-col justify-between p-2 leading-normal">
            <h5 className="mb-2 text-[25px] font-semibold tracking-tight text-gray-900 ">
              Most Booked Rangers
            </h5>
          </div>
          <div>
            <table className="w-full ">
              <thead className=" text-gray-600 text-[16px]  ">
                <tr>
                  <th scope="col" className="p-2 text-left">
                    Name
                  </th>
                  <th scope="col" className="p-2">
                    Service
                  </th>
                  <th scope="col" className="p-2 text-right">
                    Total Bookings
                  </th>
                  <th scope="col" className="p-2 text-right">
                    Total Revenue
                  </th>
                </tr>
              </thead>
              <tbody className="max-h-[144px] overflow-y-auto">
                {RangerData.map((item, idx) => {
                  return (
                    <tr className=" font-semibold text-black">
                      <td className="px-3 py-2 flex flex-row gap-2  items-center">
                        <img src={admin} className="w-8 h-8" />
                        {item.name}
                      </td>
                      <td className="px-3 py-2 text-center">{item.service}</td>
                      <td className="px-3 py-2 text-right">{item.bookings}</td>
                      <td className="px-3 py-2 text-right">{item.revenue}</td>
                    </tr>
                  );
                })}
              </tbody>
            </table>
          </div>

          <hr className="mt-2 my-5 bg-gray-500 border-1 dark:bg-gray-700" />
          <div className=" flex flex-row ml-5 gap-10">
            <div>
              <div className="  leading-[12px] font-semibold text-black-500 pr-5 text-lg">
                Ongoing Bookings
              </div>
              <div className="  mt-2 font-semibold  text-blueviolet-100 pr-5 text-4xl text-violet-700 ">
                40
              </div>
            </div>
            <div>
              <div className="  leading-[12px] font-semibold text-black-500 text-lg">
                Pending payments
              </div>
              <div className="  mt-2 font-semibold  text-blueviolet-100 pr-5 text-4xl text-violet-700">
                20
              </div>
            </div>
          </div>
        </div>
      </div>
     
    </section>
  );
};
export default AdminHome;
