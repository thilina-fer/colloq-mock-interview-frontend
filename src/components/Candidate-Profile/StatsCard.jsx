import React from 'react';

const StatsCard = ({ icon, value, label }) => (
  <div className="bg-white p-5 rounded-2xl shadow-sm border border-gray-100 flex items-center gap-4">
    <div className="p-3 bg-gray-50 rounded-xl">
      {icon}
    </div>
    <div>
      <div className="text-2xl font-bold">{value}</div>
      <div className="text-xs text-gray-500 font-medium">{label}</div>
    </div>
  </div>
);

export default StatsCard;