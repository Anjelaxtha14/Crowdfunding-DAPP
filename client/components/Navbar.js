import { useState } from "react";
import Link from "next/link";
import { useSelector, useDispatch } from "react-redux";
import { useRouter } from "next/router";
import { FaEthereum } from "react-icons/fa";
import { logout } from "../redux/interactions";

const Navbar = () => {
  const router = useRouter();
  const dispatch = useDispatch();
  const [openMenu, setOpenMenu] = useState(false);
  const account = useSelector((state) => state.web3Reducer.account);

  const handleLogout = async () => {
    await logout(dispatch);
    router.push("/");
  };

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16 items-center">
            {/* Left side */}
            <div className="flex items-center">
              <div className="flex items-center space-x-2">
                <FaEthereum className="text-indigo-600 text-2xl" />
                <h1 className="text-2xl font-extrabold text-indigo-600 tracking-tight hidden lg:block">
                  CROWD FUNDING
                </h1>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4 lg:space-x-6">
              {/* Desktop Links */}
              <div className="hidden lg:flex space-x-8">
                <Link href="/dashboard">
                  <span
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                      router.pathname === "/dashboard"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    Dashboard
                  </span>
                </Link>
                <Link href="/my-contributions">
                  <span
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium cursor-pointer ${
                      router.pathname === "/my-contributions"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    }`}
                  >
                    My Contributions
                  </span>
                </Link>
              </div>

              {/* Start Campaign and Logout Buttons for Desktop */}
              <div className="hidden lg:flex items-center space-x-4">
                <Link href="/campaign">
                  <button
                    type="button"
                    className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition"
                  >
                    Start Campaign
                  </button>
                </Link>

                {/* Wallet Address */}
                <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                  <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                    {account ? account : "0x123...abcd"}
                  </span>
                </div>

                {/* Logout Button */}
                {account && (
                  <button
                    onClick={handleLogout}
                    className="bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
                  >
                    Logout
                  </button>
                )}
              </div>

              {/* Mobile Menu Button */}
              <button
                className="lg:hidden text-gray-600"
                onClick={() => setOpenMenu(!openMenu)}
              >
                <svg
                  className="w-6 h-6"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
              </button>
            </div>
          </div>
        </div>
      </nav>

      {/* Mobile Menu */}
      {openMenu && (
        <div className="lg:hidden bg-white shadow-md">
          <div className="space-y-4 px-6 py-4">
            <Link href="/dashboard">
              <a
                className={`block text-sm font-medium ${
                  router.pathname === "/dashboard"
                    ? "text-indigo-500"
                    : "text-gray-600"
                }`}
              >
                Dashboard
              </a>
            </Link>
            <Link href="/my-contributions">
              <a
                className={`block text-sm font-medium ${
                  router.pathname === "/my-contributions"
                    ? "text-indigo-500"
                    : "text-gray-600"
                }`}
              >
                My Contributions
              </a>
            </Link>

            {/* Start Campaign Button */}
            <Link href="/campaign">
              <button
                type="button"
                className="w-full bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition"
              >
                Start Campaign
              </button>
            </Link>

            {/* Logout Button */}
            {account && (
              <button
                onClick={handleLogout}
                className="w-full bg-red-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-red-700 transition"
              >
                Logout
              </button>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
