// src/components/dashboard/DashboardLoading.jsx
const DashboardLoading = ({ poolName, label }) => (
  <div className="border border-green-500 p-6 rounded shadow bg-black bg-opacity-60 text-green-300 space-y-4">
    {/* Header skeleton */}
    <div className="flex items-center justify-between">
      <div className="h-6 bg-green-400 bg-opacity-30 rounded animate-pulse w-1/3"></div>
      <div className="flex items-center gap-2">
        <div className="w-5 h-5 bg-green-400 bg-opacity-30 rounded animate-pulse"></div>
        <div className="h-4 bg-green-400 bg-opacity-30 rounded animate-pulse w-20"></div>
      </div>
    </div>

    {/* Loading text */}
    <p className="text-xs text-green-400">
      ⏳ Loading {poolName} data for {label}...
    </p>

    {/* Earnings skeleton */}
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      <div className="p-4 border border-green-500 rounded bg-black">
        <div className="h-4 bg-green-400 bg-opacity-30 rounded animate-pulse mb-2 w-1/2"></div>
        <div className="h-6 bg-green-400 bg-opacity-30 rounded animate-pulse w-3/4"></div>
      </div>
      <div className="p-4 border border-green-500 rounded bg-black">
        <div className="h-4 bg-green-400 bg-opacity-30 rounded animate-pulse mb-2 w-1/2"></div>
        <div className="h-6 bg-green-400 bg-opacity-30 rounded animate-pulse w-3/4"></div>
      </div>
    </div>

    {/* Workers skeleton */}
    <div className="space-y-2">
      <div className="h-5 bg-green-400 bg-opacity-30 rounded animate-pulse w-1/4"></div>
      <div className="h-4 bg-green-400 bg-opacity-20 rounded animate-pulse w-full"></div>
      <div className="h-4 bg-green-400 bg-opacity-20 rounded animate-pulse w-5/6"></div>
    </div>
  </div>
);

export default DashboardLoading;