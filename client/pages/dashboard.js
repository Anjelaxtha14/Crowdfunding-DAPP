import React from "react";
import authWrapper from "../helper/authWrapper";
import FundRiserForm from "../components/FundRiserForm";
import { useSelector } from "react-redux";
import FundRiserCard from "../components/FundRiserCard";
import Loader from "../components/Loader";
import { FaRegSmileWink } from "react-icons/fa";
const Dashboard = () => {
  const projectsList = useSelector((state) => state.projectReducer.projects);

  return (
    <div className="px-2 py-8 lg:px-12">
  <h1 className="text-3xl font-bold text-indigo-700 text-center font-sans">
    Discover Exciting Fundraising Campaigns
  </h1>
  <p className="text-gray-500 text-center mt-2 text-base">
    Start your journey of making a difference today!
  </p>

  <div
    className={`w-full flex flex-col items-center ${
      projectsList && projectsList.length === 0
        ? "min-h-[70vh] justify-center"
        : "mt-8"
    }`}
  >
    {projectsList !== undefined ? (
      projectsList.length > 0 ? (
        <div className="flex flex-wrap justify-center gap-6">
          {projectsList.map((data, i) => (
            <FundRiserCard props={data} key={i} />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center">
          <FaRegSmileWink className="text-6xl text-gray-400 mb-4" />
          <h1 className="text-2xl font-semibold text-gray-600 text-center font-sans">
            No campaigns found currently.
          </h1>
          <p className="text-gray-500 text-center mt-2 max-w-md">
            Start your own fundraising journey or stay tuned for some
            amazing campaigns coming soon!
          </p>
        </div>
      )
    ) : (
      <Loader />
    )}
  </div>
</div>

  );
};

export default authWrapper(Dashboard);
