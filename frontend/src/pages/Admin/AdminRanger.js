import React, { useEffect, useState } from "react";
import { TrashIcon } from "@heroicons/react/24/outline";
import useAuth from "../../hooks/useAuth";
import axios from "../../axiosInstance/axiosApi";
import { formatIndianRupee } from "../../constants";
import { useNavigate } from "react-router-dom";

const AdminRanger = () => {
  const rangerList = [
    {
      id: "1",
      name: "Ranger 1",
      desc: "Excellent performance",
      category: "Electrician",
      price: "90000",
      policeVerification: true,
      orderCount: "0",
      currentUnit: "20",
      isVerified: true,
      phone: "8618227097",
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "2",
      name: "Ranger 2",
      desc: "Excellent performance",
      category: "Ac Repair",
      price: "90000",
      policeVerification: false,
      orderCount: "0",
      currentUnit: "20",
      isVerified: false,
      phone: "8618227097",
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "3",
      name: "Ranger 3",
      desc: "Excellent performance",
      category: "Plumber",
      price: "90000",
      policeVerification: true,
      orderCount: "0",
      currentUnit: "20",
      isVerified: true,
      phone: "8618227097",
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "4",
      name: "Ranger 4",
      desc: "Excellent performance",
      category: "Carpenter",
      price: "90000",
      policeVerification: false,
      orderCount: "0",
      currentUnit: "20",
      isVerified: false,
      phone: "8618227097",
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "5",
      name: "Ranger 5",
      desc: "Excellent performance",
      category: "Pest Control",
      price: "90000",
      policeVerification: false,
      orderCount: "0",
      currentUnit: "20",
      isVerified: false,
      phone: "8618227097",
      bannerImage:
        "https://cdn01.alison-static.net/courses/5657/alison_courseware_intro_5657.jpg",
    },
    {
      id: "6",
      name: "Ranger 1",
      desc: "Excellent performance",
      category: "Electrician",
      price: "90000",
      policeVerification: false,
      orderCount: "0",
      currentUnit: "20",
      isVerified: true,
      phone: "8618227097",
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

  function updateCategory(e) {
    const selectedCat = e.target.name;
    setCategory(selectedCat);
    setDropdown(false);
    setRanger(
      selectedCat === "All"
        ? rangerList
        : rangerList.filter((ranger) => {
            return ranger.category === selectedCat;
          })
    );
  }

  const [dropdown, setDropdown] = useState(false);

  return (
    <section className="w-screen md:w-full h-full bg-background gap-4 flex flex-col">
      <div className="w-screen md:w-full bg-white p-4 flex justify-between px-10 ">
        <p className="text-2xl font-bold">Ranger Details</p>
        <div className="relative inline-block text-left">
          <div>
            <button
              type="button"
              className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50"
              id="menu-button"
              aria-expanded="true"
              aria-haspopup="true"
              onClick={() => setDropdown(!dropdown)}
            >
              {category === "All" ? "Select Category" : category}
              <svg
                className="-mr-1 h-5 w-5 text-gray-400"
                viewBox="0 0 20 20"
                fill="currentColor"
                aria-hidden="true"
              >
                <path
                  fillRule="evenodd"
                  d="M5.23 7.21a.75.75 0 011.06.02L10 11.168l3.71-3.938a.75.75 0 111.08 1.04l-4.25 4.5a.75.75 0 01-1.08 0l-4.25-4.5a.75.75 0 01.02-1.06z"
                  clipRule="evenodd"
                />
              </svg>
            </button>
          </div>

          <div
            className={
              dropdown
                ? ` absolute right-0 z-10 mt-2 w-56 origin-top-right rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none`
                : "hidden"
            }
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
      <section className="w-screen md:w-full bg-background p-4">
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Name</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Phone</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Services</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Booking</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Revenue</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Details</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Action</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {ranger.map((ranger, index) => (
              <tr key={index}>
                
                <td className="px-6 py-4 whitespace-nowrap flex items-center">
                    <img
                      src={ranger.bannerImage}
                      className="h-10 w-10 rounded-full object-cover mr-4"
                      alt={ranger.name}
                    />
                    <span className="text-sm font-medium text-gray-900">
                      {ranger.name}
                    </span>
                  </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ranger.phone}</td>
                <div className=" my-3 rounded-xl bg-[#FFB0153D]  font-semibold">
                <td className="px-2 py-2 whitespace-nowrap text-sm text-black text-center">{ranger.category}</td>
                </div>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{ranger.orderCount}</td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{formatIndianRupee(ranger.price)}</td>
                <td className="">
                  {/* {ranger.policeVerification ? (
                    <p className="font-semibold text-green-500">Legally verified!</p>
                  ) : (
                    <p className="font-semibold text-red-500">Not verified!</p>
                  )} */}
                  <button
                    onClick={() => navigate(`/admin/rangers/${ranger.id}`)}
                    className="text-white px-2 py-2 whitespace-nowrap text-sm  rounded-xl bg-indigo-500"
                  >
                    View More
                  </button>
                </td>
                <td class="px-6 py-4">
                      <button>
                        <TrashIcon className="h-5 w-5 mr-2 text-red-500" />
                      </button>
                      <button>
                        <label class="inline-flex items-center cursor-pointer">
                          <input
                            type="checkbox"
                            value=""
                            class="sr-only peer"
                          />
                          <div class="relative w-11 h-6 bg-red-500  rounded-full peer peer-checked:after:translate-x-full rtl:peer-checked:after:-translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:start-[2px] after:bg-white after:border-green-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-green-600"></div>
                        </label>
                      </button>
                    </td>
              </tr>
            ))}
          </tbody>
        </table>
      </section>
    </section>
  );
};

export default AdminRanger;
