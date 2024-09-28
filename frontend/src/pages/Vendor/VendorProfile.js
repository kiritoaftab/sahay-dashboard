import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import uploadToAzureStorage from "../../util/uploadToAzureStorage";

const VendorProfile = () => {
  // Individual states for each field
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [address, setAddress] = useState("");
  const [pincode, setPincode] = useState("");
  const [shopName, setShopName] = useState("");
  const [shopGstNo, setShopGstNo] = useState("");
  const [profilePic, setProfilePic] = useState("");
  const [status, setStatus] = useState("");

  const [isEditing, setIsEditing] = useState(false);
  const [vendorId, setVendorId] = useState(null);

  const id = sessionStorage.getItem("auth");

  const getVendorById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}vendor/getByUserId/${id}`);
      const data = res.data.vendorDoc;
      console.log(res.data)

      setFirstName(data.firstName);
      setLastName(data.lastName);
      setEmail(data.user.email);
      setPhone(data.user.phone);
      setAddress(data.address);
      setPincode(data.pincode);
      setShopName(data.shopName);
      setShopGstNo(data.shopGstNo);
      setProfilePic(data.user.profilePic || ""); // Set default value if profilePic is undefined
      setStatus(data.user.status);

      setVendorId(data._id);
    } catch (error) {
      console.error("Error fetching vendor data: ", error);
    }
  };

  const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const blobName = file.name;
      console.log("Uploading file:", file); // Debug log
      const imageUrl = await uploadToAzureStorage(file, blobName);
      setProfilePic(imageUrl);
      console.log("Profile pic uploaded to:", imageUrl); // Debug log
    } catch (error) {
      console.error("Failed to upload the profile picture:", error);
    }
  };

  const handleSave = async () => {
    try {
      const reqbody = {
        vendorId: vendorId,
        firstName,
        lastName,
        address,
        pincode: pincode.toString(),
        shopName,
        shopGstNo,
        email,
        phone,
        profilePic,
      };

      console.log("Request body:", reqbody);

      const res = await axios.post(`${BASE_URL}vendor/updateVendor`, reqbody);
      console.log(res.data);
      alert("Vendor profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error("Failed to update vendor profile", error);
      alert("Failed to update vendor profile");
    }
  };

  useEffect(() => {
    getVendorById();
  }, [id]);

  return (
    <section className="w-full h-full bg-background flex flex-col items-center py-10">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">Vendor Profile</h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your vendor profile information.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-6 py-4">
            <div className="flex flex-col gap-4">
              {/* First Name */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  First Name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{firstName}</p>
                )}
              </div>

              {/* Last Name */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Last Name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{lastName}</p>
                )}
              </div>

              {/* Email Address */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Email Address:
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{email}</p>
                )}
              </div>

              {/* Phone */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Phone:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{phone}</p>
                )}
              </div>

              {/* Address */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Address:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{address}</p>
                )}
              </div>

              {/* Pincode */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Pincode:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={pincode}
                    onChange={(e) => setPincode(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{pincode}</p>
                )}
              </div>

              {/* Shop Name */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Shop Name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={shopName}
                    onChange={(e) => setShopName(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{shopName}</p>
                )}
              </div>

              {/* Shop GST No */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Shop GST No:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    value={shopGstNo}
                    onChange={(e) => setShopGstNo(e.target.value)}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{shopGstNo}</p>
                )}
              </div>

              {/* Status */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Status:
                </label>
                <p className="text-sm text-gray-900">{status}</p>
              </div>

              {/* Profile Picture Display */}
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Profile Picture:
                </label>
                <div className="flex justify-center items-center">
                  {isEditing ? (
                    <>
                      <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfile}
                      />
                      {profilePic && (
                        <img
                          src={profilePic}
                          alt="Profile Preview"
                          className="h-20 w-20 object-cover rounded-full mt-2"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={profilePic}
                      alt="Profile"
                      className="h-20 w-20 object-cover rounded-full mt-2"
                    />
                  )}
                </div>
              </div>

              {/* Buttons to toggle edit mode and save */}
              <div className="flex justify-end">
                {isEditing ? (
                  <>
                    <button
                      onClick={handleSave}
                      className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
                    >
                      Save
                    </button>
                    <button
                      onClick={() => setIsEditing(false)}
                      className="ml-2 bg-gray-300 text-gray-700 px-4 py-2 rounded hover:bg-gray-400"
                    >
                      Cancel
                    </button>
                  </>
                ) : (
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-green-500 text-white px-4 py-2 rounded hover:bg-green-600"
                  >
                    Edit
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VendorProfile;
