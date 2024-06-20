import React, { useState, useEffect } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { FaSearch } from "react-icons/fa";
import uploadToAzureStorage from "../../utils/uploadToAzureStorage";
import { Navigate, useNavigate } from "react-router-dom";

const VendorAddRanger = () => {
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
  const [selectedService, setSelectedService] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [vendors, setVendors] = useState([]);
  const [selectedVendor, setSelectedVendor] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [aadharImgUrl, setAadharImgUrl] = useState("");
  const [panImgUrl, setPanImgUrl] = useState("");
  const navigate = useNavigate();
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
      vendorId: selectedVendor, // Use selected vendor
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
      if (response.status === 200) {
        alert("Ranger Updated successfully")
      } else {
        alert("Ranger update failed")
      }
      navigate(`/admin/rangers`);
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

  useEffect(() => {
    const getAllVendors = async () => {
      try {
        const response = await axios.get(`${BASE_URL}vendor/getAllVendors`);
        console.log(response?.data);
        setVendors(response?.data?.vendors);
      } catch (error) {
        console.error(error);
      }
    };
    getAllVendors();
  }, []);

  const getVendorName = (vendorId) => {
    const vendor = vendors.find((vendor) => vendor._id === vendorId);
    return vendor ? `${vendor.firstName} ${vendor.lastName}` : "Unknown Vendor";
  };

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col">
      <div className="w-screen md:w-full bg-background p-5 flex justify-between px-10">
        <p className="text-2xl font-bold">Add Ranger</p>
        <div className="relative inline-block text-left">
          <input
            type="text"
            placeholder="Search..."
            className="w-full p-2 pl-10 border rounded-md focus:outline-none"
          />
          <FaSearch
            className="absolute right-4 top-1/2 transform -translate-y-1/2 text-gray-500"
            size={20}
          />
        </div>
      </div>
      <div className="p-5">
        <form
          onSubmit={addRanger}
          className="bg-white rounded-2xl border-slate-300"
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
                placeholder="PAN Number"
                required
                onChange={(e) => setPanNo(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="gender"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Gender
              </label>
              <input
                type="text"
                id="gender"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Gender"
                required
                onChange={(e) => setGender(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="pincode"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Pin Code
              </label>
              <input
                type="text"
                id="pincode"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Pin Code"
                required
                onChange={(e) => setPinCode(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Address
              </label>
              <input
                type="text"
                id="address"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Address"
                required
                onChange={(e) => setAddress(e.target.value)}
              />
            </div>
            <div className="p-5">
              <label
                htmlFor="service"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Service
              </label>
              <select
                id="service"
                value={selectedService}
                onChange={(e) => setSelectedService(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select a service</option>
                {service.map((service) => (
                  <option key={service._id} value={service._id}>
                    {service.name}
                  </option>
                ))}
              </select>
            </div>
            <div className="p-5">
              <label
                htmlFor="vendor"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Vendor
              </label>
              <select
                id="vendor"
                value={selectedVendor}
                onChange={(e) => setSelectedVendor(e.target.value)}
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              >
                <option value="">Select a vendor</option>
                {vendors.map((vendor) => (
                  <option key={vendor._id} value={vendor._id}>
                    {getVendorName(vendor._id)}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <div className="p-5">
            <label
              htmlFor="profilePic"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Profile Picture
            </label>
            <input
              type="file"
              id="profilePic"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => handleFileUpload(e, "profile")}
            />
            {profilePicUrl && (
              <div className="mt-2 flex justify-center">
                <img src={profilePicUrl} className="h-32 w-32" alt="Profile" />
              </div>
            )}
          </div>
          <div className="p-5">
            <label
              htmlFor="aadharImg"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              Aadhar Image
            </label>
            <input
              type="file"
              id="aadharImg"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => handleFileUpload(e, "aadhar")}
            />
            {aadharImgUrl && (
              <div className="mt-2 flex justify-center">
                <img src={aadharImgUrl} className="h-32 w-32" alt="Aadhar" />
              </div>
            )}
          </div>
          <div className="p-5">
            <label
              htmlFor="panImg"
              className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
            >
              PAN Image
            </label>
            <input
              type="file"
              id="panImg"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              onChange={(e) => handleFileUpload(e, "pan")}
            />
            {panImgUrl && (
              <div className="mt-2 flex justify-center">
                <img src={panImgUrl} className="h-32 w-32" alt="PAN" />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            Submit
          </button>
        </form>
      </div>
    </section>
  );
};

export default VendorAddRanger;
