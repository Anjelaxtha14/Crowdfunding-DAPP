import { useRouter } from 'next/router'
import React,{useEffect,useState} from 'react'
import { useSelector } from 'react-redux'
import FundRiserCard from '../../components/FundRiserCard'
import Loader from '../../components/Loader'
import WithdrawRequestCard from '../../components/WithdrawRequestCard'
import authWrapper from '../../helper/authWrapper'
import { getAllWithdrawRequest, getContributors } from '../../redux/interactions';
import { FaEthereum, FaHandHoldingUsd, FaRegSadTear } from "react-icons/fa";

const ProjectDetails = () => {

  const router = useRouter()
  const { id } = router.query
  const web3 = useSelector(state=>state.web3Reducer.connection)
  const projectsList = useSelector(state=>state.projectReducer.projects)
  const filteredProject = projectsList?.filter(data =>  data.address === id)

  const [contributors, setContributors] = useState(null)
  const [withdrawReq, setWithdrawReq] = useState(null)

  useEffect(() => {
    if(id){

      const onSuccess = (data) =>{
        console.log(data);
        setContributors(data)
      }
      const onError = (error) =>{
        console.log(error)
      }

      getContributors(web3,id,onSuccess,onError)

      const loadWithdrawRequests = (data) =>{
        setWithdrawReq(data)
      }
      getAllWithdrawRequest(web3,id,loadWithdrawRequests)
    }
  }, [id])
  
  const pushWithdrawRequests = (data) =>{
    if(withdrawReq){
      setWithdrawReq([...withdrawReq,data])
    }else{
      setWithdrawReq([data])
    }
  }
  

  return (
    <div className="px-2 py-4 flex flex-col lg:px-12 lg:flex-row ">
      <div className="lg:w-7/12 my-2 lg:my-0 lg:mx-2">
        {filteredProject ? (
          <FundRiserCard
            props={filteredProject[0]}
            pushWithdrawRequests={pushWithdrawRequests}
          />
        ) : (
          <Loader />
        )}

        <div>
          {withdrawReq ? (
            withdrawReq.length > 0 ? (
              <div>
                <h1 className="font-sans text-xl text-gray font-semibold">
                  Withdraw requests
                </h1>
                {withdrawReq.map((data, i) => (
                  <WithdrawRequestCard
                    props={data}
                    withdrawReq={withdrawReq}
                    setWithdrawReq={setWithdrawReq}
                    contractAddress={id}
                    key={i}
                  />
                ))}
              </div>
            ) : (
              <p>Withdraw requests not found</p>
            )
          ) : (
            <Loader />
          )}
        </div>
      </div>
      <div className="card lg:w-5/12 h-screen my-4 overflow-y-hidden hover:overflow-y-auto">
        <h1 className="font-sans font-bold text-xl">All contributors</h1>
        {contributors ? (
          contributors.length > 0 ? (
            contributors.map((data, i) => (
              <div
                key={i}
                className="w-full mt-3 bg-white rounded-2xl shadow-md hover:shadow-lg transition-all duration-300 p-5 flex flex-col relative overflow-hidden group"
              >
                {/* Icon and Title */}
                <div className="flex items-center mb-3">
                  <div className="bg-indigo-500 p-3 rounded-full text-white flex items-center justify-center">
                    <FaHandHoldingUsd size={20} />
                  </div>
                  <div className="ml-3">
                    <div className="text-lg font-semibold text-indigo-800 hover:underline truncate block max-w-[200px] cursor-pointer bg-transparent border-none text-left p-0">
                      {data.contributor
                        ? `${data.contributor.slice(
                            0,
                            6
                          )}...${data.contributor.slice(-4)}`
                        : "No Contributor"}
                    </div>
                  </div>
                </div>

                {/* Amount */}
                <div className="flex items-center text-indigo-700 font-semibold text-base mb-3">
                  <FaEthereum className="mr-1" />
                  {data.amount ? data.amount : 0} ETH
                </div>

                {/* Contributor Address */}
                <div className="text-gray-400 text-xs leading-snug break-words">
                  <span className="font-semibold text-gray-500">
                    Contributor Address:
                  </span>{" "}
                  <br />
                  <span className="break-all">{data.contributor}</span>
                </div>

                {/* Hover effect */}
                <div className="absolute inset-0 bg-indigo-100 opacity-0 group-hover:opacity-20 transition-all duration-300 rounded-2xl"></div>
              </div>
            ))
          ) : (
            <p>Contributors not found</p>
          )
        ) : (
          <Loader />
        )}
      </div>
    </div>
  );
}

export default authWrapper(ProjectDetails)