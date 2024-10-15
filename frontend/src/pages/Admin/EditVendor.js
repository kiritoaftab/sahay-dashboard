import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate, useLocation } from "react-router-dom";
import uploadToAzureStorage from "../../util/uploadToAzureStorage";
import { BASE_URL } from "../../constants";

const EditVendor = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [phone, setPhone] = useState();
  const [email, setEmail] = useState();
  const [gstIn, setGstIn] = useState();
  const [shopName, setShopName] = useState();
  const [shopAddress, setShopAddress] = useState();
  const [pinCode, setPinCode] = useState();
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState();
  const { id } = useParams();

  const navigate = useNavigate();
  const location = useLocation();

  const getVendorById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}vendor/id/${id}`);
      setFirstName(response?.data?.vendorDoc?.firstName);
      setLastName(response?.data?.vendorDoc?.lastName);
      setPhone(response?.data?.vendorDoc?.user?.phone);
      setEmail(response?.data?.vendorDoc?.user?.email);
      setPinCode(response?.data?.vendorDoc?.pincode);
      setShopAddress(response?.data?.vendorDoc?.address);
      setGstIn(response?.data?.vendorDoc?.shopGstNo);
      setShopName(response?.data?.vendorDoc?.shopName);
      setUploadedUrl(response?.data?.vendorDoc?.user?.profilePic);
    } catch (error) {
      console.error(error, { success: false, msg: "Internal Server" });
    }
  };

  const updateVendor = async (e) => {
    e.preventDefault();
    const requestBody = {
      vendorId: id,
      email: email,
      phone: phone,
      profilePic: uploadedUrl,
      firstName: firstName,
      lastName: lastName,
      address: shopAddress,
      pincode: pinCode,
      shopName: shopName,
      shopGstNo: gstIn,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}vendor/updateVendor`,
        requestBody
      );
      console.log(response?.data);

      alert("Vendor updated successfully");
      if (location.pathname.includes("/vro")) {
        navigate(`/vro/vendors`);
      } else {
        navigate(`/admin/vendors`);
      }
    } catch (error) {
      console.error(error, { success: false, msg: "vendor not updated" });
      alert("Could not edit Vendor");
    }
  };

  const handleFileChange = async (e) => {
    const file = e.target.files[0];
    setFile(file);
    const blobName = file?.name;
    const url = await uploadToAzureStorage(file, blobName);
    setUploadedUrl(url);
  };

  useEffect(() => {
    getVendorById();
  }, [id]);

  return (
    <>
      <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
        <h1 className="text-2xl font-medium">Vendor Details</h1>
        <form
          onSubmit={updateVendor}
          className="bg-white rounded-2xl border-slate-300 border"
        >
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="px-5 pt-5">
              <label
                htmlFor="firstName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                First name
              </label>
              <input
                type="text"
                id="firstName"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="First Name"
                required
                value={firstName}
                onChange={(e) => setFirstName(e.target.value)}
              />
            </div>
            <div className="px-5 pt-5">
              <label
                htmlFor="lastName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Last name
              </label>
              <input
                type="text"
                id="lastName"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Last Name"
                required
                value={lastName}
                onChange={(e) => setLastName(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label
                htmlFor="phoneNumber"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Phone Number
              </label>
              <input
                type="tel"
                id="phoneNumber"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="98XXXXXX99"
                pattern="[0-9]{10}"
                required
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label
                htmlFor="email"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="your@email.com"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label
                htmlFor="gstIn"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                GST Number
              </label>
              <input
                type="text"
                id="gstIn"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="29ABCDE1111LAZ"
                required
                value={gstIn}
                onChange={(e) => setGstIn(e.target.value)}
              />
            </div>
            <div className="px-5">
              <label
                htmlFor="shopName"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Shop Name
              </label>
              <input
                type="text"
                id="shopName"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Shop Name"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>

          <div className="grid gap-6 md:gap-14 mb-6 md:grid-cols-2 px-5">
            <div>
              <label
                htmlFor="address"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Address
              </label>
              <textarea
                type="text"
                id="address"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Your address"
                required
                value={shopAddress}
                onChange={(e) => setShopAddress(e.target.value)}
              />
            </div>
            <div className="w-full">
              <label
                htmlFor="pincode"
                className="block mb-2 text-sm font-medium text-gray-900"
              >
                Postal Pincode
              </label>
              <input
                type="number"
                id="pincode"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="110001"
                required
                value={pinCode}
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
                    onChange={handleFileChange}
                  />
                </label>
              </div>
            </div>
          </div>
          <button
            type="submit"
            className="bg-blue-500 mb-5 mt-4 ml-5 w-[200px] items-center rounded-2xl p-2 text-white md:w-[150px]"
          >
            Edit Vendor
          </button>
        </form>
      </section>
    </>
  );
};

export default EditVendor;
