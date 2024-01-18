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
  const data = [
    { name: "Rithesh D", service: "Cleaning", bookings: 10, revenue: 500 },
    { name: "Rithesh D", service: "Cleaning", bookings: 10, revenue: 500 },
    { name: "Rithesh D", service: "Cleaning", bookings: 10, revenue: 500 },
  ];

  const perform = [
    { service: "Maid",ranger: "30",},
    { service: "Cook",ranger: "30",},
    { service: "Maid",ranger: "40",},
    { service: "Maid",ranger: "30",},
    { service: "Maid",ranger: "30",},
    { service: "Cook",ranger: "30",},
    { service: "Maid",ranger: "40",},
    { service: "Maid",ranger: "30",},
    

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
    <section className="grid grid-cols-3 p-3 w-screen md:w-full bg-background gap-6 max-md:grid-cols-2 place-items-center p-10">

        {/* welcome card */}
      <div className="flex flex-col col-span-2 p-5  max-md:col-span-2  w-full bg-white rounded-3xl  mt-[-370px]">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
            Welcome back, Aesha Upadhyay ! {vendorDoc?.shopName}
          </h5>
          <p className="mb-3 font-semibold text-gray-500  text-balance ">
            Your smart work and skills have led to the following stats
          </p>
        </div>
        <div className="w-100 flex flex-row justify-around gap-5 ">
          <div className="flex flex-row border-2 flex flex-col border-background w-3/6 p-5 rounded-3xl gap-2">
            <h5 className="font-bold">Today's Revenue</h5>
            <h5 className="text-4xl text-primary font-bold text-violet-700">Rs 20,000</h5>
            <p className="flex flex-row gap-2 text-gray-500">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" />{" "}
              <span className="text-green-500"> 5% </span> since yesterday
            </p>
          </div>
          <div className="flex flex-row border-2 flex flex-col border-background w-3/6 p-5 rounded-3xl gap-2">
            <h5 className="font-bold">Today's Orders</h5>
            <h5 className="text-4xl text-primary font-bold text-violet-700">30</h5>
            <p className="flex flex-row gap-2 text-gray-500">
              <ArrowTrendingUpIcon className="h-5 w-5 text-green-400" />{" "}
              <span className="text-green-500"> 2% </span> since yesterday
            </p>
          </div>
        </div>
      </div>



      {/* performance */}
      <div className="flex flex-col justify-around w-full max-md:col-span-2  w-full bg-white rounded-3xl w-3/5 ">
        <div className="flex flex-col  p-4 leading-normal">
          <div className="flex flex-col justify-center p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Perfromance
            </h5>

            <div className="flex flex-row border-2 flex flex-col border-background w-6/6 p-5 rounded-3xl ">
            <h5 className="font-semibold">Total Orders</h5>
            <h5 className="text-2xl text-primary font-semibold text-violet-700 mb-5">2090</h5>

            <h5 className="font-semibold">Total Customers</h5>
            <h5 className="text-2xl text-primary font-semibold text-violet-700">500</h5>
          </div>


          <div className="flex flex-row border-2 flex flex-col border-background w-8/6 p-5 rounded-3xl mt-10 ">
            <h5 className="font-semibold">Total Rangers</h5>
            <h5 className="text-2xl text-primary font-semibold text-violet-700">300</h5>
            <div className="flex flex-row mt-5">
            <div class="mb-2 px-8 pr-[70px]">
              <div className="font-semibold text-gray-500">
                Service
              </div>
            </div>
            <div class="mb-2 px-1">
              <div className=" font-semibold text-gray-500">
                Rangers
              </div>
            </div>
            </div>   
            <div className="flex flex-row">
            <div className="w-[300px] h-[200px]">
              {perform.map((item, index) => (
                <div className=" flex flex-row">
                  <div class="mb-2 px-8 pr-[100px]">
                    <div className=" top-[496px] left-[300px] leading-[16px] font-semibold text-dimgray-100">
                      {item.service}
                    </div>
                  </div>
                  <div class="mb-2 px-1">
                    <div className=" top-[496px] left-[50px] leading-[16px] font-semibold text-dimgray-100">
                      {item.ranger}
                    </div>
                  </div>
                  
                </div>
              ))}
            </div>
          </div>


          </div>
          </div>
        </div>
      </div>



      {/* booked ranger */}
      <div className="flex flex-col col-span-2 p-5  max-md:col-span-2  w-full bg-white rounded-3xl  mt-[-370px]">
        <div className="flex flex-col justify-between p-4 leading-normal">
          <div className="flex flex-col justify-between p-4 leading-normal">
            <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 ">
              Most Booked Rangers {vendorDoc?.shopName}
            </h5>
          </div>
          <div className=" flex flex-row">
            <div class="mb-2 px-8 pr-[120px]">
              <div className=" top-[496px] left-[331px] leading-[16px] font-semibold text-gray-500">
                Name
              </div>
            </div>
            <div class="mb-2 px-1 pr-[100px] ">
              <div className=" top-[496px] left-[555px] leading-[16px] font-semibold text-gray-500">
                Service
              </div>
            </div>
            <div class="mb-2 px-1 pr-[80px] w-[200px]">
              <div className="top-[496px] left-[687px] leading-[16px] font-semibold text-gray-500">
                Total bookings
              </div>
            </div>
            <div class="mb-2 pr-[200px]">
              <div className="top-[496px] left-[868px] leading-[16px] font-semibold text-gray-500">
                Total Revenue
              </div>
            </div>
          </div>
          <div className="flex flex-row">
            <div className="w-[300px] h-[100px]">
              {data.map((item, index) => (
                <div className=" flex flex-row">
                  <div class="mb-2 px-8 pr-[100px]">
                    
                    <div className=" top-[496px] left-[300px] leading-[16px] flex flex-row gap-2 font-semibold text-dimgray-100">
                    <img src={admin} className="w-6 h-6"/>
                      {item.name}
                    </div>
                  </div>
                  <div class="mb-2 px-1 pr-[100px] ">
                    <div className=" top-[496px] left-[5    0px] leading-[16px] font-semibold text-dimgray-100">
                      {item.service}
                    </div>
                  </div>
                  <div class="mb-2 px-1 pr-[140px] w-[200px]">
                    <div className="top-[496px] left-[687px] leading-[16px] font-semibold text-dimgray-100">
                      {item.bookings}
                    </div>
                  </div>
                  <div class="mb-2 px-1 pr-[50px]">
                    <div className="top-[496px] left-[868px] leading-[16px] font-semibold text-dimgray-100">
                      {item.revenue}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <hr className="mt-10 h-px my-8 bg-gray-500 border-1 dark:bg-gray-700"/>
          <div className=" flex flex-row ml-5">
            <div>
              <div className="  leading-[16px] font-semibold text-black-500 pr-5 text-xl">
                Ongoing Bookings
              </div>
              <div className="  mt-6 font-semibold  text-blueviolet-100 pr-5 text-5xl text-violet-700 ">
                40
              </div>
            </div>
            <div>
              <div className="  leading-[16px] font-semibold text-black-500 text-xl">
                Pending payments
              </div>
              <div className="  mt-6 font-semibold  text-blueviolet-100 pr-5 text-5xl text-violet-700">
                20
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="flex flex-column justify-around w-full max-md:col-span-2"></div>
    </section>
  );
};
export default AdminHome;