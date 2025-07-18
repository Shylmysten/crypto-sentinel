const EarningsSummary = ({ unpaid, estimated }) => (
  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-6 font-mono text-green-300">
    <div className="p-4 border border-green-500 rounded bg-black shadow shadow-green-900/30">
      <p className="text-sm">Unpaid Balance</p>
      <p className="text-xl font-bold text-green-400">{unpaid} ETH</p>
    </div>
    <div className="p-4 border border-green-500 rounded bg-black shadow shadow-green-900/30">
      <p className="text-sm">Estimated Daily Earnings</p>
      <p className="text-xl font-bold text-green-400">{estimated} ETH</p>
    </div>
  </div>
);

export default EarningsSummary;
