import React from 'react';

export default function SeverityBadge({ level }) {
  // Simple map to handle medical visual coding rules
  const styleMap = {
    Critical: "bg-red-100 text-red-700 border-red-300",
    Urgent: "bg-orange-100 text-orange-700 border-orange-300",
    Moderate: "bg-yellow-100 text-yellow-700 border-yellow-300",
    Stable: "bg-green-100 text-green-700 border-green-300"
  };

  return (
    <span className={`px-3 py-1 text-sm font-bold border rounded-full uppercase tracking-wider ${styleMap[level] || 'bg-gray-100 text-gray-700'}`}>
      {level || 'Unknown'}
    </span>
  );
}