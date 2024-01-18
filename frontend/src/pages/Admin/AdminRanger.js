import React, { useEffect, useState } from "react";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatIndianRupee } from "../../constants";
import { ArrowLongRightIcon } from "@heroicons/react/24/outline";
import { useNavigate } from "react-router-dom";
import { CheckBadgeIcon } from "@heroicons/react/24/outline";

const AdminRanger = () => {
  const rangerList = [
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      category: "Electrician",
      price: "90000",
      prodStatus: "VERIFIED",
      orderCount: "0",
      currentUnit: "20",
      isVerified: true,
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "2",
      name: "Ranger 2",
      desc: "Excellent performance",
      category: "Ac Repair",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      isVerified: false,
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "3",
      name: "Ranger 3",
      desc: "Excellent performance",
      category: "Plumber",
      price: "90000",
      prodStatus: "VERIFIED",
      orderCount: "0",
      currentUnit: "20",
      isVerified: true,
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "4",
      name: "Ranger 4",
      desc: "Excellent performance",
      category: "Carpenter",
      price: "90000",
      prodStatus: "IN_PROGRESS",
      orderCount: "0",
      currentUnit: "20",
      isVerified: false,
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "5",
      name: "Ranger 5",
      desc: "Excellent performance",
      category: "Pest Control",
      price: "90000",
      prodStatus: "REJECTED",
      orderCount: "0",
      currentUnit: "20",
      isVerified: false,
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "6",
      name: "Ranger 1",
      desc: "Excellent performance",
      category: "Electrician",
      price: "90000",
      prodStatus: "VERIFIED",
      orderCount: "0",
      currentUnit: "20",
      isVerified: true,
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
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

  const [ranger, setRanger] = useState(rangerList);
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

  function updateCategory(e){
    const selectedCat = e.target.name;
    setCategory(selectedCat);
    setDropdown(false)
    setRanger(selectedCat === "All"? rangerList :
      rangerList.filter((ranger) => {
        return ranger.category === selectedCat;
      })
    );
  }

  const ProductCard = ({
    img,
    name,
    category,
    price,
    isVerified,
    prodStatus,
    orderCount,
    currentUnit,
    id,
  }) => {
    return (
      <div className="flex  lg:flex-row  p-2 w-full bg-white relative border border-black-300 rounded-2xl shadow font-Montserrat px-2 md:flex-col smx:flex-col sm:flex-col">
        
        <img src={img} className="object-contain h-64 w-64 bg-gray-200 rounded-2xl" />
        <div className="p-2 pl-4 flex flex-col justify-around ">
          <p className="font-bold text-xl text-black-800">{name}</p>
          <p>{category}</p>
          <p className="font-bold text-md text-gray-600">
            {formatIndianRupee(price)} /-
          </p>
          {prodStatus === "IN_PROGRESS" ? (
            <p className="font-normal w-fit text-lg text-teal-500 bg-teal-400/[.30] px-2 rounded-lg">
              Police verification in progress!
            </p>
          ) : prodStatus === "VERIFIED" ? (
            <p className="font-normal w-fit text-lg text-green-500 bg-green-400/[.30] px-2 rounded-lg">
              Police verification Done!
            </p>
          ) : prodStatus === "REJECTED" ? (
            <p className="font-normal w-fit text-lg text-red-500  bg-red-400/[.30] px-2 rounded-lg">
              Police verification Rejected!
            </p>
          ) : (
            ``
          )}
          <p className="font-bold text-md text-black-800">
            Total orders :
            <span className="text-green-800 text-lg">{orderCount}</span>
          </p>
          <p className="font-bold text-md text-black-800">
            Units :<span className="text-green-800 text-lg">{currentUnit}</span>
          </p>
          <button
            onClick={() => navigate(`/admin/rangers/${id}`)}
            className="text-end w-[150px] font-light rounded-lg bg-primary text-white text-lg p-1 flex flex-row justify-center items-center hover:underline "
          >
            <p className="mr-3 font-medium">View More </p>
            <ArrowLongRightIcon height={20} width={20} />
          </button>
        </div>
      </div>
    );
  };
  const [dropdown,setDropdown]= useState(false)
  return (
    <section className="w-screen md:w-full h-full bg-background gap-4 flex flex-col">
      <div className="w-screen md:w-full bg-white p-4 flex justify-between px-10 ">
        <p className="text-2xl font-bold">Ranger Details</p>
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              class=" inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setDropdown(!dropdown)}
            >
              {category=== 'All'? "Select Category" : category}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fill-rule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clip-rule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className={dropdown? ` absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`:'hidden'}
            role="menu"
            aria-orientation="vertical"
            
          >
            <div className="py-1" role="none">
              {categoryList.map((cat, index) => {
                return (
                  <a
                    href="#"
                    key={index}
                    className="text-gray-700 block px-4 py-2 text-sm hover:underline "
                    onClick={updateCategory}
                    name={cat}
                  >
                    {cat}
                  </a>
                );
              })}
            </div>
          </div>
        </div>
      </div>
      <section className="grid grid-cols-2 p-3 w-screen md:w-full bg-background gap-4 max-md:grid-cols-1 place-items-center">
        {ranger?.map((prod, index) => {
          return (
            <ProductCard
              key={index}
              id={prod?.id}
              img={prod?.bannerImage}
              name={prod?.name}
              category={prod?.category}
              price={prod?.price}
              prodStatus={prod?.prodStatus}
              orderCount={prod?.orderCount}
              currentUnit={prod?.currentUnit}
              isVerified={prod?.isVerified}
            />
          );
        })}
      </section>
    </section>
  );
};

export default AdminRanger;
