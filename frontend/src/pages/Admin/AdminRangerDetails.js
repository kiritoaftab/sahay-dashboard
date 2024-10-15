import React, { useEffect, useState } from "react";
import uploadToAzureStorage from "../../utils/uploadToAzureStorage";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosInstance/axiosApi";
import { BASE_URL } from "../../constants";

const AdminRangerDetails = () => {
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [phone, setPhone] = useState("");
  const [email, setEmail] = useState("");
  const [pinCode, setPinCode] = useState("");
  const [address, setAddress] = useState("");
  const [vendorId, setVendorId] = useState("");
  const [profilePicUrl, setProfilePicUrl] = useState("");
  const [aadharImgUrl, setAadharImgUrl] = useState("");
  const [panImgUrl, setPanImgUrl] = useState("");
  const [selectedServices, setSelectedServices] = useState([]);
  
  const [service, setService] = useState([]);
  const [vendors, setVendors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  console.log(id);

  const getRangerById = async () => {
    try {
      const response = await axios.get(`${BASE_URL}ranger/getRangerById/${id}`);
      setFirstName(response?.data?.rangerDoc?.firstName);
      setLastName(response?.data?.rangerDoc?.lastName);
      setPhone(response?.data?.rangerDoc?.user?.phone);
      setEmail(response?.data?.rangerDoc?.user?.email);
      setPinCode(response?.data?.rangerDoc?.vendor?.pincode);
      setAddress(response?.data?.rangerDoc?.address);
      setVendorId(response?.data?.rangerDoc?.vendor?._id);
      setProfilePicUrl(response?.data?.rangerDoc?.user?.profilePic);
      setAadharImgUrl(response?.data?.rangerDoc?.aadharImg);
      setPanImgUrl(response?.data?.rangerDoc?.panImg);
      setSelectedServices(response?.data?.rangerDoc?.serviceList || []);
      console.log("response", response?.data);
    } catch (error) {
      console.error(error, { success: false, msg: "Internal Server" });
    }
  };

  const updateRanger = async (e) => {
    e.preventDefault();
    const requestBody = {
      rangerId: id,
      email: email,
      phone: phone,
      profilePic: profilePicUrl,
      firstName: firstName,
      lastName: lastName,
      vendorId: vendorId,
      address: address,
      pincode: pinCode,
      aadharImg: aadharImgUrl,
      panImg: panImgUrl,
      serviceList: selectedServices,
    };

    console.log(requestBody);
    try {
      const response = await axios.post(
        `${BASE_URL}ranger/updateRanger`,
        requestBody
      );
      console.log(response?.data);
      if (location.pathname.includes("/vro")) {
        alert("ranger updated successfully");
        navigate(`/vro/rangers`);
      } else {
        navigate(`/admin/rangers`);
      }
    } catch (error) {
      console.error(error, { success: false, msg: "ranger not updated" });
      alert("Could not Update Ranger");
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

  useEffect(() => {
    getRangerById();
  }, [id]);

  const getVendorName = (vendorId) => {
    const vendor = vendors.find((vendor) => vendor._id === vendorId);
    return vendor ? `${vendor.firstName} ${vendor.lastName}` : "Unknown Vendor";
  };

  const handleServiceChange = (e) => {
    const options = e.target.options;
    const selectedServices = [];
    for (let i = 0, l = options.length; i < l; i++) {
      if (options[i].selected) {
        selectedServices.push(options[i].value);
      }
    }
    setSelectedServices(selectedServices);
  };

  const removeService = (serviceId) => {
    setSelectedServices((prevSelectedServices) =>
      prevSelectedServices.filter((service) => service !== serviceId)
    );
  };

  return (
    <section className="w-full bg-background p-4">
      <div className="bg-white p-4 sm:p-5 rounded-lg">
        <h2 className="font-bold text-2xl sm:text-3xl mb-4">Ranger Details</h2>
        <form onSubmit={updateRanger} className="space-y-6">
          <div className="flex flex-col lg:flex-row gap-6">
            <div className="w-full lg:w-1/4 flex flex-col items-center lg:items-start bg-white p-4 shadow-md rounded-lg">
              <label
                htmlFor="profilePic"
                className="block text-sm font-medium text-gray-700 mb-2"
              >
                Upload Profile Picture
              </label>
              <div className="flex flex-col items-center justify-center w-full h-48 lg:h-64 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition">
                {profilePicUrl ? (
                  <img
                    className="h-full w-full object-contain rounded-lg"
                    src={profilePicUrl}
                    alt="Profile"
                  />
                ) : (
                  <p className="text-gray-500 text-sm">Click to upload</p>
                )}
                <input
                  id="profilePic"
                  accept="image/*"
                  type="file"
                  className="hidden"
                  onChange={(e) => handleFileUpload(e, "profile")}
                />
              </div>
              <p className="mt-2 text-xs text-gray-500">PNG, JPG (max 2MB)</p>
            </div>

            <div className="w-full lg:w-3/4 space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    First Name
                  </label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="w-full p-2 bg-slate-100 rounded border border-gray-300"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Last Name
                  </label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="w-full p-2 bg-slate-100 rounded border border-gray-300"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Phone Number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="w-full p-2 bg-slate-100 rounded border border-gray-300"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Email
                  </label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="w-full p-2 bg-slate-100 rounded border border-gray-300"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium mb-1">
                    Pincode
                  </label>
                  <input
                    type="number"
                    placeholder="Pincode"
                    className="w-full p-2 bg-slate-100 rounded border border-gray-300"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label
                    htmlFor="serviceList"
                    className="block text-sm font-medium mb-1"
                  >
                    Select Services
                  </label>
                  <select
                    id="serviceList"
                    className="w-full p-2 bg-slate-100 rounded border border-gray-300"
                    multiple
                    required
                    value={selectedServices}
                    onChange={handleServiceChange}
                  >
                    {service?.map((service) => (
                      <option key={service?._id} value={service?._id}>
                        {service?.name}
                      </option>
                    ))}
                  </select>
                </div>
                <div>
                  <label
                    htmlFor="address"
                    className="block text-sm font-medium mb-1"
                  >
                    Address
                  </label>
                  <textarea
                    id="address"
                    className="w-full p-2 bg-slate-100 rounded border border-gray-300"
                    placeholder="Your address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>
            </div>
          </div>

          <div className="space-y-4">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg">
                <label
                  htmlFor="aadharImg"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload Aadhar Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="aadharImg"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16v-1a4 4 0 014-4h2a4 4 0 014 4v1m-4-4v1m-6 0v1M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG (max 2MB)
                      </p>
                    </div>
                    <input
                      id="aadharImg"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "aadhar")}
                    />
                  </label>
                </div>
                {aadharImgUrl && (
                  <div className="mt-4">
                    <img
                      src={aadharImgUrl}
                      alt="Aadhar"
                      className="h-40 w-40 object-cover border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>

              <div className="max-w-sm mx-auto p-4 bg-white shadow-md rounded-lg">
                <label
                  htmlFor="panImg"
                  className="block text-sm font-medium text-gray-700 mb-2"
                >
                  Upload PAN Image
                </label>
                <div className="flex items-center justify-center w-full">
                  <label
                    htmlFor="panImg"
                    className="flex flex-col items-center justify-center w-full h-32 border-2 border-dashed border-gray-300 rounded-lg cursor-pointer bg-gray-50 hover:bg-gray-100 transition"
                  >
                    <div className="flex flex-col items-center justify-center pt-5 pb-6">
                      <svg
                        className="w-10 h-10 mb-3 text-gray-400"
                        fill="none"
                        stroke="currentColor"
                        viewBox="0 0 24 24"
                        xmlns="http://www.w3.org/2000/svg"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M7 16v-1a4 4 0 014-4h2a4 4 0 014 4v1m-4-4v1m-6 0v1M3 12a9 9 0 1118 0 9 9 0 01-18 0z"
                        />
                      </svg>
                      <p className="mb-2 text-sm text-gray-500">
                        <span className="font-semibold">Click to upload</span>
                      </p>
                      <p className="text-xs text-gray-500">
                        PNG, JPG (max 2MB)
                      </p>
                    </div>
                    <input
                      id="panImg"
                      accept="image/*"
                      type="file"
                      className="hidden"
                      onChange={(e) => handleFileUpload(e, "pan")}
                    />
                  </label>
                </div>
                {panImgUrl && (
                  <div className="mt-4">
                    <img
                      src={panImgUrl}
                      alt="PAN"
                      className="h-40 w-40 object-cover border-2 border-gray-300 rounded-lg"
                    />
                  </div>
                )}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Vendor</label>
              <p>{getVendorName(vendorId)}</p>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">
                Selected Services
              </label>
              <div className="flex flex-wrap gap-2">
                {selectedServices.map((serviceId) => {
                  const serviceObj = service.find(
                    (srv) => srv._id === serviceId
                  );
                  return (
                    <div
                      key={serviceId}
                      className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg border border-gray-300"
                    >
                      <span>{serviceObj?.name}</span>
                      <button
                        type="button"
                        onClick={() => removeService(serviceId)}
                        className="text-red-500 hover:text-red-700"
                      >
                        &times;
                      </button>
                    </div>
                  );
                })}
              </div>
            </div>
          </div>

          <button
            type="submit"
            className="w-full sm:w-auto bg-primary text-white font-medium py-2 px-4 rounded-lg hover:bg-primary-dark transition-colors"
          >
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default AdminRangerDetails;
