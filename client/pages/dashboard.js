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
    // <div className="px-2 py-8 flex flex-col items-center justify-center min-h-[80vh] lg:px-12">
    //   <div className="w-full my-4 flex flex-col items-center">
    //     {projectsList !== undefined ? (
    //       projectsList.length > 0 ? (
    //         projectsList.map((data, i) => (
    //           <FundRiserCard props={data} key={i} />
    //         ))
    //       ) : (
    //         <div className="flex flex-col items-center justify-center mt-10">
    //           <FaRegSmileWink className="text-6xl text-gray-400 mb-4" />
    //           <h1 className="text-2xl font-semibold text-gray-600 text-center font-sans">
    //             No campaigns found currently.
    //           </h1>
    //           <p className="text-gray-500 text-center mt-2 max-w-md">
    //             Start your own fundraising journey or stay tuned for some
    //             amazing campaigns coming soon!
    //           </p>
    //         </div>
    //       )
    //     ) : (
    //       <Loader />
    //     )}
    //   </div>

    //   {/* Commented out the form */}

    //   {/* <div className="card lg:w-5/12 h-fit my-4">
    //     <FundRiserForm />
    //   </div>
    //   */}
    // </div>
    <div className="px-2 py-8 lg:px-12">
      <div
        className={`w-full my-4 flex flex-col items-center ${
          projectsList && projectsList.length === 0
            ? "min-h-[80vh] justify-center"
            : ""
        }`}
      >
        {projectsList !== undefined ? (
          projectsList.length > 0 ? (
            projectsList.map((data, i) => (
              <FundRiserCard props={data} key={i} />
            ))
          ) : (
            <div className="flex flex-col items-center justify-center mt-10">
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
