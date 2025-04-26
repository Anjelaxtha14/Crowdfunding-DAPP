// pages/login.js
import React, { useState } from "react";
import { useRouter } from "next/router";
import { useDispatch, useSelector } from "react-redux";
import { connectWithWallet } from "../helper/helper";
import { loadAccount } from "../redux/interactions";
import { toastSuccess, toastError } from "../helper/toastMessage";
import {
  FaUserAlt,
  FaLock,
  FaSignInAlt,
  FaUserPlus,
  FaEthereum,
} from "react-icons/fa";

export default function Login() {
  const router = useRouter();
  const dispatch = useDispatch();
  const web3 = useSelector((state) => state.web3Reducer.connection);

  const [isRegister, setIsRegister] = useState(false);
  const [formData, setFormData] = useState({
    username: "",
    password: "",
  });

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const { username, password } = formData;

    if (username.trim() === "" || password.trim() === "") {
      toastError("Username and Password are required!");
      return;
    }

    try {
      toastSuccess(
        isRegister ? "Registration successful!" : "Login successful!"
      );

      const onSuccess = async () => {
        await loadAccount(web3, dispatch);
        router.push("/dashboard");
      };
      connectWithWallet(onSuccess);
    } catch (error) {
      toastError("Something went wrong. Try again.");
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-indigo-100 to-white">
      {/* Header */}
      <header className="flex items-center justify-between px-8 py-4 bg-indigo-600">
        <div className="flex items-center text-white text-2xl font-bold">
          <FaEthereum className="mr-2" />
          Crowd Funding
        </div>
      </header>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row items-center justify-center px-8 py-8">
        {/* Left Content */}
        {/* Left Content */}
        <div className="md:w-1/2 flex flex-col items-start justify-center space-y-6">
          <h2 className="text-4xl font-bold text-indigo-700 mb-4">
            Empower Your Ideas with Blockchain
          </h2>
          <p className="text-gray-700 text-lg">
            Welcome to our decentralized crowdfunding platform, where innovation
            meets transparency. Launch your campaigns, raise funds securely, and
            contribute to projects that matter—all powered by blockchain
            technology.
          </p>

          <ul className="list-disc list-inside text-gray-700 text-lg space-y-2">
            <li>
              <strong>Global Reach:</strong> Connect with backers worldwide
              without intermediaries.
            </li>
            <li>
              <strong>Enhanced Transparency:</strong> Track every transaction on
              the blockchain, ensuring trust and accountability.
            </li>
            <li>
              <strong>Smart Contracts:</strong> Automate fund distribution and
              milestones with secure, self-executing contracts.
            </li>
            <li>
              <strong>Lower Fees:</strong> Reduce costs by eliminating
              traditional banking and payment processing fees.
            </li>
            <li>
              <strong>Tokenization:</strong> Offer backers digital tokens
              representing their stake or rewards in your project.
            </li>
          </ul>

          {/* Images Section */}
          <div className="grid grid-cols-2 gap-4 mt-6">
            <img
              src="https://images.openai.com/thumbnails/8f0043eb775ccdd677ec4a3fa3b888bd.jpeg"
              alt="Blockchain Crowdfunding"
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
            <img
              src="https://images.openai.com/thumbnails/8e9c5318f0d5a16157c467d2896bd160.png"
              alt="Fundraising Blockchain"
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
            <img
              src="https://images.openai.com/thumbnails/c67afc8f13b0ada8c15f4c79ee8e2e40.jpeg"
              alt="Blockchain Impacts"
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
            <img
              src="https://images.openai.com/thumbnails/87bd730ccd477fabbe8a00b42b4c0f19.jpeg"
              alt="Ethereum Platform"
              className="w-full h-48 object-cover rounded-xl shadow-lg"
            />
          </div>
        </div>

        {/* Right Login/Register Form */}
        <div className="md:w-1/3 w-full mt-12 ml-5 px-5 md:mt-0 flex items-center justify-center">
          <div className="bg-white p-8 rounded-2xl shadow-2xl w-full">
            <h3 className="text-2xl font-bold text-indigo-700 mb-6 text-center">
              {isRegister ? "Create Account" : "Welcome Back"}
            </h3>

            <form onSubmit={handleSubmit}>
              <div className="flex items-center mb-6 border-b-2 border-indigo-200 focus-within:border-indigo-600">
                <FaUserAlt className="text-indigo-600 mr-2" />
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  value={formData.username}
                  onChange={handleInputChange}
                  className="w-full p-2 focus:outline-none"
                />
              </div>

              <div className="flex items-center mb-6 border-b-2 border-indigo-200 focus-within:border-indigo-600">
                <FaLock className="text-indigo-600 mr-2" />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  value={formData.password}
                  onChange={handleInputChange}
                  className="w-full p-2 focus:outline-none"
                />
              </div>

              <button
                type="submit"
                className="flex items-center justify-center w-full p-3 mb-4 font-bold text-white bg-indigo-600 rounded hover:bg-indigo-700 transition-all"
              >
                {isRegister ? (
                  <>
                    <FaUserPlus className="mr-2" /> Register
                  </>
                ) : (
                  <>
                    <FaSignInAlt className="mr-2" /> Login
                  </>
                )}
              </button>

              <p className="text-sm text-center text-gray-600">
                {isRegister
                  ? "Already have an account?"
                  : "Don't have an account?"}{" "}
                <button
                  type="button"
                  onClick={() => setIsRegister(!isRegister)}
                  className="text-indigo-600 font-semibold hover:underline"
                >
                  {isRegister ? "Login" : "Register"}
                </button>
              </p>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
