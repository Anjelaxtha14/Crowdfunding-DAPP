import React, { useEffect, useState } from "react";
import moment from "moment";
import { startFundRaising } from "../redux/interactions";
import { useDispatch, useSelector } from "react-redux";
import { etherToWei } from "../helper/helper";
import { toastSuccess, toastError } from "../helper/toastMessage";
import { FaEthereum } from "react-icons/fa"; // ETH icon

const FundRiserForm = () => {
  const crowdFundingContract = useSelector(
    (state) => state.fundingReducer.contract
  );
  const account = useSelector((state) => state.web3Reducer.account);
  const web3 = useSelector((state) => state.web3Reducer.connection);

  const dispatch = useDispatch();

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [targetedContributionAmount, setTargetedContributionAmount] =
    useState("");
  const [minimumContributionAmount, setMinimumContributionAmount] =
    useState("");
  const [deadline, setDeadline] = useState("");
  const [btnLoading, setBtnLoading] = useState(false);

  const riseFund = (e) => {
    e.preventDefault();
    setBtnLoading(true);
    const unixDate = moment(deadline).valueOf();

    const onSuccess = () => {
      setBtnLoading(false);
      setTitle("");
      setDescription("");
      setTargetedContributionAmount("");
      setMinimumContributionAmount("");
      setDeadline("");
      toastSuccess("Fund rising started 🎉");
    };

    const onError = (error) => {
      setBtnLoading(false);
      toastError(error);
    };

    const data = {
      minimumContribution: etherToWei(minimumContributionAmount),
      deadline: Number(unixDate),
      targetContribution: etherToWei(targetedContributionAmount),
      projectTitle: title,
      projectDesc: description,
      account: account,
    };

    startFundRaising(
      web3,
      crowdFundingContract,
      data,
      onSuccess,
      onError,
      dispatch
    );
  };

  const handleInputValidation = (e) => {
    const charCode = e.charCode || e.keyCode;
    if (
      (charCode >= 48 && charCode <= 57) ||
      charCode === 8 || 
      charCode === 46 
    ) {
      return true;
    }
    e.preventDefault();
  };


  return (
    <>
      <h1 className="font-sans font-bold text-xl">
        Start a Fundraiser for Free
      </h1>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          riseFund(e);
        }}
      >
        <div className="form-control my-1">
          <label className="text-sm text-gray-700">Title :</label>
          <input
            type="text"
            placeholder="Type here"
            className="form-control-input border-neutral-400 focus:ring-neutral-200"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            required
          />
        </div>

        <div className="form-control">
          <label className="text-sm text-gray-700 mb-1 block">
            Description :
          </label>
          <textarea
            placeholder="Briefly describe your project and how the funds will be used..."
            rows={4}
            className="form-control-input w-full p-2 border border-neutral-400 rounded-md focus:ring-2 focus:ring-indigo-300 focus:outline-none resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Targeted Contribution */}
        <div className="form-control my-1">
          <label className="text-sm text-gray-700">
            Targeted Contribution Amount :
          </label>
          <div className="flex items-center border border-neutral-400 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-neutral-200">
            <input
              type="number"
              placeholder="Type here"
              className="flex-1 p-2 focus:outline-none focus:ring-0"
              value={targetedContributionAmount}
              onChange={(e) => setTargetedContributionAmount(e.target.value)}
              onKeyPress={handleInputValidation} // Add validation for input
              required
            />
            <div className="flex items-center gap-1 pl-2 pr-3">
              <FaEthereum size={18} className="text-indigo-600" />
              <span className="font-semibold text-gray-700">ETH</span>
            </div>
          </div>
        </div>

        {/* Minimum Contribution */}
        <div className="form-control my-1">
          <label className="text-sm text-gray-700">
            Minimum Contribution Amount :
          </label>
          <div className="flex items-center bg-gray-100 border border-neutral-400 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-neutral-200">
            <input
              type="number"
              placeholder="Type here"
              className="flex-1 p-2 focus:outline-none focus:ring-0"
              value={minimumContributionAmount}
              onChange={(e) => setMinimumContributionAmount(e.target.value)}
              onKeyPress={handleInputValidation} // Add validation for input
              required
            />
            <div className="flex items-center gap-1 pl-2 pr-3">
              <FaEthereum size={18} className="text-indigo-600" />
              <span className="font-semibold text-gray-700">ETH</span>
            </div>
          </div>
        </div>

        {/* Deadline */}
        <div className="form-control date-picker my-1">
          <label className="text-sm text-gray-700">Deadline :</label>
          <input
            type="date"
            placeholder="Type here"
            className="form-control-input border-neutral-400 focus:ring-neutral-200"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
          />
        </div>

        {/* Submit Button */}
        <button
          className="p-2 w-full bg-indigo-600 text-white rounded-md hover:bg-indigo-700"
          disabled={btnLoading}
        >
          {btnLoading ? "Loading..." : "Rise Fund"}
        </button>
      </form>
    </>
  );
};

export default FundRiserForm;
