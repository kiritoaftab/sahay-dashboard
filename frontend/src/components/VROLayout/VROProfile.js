import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";
import uploadToAzureStorage from "../../util/uploadToAzureStorage";

const VROProfile = () => {
  const [userDoc, setUserDoc] = useState({
    userName: "",
    email: "",
    phone: "",
    status: "",
    profilePic: "",
  });
  const [isEditing, setIsEditing] = useState(false);
  const id = sessionStorage.getItem("auth");

  const getUserById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user/getUserById/${id}`);
      setUserDoc(res?.data?.userDoc);
    } catch (error) {
      console.error(error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserDoc({ ...userDoc, [name]: value });
  };

  const handleProfile = async (e) => {
    const file = e.target.files[0];
    if (!file) return;

    try {
      const blobName = file.name;
      const imageUrl = await uploadToAzureStorage(file, blobName);
      setUserDoc({ ...userDoc, profilePic: imageUrl });
    } catch (error) {
      console.error("Failed to upload the profile picture:", error);
    }
  };

  const handleSave = async () => {
    try {
      const res = await axios.post(`${BASE_URL}user/updateVRO/${id}`, {
        userName: userDoc.userName,
        email: userDoc.email,
        phone: userDoc.phone,
        profilePic: userDoc.profilePic,
      });
      alert("Profile updated successfully");
      setIsEditing(false);
    } catch (error) {
      console.error(error);
      alert("Failed to update profile");
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  return (
    <section className="w-full h-full bg-background flex flex-col items-center py-10">
      <div className="max-w-2xl bg-white shadow-lg rounded-lg overflow-hidden">
        <div className="px-6 py-4">
          <h3 className="text-lg font-medium text-gray-900">VRO Profile</h3>
          <p className="mt-1 text-sm text-gray-500">
            Update your VRO profile information.
          </p>
        </div>
        <div className="border-t border-gray-200">
          <div className="px-6 py-4">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Full name:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="userName"
                    value={userDoc.userName}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{userDoc.userName}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Email address:
                </label>
                {isEditing ? (
                  <input
                    type="email"
                    name="email"
                    value={userDoc.email}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{userDoc.email}</p>
                )}
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Phone:
                </label>
                {isEditing ? (
                  <input
                    type="text"
                    name="phone"
                    value={userDoc.phone}
                    onChange={handleInputChange}
                    className="p-2 border rounded w-full sm:w-auto"
                  />
                ) : (
                  <p className="text-sm text-gray-900">{userDoc.phone}</p>
                )}
              </div>

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
                      {userDoc.profilePic && (
                        <img
                          src={userDoc.profilePic}
                          alt="Profile Preview"
                          className="h-20 w-20 object-cover rounded-full mt-2"
                        />
                      )}
                    </>
                  ) : (
                    <img
                      src={userDoc.profilePic}
                      alt="Profile"
                      className="h-20 w-20 object-cover rounded-full mt-2"
                    />
                  )}
                </div>
              </div>

              <div className="flex flex-col sm:flex-row sm:gap-4">
                <label className="text-sm font-medium text-gray-500 w-32">
                  Status:
                </label>
                <p className="text-sm text-gray-900">{userDoc.status}</p>
              </div>
            </div>

            <div className="mt-4 flex justify-end gap-4">
              {isEditing ? (
                <>
                  <button
                    onClick={handleSave}
                    className="px-4 py-2 bg-blue-600 text-white rounded-md"
                  >
                    Save
                  </button>
                  <button
                    onClick={() => setIsEditing(false)}
                    className="px-4 py-2 bg-gray-300 rounded-md"
                  >
                    Cancel
                  </button>
                </>
              ) : (
                <button
                  onClick={() => setIsEditing(true)}
                  className="px-4 py-2 bg-blue-600 text-white rounded-md"
                >
                  Edit Profile
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default VROProfile;
