import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import uploadToAzureStorage from "../../util/uploadToAzureStorage";
import { useLocation, useNavigate } from "react-router-dom";
import { FaTimes } from "react-icons/fa";

const AddVendor = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [gstIn, setGstIn] = useState();
  const [shopName, setShopName] = useState();
  const [shopAddress, setShopAddress] = useState();
  const [pinCode, setPinCode] = useState();
  const [service, setService] = useState([]);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedService, setSelectedService] = useState("");

  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState();

  const navigate = useNavigate();
  const location = useLocation();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileUpload = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const blobName = file?.name;
    const url = await uploadToAzureStorage(file, blobName);
    setUploadedUrl(url);
  };

  const addVendor = async (e) => {
    e.preventDefault();
  
    const requestBody = {
      email: email,
      phone: phone,
      password: password,
      profilePic: uploadedUrl,
      firstName: firstName,
      lastName: lastName,
      address: shopAddress,
      pincode: pinCode,
      shopName: shopName,
      shopGstNo: gstIn,
      serviceList: selectedService.map((service) => service._id),
    };
  
    console.log("Request Body:", requestBody);
  
    try {
      const response = await axios.post(
        `${BASE_URL}vendor/addVendor`,
        requestBody
      );
      console.log("Response:", response);
  
      if (location.pathname.includes("/vro")) {
        alert('Vendor added successfully');
        navigate(`/vro/vendors`);
      } else {
        navigate(`/admin/vendors`);
      }
    } catch (error) {
      console.error("Error:", error.response);
      alert(`Could not add Vendor: ${error.response?.data?.message || error.message}`);
    }
  };
  

  useEffect(() => {
    const getAllServices = async () => {
      try {
        const response = await axios.get(`${BASE_URL}service/getAllServices`);
        console.log(response?.data);
        setService(response?.data?.serviceDoc);
      } catch (error) {
        console.error(error);
      }
    };
    getAllServices();
  }, []);

  const handleServiceChange = (e) => {
    const { options } = e.target;
    const selected = [];
    for (const option of options) {
      if (option.selected) {
        const serviceObj = service.find((svc) => svc._id === option.value);
        if (serviceObj) {
          selected.push(serviceObj);
        }
      }
    }
    setSelectedService(selected);
  };

  const removeService = (serviceId) => {
    setSelectedService((prevSelectedServices) =>
      prevSelectedServices.filter((service) => service._id !== serviceId)
    );
  };

  return (
    <>
      <>
        <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
          <h1 className="text-2xl font-medium">Add Vendor</h1>
          <form onSubmit={addVendor} className="bg-white rounded-2xl border-slate-300 border">
            <div className="grid gap-6 mb-6 md:grid-cols-2">
              <div className="px-5 pt-5">
                <label
                  htmlFor="firstName"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  First name
                </label>
                <input
                  type="text"
                  id="firstName"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="First Name"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div className="px-5 pt-5">
                <label
                  htmlFor="lastName"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Last Name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="98XXXXXX99"
                  maxLength={10}
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="your@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="gstIn"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  GST Number
                </label>
                <input
                  type="text"
                  id="gstIn"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="29ABCDE1111LAZ"
                  // pattern="[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[Zz]{1}[0-9]{1}"
                  required
                  onChange={(e) => setGstIn(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  Password
                </label>
                <div className="relative flex items-center">
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10" // added pr-10
                    placeholder="*********"
                    required
                    onChange={(e) => setPassword(e.target.value)}
                  />
                  <div
                    onClick={togglePasswordVisibility}
                    className="absolute right-3 text-gray-600 cursor-pointer">
                    {showPassword ? <FaEyeSlash /> : <FaEye />}
                  </div>
                </div>
              </div>
              <div className="px-5">
                <label
                  htmlFor="shopName"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  Shop Name
                </label>
                <input
                  type="text"
                  id="shopName"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  placeholder="Shop Name"
                  required
                  onChange={(e) => setShopName(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="serviceList"
                  className="block mb-2 text-sm font-medium text-gray-900 ">
                  Select Service
                </label>
                <select
                  id="serviceList"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                  required
                  multiple
                  value={selectedService && selectedService.map((service)=> service._id)}
                  onChange={handleServiceChange}>
                  <option value="">Select an option</option>
                  {service?.map((service) => (
                    <option key={service?._id} value={service?._id}>
                      {service?.name}
                    </option>
                  ))}
                </select>
              </div>
              <div className="p-5">
              <h3 className="text-lg font-semibold mb-2">Selected Services:</h3>
              <div className="flex flex-wrap gap-2">
                {selectedService && selectedService.map((service) => (
                  <div
                    key={service._id}
                    className="flex items-center bg-gray-200 p-2 rounded-md">
                    <span>{service.name}</span>
                    <FaTimes
                      className="ml-2 text-red-500 cursor-pointer"
                      onClick={() => removeService(service._id)}
                    />
                  </div>
                ))}
              </div>
            </div>
            </div>
            <div className="grid gap-6 md:gap-14 mb-6 md:grid-cols-2 px-5">
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900">
                Address
              </label>
              <textarea
                type="text"
                id="address"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Your address"
                required
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>
            <div className="w-full">
                <label
                  htmlFor="pincode"
                  className="block mb-2 text-sm font-medium text-gray-900">
                  Postal Pincode
                </label>
                <input
                  type="number"
                  id="pincode"
                  className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                  placeholder="110001"
                  required
                  onChange={(e) => setPinCode(e.target.value)}
                  min={0}
                  maxLength={6}
                />
              </div>
            </div>

            <div className="flex flex-col items-center mb-6">
            <div className="mx-auto max-w-xs">
              <label
                htmlFor="example1"
                className="mb-1 block text-sm font-medium text-gray-700"
              >
                Choose profile photo
              </label>
              <div className="flex w-full items-center justify-center">
                <label
                  htmlFor="dropzone-file"
                  className="flex h-64 w-full cursor-pointer flex-col items-center justify-center rounded-lg border-2 border-dashed border-gray-300 bg-gray-50 hover:bg-gray-100"
                >
                  <div className="flex flex-col items-center justify-center pt-5 pb-6">
                    {uploadedUrl ? (
                      <img
                        className="h-48 w-full"
                        src={uploadedUrl}
                        alt="uploaded image"
                      />
                    ) : (
                      <>
                        <svg
                          aria-hidden="true"
                          className="mb-3 h-10 w-10 text-gray-400"
                          fill="none"
                          stroke="currentColor"
                          viewBox="0 0 24 24"
                          xmlns="http://www.w3.org/2000/svg"
                        >
                          <path
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="M7 16l-4-4m0 0l4-4m-4 4h18m-10 4v6m0 0l4-4m-4 4l-4-4"
                          ></path>
                        </svg>
                        <p className="mb-2 text-sm text-gray-500">
                          <span className="font-semibold">Click to upload</span>
                        </p>
                        <p className="text-xs text-gray-500">
                          PNG, JPG (MAX. 800x400px)
                        </p>
                      </>
                    )}
                  </div>
                  <input
                    id="dropzone-file"
                    type="file"
                    className="hidden"
                    onChange={handleFileUpload}
                  />
                </label>
              </div>
            </div>
          </div>

            <div className=" bottom-0 left-0 w-full flex justify-center p-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">
                Add Vendor
              </button>
            </div>
          </form>
        </section>
      </>
    </>
  );
};

export default AddVendor;
