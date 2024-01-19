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
      registeredDate: "15th January 2024",
      LastLogin: "18th January 2024",
      email: "gojo@gmail.com",
      name: "Satoru Gojo",
      phoneNumber: "937848373828",
      serviceNumber: "5",
    },
    {
      id: "2",
      bannerImage:
        "https://static.vecteezy.com/system/resources/previews/004/341/320/non_2x/man-doing-shopping-flat-concept-icon-guy-hurry-up-with-purchases-bags-sticker-clipart-shopaholic-customer-buyer-cartoon-character-isolated-illustration-on-white-background-vector.jpg",
      registeredDate: "15th January 2024",
      LastLogin: "18th January 2024",
      email: "tanjiro@gmail.com",
      name: "Tanjiro",
      phoneNumber: "937848373828",
      serviceNumber: "10",
    },
    {
      id: "3",
      bannerImage:
        "https://static.vecteezy.com/system/resources/previews/004/341/320/non_2x/man-doing-shopping-flat-concept-icon-guy-hurry-up-with-purchases-bags-sticker-clipart-shopaholic-customer-buyer-cartoon-character-isolated-illustration-on-white-background-vector.jpg",
      registeredDate: "15th January 2024",
      LastLogin: "18th January 2024",
      email: "tanjiro@gmail.com",
      name: "Tanjiro",
      phoneNumber: "937848373828",
      serviceNumber: "10",
    },
    {
      id: "4",
      bannerImage:
        "https://static.vecteezy.com/system/resources/previews/004/341/320/non_2x/man-doing-shopping-flat-concept-icon-guy-hurry-up-with-purchases-bags-sticker-clipart-shopaholic-customer-buyer-cartoon-character-isolated-illustration-on-white-background-vector.jpg",
      registeredDate: "15th January 2024",
      LastLogin: "18th January 2024",
      email: "tanjiro@gmail.com",
      name: "Tanjiro",
      phoneNumber: "937848373828",
      serviceNumber: "10",
    },
    {
      id: "5",
      bannerImage:
        "https://static.vecteezy.com/system/resources/previews/004/341/320/non_2x/man-doing-shopping-flat-concept-icon-guy-hurry-up-with-purchases-bags-sticker-clipart-shopaholic-customer-buyer-cartoon-character-isolated-illustration-on-white-background-vector.jpg",
      registeredDate: "15th January 2024",
      LastLogin: "18th January 2024",
      email: "tanjiro@gmail.com",
      name: "Tanjiro",
      phoneNumber: "937848373828",
      serviceNumber: "10",
    },
    {
      id: "6",
      bannerImage:
        "https://static.vecteezy.com/system/resources/previews/004/341/320/non_2x/man-doing-shopping-flat-concept-icon-guy-hurry-up-with-purchases-bags-sticker-clipart-shopaholic-customer-buyer-cartoon-character-isolated-illustration-on-white-background-vector.jpg",
      registeredDate: "15th January 2024",
      LastLogin: "18th January 2024",
      email: "tanjiro@gmail.com",
      name: "Tanjiro",
      phoneNumber: "937848373828",
      serviceNumber: "10",
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
    registeredDate,
    LastLogin,
    email,
    name,
    phoneNumber,
    serviceNumber,
  }) => {
    return (
      <div className="transition duration-300 max-w-2lg bg-white hover:bg-indigo-100 border border-gray-200 rounded-lg lg:flex-row shadow p-5 ">
        <div className="flex flex-col  w-full">
          <div className="flex flex-row  w-full">
            <img className="h-40 mix-blend-multiply mr-1" src={bannerImage} />
            <div className="flex flex-col w-full h-full">
              <p className="font-bold text-black text-lg">{name}</p>
              <p>
                <span className="inline-flex items-center px-1 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                  Registered Date: {registeredDate}
                </span>
                <span className="inline-flex items-center mt-2 px-1 py-1 me-2 text-sm font-medium text-blue-800 bg-blue-100 rounded">
                  Last login Date: {LastLogin}
                </span>
              </p>
            </div>
          </div>
          <div>
          <p className="font-semibold">email: {email}</p>
          <p className="font-semibold">
            Phone Number:{" "}
            <span className="font-bold text-md text-green-600">
              {phoneNumber}
            </span>
          </p>
          <p className="font-semibold">
            Services Taken:{" "}
            <span className="font-bold text-md text-green-600">
              {serviceNumber}
            </span>
          </p>
          </div>
        </div>
      </div>
    );
  };

  return (
    <section className="p-3 w-screen md:w-full h-full bg-background">
      <div className="bg-white p-5 rounded-lg my-2">
        <p className="text-4xl pb-10 font-bold">Customers</p>

        <div className="grid grid-cols-2 place-items-start my-2">
          <form
            className="w-full flex flex-row justify-start items-center"
            onSubmit={handleSearch}
          >
            <input
              type="number"
              className="bg-gray-100 p-2 rounded-lg w-4/5 focus:ring-black-600"
              placeholder="Enter number to search customers with highest number of Services"
              onChange={(e) => setK(e.target.value)}
            />
            <button className="ml-2">
              <MagnifyingGlassCircleIcon className="h-10 w-10" />
            </button>
          </form>
        </div>
        <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-10">
          {customerData?.map((item, index) => {
            return (
              <ProductCard
                key={index}
                id={item.id}
                bannerImage={item.bannerImage}
                registeredDate={item.registeredDate}
                LastLogin={item.LastLogin}
                email={item.email}
                name={item.name}
                phoneNumber={item.phoneNumber}
                serviceNumber={item.serviceNumber}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
};

export default AdminCustomer;
