import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { toastError, toastSuccess } from "../helper/toastMessage";
import { voteWithdrawRequest, withdrawAmount } from "../redux/interactions";
import { FaHandHoldingUsd, FaCheckCircle, FaTimesCircle } from "react-icons/fa";

// Function to determine color based on the state
const colorMaker = (state) => {
  if (state === "Pending") {
    return "bg-yellow-500"; // Pending state color
  } else {
    return "bg-cyan-500"; // Default color
  }
};

const WithdrawRequestCard = ({
  props,
  withdrawReq,
  setWithdrawReq,
  contractAddress,
}) => {
  const dispatch = useDispatch();
  const [btnLoader, setBtnLoader] = useState(false);

  const account = useSelector((state) => state.web3Reducer.account);
  const web3 = useSelector((state) => state.web3Reducer.connection);

  // Withdraw balance function
  const withdrawBalance = (reqId) => {
    setBtnLoader(reqId);
    const data = {
      contractAddress: contractAddress,
      reqId: reqId,
      account: account,
      amount: props.amount,
    };
    const onSuccess = () => {
      setBtnLoader(false);
      const filteredReq = withdrawReq.filter(
        (data) => data.requestId === props.requestId
      );
      let filteredVal = filteredReq[0];
      filteredVal.status = "Completed"; // Update status to Completed
      setWithdrawReq([...withdrawReq, filteredVal]);
      toastSuccess(`Vote successfully added for request id ${reqId}`);
    };
    const onError = (message) => {
      setBtnLoader(false);
      toastError(message);
    };
    withdrawAmount(web3, dispatch, data, onSuccess, onError);
  };

  // Vote function
  const vote = (reqId) => {
    setBtnLoader(reqId);
    const data = {
      contractAddress: contractAddress,
      reqId: reqId,
      account: account,
    };
    const onSuccess = () => {
      setBtnLoader(false);
      const filteredReq = withdrawReq.filter(
        (data) => data.requestId === props.requestId
      );
      let filteredVal = filteredReq[0];
      filteredVal.totalVote = Number(filteredVal.totalVote) + 1;
      setWithdrawReq([...withdrawReq, filteredVal]);
      toastSuccess(`Vote successfully added for request id ${reqId}`);
    };
    const onError = (message) => {
      setBtnLoader(false);
      toastError(message);
    };
    voteWithdrawRequest(web3, data, onSuccess, onError);
  };

  return (
    <div className="relative my-6 mx-4 bg-white rounded-2xl shadow-lg hover:shadow-xl transition-all duration-300 p-6">
      {/* Status Ribbon */}
      <div
        className={`absolute top-2 right-2 ${colorMaker(
          props.status
        )} text-white px-4 py-1 rounded-lg text-sm font-semibold shadow-md`}
      >
        {props.status}
      </div>

      {/* Title and Description */}
      <h1
        className="text-xl font-bold text-gray-800 truncate"
        title={props.desc}
      >
        {props.desc.length > 30
          ? props.desc.substring(0, 30) + "..."
          : props.desc}
      </h1>

      <div className="flex flex-col lg:flex-row mt-4">
        {/* Request Information Section */}
        <div className="inner-card my-4 lg:w-2/5 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-md font-bold text-gray-600">Requested Amount</p>
          <p className="text-sm font-semibold text-gray-800">
            {props.amount} ETH
          </p>
          <p className="text-md font-bold text-gray-600">Total Vote</p>
          <p className="text-sm font-semibold text-gray-800">
            {props.totalVote}
          </p>
        </div>

        {/* Recipient and Action Section */}
        <div className="inner-card my-4 lg:w-3/5 p-4 bg-gray-100 rounded-lg shadow-md">
          <p className="text-md font-bold text-gray-600">Recipient Address</p>
          <p className="text-sm font-semibold text-gray-800 w-40 truncate">
            {props.reciptant}
          </p>

          {/* Button to withdraw or vote */}
          {account === props.reciptant ? (
            <button
              className="w-full bg-indigo-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-indigo-700 transition duration-300"
              onClick={() => withdrawBalance(props.requestId)}
              disabled={
                props.status === "Completed" || btnLoader === props.requestId
              }
            >
              {btnLoader === props.requestId ? "Processing..." : "Withdraw"}
            </button>
          ) : (
            <button
              className="w-full bg-yellow-600 text-white px-6 py-2 rounded-lg mt-4 hover:bg-yellow-700 transition duration-300"
              onClick={() => vote(props.requestId)}
              disabled={btnLoader === props.requestId}
            >
              {btnLoader === props.requestId ? "Processing..." : "Vote"}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default WithdrawRequestCard;
