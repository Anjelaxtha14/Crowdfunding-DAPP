import React, { useEffect, useState } from "react";
import moment from "moment";
import { startFundRaising } from "../redux/interactions";
import { useDispatch, useSelector } from "react-redux";
import { etherToWei } from "../helper/helper";
import { toastSuccess, toastError } from "../helper/toastMessage";
import { FaEthereum, FaPaperPlane } from "react-icons/fa";

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
  const [category, setCategory] = useState("Technology"); // Default category
  const [btnLoading, setBtnLoading] = useState(false);
  const today = new Date().toISOString().split("T")[0];

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
      setCategory("Technology"); // Reset category
      toastSuccess("Fund raising started 🎉");
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
      projectCategory: category, // Include category in the data
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
            placeholder="Enter your fundraiser title"
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
            placeholder="Briefly describe your project and how the funds will be used. Include details about:
            - What the project aims to achieve
            - How the funds will be allocated
            - Timeline and milestones"
            rows={5}
            className="form-control-input w-full p-2 border border-neutral-400 rounded-md focus:ring-2 focus:ring-indigo-300 focus:outline-none resize-none"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            required
          ></textarea>
        </div>

        {/* Category Dropdown */}
        <div className="form-control my-1">
          <label className="text-sm text-gray-700">Category :</label>
          <select
            className="form-control-input border-neutral-400 focus:ring-neutral-200"
            value={category}
            onChange={(e) => setCategory(e.target.value)}
            required
          >
            <option value="Technology">Technology</option>
            <option value="Health">Health</option>
            <option value="Education">Education</option>
            <option value="Environment">Environment</option>
            <option value="Charity">Charity</option>
          </select>
        </div>

        {/* Targeted Contribution */}
        <div className="form-control my-1">
          <label className="text-sm text-gray-700">
            Targeted Contribution Amount :
          </label>
          <div className="flex items-center border border-neutral-400 rounded-md overflow-hidden focus-within:ring-2 focus-within:ring-neutral-200">
            <input
              type="number"
              placeholder="Enter total funding goal in ETH"
              className="flex-1 p-2 focus:outline-none focus:ring-0"
              value={targetedContributionAmount}
              onChange={(e) => setTargetedContributionAmount(e.target.value)}
              onKeyPress={handleInputValidation}
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
              placeholder="Enter minimum contribution amount in ETH"
              className="flex-1 p-2 focus:outline-none focus:ring-0"
              value={minimumContributionAmount}
              onChange={(e) => setMinimumContributionAmount(e.target.value)}
              onKeyPress={handleInputValidation}
              required
            />
            <div className="flex items-center gap-1 pl-2 pr-3">
              <FaEthereum size={18} className="text-indigo-600" />
              <span className="font-semibold text-gray-700">ETH</span>
            </div>
          </div>
        </div>

        <div className="form-control date-picker my-1">
          <label className="text-sm text-gray-700">Deadline :</label>
          <input
            type="date"
            placeholder="Select campaign end date"
            className="form-control-input border-neutral-400 focus:ring-neutral-200"
            value={deadline}
            onChange={(e) => setDeadline(e.target.value)}
            required
            min={today}
          />
        </div>

        {/* Submit Button */}
        <button
          className="p-2 w-full bg-indigo-600 text-white rounded-md hover:bg-indigo-700 flex items-center justify-center gap-2"
          disabled={btnLoading}
        >
          {btnLoading ? (
            <div className="flex items-center">
              <FaPaperPlane className="animate-spin mr-2" />{" "}
              {/* Spinning icon for loading */}
              Loading...
            </div>
          ) : (
            <div className="flex items-center">
              <FaPaperPlane className="mr-2" /> {/* Icon before the text */}
              Rise Fund
            </div>
          )}
        </button>
      </form>
    </>
  );
};

export default FundRiserForm;
