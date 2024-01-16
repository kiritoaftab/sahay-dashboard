import React, { useState, useEffect } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatIndianRupee } from "../../constants";
import { MagnifyingGlassCircleIcon } from "@heroicons/react/24/outline";

const AdminCustomer = () => {
  const [vendorDoc, setVendorDoc] = useState(null);
  const [topProducts, setTopProducts] = useState(null);
  const [K, setK] = useState(3);
  const { auth } = useAuth();
  const customerData = [
    {
      id: "1",
      bannerImage:
        "https://static.vecteezy.com/system/resources/previews/004/341/320/non_2x/man-doing-shopping-flat-concept-icon-guy-hurry-up-with-purchases-bags-sticker-clipart-shopaholic-customer-buyer-cartoon-character-isolated-illustration-on-white-background-vector.jpg",
      category: "Cleaning",
      subCategory: "Home cleaning",
      currentUnit: "1",
      name: "Satoru Gojo",
      orderCount: "1",
      price: "1000",
    },
    {
      id: "2",
      bannerImage:
        "https://static.vecteezy.com/system/resources/previews/004/341/320/non_2x/man-doing-shopping-flat-concept-icon-guy-hurry-up-with-purchases-bags-sticker-clipart-shopaholic-customer-buyer-cartoon-character-isolated-illustration-on-white-background-vector.jpg",
      category: "Cleaning",
      subCategory: "Home cleaning",
      currentUnit: "1",
      name: "Tanjiro",
      orderCount: "1",
      price: "1000",
    },
  ];
  const fetchTopProducts = async (vendorId, K) => {
    if (vendorId) {
      try {
        const res = await axios.post("/products/vendor/fetchTopKProducts/", {
          vendorId: vendorId,
          K: K,
        });
        console.log(res.data);
        setTopProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchVendorData = async (userId) => {
    try {
      const res = await axios.get("/vendor/getVendorByUserId/" + userId);
      console.log(res.data?.userDoc);
      fetchTopProducts(res.data?.userDoc?._id, K);
      setVendorDoc(res.data?.userDoc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVendorData(auth?._id);
  }, []);

  const handleSearch = async (e) => {
    e.preventDefault();
    console.log(K);
    await fetchTopProducts(vendorDoc?._id, K);
  };

  const ProductCard = ({
    id,
    bannerImage,
    category,
    subCategory,
    currentUnit,
    name,
    orderCount,
    price,
  }) => {
    return (
      <div className="items-center w-full bg-white hover:bg-slate-100 border border-gray-200 rounded-lg shadow p-5 mb-3">
        <p className="font-semibold text-black-500 text-md">
          Product id : <span className="text-gray-400">{id}</span>
        </p>
        <div className="grid grid-cols-2 place-items-start gap-4 w-full">
          <img className="h-40 mix-blend-multiply" src={bannerImage} />
          <div className="flex flex-col justify-between h-full">
            <p className="font-bold text-black-800 text-lg">{name}</p>
            <p>
              <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                {category}
              </span>
              <span className="inline-flex items-center px-2 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                {subCategory}
              </span>
            </p>
            <p className="font-semibold">Services recieved : {currentUnit} </p>
            <p className="font-semibold">
              Service Count :
              <span className="font-bold text-md text-green-600">
                {orderCount}
              </span>
            </p>
            <p className="font-semibold">
              Revenue Generated:
              <span className="font-bold text-md text-green-600">
                {formatIndianRupee(orderCount * price)}
              </span>
            </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="p-3 w-screen md:w-full bg-gray-300">
      <div className="bg-white p-5 rounded-lg my-2">
        <p className="text-4xl pb-10 font-bold">Customers</p>
        <p className="text-2xl pb-5 font-bold">
          Total Sales:
          <span className="text-green-800">
            {formatIndianRupee(vendorDoc?.sales)}
          </span>
        </p>

        <div className="grid grid-cols-2 place-items-start my-2">
          <p className="text-xl pb-5 font-semibold">
            Your top {K} services are :
          </p>

          <form
            className="w-full flex flex-row justify-start items-center"
            onSubmit={handleSearch}
          >
            <input
              type="number"
              className="bg-gray-100 p-2 rounded-lg w-4/5 focus:ring-black-600"
              placeholder="Enter number to search for your top products"
              onChange={(e) => setK(e.target.value)}
            />
            <button className="ml-2">
              <MagnifyingGlassCircleIcon className="h-10 w-10" />
            </button>
          </form>
        </div>

        {customerData?.map((item, index) => {
          return (
            <ProductCard
              key={index}
              id={item.id}
              bannerImage={item.bannerImage}
              category={item.category}
              subCategory={item.subCategory}
              currentUnit={item.currentUnit}
              name={item.name}
              orderCount={item.orderCount}
              price={item.price}
            />
          );
        })}
      </div>
    </section>
  );
};

export default AdminCustomer;
