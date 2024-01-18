import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import {
  accessorries,
  formatDate,
  formatIndianRupee,
  admin,
} from "../../constants";
import cn from "classnames";

const AdminService = () => {
  const [ordersCompletedDoc, setOrdersCompletedDoc] = useState(null);
  const [ordersPendingDoc, setOrdersPendingDoc] = useState(null);
  const [vendorDoc, setVendorDoc] = useState(null);
  const [showPending, setShowPending] = useState(true);
  const [showCompleted, setShowCompleted] = useState(false);
  const orderData = [
    {
      _id: "1",

      orderDate: "12th decemeber",
      orderStatus: "Pending",
      shippingAddress: "bangalore, India",
      customer: "xyz",
      items: "Maid service, refrigerator repair",
    },
    {},
    {},
    {},
  ];

  const pendingOrders = [
    {
      orderId: "87M89",
      orderTime: new Date("Wed, 27 July 2016 13:30:00"),
      rangerName: "Aesha upadhay",
      rangerService: "AC Cleaning",
      rangerPrice: 299,
      accessorries: [
        {
          type: "Cleaning Solution",
          name: "colin X1",
          price: 300,
          units: 3,
        },
        {
          type: "Cleaning Solution",
          name: "colin X1",
          price: 300,
          units: 3,
        },
      ],
      discountPercent: 4,
      serviceTaxPercent: 18,
    },
  ];
  const completedOrders = [{}, {}];
  const rangers = [
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      bannerImage:
        "https://www.cnet.com/a/img/resize/eb766a8cf69ce087b8afc5d82be7cf7ef440bdef/hub/2021/10/01/0dc5aad3-9dfe-4be1-b37d-2f643d85cd66/20210925-iphone-13-pro-03.jpg?auto=webp&width=1200",
    },
  ];

  const { auth } = useAuth();

  const fetchOrdersData = async (vendorId) => {
    if (vendorId) {
      try {
        const res = await axios.get("/vendor/getOrders/" + vendorId);
        console.log(res.data);
        setOrdersPendingDoc(res.data?.ordersPending);
        setOrdersCompletedDoc(res.data?.ordersCompleted);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchVendorData = async (userId) => {
    try {
      const res = await axios.get("/vendor/getVendorByUserId/" + userId);
      fetchOrdersData(res.data?.userDoc?._id);
      setVendorDoc(res.data?.userDoc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVendorData(auth?._id);
  }, []);

  const ItemCard = ({ id, bannerImage, name, quantity, price }) => {
    return <div className="border border-gray-500 rounded-md p-2"></div>;
  };

  const OrderCard = ({
    orderId,
    orderTime,
    accessorries,
    rangerPrice,
    rangerName,
    rangerService,
    discountPercent,
    serviceTaxPercent,
  }) => {
    let totalOrderValue = 0;
    return (
      <div className="w-full flex flex-row bg-white p-4 border border-background rounded-lg  font-bold">
        <div className="flex flex-col gap-2  p-2">
          <div>
            <h2>Order ID: #{orderId}</h2>
            <p className="text-gray-500 text-[15px]"> 27 July 2016 13:30</p>
          </div>
          <div>
            <table className="w-full text-sm text-left rtl:text-right">
              <thead className=" text-gray-600 font-normal uppercase  ">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Service and accessorries
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    QTY
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white text-gray-500">
                  <td className="px-6 py-4 flex flex-row gap-2  items-center">
                    <img src={admin} className="w-8 h-8" />

                    <div className="flex flex-col">
                      <p className="underline text-black font-normal">
                        {" "}
                        {rangerName}
                      </p>
                      <p className="text-xs font-normal"> {rangerService}</p>
                    </div>
                  </td>

                  <td className="px-6 py-4">Rs {rangerPrice}/hr</td>
                  <td className="px-6 py-4">-</td>
                  <td className="px-6 py-4">Rs {rangerPrice}</td>
                </tr>
                {accessorries.map((item, idx) => {
                  return (
                    <tr className="bg-white text-gray-500">
                      <td className="px-6 py-4 flex flex-row gap-2  items-center">
                        <img src={admin} className="w-8 h-8" />

                        <div className="flex flex-col">
                          <p className="underline text-black font-normal">
                            {" "}
                            {item.type}
                          </p>
                          <p className="text-xs font-normal"> {item.name}</p>
                        </div>
                      </td>

                      <td className="px-6 py-4">Rs {item.price}</td>
                      <td className="px-6 py-4">{item.units}</td>
                      <td className="px-6 py-4">
                        Rs {item.price * item.units}
                      </td>
                    </tr>
                  );
                })}
                
              </tbody>
            </table>
          </div>
        </div>
        <div></div>
      </div>
    );
  };

  return (
    <section className="p-10  w-screen md:w-full bg-background grid grid-cols-1">
      <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 ">
        <div
          className={cn({
            "inline-block p-4 gap-3 flex flex-row rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer font-semibold":
              !showPending,
            "inline-block p-4 gap-3  flex flex-row text-black font-semibold bg-white rounded-t-lg active cursor-pointer":
              showPending,
          })}
          onClick={() => {
            setShowPending(true);
            setShowCompleted(false);
          }}
        >
          Pending Orders
          <div
            className={cn({
              "bg-background px-2 rounded-lg": showPending,
              "bg-gray-500 text-white px-2 rounded-lg": !showPending,
            })}
          >
            {pendingOrders.length}
          </div>
        </div>
        <div
          className={cn({
            "inline-block p-4 gap-3 flex flex-row rounded-t-lg hover:text-gray-600 hover:bg-gray-50 cursor-pointer font-semibold":
              !showCompleted,
            "inline-block p-4 gap-3  flex flex-row text-black font-semibold bg-white rounded-t-lg active cursor-pointer":
              showCompleted,
          })}
          onClick={() => {
            setShowPending(false);
            setShowCompleted(true);
          }}
        >
          Completed Orders
          <div
            className={cn({
              "bg-background px-2 rounded-lg": showCompleted,
              "bg-gray-500 text-white px-2 rounded-lg": !showCompleted,
            })}
          >
            {pendingOrders.length}
          </div>
        </div>
      </div>
      <div className="bg-white p-5 ">
        {showPending ? (
          //  Array.isArray(ordersPendingDoc) ? ordersPendingDoc.map((order,index)=> {
          pendingOrders.map((item, index) => {
            return (
              <OrderCard
                key={index}
                rangerPrice={item.rangerPrice}
                orderId={item.orderId}
                orderTime={item.orderTime}
                accessorries={item.accessorries}
                rangerName={item.rangerName}
                rangerService={item.rangerService}
                discountPercent={item.discountPercent}
                serviceTaxPercent={item.serviceTaxPercent}
              />
            );
          })
        ) : showCompleted ? (
          <div></div>
        ) : (
          ``
        )}
      </div>
    </section>
  );
};

export default AdminService;
