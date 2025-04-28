import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { contribute, createWithdrawRequest } from "../redux/interactions";
import { etherToWei } from "../helper/helper";
import { toastSuccess, toastError } from "../helper/toastMessage";
import { FaBullseye, FaCoins, FaHandHoldingUsd } from "react-icons/fa";
import Link from "next/link"; 
const getStateColor = (state) => {
  switch (state) {
    case "Fundraising":
      return "bg-cyan-500";
    case "Pending":
      return "bg-yellow-500";
    case "Successful":
      return "bg-emerald-500";
    default:
      return "bg-gray-500";
  }
};

const getCategoryColor = (category) => {
  switch (category) {
    case "Technology":
      return "bg-blue-500";
    case "Health":
      return "bg-green-500";
    case "Education":
      return "bg-purple-500";
    case "Environment":
      return "bg-teal-500";
    case "Charity":
    default:
      return "bg-orange-500";
  }
};

const FundRiserCard = ({ props, pushWithdrawRequests }) => {
  const [btnLoader, setBtnLoader] = useState(false);
  const [amount, setAmount] = useState(0);
  const dispatch = useDispatch();
  const crowdFundingContract = useSelector(
    (state) => state.fundingReducer.contract
  );
  const account = useSelector((state) => state.web3Reducer.account);
  const web3 = useSelector((state) => state.web3Reducer.connection);

  const contributeAmount = (projectId, minContribution) => {
    if (parseFloat(amount) < parseFloat(minContribution)) {
      toastError(`Minimum contribution amount is ${minContribution}`);
      return;
    }

    setBtnLoader(projectId);
    const contributionAmount = etherToWei(amount);

    const data = {
      contractAddress: projectId,
      amount: contributionAmount,
      account: account,
    };
    const onSuccess = () => {
      setBtnLoader(false);
      setAmount(0);
      toastSuccess(`Successfully contributed ${amount} ETH`);
    };
    const onError = (message) => {
      setBtnLoader(false);
      toastError(message);
    };
    contribute(crowdFundingContract, data, dispatch, onSuccess, onError);
  };

  const requestForWithdraw = (projectId) => {
    setBtnLoader(projectId);
    const contributionAmount = etherToWei(amount);

    const data = {
      description: `${amount} ETH requested for withdraw`,
      amount: contributionAmount,
      recipient: account,
      account: account,
    };
    const onSuccess = (data) => {
      setBtnLoader(false);
      setAmount(0);
      if (pushWithdrawRequests) {
        pushWithdrawRequests(data);
      }
      toastSuccess(`Successfully requested for withdraw ${amount} ETH`);
    };
    const onError = (message) => {
      setBtnLoader(false);
      toastError(message);
    };
    createWithdrawRequest(web3, projectId, data, onSuccess, onError);
  };

  const stateColor = getStateColor(props.state);
  const categoryColor = getCategoryColor(props.category || "Charity");

  return (
    <div className="relative my-6 mx-4 bg-indigo-400 text-white rounded-2xl shadow-2xl p-6">
      {/* Top Part */}

      <div className="flex justify-end items-center mb-6">
        <div className="flex gap-2">
          <span
            className={`${stateColor} text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md`}
          >
            {props.state}
          </span>
          <span
            className={`${categoryColor} text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md`}
          >
            {props.category || "Charity"}
          </span>
        </div>
      </div>
      <div>
        <Link href={`/project-details/${props.address}`}>
          <h1
            className="text-xl sm:text-2xl font-bold truncate cursor-pointer"
            title={props.title}
          >
            {props.title.length > 30
              ? props.title.substring(0, 30) + "..."
              : props.title}
          </h1>
        </Link>
      </div>

      {/* Description */}
      <p className="text-base text-indigo-100 font-medium mb-8">
        {props.description}
      </p>

      {/* Amounts Section */}
      <div className="grid grid-cols-2 gap-6 mb-8">
        <div className="flex items-center space-x-3 bg-indigo-500 p-4 rounded-lg shadow">
          <FaBullseye className="text-white text-2xl" />
          <div>
            <p className="text-xs tracking-wide">Target</p>
            <p className="font-bold text-lg">{props.goalAmount} ETH</p>
          </div>
        </div>
        <div className="flex items-center space-x-3 bg-indigo-500 p-4 rounded-lg shadow">
          <FaCoins className="text-white text-2xl" />
          <div>
            <p className="text-xs tracking-wide">Collected</p>
            <p className="font-bold text-lg">{props.contractBalance} ETH</p>
          </div>
        </div>
      </div>

      {/* Contribution Section */}
      {props.state !== "Successful" && (
        <>
          <div className="mb-6">
            <label className="block text-sm font-semibold mb-2">
              Contribution Amount
            </label>
            <div className="flex">
              <input
                type="number"
                placeholder="Enter amount"
                value={amount}
                onChange={(e) => setAmount(e.target.value)}
                disabled={btnLoader === props.address}
                className="w-full p-3 rounded-l-lg focus:outline-none text-gray-800"
              />
              <button
                className="flex items-center space-x-2 bg-green-500 hover:bg-green-600 text-white px-6 rounded-r-lg font-semibold"
                onClick={() =>
                  contributeAmount(props.address, props.minContribution)
                }
                disabled={btnLoader === props.address}
              >
                <FaHandHoldingUsd className="text-xl" />
                <span>
                  {btnLoader === props.address ? "Loading..." : "Contribute"}
                </span>
              </button>
            </div>
            <p className="text-xs text-yellow-100 mt-2">
              <span className="font-bold">NOTE:</span> Minimum{" "}
              {props.minContribution} ETH
            </p>
          </div>

          {/* Progress Status (Original Style) */}
          <div className="relative w-full bg-gray-200 rounded-lg h-6 mt-6 overflow-hidden">
            {/* Progress Background */}
            <div
              className="bg-green-400 h-full rounded-lg transition-all duration-500"
              style={{ width: `${props.progress}%` }}
            ></div>

            {/* Centered Progress Text */}
            <div className="absolute inset-0 flex items-center justify-center text-indigo-900 text-sm font-bold">
              {props.progress}%
            </div>
          </div>
        </>
      )}

      {/* If successful and creator */}
      {props.state === "Successful" && props.creator === account && (
        <div className="mt-8">
          <label className="block text-sm font-semibold mb-2">
            Withdraw Request
          </label>
          <div className="flex">
            <input
              type="number"
              placeholder="Enter amount"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
              disabled={btnLoader === props.address}
              className="w-full p-3 rounded-l-lg focus:outline-none text-gray-800"
            />
            <button
              className="flex items-center space-x-2 bg-yellow-500 hover:bg-yellow-600 text-white px-6 rounded-r-lg font-semibold"
              onClick={() => requestForWithdraw(props.address)}
              disabled={btnLoader === props.address}
            >
              <FaHandHoldingUsd className="text-xl" />
              <span>
                {btnLoader === props.address ? "Loading..." : "Withdraw"}
              </span>
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default FundRiserCard;
