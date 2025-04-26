import React from "react";
import authWrapper from "../helper/authWrapper";
import FundRiserForm from "../components/FundRiserForm";
import { useSelector } from "react-redux";
import FundRiserCard from "../components/FundRiserCard";
import Loader from "../components/Loader";
import { FaRegSmileWink } from "react-icons/fa";
const Campaign = () => {
  const projectsList = useSelector((state) => state.projectReducer.projects);

  return (
    <div className="px-2 py-8 lg:px-12 flex justify-center items-center">
       <div className="card w-full lg:w-1/2 h-fit my-4">
        <FundRiserForm />
      </div>
    </div>
  );
};

export default authWrapper(Campaign);
