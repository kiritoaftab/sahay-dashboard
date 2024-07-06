import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
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

  console.log(id);

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

    console.log(requestBody);
    navigate(`/admin/vendors`);
    try {
      const response = await axios.post(
        `${BASE_URL}vendor/updateVendor`,
        requestBody
      );
      console.log(response?.data);
    } catch (error) {
      console.error(error, { success: false, msg: "vendor not updated" });
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
          className="bg-white rounded-2xl border-slate-300 border">
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
                className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="First Name"
                required
                value={firstName}
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
                className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Last Name"
                required
                value={lastName}
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
                className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
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
                className="block mb-2 text-sm font-medium text-gray-900 ">
                Email
              </label>
              <input
                type="email"
                id="email"
                className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="your@email.com"
                required
                value={email}
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
                className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="29ABCDE1111LAZ"
                pattern="[0-9]{2}[A-Za-z]{5}[0-9]{4}[A-Za-z]{1}[0-9]{1}[Zz]{1}[0-9]{1}"
                required
                value={gstIn}
                onChange={(e) => setGstIn(e.target.value)}
              />
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
                className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
                placeholder="Shop Name"
                required
                value={shopName}
                onChange={(e) => setShopName(e.target.value)}
              />
            </div>
          </div>
          <div className="mb-6 px-5 py-2">
            <label
              htmlFor="address"
              className="block mb-2 text-sm font-medium text-gray-900 ">
              Address
            </label>
            <textarea
              type="text"
              id="address"
              className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="Your address"
              required
              value={shopAddress}
              onChange={(e) => setShopAddress(e.target.value)}
            />
          </div>
          <div className="px-5 w-1/3">
            <label
              htmlFor="pincode"
              className="block mb-2 text-sm font-medium text-gray-900 ">
              Postal Pincode
            </label>
            <input
              type="number"
              id="pincode"
              className="bg-gray-50 border-gray-500 border  text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 "
              placeholder="110001"
              required
              value={pinCode}
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
                onChange={handleFileChange}
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
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center  ">
              Update Vendor
            </button>
          </div>
        </form>
      </section>
    </>
  );
};

export default EditVendor;
