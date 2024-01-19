import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatIndianRupee } from "../../constants";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const AdminPayment = () => {
  const paymentData = [
    {
      id: "1",

      bookingId: "1",
      serviceAmount: [
        { serviceName: "Service 1", serviceAmount: 50 },
        { serviceName: "Service 2", serviceAmount: 80 },
        { serviceName: "Service 3", serviceAmount: 120 },
      ],
      accessories: [
        { partName: "Accessory 1", amount: 15 },
        { partName: "Accessory 2", amount: 25 },
        { partName: "Accessory 3", amount: 30 },
      ],
      accessoriesAmount: 70,
      totalAmount: 270,
      customer: {
        customerName: "Sharanya",
        phoneNumber: "+91 9876543210",
        shippingAddress: "bangalore, India",
      },
      ranger: {
        Rangername: "Suvi bhatt",
        emailId: "suvibhatt@gmail.com",
        phoneNumber: "+91 9876543288",
      },
      modeOfPayment: "Credit Card",
    },
    {
      id: "1",

      bookingId: "1",
      serviceAmount: [
        { serviceName: "Service 1", serviceAmount: 50 },
        { serviceName: "Service 2", serviceAmount: 80 },
        { serviceName: "Service 3", serviceAmount: 120 },
      ],
      accessories: [
        { partName: "Accessory 1", amount: 15 },
        { partName: "Accessory 2", amount: 25 },
        { partName: "Accessory 3", amount: 30 },
      ],
      accessoriesAmount: 70,
      totalAmount: 270,
      customer: {
        customerName: "Sharanya",
        phoneNumber: "+91 9876543210",
        shippingAddress: "bangalore, India",
      },
      ranger: {
        Rangername: "Suvi bhatt",
        emailId: "suvibhatt@gmail.com",
        phoneNumber: "+91 9876543288",
      },
      modeOfPayment: "Credit Card",
    },
  ];

  const categoryList = [
    "All",
    "Electrician",
    "Ac Repair",
    "Plumber",
    "Carpenter",
    "Pest Control",
  ];

  // const [ranger, setRanger] = useState(rangerList);
  const [category, setCategory] = useState("All");

  const [products, setProducts] = useState([]);
  const [vendorDoc, setVendorDoc] = useState(null);

  const { auth } = useAuth();
  const navigate = useNavigate();

  const fetchTopProduct = async (vendorId) => {
    if (vendorId) {
      try {
        const res = await axios.get("/products/vendor/" + vendorId);
        console.log(res.data);
        setProducts(res.data);
      } catch (error) {
        console.error(error);
      }
    }
  };

  const fetchVendorData = async (userId) => {
    try {
      const res = await axios.get("/vendor/getVendorByUserId/" + userId);
      console.log(res.data?.userDoc);
      setVendorDoc(res.data?.userDoc);
      fetchTopProduct(res.data?.userDoc?._id);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    fetchVendorData(auth?._id);
  }, []);

  // function updateCategory(e) {
  //   const selectedCat = e.target.name;
  //   setCategory(selectedCat);
  //   setDropdown(false);
  //   setRanger(
  //     selectedCat === "All"     ? rangerList
  //       : rangerList.filter((ranger) => {
  //           return ranger.category === selectedCat;
  //         })
  //   );
  // }

  const ProductCard = ({
    id,
    bookingId,
    serviceAmount,
    accessories,
    accessoriesAmount,
    totalAmount,
    customer,
    ranger,
    modeOfPayment,
  }) => {
    return (
      <div className="flex flex-col p-2 w-full bg-white relative border border-black-300 rounded-2xl shadow font-Montserrat md:flex-col smx:flex-col sm:flex-col">
        <div className="p-2 pl-4 flex flex-col justify-around">
          <div className="flex flex-row justify-between">
            <div className="p-2 pl-4 flex flex-col justify-around">
              <p className="font-bold text-md mb-1 text-black-800">
                Customer: {customer.customerName}
              </p>
              <p className="font-bold text-md mb-1 text-black-800">
                Ranger: {ranger.Rangername}
              </p>
            </div>
            <p className="font-bold text-l mb-3 text-black-800 text-right mr-5">
              Booking ID: {bookingId}
            </p>
          </div>
          <div className="flex flex-col-2 justify-between mx-1 mr-5">
            <div>
              <p className="font-semibold text-xl text-black-800 mb-2">
                Services Taken:
              </p>
              <div className="flex flex-col">
                {serviceAmount.map((service, index) => (
                  <p key={index} className="flex-row mb-1 mr-2">
                    {service.serviceName}:
                    {formatIndianRupee(service.serviceAmount)}
                  </p>
                ))}
              </div>
            </div>
            <div>
              <p className="font-semibold text-xl  text-black-800  mb-2 ml-5">
                Accessories:
              </p>
              <div className="flex flex-col">
                {accessories.map((accessory, index) => (
                  <p key={index}>
                    {accessory.partName}: {formatIndianRupee(accessory.amount)}
                  </p>
                ))}
              </div>
            </div>
          </div>
          <div className="flex flex-col ">
            <div className="border-dashed border border-gray-400 p-2 rounded mr-5">
              <div className="flex flex-row justify-between mx-1">
                <p className="font-bold text-md text-black-800  mr-8 ">
                  Accessories Amount:
                </p>
                <p className="font-bold text-md text-black-800  ">
                  {formatIndianRupee(accessoriesAmount)}
                </p>
              </div>
              <div className="flex flex-row justify-between mx-1">
                <p className="font-bold text-md text-black-800  mr-8 ">
                  Total Amount:
                </p>
                <p className="font-bold text-md text-black-800  ">
                  {formatIndianRupee(totalAmount)}
                </p>
              </div>
            </div>

            <div className="flex flex-row justify-between mt-2  mx-1">
              <p className="font-bold text-md text-black-800  mr-8 ">
                Mode of Payment:
              </p>
              <p className="font-bold text-md text-black-800  ">
                {modeOfPayment}
              </p>
            </div>
          </div>
        </div>
      </div>
    );
  };

  const [dropdown, setDropdown] = useState(false);
  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col">
      <section className="grid grid-cols-3 p-3 w-screen md:w-full bg-background gap-4 max-md:grid-cols-1 place-items-center">
        {paymentData?.map((prod, index) => {
          return (
            <ProductCard
              key={index}
              id={prod?.id}
              bookingId={prod?.bookingId}
              serviceAmount={prod?.serviceAmount}
              accessories={prod?.accessories}
              accessoriesAmount={prod?.accessoriesAmount}
              totalAmount={prod?.totalAmount}
              customer={prod?.customer}
              ranger={prod?.ranger}
              modeOfPayment={prod?.modeOfPayment}
            />
          );
        })}
      </section>
    </section>
  );
};

export default AdminPayment;
