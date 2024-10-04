import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";
import uploadToAzureStorage from "../../util/uploadToAzureStorage";
import { BASE_URL } from "../../constants";

const EditService = () => {
  const [name, setName] = useState("");
  const [price, setPrice] = useState("");
  const [desc, setDesc] = useState("");
  const [bannerImage, setBannerImage] = useState("");
  const [iconImage, setIconImage] = useState("");
  const [uploadedBannerUrl, setUploadedBannerUrl] = useState("");
  const [uploadedIconUrl, setUploadedIconUrl] = useState("");
  const { id } = useParams();
  const navigate = useNavigate();

  // Fetch service data by ID and pre-fill the form
  const getServiceById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/service/getServicesById/${id}`);
      const serviceData = response.data.serviceDoc;
      setName(serviceData.name);
      setPrice(serviceData.price);
      setDesc(serviceData.desc);
      setBannerImage(serviceData.bannerImage);
      setIconImage(serviceData.iconImage);
      console.log("Service data:", serviceData);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  // Update service request
  const updateService = async (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      price,
      bannerImage: uploadedBannerUrl || bannerImage,  // Use new URL or existing image
      iconImage: uploadedIconUrl || iconImage,
      desc,
    };

    try {
      const response = await axios.post(`${BASE_URL}/service/updateService/${id}`, requestBody);
      console.log("Service updated:", response.data);
      if (response.status === 200) {
        alert("Service Updated successfully");
      } else {
        alert("Service update failed");
      }
      navigate(`/admin/allServices`);
    } catch (error) {
      console.error("Error updating service:", error);
    }
  };

  // Handle banner image upload
  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobName = file.name;
      try {
        const url = await uploadToAzureStorage(file, blobName);
        setUploadedBannerUrl(url);
      } catch (error) {
        console.error("Error uploading banner image:", error);
      }
    }
  };

  // Handle icon image upload
  const handleIconChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const blobName = file.name;
      try {
        const url = await uploadToAzureStorage(file, blobName);
        setUploadedIconUrl(url);
      } catch (error) {
        console.error("Error uploading icon image:", error);
      }
    }
  };

  // Fetch service data when component mounts
  useEffect(() => {
    getServiceById();
  }, [id]);

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
      <h1 className="text-2xl font-medium">Edit Service</h1>
      <form onSubmit={updateService} className="bg-white rounded-2xl border-slate-300 border">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="px-5 pt-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900">
              Service Name
            </label>
            <input
              type="text"
              id="name"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Service Name"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
            />
          </div>
          <div className="px-5 pt-5">
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900">
              Price
            </label>
            <input
              type="number"
              id="price"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Price"
              required
              value={price}
              onChange={(e) => setPrice(e.target.value)}
            />
          </div>
          <div className="px-5 pt-5">
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900">
              Description
            </label>
            <textarea
              id="desc"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Description"
              required
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
            />
          </div>
        </div>

        {/* Banner Image Section */}
        <div className="mb-6 px-5 py-2">
          <label htmlFor="bannerImageInput" className="block mb-2 text-sm font-medium text-gray-900">
            Banner Image
          </label>
          <div
            className="flex flex-col items-center justify-center w-full h-48 lg:h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            onClick={() => document.getElementById("bannerImageInput").click()}
          >
            {uploadedBannerUrl || bannerImage ? (
              <img
                className="h-full w-full object-contain rounded-lg"
                src={uploadedBannerUrl || bannerImage}
                alt="Banner"
              />
            ) : (
              <p className="text-gray-500 text-sm">Click to upload</p>
            )}
            <input
              id="bannerImageInput"
              accept="image/*"
              type="file"
              className="hidden"
              onChange={handleBannerChange}
            />
          </div>
        </div>

        {/* Icon Image Section */}
        <div className="mb-6 px-5 py-2">
          <label htmlFor="iconImage" className="block mb-2 text-sm font-medium text-gray-900">
            Icon Image
          </label>
          <div
            className="flex flex-col items-center justify-center w-full h-48 lg:h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
            onClick={() => document.getElementById("iconImageInput").click()}
          >
            {uploadedIconUrl || iconImage ? (
              <img
                className="h-full w-full object-contain rounded-lg"
                src={uploadedIconUrl || iconImage}
                alt="Icon"
              />
            ) : (
              <p className="text-gray-500 text-sm">Click to upload</p>
            )}
            <input
              id="iconImageInput"
              accept="image/*"
              type="file"
              className="hidden"
              onChange={handleIconChange}
            />
          </div>
        </div>

        {/* Submit Button */}
        <div className="flex justify-center p-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
          >
            Update Service
          </button>
        </div>
      </form>
    </section>
  );
};

export default EditService;
