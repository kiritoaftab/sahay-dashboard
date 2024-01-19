import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import {
  accessorriesImg,
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
  
  


  const pendingOrders = [
    {
      orderId: "87M89",
      orderTime: new Date("Wed, 27 July 2016 13:30:00"),
      rangerName: "Aesha upadhay",
      rangerService: "AC Cleaning",
      rangerPrice: 299,
      hoursWorked: 2,
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
      discountPercent: 10,
      serviceTaxPercent: 18,
      customer:{
        name:'Aesha upadhya',
        number:8310050087,
        location:'678, 7thmain,4th cross, bsd 5th stage , Lovalo road, Bangalore, Karnataka 560087',
        email:"abc213123@gmail.com"
      }
    },
    {
      orderId: "87M89",
      orderTime: new Date("Wed, 27 July 2016 13:30:00"),
      rangerName: "Aesha upadhay",
      rangerService: "AC Cleaning",
      rangerPrice: 299,
      hoursWorked: 1,
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
      discountPercent: 10,
      serviceTaxPercent: 18,
      customer:{
        name:'Aesha upadhya',
        number:8310050087,
        location:'678, 7thmain,4th cross, bsd 5th stage , Lovalo road, Bangalore, Karnataka 560087',
        email:"abc213123@gmail.com"
      }
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
    hoursWorked,
    discountPercent,
    serviceTaxPercent,
    customer,
  }) => {
    let subTotal = rangerPrice * hoursWorked;
    accessorries.forEach((item) => {
      subTotal += item.price * item.units;
    });
    let Total =
      subTotal -
      parseInt((subTotal * discountPercent) / 100) +
      parseInt((subTotal * serviceTaxPercent) / 100);
    return (
      <div className="w-full flex bg-white p-4 border border-background border-2 rounded-3xl  font-bold lg:flex-row md:flex-col">
        <div className="flex w-full flex-col gap-2  p-2">
          <div>
            <h2>Order ID: #{orderId}</h2>
            <p className="text-gray-500 text-[15px]"> 27 July 2016 13:30</p>
          </div>
          <div>
            <table className="w-full text-sm text-center rtl:text-right">
              <thead className=" text-gray-600 font-normal uppercase  ">
                <tr>
                  <th scope="col" className="px-10 py-3">
                    Service and accessorries
                  </th>
                  <th scope="col" className="px-10 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-10 py-3">
                    QTY
                  </th>
                  <th scope="col" className="px-10 py-3">
                    Total
                  </th>
                </tr>
              </thead>
              <tbody>
                <tr className="bg-white font-medium text-gray-500">
                  <td className="px-3 py-2 flex flex-row gap-2  items-center">
                    <img src={admin} className="w-8 h-8" />

                    <div className="flex flex-col">
                      <p className="underline text-black font-medium">
                        
                        {rangerName}
                      </p>
                      <p className="text-xs font-normal text-left">
                        
                        {rangerService}
                      </p>
                    </div>
                  </td>

                  <td className="px-3 py-2">Rs {rangerPrice}/hr</td>
                  <td className="px-3 py-2">
                    {hoursWorked} hr{hoursWorked > 1 && `s`}
                  </td>
                  <td className="px-3 py-2">Rs {rangerPrice * hoursWorked}</td>
                </tr>
                {accessorries.map((item, idx) => {
                  return (
                    <tr className="bg-white font-medium text-gray-500">
                      <td className="px-3 py-2 flex flex-row gap-2 items-center">
                        <img src={accessorriesImg} className="w-8 h-8" />

                        <div className="flex flex-col">
                          <p className=" text-black font-medium">
                            
                            {item.type}
                          </p>
                          <p className="text-xs font-normal text-left">
                          
                            {item.name}
                          </p>
                        </div>
                      </td>

                      <td className="px-3 py-2">Rs {item.price}</td>
                      <td className="px-3 py-2">{item.units}</td>
                      <td className="px-3 py-2">
                        Rs {item.price * item.units}
                      </td>
                    </tr>
                  );
                })}
                <tr className="bg-white font-medium text-gray-500">
                  <td className=""></td>
                  <td className=""></td>
                  <td className=" font-semibold p-1">Sub Total:</td>
                  <td className="p-1">Rs {subTotal}</td>
                </tr>
                <tr className="bg-white font-medium text-gray-500">
                  <td className=""></td>
                  <td className=""></td>
                  <td className="p-1 font-semibold">Discount:</td>
                  <td className="p-1">
                    -{parseInt((subTotal * discountPercent) / 100)}
                  </td>
                </tr>
                <tr className="bg-white font-medium text-gray-500">
                  <td className=""></td>
                  <td className=""></td>
                  <td className="p-1 font-semibold">Tax:</td>
                  <td className="p-1">
                    +{parseInt((subTotal * serviceTaxPercent) / 100)}
                  </td>
                </tr>
                <tr className="bg-white font-medium text-gray-500 border-t">
                  <td className=""></td>
                  <td className=""></td>
                  <td className="p-1 text-black font-bold">Total:</td>
                  <td className="p-1 text-black font-bold">{Total}</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
        <div className="w-fit m-2 border-background border-2 flex gap-5 flex-col p-3 rounded-3xl">
          <h5 className="text-gray-500 text-lg  text-center">
            Customer Details
          </h5>
          <div className="flex gap-5 items-center p-5">
            <img src={admin} className="w-13 h-13 rounded-full" />
            <p className="">{customer.name}</p>
          </div>
          <div className="flex flex-row px-5 gap-10 justify-around">
                <div className="w-3/6 ">
                    <p className="font-medium text-gray-600"><span className="font-semibold text-black"> Location: </span> {customer.location}</p>
                </div>
                <div className="w-3/6 flex  flex-col gap-3">
                    <p className="font-medium text-gray-600"><span className="font-semibold text-black"> Email: </span><br/> {customer.email}</p>
                    <p className="font-medium text-gray-600"><span className="font-semibold text-black"> Number: </span>{customer.number}</p>
                </div>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="p-10  w-screen md:w-full bg-background grid grid-cols-1">
      <div className="flex flex-wrap text-sm font-medium text-center text-gray-500  ">
        <div
          className={cn({
            "inline-block p-4 gap-3 flex flex-row items-center rounded-t-2xl hover:text-gray-600 hover:bg-gray-50 cursor-pointer font-semibold":
              !showPending,
            "inline-block p-4 gap-3  flex flex-row text-black items-center font-semibold bg-white rounded-t-2xl active cursor-pointer":
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
              "bg-background px-3 py-1 rounded-lg": showPending,
              "bg-gray-500 text-white px-3 py-1 rounded-lg": !showPending,
            })}
          >
            {pendingOrders.length}
          </div>
        </div>
        <div
          className={cn({
            "inline-block p-4 gap-3 flex flex-row rounded-t-2xl items-center hover:text-gray-600 hover:bg-gray-50 cursor-pointer font-semibold":
              !showCompleted,
            "inline-block p-4 gap-3  flex flex-row text-black items-center font-semibold bg-white rounded-t-2xl active cursor-pointer":
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
              "bg-background px-2 py-1  rounded-lg": showCompleted,
              "bg-gray-500 text-white px-2  py-1 rounded-lg": !showCompleted,
            })}
          >
            {pendingOrders.length}
          </div>
        </div>
      </div>
      <div className="bg-white p-5 flex flex-col gap-5  rounded-tr-3xl rounded-b-3xl">
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
                hoursWorked={item.hoursWorked}
                customer={item.customer}
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
