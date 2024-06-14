import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import uploadToAzureStorage from "../../utils/uploadToAzureStorage";

const AddRanger = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [aadharNo, setAadharNo] = useState("");
  const [panNo, setPanNo] = useState("");
  const [pincode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [gender, setGender] = useState("");
  const [service, setService] = useState([]);
  const [vendorId, setVendorId] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [selectedService, setSelectedService] = useState("");
  
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [aadharImgUrl, setAadharImgUrl] = useState("");
  const [panImgUrl, setPanImgUrl] = useState("");

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    const blobName = file?.name;
    const url = await uploadToAzureStorage(file, blobName);

    if (type === "profile") {
      setProfilePicUrl(url);
    } else if (type === "aadhar") {
      setAadharImgUrl(url);
    } else if (type === "pan") {
      setPanImgUrl(url);
    }
  };

  const addRanger = async (e) => {
    e.preventDefault();

    const requestBody = {
      email,
      phone,
      password,
      profilePic: profilePicUrl,
      firstName,
      lastName,
      vendorId,
      aadharNo,
      panNo,
      gender,
      address,
      pincode,
      aadharImg: aadharImgUrl,
      panImg: panImgUrl,
      serviceList: [selectedService],
    };

    console.log(requestBody);

    try {
      const response = await axios.post(
        `${BASE_URL}ranger/addRanger`,
        requestBody
      );
      console.log(response.data);
    } catch (error) {
      console.error(error, { success: false, msg: "Could not add ranger" });
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
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col">
      <div className="w-screen md:w-full bg-background p-5 flex justify-between px-10">
        <p className="text-2xl font-bold">Add Ranger</p>
        <div className="relative inline-block text-left">
          <h1>search</h1>
        </div>
      </div>
      <div className=" p-5 ">
        <form
          onSubmit={addRanger}
          className="bg-white rounded-2xl border-slate-300 "
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="p-5">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                First Name
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="First Name"
                required
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Last Name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Last Name"
                required
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="98XXXXXX99"
                pattern="[0-9]{10}"
                required
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="your@email.com"
                required
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="password"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Password
              </label>
              <div className="relative flex items-center">
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
                  placeholder="*********"
                  required
                  onChange={(e) => setPassword(e.target.value)}
                />
                <div
                  onClick={togglePasswordVisibility}
                  className="absolute right-3 text-gray-600 cursor-pointer"
                >
                  {showPassword ? <FaEyeSlash /> : <FaEye />}
                </div>
              </div>
            </div>
            <div className="p-5">
              <label
                htmlFor="aadharNo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Aadhar Number
              </label>
              <input
                type="text"
                id="aadharNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Aadhar Number"
                pattern="[0-9]{12}"
                required
                onChange={(e) => setAadharNo(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="panNo"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                PAN Number
              </label>
              <input
                type="text"
                id="panNo"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="ABCDE1234F"
                pattern="[A-Z]{5}[0-9]{4}[A-Z]{1}"
                required
                onChange={(e) => setPanNo(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="pinCode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pin Code
              </label>
              <input
                type="number"
                id="pinCode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="110001"
                required
                onChange={(e) => setPinCode(e.target.value)}
                min={0}
                maxLength={6}
              />
            </div>
            <div className="mb-6 px-5 py-2">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Address
            </label>
            <textarea
              id="address"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Your address"
              required
              onChange={(e) => setAddress(e.target.value)}
            />
          </div>
            <div className="p-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Gender
              </label>
              <div className="flex items-center">
                <input
                  type="radio"
                  id="male"
                  name="gender"
                  value="MALE"
                  className="mr-2"
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <label
                  htmlFor="male"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Male
                </label>
                <input
                  type="radio"
                  id="female"
                  name="gender"
                  value="FEMALE"
                  className="ml-4 mr-2"
                  required
                  onChange={(e) => setGender(e.target.value)}
                />
                <label
                  htmlFor="female"
                  className="text-sm font-medium text-gray-900 dark:text-white"
                >
                  Female
                </label>
                
                
              </div>
            </div>
            <div className="p-5">
              <label
                htmlFor="serviceList"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Select Service
              </label>
              <select
                id="serviceList"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                required
                onChange={(e) => setSelectedService(e.target.value)}
              >
                <option value="">Select an option</option>
                {service?.map((service) => (
                  <option key={service?._id} value={service?._id}>
                    {service?.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-5">
              <label
                htmlFor="vendorId"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vendor
              </label>
              <input
                type="text"
                id="vendorId"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Vendor ID"
                required
                onChange={(e) => setVendorId(e.target.value)}
              />
            </div>
          </div>
          
          <div className="flex flex-col md:flex-row md:flex-wrap mb-6 px-10 py-2">
            <div className="w-full md:w-auto">
              <label
                htmlFor="profilePic"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload Profile Picture
              </label>
              <input
                id="profilePic"
                accept="image/*"
                type="file"
                className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                required
                onChange={(e) => handleFileUpload(e, "profile")}
              />
              {profilePicUrl && (
                <div className="mt-2 flex justify-center">
                  <img src={profilePicUrl} className="h-32 w-32" alt="Profile" />
                </div>
              )}
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-6">
              <label
                htmlFor="aadharImg"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload Aadhar Image
              </label>
              <input
                id="aadharImg"
                accept="image/*"
                type="file"
                className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                required
                onChange={(e) => handleFileUpload(e, "aadhar")}
              />
              {aadharImgUrl && (
                <div className="mt-2 flex justify-center">
                  <img src={aadharImgUrl} className="h-32 w-32" alt="Aadhar" />
                </div>
              )}
            </div>
            <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-6">
              <label
                htmlFor="panImg"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Upload PAN Image
              </label>
              <input
                id="panImg"
                accept="image/*"
                type="file"
                className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
                required
                onChange={(e) => handleFileUpload(e, "pan")}
              />
              {panImgUrl && (
                <div className="mt-2 flex justify-center">
                  <img src={panImgUrl} className="h-32 w-32" alt="PAN" />
                </div>
              )}
            </div>
          </div>
          <div className="bottom-0 left-0 w-full flex justify-center p-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
            >
              Add Ranger
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddRanger;
