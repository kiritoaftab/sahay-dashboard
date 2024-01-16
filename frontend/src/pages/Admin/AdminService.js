import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatDate, formatIndianRupee } from "../../constants";
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
    return (
      <div className="border border-gray-500 rounded-md p-2">
        <p>Product Id : {id}</p>
        <div className="flex flex-row p-1 items-center justify-evenly">
          <img className="h-40" src={bannerImage} />
          <div>
            <p>{name}</p>
            <p>Quantity : {quantity}</p>
            <p>Price: {formatIndianRupee(price)}</p>
          </div>
        </div>
      </div>
    );
  };

  const OrderCard = ({
    id,
    orderDate,
    orderStatus,
    shippingAddress,
    customer,
    items,
  }) => {
    let totalOrderValue = 0;
    return (
      <div className="w-full bg-white p-4 border border-gray-200 rounded-lg shadow font-bold">
        <p className="my-2">
          Order id :
          <span className="px-3 border border-gray-300 rounded-full bg-gray-200 text-base text-gray-700 font-medium">
            {id}
          </span>
        </p>
        <div className="flex flex-row justify-start my-2">
          <p>
            Order Status :
            <span className="px-3 border border-green-300 rounded-full bg-green-200 text-base text-black-700 font-medium">
              {orderStatus}
            </span>
          </p>
          <p className="mx-auto">
            Order Date :
            <span className="px-3 border border-gray-300 rounded-full bg-gray-200 text-base text-gray-700 font-medium">
              {formatDate(orderDate)}
            </span>
          </p>
        </div>

        <p className="my-2">
          Shipping Address :

          <span className="text-base text-black-700 font-medium">
            {shippingAddress}
          </span>
        </p>
        <p>Items </p>
        {rangers?.map((item, index) => {
          const itemValue = item?.quantity * item?.product?.price;
          totalOrderValue += itemValue;
          return (
            <ItemCard
              key={index}
              id={rangers.id}
              name={rangers.name}
              bannerImage={rangers.bannerImage}
              quantity={rangers.quantity}
              price={rangers.price}
            />
          );
        })}
        <p className="mt-3">
          Total Order Value : {formatIndianRupee(totalOrderValue)}
        </p>
      </div>
    );
  };

  return (
    <section className="p-3 w-screen md:w-full bg-gray-300 grid grid-cols-1">
      <div className="flex flex-wrap text-sm font-medium text-center text-gray-500 border-b border-gray-200">
        <div
          className={cn({
            "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50":
              !showPending,
            "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active":
              showPending,
          })}
          onClick={() => {
            setShowPending(true);
            setShowCompleted(false);
          }}
        >
          Orders Pending
        </div>
        <div
          className={cn({
            "inline-block p-4 rounded-t-lg hover:text-gray-600 hover:bg-gray-50":
              !showCompleted,
            "inline-block p-4 text-blue-600 bg-gray-100 rounded-t-lg active":
              showCompleted,
          })}
          onClick={() => {
            setShowPending(false);
            setShowCompleted(true);
          }}
        >
          Orders Completed
        </div>
      </div>
      <div>
        {showPending ? (
          //  Array.isArray(ordersPendingDoc) ? ordersPendingDoc.map((order,index)=> {
          orderData.map((item, index) => {
            return (
              <OrderCard
                key={index}
                id={item.id}
                orderDate={item.orderDate}
                orderStatus={item.orderStatus}
                shippingAddress={item.shippingAddress}
                customer={item.customer}
                items={item.items}
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
