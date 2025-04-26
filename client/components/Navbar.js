import { useState } from "react";
import Link from "next/link";
import { useSelector } from "react-redux";
import { useRouter } from "next/router";
import { FaEthereum} from "react-icons/fa";

const Navbar = () => {
  const router = useRouter();
  const [openMenu, setOpenMenu] = useState(false);
  const account = useSelector((state) => state.web3Reducer.account);

  return (
    <div>
      <nav className="bg-white shadow-md">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between h-16">
            {/* Left side */}
            <div className="flex">
              <div className="flex items-center space-x-2">
                <FaEthereum className="text-indigo-600 text-2xl" />
                <h1 className="text-2xl font-extrabold text-indigo-600 tracking-tight hidden lg:block">
                  CROWD FUNDING
                </h1>
              </div>
              <div className="hidden sm:ml-6 sm:flex sm:space-x-8">
                <Link href="/dashboard">
                  <span
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      router.pathname === "/dashboard"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } cursor-pointer`}
                  >
                    Dashboard
                  </span>
                </Link>
                <Link href="/my-contributions">
                  <span
                    className={`inline-flex items-center px-1 pt-1 border-b-2 text-sm font-medium ${
                      router.pathname === "/my-contributions"
                        ? "border-indigo-500 text-gray-900"
                        : "border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700"
                    } cursor-pointer`}
                  >
                    My Contributions
                  </span>
                </Link>
              </div>
            </div>

            {/* Right side */}
            <div className="flex items-center space-x-4">
              <Link href="/campaign">
                <button
                  type="button"
                  className="bg-indigo-600 text-white px-4 py-2 rounded-md text-sm font-semibold hover:bg-indigo-700 transition"
                >
                  Start Campaign
                </button>
              </Link>
              <div className="flex items-center space-x-2 bg-gray-100 rounded-full px-3 py-1">
                <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
                  {/* Static Wallet Icon (SVG) */}
                  <svg
                    className="h-5 w-5 text-gray-600"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-2m4-4h-6m6 0l-2-2m2 2l-2 2"
                    />
                  </svg>
                </div>
                <span className="text-sm font-medium text-gray-700 truncate max-w-[100px]">
                  {account ? account : "0x123...abcd"}
                </span>
              </div>

              {/* Mobile Menu Button */}
              <div className="sm:hidden">
                <button
                  onClick={() => setOpenMenu(!openMenu)}
                  type="button"
                  className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-indigo-500 hover:bg-gray-100 focus:outline-none"
                >
                  <i className="fa-solid fa-bars"></i>
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Mobile Menu */}
        {openMenu && (
          <div className="sm:hidden">
            <div className="pt-2 pb-3 space-y-1">
              <Link href="/dashboard">
                <span className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-indigo-700 bg-indigo-50 border-indigo-500 cursor-pointer">
                  Dashboard
                </span>
              </Link>
              <Link href="/my-contributions">
                <span className="block pl-3 pr-4 py-2 border-l-4 text-base font-medium text-gray-600 hover:bg-gray-50 hover:border-gray-300 hover:text-gray-800 cursor-pointer">
                  My Contributions
                </span>
              </Link>
            </div>
          </div>
        )}
      </nav>
    </div>
  );
};

export default Navbar;
