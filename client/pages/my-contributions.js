import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import Loader from "../components/Loader";
import authWrapper from "../helper/authWrapper";
import { getMyContributionList } from "../redux/interactions";
import { FaEthereum, FaHandHoldingUsd, FaRegSadTear } from "react-icons/fa";
import Link from "next/link"; 

const MyContributions = () => {
  
  const crowdFundingContract = useSelector(
    (state) => state.fundingReducer.contract
  );
  const account = useSelector((state) => state.web3Reducer.account);

  const [contributions, setContributions] = useState(null);

  useEffect(() => {
    if (crowdFundingContract && account) {
      const fetchContributions = async () => {
        const res = await getMyContributionList(crowdFundingContract, account);
        console.log("Contributions:", res); // Debugging log
        setContributions(res);
      };
      fetchContributions();
    }
  }, [crowdFundingContract, account]);

  const formatAmount = (amount) => {
    return (Number(amount) / 1e18).toFixed(3);
  };

  

  return (
    <div className="px-4 py-10 min-h-screen">
      {/* Title and Tagline */}
      <div className="text-center mb-8">
        <h1 className="text-3xl font-bold text-indigo-700">
          Your Contributions
        </h1>
        <p className="text-base text-gray-500 mt-2">
          Here are the campaigns you've contributed to. Thank you for
          supporting!
        </p>
      </div>

      {contributions ? (
        contributions.length > 0 ? (
          <div className="flex flex-wrap gap-6">
            {contributions.map((data, i) => (
              <Link
                key={i} // Ensure each Link is unique by adding a key
                href={`/project-details/${data.projectAddress}`}
              >
                {/* Wrap everything in a single div */}
                <div className="w-full sm:w-[320px] bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col relative overflow-hidden z-10 cursor-pointer">
                  {/* Icon and Title */}
                  <div className="flex items-center mb-3">
                    <div className="bg-indigo-500 p-3 rounded-full text-white flex items-center justify-center">
                      <FaHandHoldingUsd size={20} />
                    </div>
                    <div className="ml-3">
                      <h2 className="text-lg font-semibold text-indigo-800 truncate block max-w-[200px] text-left p-0">
                        {data.title || "Untitled Campaign"}
                      </h2>
                    </div>
                  </div>

                  {/* Description */}
                  <p className="text-gray-600 text-sm mb-3 line-clamp-3 leading-snug">
                    {data.description || "No description available."}
                  </p>

                  {/* Amount */}
                  <div className="flex items-center text-indigo-700 font-semibold text-base mb-3">
                    <FaEthereum className="mr-1" />
                    {formatAmount(data.amount)} ETH
                  </div>

                  {/* Campaign Address */}
                  <div className="text-gray-400 text-xs leading-snug break-words">
                    <span className="font-semibold text-gray-500">
                      Campaign Address:
                    </span>{" "}
                    <br />
                    <span className="break-all">{data.projectAddress}</span>
                  </div>

                  {/* "Click to View Details" text */}
                  <div className="mt-4 text-center text-indigo-600 font-semibold cursor-pointer">
                    Click to View Details
                  </div>
                </div>
              </Link>
            ))}
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center text-gray-500 w-full mt-20">
            <FaRegSadTear size={60} className="mb-4" />
            <p className="text-xl font-semibold text-center px-4">
              You haven't contributed to any campaigns yet!
            </p>
          </div>
        )
      ) : (
        <div className="w-full flex justify-center items-center">
          <Loader />
        </div>
      )}
    </div>
  );
};

export default authWrapper(MyContributions);
