import React, { useEffect, useState } from "react";
import uploadToAzureStorage from "../../utils/uploadToAzureStorage";
import { useNavigate, useParams } from "react-router-dom";
import axios from "../../axiosInstance/axiosApi";
import { BASE_URL } from "../../constants";

const VendorRangerDetails = () => {
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
  const [selectedServices, setSelectedServices] = useState([]); // Changed to array
  const [service, setService] = useState([]);
  const [vendors, setVendors] = useState([]);

  const { id } = useParams();
  const navigate = useNavigate();

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
      setAadharImgUrl(response?.data?.rangerDoc?.aadharImgUrl);
      setPanImgUrl(response?.data?.rangerDoc?.panImgUrl);
      setSelectedServices(response?.data?.rangerDoc?.serviceList || []); // Initialize selected services
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
      serviceList: selectedServices, // Use the array of selected services
    };

    console.log(requestBody);
    try {
      const response = await axios.post(`${BASE_URL}ranger/updateRanger`, requestBody);
      console.log(response?.data);
      if (response.status === 200) {
        alert("Ranger Updated successfully");
      } else {
        alert("Ranger update failed");
      }
      navigate(`/vendor/rangers`);
    } catch (error) {
      console.error(error, { success: false, msg: "vendor not updated" });
      alert('Could not update Ranger');
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
    <section className="w-fit md:w-full lg:w-full sm:w-full bg-background ">
      <div className="bg-white p-5 rounded-lg m-5">
        <p className="font-bold text-3xl mb-4">Ranger Details</p>
        <form onSubmit={updateRanger}>
          <div className="flex flex-col md:flex-col lg:flex-row xl:flex-row">
            <div className="basis-1/4 flex flex-col justify-start">
              <img className="h-64 w-64 mix-blend-multiply object-scale-down" src={profilePicUrl} alt="Profile" />
              <input className="my-3" accept="image/*" type="file" onChange={(e) => handleFileUpload(e, "profile")} />
            </div>

            <div className="basis-3/4 flex flex-col justify-center gap-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="text-lg font-medium mb-2">First Name</label>
                  <input
                    type="text"
                    placeholder="First Name"
                    className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg font-medium mb-2">Last Name</label>
                  <input
                    type="text"
                    placeholder="Last Name"
                    className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-3 gap-3">
                <div>
                  <label className="text-lg font-medium mb-2">Phone Number</label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg font-medium mb-2">Email</label>
                  <input
                    type="email"
                    placeholder="Email"
                    className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                </div>
                <div>
                  <label className="text-lg font-medium mb-2">Pincode</label>
                  <input
                    type="number"
                    placeholder="Pincode"
                    className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                    value={pinCode}
                    onChange={(e) => setPinCode(e.target.value)}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label htmlFor="serviceList" className="text-lg font-medium mb-2">Select Services</label>
                  <select
                    id="serviceList"
                    className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
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
                <div className="mb-6">
                  <label htmlFor="address" className="text-lg font-medium mb-2">Address</label>
                  <textarea
                    id="address"
                    className="bg-slate-100 rounded-lg p-3 w-full border border-black-500"
                    placeholder="Your address"
                    value={address}
                    required
                    onChange={(e) => setAddress(e.target.value)}
                  />
                </div>
              </div>

              <div className="flex flex-col md:flex-row md:flex-wrap mb-6 px-10 py-2">
                <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-6">
                  <label htmlFor="aadharImg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Upload Aadhar Image
                  </label>
                  <input
                    id="aadharImg"
                    accept="image/*"
                    type="file"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    onChange={(e) => handleFileUpload(e, "aadhar")}
                  />
                  {aadharImgUrl && <img src={aadharImgUrl} alt="Aadhar" className="h-32 w-32 object-fill border rounded-md" />}
                </div>
                <div className="w-full md:w-auto mt-4 md:mt-0 md:ml-6">
                  <label htmlFor="panImg" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                    Upload PAN Image
                  </label>
                  <input
                    id="panImg"
                    accept="image/*"
                    type="file"
                    className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50"
                    onChange={(e) => handleFileUpload(e, "pan")}
                  />
                  {panImgUrl && <img src={panImgUrl} alt="PAN" className="h-32 w-32 object-fill border rounded-md" />}
                </div>
              </div>
            </div>
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium mb-2">Vendor</label>
            <p>{getVendorName(vendorId)}</p>
          </div>

          <div className="mb-6">
            <label className="text-lg font-medium mb-2">Selected Services</label>
            <div className="flex flex-wrap gap-2">
              {selectedServices.map((serviceId) => {
                const serviceObj = service.find((srv) => srv._id === serviceId);
                return (
                  <div key={serviceId} className="flex items-center gap-2 bg-slate-100 p-2 rounded-lg border border-black-500">
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

          <button type="submit" className="mt-5 w-36 bg-primary p-3 text-white rounded-lg">
            Update
          </button>
        </form>
      </div>
    </section>
  );
};

export default VendorRangerDetails;
