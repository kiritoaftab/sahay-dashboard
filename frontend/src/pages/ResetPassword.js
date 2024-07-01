import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { FaEye, FaEyeSlash } from "react-icons/fa";
import { BASE_URL } from "../constants";

const ResetPassword = () => {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState("");
  const [otp, setOtp] = useState("");
  const [userId, setUserId] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confPassword, setConfPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfPassword, setShowConfPassword] = useState(false);

  const navigate = useNavigate();

  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const toggleConfPasswordVisibility = () => {
    setShowConfPassword(!showConfPassword);
  };

  const handleSendOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}user/forgotPassword/${email}`, { email });
      if (res.data.success) {
        setUserId(res.data.userDoc._id); 
        setStep(2);
        alert("OTP sent successfully");
      } else {
        alert("Failed to send OTP");
      }
    } catch (error) {
      console.error("Error sending OTP:", error);
      alert("Failed to send OTP");
    }
  };

  const handleVerifyOtp = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post(`${BASE_URL}user/verifyOtp`, { otp, userId });
      if (res.data.success) {
        setStep(3);
      } else {
        alert("OTP verification failed");
      }
    } catch (error) {
      console.error("Error verifying OTP:", error);
      alert("OTP verification failed");
    }
  };

  const handleResetPassword = async (e) => {
    e.preventDefault();
    if (newPassword !== confPassword) {
      alert("Passwords do not match");
      return;
    }
    try {
      const res = await axios.post(`${BASE_URL}user/resetPassword`, {
        userId,
        password: newPassword,
      });
      if (res.data.success) {
        alert("Password reset successfully");
        navigate("/");
      } else {
        alert("Failed to reset password");
      }
    } catch (error) {
      console.error("Error resetting password:", error);
      alert("Failed to reset password");
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="bg-white p-8 rounded shadow-md w-full max-w-md">
        {step === 1 && (
          <form onSubmit={handleSendOtp} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Send OTP
            </button>
          </form>
        )}
        {step === 2 && (
          <form onSubmit={handleVerifyOtp} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6">Verify OTP</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">Enter OTP</label>
              <input
                type="text"
                value={otp}
                onChange={(e) => setOtp(e.target.value)}
                required
                className="mt-1 p-2 w-full border rounded-md"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Verify OTP
            </button>
          </form>
        )}
        {step === 3 && (
          <form onSubmit={handleResetPassword} className="space-y-4">
            <h2 className="text-2xl font-semibold mb-6">Reset Password</h2>
            <div>
              <label className="block text-sm font-medium text-gray-700">New Password</label>
              <div className="flex items-center mt-1">
                <input
                  type={showPassword ? "text" : "password"}
                  value={newPassword}
                  onChange={(e) => setNewPassword(e.target.value)}
                  required
                  className="p-2 w-full border rounded-md"
                />
                <button
                  type="button"
                  onClick={togglePasswordVisibility}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">Confirm Password</label>
              <div className="flex items-center mt-1">
                <input
                  type={showConfPassword ? "text" : "password"}
                  value={confPassword}
                  onChange={(e) => setConfPassword(e.target.value)}
                  required
                  className="p-2 w-full border rounded-md"
                />
                <button
                  type="button"
                  onClick={toggleConfPasswordVisibility}
                  className="ml-2 text-gray-500 hover:text-gray-700"
                >
                  {showConfPassword ? <FaEye /> : <FaEyeSlash />}
                </button>
              </div>
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-2 rounded-md hover:bg-blue-700 transition duration-300"
            >
              Reset Password
            </button>
          </form>
        )}
      </div>
    </div>
  );
};

export default ResetPassword;
