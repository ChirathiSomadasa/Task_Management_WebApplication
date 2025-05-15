// src/pages/Login.js
import React from "react";
import { GoogleLogin } from "@react-oauth/google";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();

  const onSuccess = (credentialResponse) => {
    console.log("Credential Response:", credentialResponse);

    // Decode JWT payload
    const base64Url = credentialResponse.credential.split(".")[1];
    const base64 = base64Url.replace(/-/g, "+").replace(/_/g, "/");
    const profile = JSON.parse(window.atob(base64));

    console.log("Decoded User Profile:", profile);

    // Save user info to localStorage
    localStorage.setItem("user", JSON.stringify(profile));

    // Redirect to dashboard/home
    navigate("/");
  };

  const onError = () => {
    console.log("Login Failed");
    alert("Google Login failed. Please try again.");
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 px-4">
      <div className="bg-white p-8 rounded-lg shadow-md w-full max-w-md text-center">
        <h1 className="text-3xl font-bold mb-6 text-gray-800">Task Management WebApp</h1>
        <p className="text-gray-600 mb-6">Sign in with Google to continue</p>
        <GoogleLogin
          onSuccess={onSuccess}
          onError={onError}
          useOneTap
          theme="filled_blue"
          size="large"
          shape="rectangular"
          text="continue_with"
        />
      </div>
    </div>
  );
};

export default Login;