import React, { useState } from "react";
import { BASE_URL } from "../../constants";
import axios from "axios";
import uploadToAzureStorage from "../../utils/uploadToAzureStorage";

const AddServices = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [bannerImgUrl, setBannerImgUrl] = useState("");
  const [iconImageUrl, setIconImageUrl] = useState("");

  const handleFileUpload = async (e, type) => {
    const file = e.target.files[0];
    const blobName = file?.name;
    const url = await uploadToAzureStorage(file, blobName);
    if (type === "banner") {
      setBannerImgUrl(url);
    } else if (type === "icon") {
      setIconImageUrl(url);
    }
  };

  const addService = async (e) => {
    e.preventDefault();

    const reqBody = {
      name,
      price,
      bannerImage: bannerImgUrl,  
      iconImage: iconImageUrl,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/service/addServices`,
        reqBody
      );
      console.log(response.data);
      if (response.status === 200) {
        alert("Service added successfully");

        setName("");
        setPrice("");
        setBannerImgUrl("");
        setIconImageUrl("");
      } else {
        alert("Service could not be added");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding service");
    }
  };

  return (
    <section className="w-screen md:w-full lg:w-full xl:w-full h-full bg-background flex flex-col items-center py-8">
      <div className="w-full p-3 flex justify-center">
        <p className="text-2xl font-bold">Add Services</p>
      </div>
      <div className="bg-white shadow-md rounded-lg p-6 w-full max-w-2xl">
        <form onSubmit={addService}>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="p-3">
              <label
                htmlFor="serviceName"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Service Name
              </label>
              <input
                type="text"
                id="serviceName"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Service Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
              />
            </div>
            <div className="p-3">
              <label
                htmlFor="servicePrice"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Service Price
              </label>
              <input
                type="number"
                id="servicePrice"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                placeholder="Service Price"
                value={price}
                onChange={(e) => setPrice(e.target.value)}
                required
              />
            </div>
          </div>
          <div className="grid gap-6 mb-6 md:grid-cols-2">
            <div className="p-3">
              <label
                htmlFor="bannerPic"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Banner Image
              </label>
              <input
                accept="image/*"
                type="file"
                id="bannerPic"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => handleFileUpload(e, "banner")}
              />
              {bannerImgUrl && (
                <div className="mt-2 flex justify-center">
                  <img src={bannerImgUrl} className="h-32 w-32" alt="Banner" />
                </div>
              )}
            </div>
            <div className="p-3">
              <label
                htmlFor="iconPic"
                className="block mb-2 text-sm font-medium text-gray-900 "
              >
                Service Icon
              </label>
              <input
              accept="image/*"
                type="file"
                id="iconPic"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
                onChange={(e) => handleFileUpload(e, "icon")}
              />
              {iconImageUrl && (
                <div className="mt-2 flex justify-center">
                  <img src={iconImageUrl} className="h-32 w-32" alt="Icon" />
                </div>
              )}
            </div>
          </div>
          <div className="flex justify-center p-4">
            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center "
            >
              Add Service
            </button>
          </div>
        </form>
      </div>
    </section>
  );
};

export default AddServices;
