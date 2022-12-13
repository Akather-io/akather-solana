const StakeToken = () => {
  return (
    <div className="flex flex-col pb-10 gap-10">
      <div className="flex flex-1 flex-col px-5 py-6 gap-4 text-black bg-slate-200 rounded-3xl">
        <div className="flex flex-1 text-indigo-600 border-b border-b-red-400 pb-5">
          Contract Details
        </div>
        <span>Name</span>
        <span className="uppercase">Idexo General Staking Pool</span>
        <div className="flex flex-row flex-1 justify-between">
          <div className="flex flex-col">
            <span>MINIMUM STAKE AMOUNT</span>
            <span>2500 IDO</span>
          </div>
          <div className="flex flex-col">
            <span>SYMBOL</span>
            <span>ATH</span>
          </div>
          <div className="flex flex-col">
            <span>TOTAL STAKED (IDO)</span>
            <span>1,347,224.41</span>
          </div>
        </div>
      </div>

      <div className="flex flex-1 flex-col px-5 py-6 gap-4 text-black bg-slate-200 rounded-3xl">
        <div className="flex flex-1 text-indigo-600 border-b border-b-red-400 pb-5">
          Your Details
        </div>
        <div className="flex flex-col items-center gap-5 md:flex-row">
          <div className="flex flex-col justify-center items-center gap-4">
            <span>YOUR IDO BALANCE</span>
            <span>0</span>
          </div>

          <div className="flex flex-1 h-56 justify-center items-center bg-white p-5 rounded-3xl gap-5">
            <div className="flex flex-col gap-4">
              <span>YOUR STAKE</span>
              <span>0</span>
            </div>
            <div className="flex flex-1 flex-col gap-4">
              <input
                type="number"
                placeholder="Enter stake amount"
                className="w-full max-w-lg bg-transparent input input-bordered"
              />
              <button className="btn border-0 outline-none flex items-center justify-center gap-2 rounded-[5px] text-white bg-[linear-gradient(90deg,#4588C7_3.67%,#354387_96.33%)]">
                STAKE IDO
              </button>
            </div>
          </div>

          <div className="flex flex-1 h-56 min-h-full justify-center items-center bg-white p-5 rounded-3xl gap-5">
            <div className="flex flex-col gap-4">
              <span>AVAILABLE USDT REWARD</span>
            </div>
          </div>

          <div className="flex flex-1 h-56 justify-center items-center bg-white p-5 rounded-3xl gap-5">
            <div className="flex flex-col gap-4">
              <input
                type="number"
                placeholder="Select the Token ID"
                className="w-full max-w-lg bg-transparent input input-bordered"
              />
              <input
                type="number"
                placeholder="Enter reward amount"
                className="w-full max-w-lg bg-transparent input input-bordered"
              />
              <button className="btn border-0 outline-none flex items-center justify-center gap-2 rounded-[5px] text-white bg-red-300">
                WITHDRAW REWARD
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
export default StakeToken;
