import React, { useState } from "react";
import axios from "axios";
import { BASE_URL } from "../../constants";
import uploadToAzureStorage from "../../util/uploadToAzureStorage";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { useNavigate } from "react-router-dom";

const AddVRO = () => {
  const [userName, setUserName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [file, setFile] = useState(null);
  const [uploadedUrl, setUploadedUrl] = useState(null);

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

  const addVRO = async (e) => {
    e.preventDefault();

    const requestBody = {
      userName: userName,
      email: email,
      phone: phone,
      password: password,
      profilePic: uploadedUrl,
    };

    try {
      const response = await axios.post(`${BASE_URL}user/createVRO`, requestBody);
      if (response.status === 200) {
        alert("VRO Added successfully");
        navigate("/admin/allVro");
      } else {
        alert("VRO could not be added");
      }
    } catch (error) {
      console.error(error);
      alert("Error adding VRO");
    }
  };

  return (
    <section className="w-screen h-full md:w-full bg-background gap-4 flex flex-col p-5">
      <h1 className="text-2xl font-medium">Add VRO</h1>
      <form onSubmit={addVRO} className="bg-white rounded-2xl border-slate-300 border">
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          <div className="px-5 pt-5">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900">
              Username
            </label>
            <input
              type="text"
              id="userName"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>
          <div className="px-5 pt-5">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900">
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900">
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Phone"
              maxLength={10}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>
          <div className="px-5">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900">
              Password
            </label>
            <div className="relative flex items-center">
              <input
                type={showPassword ? "password" : "text"}
                id="password"
                className="bg-gray-50 border-gray-500 border text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 pr-10"
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
              htmlFor="profilePic"
              className="block mb-2 text-sm font-medium text-gray-900">
              Profile Picture
            </label>
            <input
              id="profilePic"
              accept="image/*"
              type="file"
              className="block w-full text-sm file:mr-4 file:rounded-md file:border-0 file:py-2.5 file:px-4 file:text-sm file:font-semibold file:text-black hover:file:bg-primary-700 focus:outline-none disabled:pointer-events-none disabled:opacity-60"
              required
              onChange={handleFileUpload}
            />
          </div>
          {uploadedUrl && (
            <div className="px-5 mt-2 flex justify-center">
              <img src={uploadedUrl} className="h-32 w-32" alt="Uploaded" />
            </div>
          )}
        </div>
        <div className="bottom-0 left-0 w-full flex justify-center p-4">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center">
            Add VRO
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddVRO;
