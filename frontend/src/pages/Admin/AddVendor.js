import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import uploadToAzureStorage from "../../util/uploadToAzureStorage";
import { useNavigate } from "react-router-dom";

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
      serviceList: [selectedService],
    };

    console.log(requestBody);

    try {
      const response = await axios.post(
        `${BASE_URL}vendor/addVendor`,
        requestBody
      );
      console.log(response.data);
      navigate(`/admin/vendors`);
    } catch (error) {
      console.error(error, { success: false, msg: "Could not add vendor" });
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Last name
                </label>
                <input
                  type="text"
                  id="lastName"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Last Name"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="phoneNumber"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Phone Number
                </label>
                <input
                  type="tel"
                  id="phoneNumber"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="98XXXXXX99"
                  pattern="[0-9]{10}"
                  required
                  onChange={(e) => setPhone(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="email"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="your@email.com"
                  required
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="gstIn"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  GST Number
                </label>
                <input
                  type="text"
                  id="gstIn"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="29ABCDE1111LAZ"
                  pattern="[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[Zz]{1}[0-9]{1}"
                  required
                  onChange={(e) => setGstIn(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="password"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
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
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Shop Name
                </label>
                <input
                  type="text"
                  id="shopName"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Shop Name"
                  required
                  onChange={(e) => setShopName(e.target.value)}
                />
              </div>
              <div className="px-5">
                <label
                  htmlFor="serviceList"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Select Service
                </label>
                <select
                  id="serviceList"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                  onChange={(e) => setSelectedService(e.target.value)}>
                  <option value="">Select an option</option>
                  {service?.map((service) => (
                    <option key={service?._id} value={service?._id}>
                      {service?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
            <div className="mb-6 px-5 py-2">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Address
              </label>
              <textarea
                type="text"
                id="address"
                className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Your address"
                required
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>
            
              <div className="px-5 w-1/3">
                <label
                  htmlFor="pincode"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Postal Pincode
                </label>
                <input
                  type="number"
                  id="pincode"
                  className="bg-gray-50 border-gray-500  border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="110001"
                  required
                  onChange={(e) => setPinCode(e.target.value)}
                  min={0}
                  maxLength={6}
                />
              </div>
            

            <div className="flex flex-col items-center mb-6">
              <div className="mx-auto max-w-xs">
                <label
                  htmlFor="example1"
                  className="mb-1 block text-sm font-medium text-gray-700">
                  Profile Picture
                </label>
                <input
                  id="example1"
                  accept="image/*"
                  type="file"
                  className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                  required
                  onChange={handleFileUpload}
                />
              </div>
              {uploadedUrl && (
                <div className="mt-2 flex justify-center">
                  <img src={uploadedUrl} className="h-32 w-32" alt="Uploaded" />
                </div>
              )}
            </div>

            <div className=" bottom-0 left-0 w-full flex justify-center p-4">
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 ">
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
