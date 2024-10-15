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
      const response = await axios.post(
        `${BASE_URL}user/createVRO`,
        requestBody
      );
      console.log("Response:", response); // Log the full response
      if (response.status === 201 || response.status === 200) {
        alert("VRO Added successfully");
        navigate("/admin/allVro");
      } else {
        alert("Could not add VRO");
      }
    } catch (error) {
      console.error("Error adding VRO:", error);
      alert("Could not add VRO");
    }
  };

  return (
    <section className="w-screen md:w-full h-full bg-background flex flex-col p-5">
      <h1 className="text-2xl font-medium mb-5">Add VRO</h1>
      <form
        onSubmit={addVRO}
        className="bg-white rounded-2xl border border-slate-300 p-6 md:p-8"
      >
        <div className="grid gap-6 mb-6 md:grid-cols-2">
          {/* Username Input */}
          <div className="flex flex-col">
            <label
              htmlFor="userName"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Username
            </label>
            <input
              type="text"
              id="userName"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Username"
              required
              onChange={(e) => setUserName(e.target.value)}
            />
          </div>

          {/* Email Input */}
          <div className="flex flex-col">
            <label
              htmlFor="email"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Email
            </label>
            <input
              type="email"
              id="email"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Email"
              required
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          {/* Phone Input */}
          <div className="flex flex-col">
            <label
              htmlFor="phone"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Phone
            </label>
            <input
              type="tel"
              id="phone"
              className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
              placeholder="Phone"
              maxLength={10}
              required
              onChange={(e) => setPhone(e.target.value)}
            />
          </div>

          {/* Password Input */}
          <div className="flex flex-col">
            <label
              htmlFor="password"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
              Password
            </label>
            <div className="relative">
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
                className="absolute inset-y-0 right-3 flex items-center cursor-pointer text-gray-600"
              >
                {showPassword ? <FaEyeSlash /> : <FaEye />}
              </div>
            </div>
          </div>

          {/* Profile Picture Input */}
          <div className="flex flex-col">
            <label
              htmlFor="profilePic"
              className="block mb-2 text-sm font-medium text-gray-900"
            >
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

          {/* Uploaded Image Preview */}
          {uploadedUrl && (
            <div className="mt-2 flex justify-center">
              <img
                src={uploadedUrl}
                className="h-32 w-32 rounded-md"
                alt="Uploaded"
              />
            </div>
          )}
        </div>

        {/* Submit Button */}
        <div className="flex justify-center">
          <button
            type="submit"
            className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5"
          >
            Add VRO
          </button>
        </div>
      </form>
    </section>
  );
};

export default AddVRO;
