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

  const getServiceById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}/service/getServicesById/${id}`);
      const serviceData = response.data.serviceDoc;
      setName(serviceData.name);
      setPrice(serviceData.price);
      setDesc(serviceData.desc);
      setBannerImage(serviceData.bannerImage);
      setIconImage(serviceData.iconImage);
    } catch (error) {
      console.error("Error fetching service:", error);
    }
  };

  const updateService = async (e) => {
    e.preventDefault();
    const requestBody = {
      name,
      price,
      bannerImage: uploadedBannerUrl || bannerImage,
      iconImage: uploadedIconUrl || iconImage,
      desc,
    };

    try {
      const response = await axios.post(
        `${BASE_URL}/service/updateService/${id}`,
        requestBody
      );
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

  const handleBannerChange = async (e) => {
    const file = e.target.files[0];
    const blobName = file?.name;
    const url = await uploadToAzureStorage(file, blobName);
    setUploadedBannerUrl(url);
  };

  const handleIconChange = async (e) => {
    const file = e.target.files[0];
    const blobName = file?.name;
    const url = await uploadToAzureStorage(file, blobName);
    setUploadedIconUrl(url);
  };

  useEffect(() => {
    getServiceById();
  }, [id]);

  return (
    <section className="w-screen md:w-full bg-background gap-4 flex flex-col p-5">
      <h1 className="text-2xl font-medium">Edit Service</h1>
      <form onSubmit={updateService} className="bg-white rounded-2xl border-slate-300 border">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="px-5 pt-5">
            <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">
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
            <label htmlFor="price" className="block mb-2 text-sm font-medium text-gray-900 ">
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
            <label htmlFor="desc" className="block mb-2 text-sm font-medium text-gray-900 ">
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
        <div className="mb-6 px-5 py-2">
          <label htmlFor="bannerImage" className="block mb-2 text-sm font-medium text-gray-900 ">
            Banner Image
          </label>
          <input
            type="file"
            id="bannerImage"
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-primary-700 focus:outline-none"
            onChange={handleBannerChange}
          />
          {uploadedBannerUrl && (
            <div className="mt-2 flex justify-center">
              <img src={uploadedBannerUrl} className="h-32 w-32" alt="Uploaded Banner" />
            </div>
          )}
        </div>
        <div className="mb-6 px-5 py-2">
          <label htmlFor="iconImage" className="block mb-2 text-sm font-medium text-gray-900 ">
            Icon Image
          </label>
          <input
            type="file"
            id="iconImage"
            accept="image/*"
            className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-primary-700 focus:outline-none"
            onChange={handleIconChange}
          />
          {uploadedIconUrl && (
            <div className="mt-2 flex justify-center">
              <img src={uploadedIconUrl} className="h-32 w-32" alt="Uploaded Icon" />
            </div>
          )}
        </div>
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
