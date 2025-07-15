// src/components/RewardsTable.jsx
const RewardsTable = ({ payouts }) => (
  <div>
    <h3>Recent Payouts</h3>
    <table>
      <thead>
        <tr>
          <th>Date</th>
          <th>Amount (ETH)</th>
        </tr>
      </thead>
      <tbody>
        {payouts.slice(0, 5).map((p, i) => (
          <tr key={i}>
            <td>{new Date(p.paidOn * 1000).toLocaleDateString()}</td>
            <td>{(p.amount / 1e18).toFixed(5)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
);

export default RewardsTable;
