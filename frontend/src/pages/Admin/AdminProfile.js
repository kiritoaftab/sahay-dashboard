import axios from "axios";
import React, { useState, useEffect } from "react";
import { BASE_URL } from "../../constants";

const AdminProfile = () => {
  const [userDoc, setUserDoc] = useState();
  const id = sessionStorage.getItem("user_id");
  console.log(id);
  const getUserById = async () => {
    try {
      const res = await axios.get(`${BASE_URL}user/getUserById/${id}`);
      console.log(res?.data);
      setUserDoc(res?.data?.userDoc);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getUserById();
  }, [id]);

  return (
    <>
      <section className="w-screen md:w-full h-full bg-background gap-4 flex flex-col">
        <div className="w-screen md:w-full bg-background p-3 flex justify-between px-10">
          <div class="bg-white max-w-2xl shadow overflow-hidden sm:rounded-lg">
            <div class="px-4 py-5 sm:px-6">
              <h3 class="text-lg leading-6 font-medium text-gray-900">
                Admin Profile
              </h3>
              <p class="mt-1 max-w-2xl text-sm text-gray-500">
                Details and informations about Admin.
              </p>
            </div>
            <div class="border-t border-gray-200">
              <dl>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Full name</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userDoc?.userName}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Status</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userDoc?.status}
                  </dd>
                </div>
                <div class="bg-gray-50 px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">
                    Email address
                  </dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userDoc?.email}
                  </dd>
                </div>
                <div class="bg-white px-4 py-5 sm:grid sm:grid-cols-3 sm:gap-4 sm:px-6">
                  <dt class="text-sm font-medium text-gray-500">Phone</dt>
                  <dd class="mt-1 text-sm text-gray-900 sm:mt-0 sm:col-span-2">
                    {userDoc?.phone}
                  </dd>
                </div>
              </dl>
            </div>
          </div>
        </div>
      </section>
    </>
  );
};

export default AdminProfile;
