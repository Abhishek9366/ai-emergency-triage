import React, { useEffect, useState } from 'react';
import { triageAPI } from '../services/api';
import SeverityBadge from '../components/SeverityBadge';
import { RefreshCw, ClipboardList, Clock } from 'lucide-react';

export default function DoctorDashboard() {
  const [queue, setQueue] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchQueueData = async () => {
    setLoading(true);
    try {
      const data = await triageAPI.getQueue();
      const sortedQueue = data.sort((a, b) => a.priorityQueue - b.priorityQueue);
      setQueue(sortedQueue);
    } catch (err) {
      setError("Failed to fetch running patient emergency tracking list.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchQueueData();
    const handleRefresh = setInterval(fetchQueueData, 10000);
    return () => clearInterval(handleRefresh);
  }, []);

  return (
    <div className="py-6">
      <div className="flex flex-col sm:flex-row sm:items-center justify-between mb-6 gap-4">
        <div>
          <h2 className="text-2xl font-black text-slate-800 tracking-tight">Active ER Triage Dashboard</h2>
          <p className="text-sm text-slate-500">Live clinical pipeline pre-sorted by severity matrix mapping</p>
        </div>
        <button onClick={fetchQueueData} disabled={loading} className="flex items-center space-x-2 bg-white border border-slate-300 hover:bg-slate-50 px-4 py-2 rounded-lg font-semibold text-sm shadow-sm transition disabled:opacity-50">
          <RefreshCw className={`h-4 w-4 text-slate-600 ${loading ? 'animate-spin' : ''}`} />
          <span>Refresh Queue</span>
        </button>
      </div>

      {error && <div className="p-4 bg-red-50 border border-red-200 text-red-700 rounded-xl mb-4">{error}</div>}

      {loading && queue.length === 0 ? (
        <div className="text-center py-12"><div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto"></div></div>
      ) : queue.length === 0 ? (
        <div className="text-center py-16 bg-white border border-dashed border-slate-300 rounded-2xl">
          <ClipboardList className="mx-auto h-12 w-12 text-slate-300 mb-2" />
          <p className="text-slate-500 font-medium">No patients currently in triage queue.</p>
        </div>
      ) : (
        <div className="grid grid-cols-1 gap-4">
          {queue.map((patient) => (
            <div key={patient._id || patient.id} className="bg-white border border-slate-200 shadow-sm rounded-xl p-5 hover:border-blue-300 transition duration-150 flex flex-col md:flex-row md:items-start justify-between gap-4">
              <div className="space-y-3 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <h3 className="text-lg font-bold text-slate-800">{patient.name}</h3>
                  <span className="text-sm text-slate-500 font-medium">({patient.age}y/o • {patient.gender})</span>
                  <SeverityBadge level={patient.severity} />
                  <span className="bg-blue-50 text-blue-700 border border-blue-100 px-2.5 py-0.5 rounded-md text-xs font-bold uppercase tracking-wide">
                    {patient.recommendedDepartment}
                  </span>
                </div>

                <div className="flex flex-wrap gap-4 text-xs font-mono font-bold text-slate-600 bg-slate-50 px-3 py-2 rounded-md border border-slate-100">
                  <span>BP: <span className="text-slate-900">{patient.bloodPressure}</span></span>
                  <span>PR: <span className="text-slate-900">{patient.heartRate} bpm</span></span>
                  <span>SpO2: <span className={parseInt(patient.oxygenLevel) < 92 ? "text-red-600 font-black" : "text-slate-900"}>{patient.oxygenLevel}%</span></span>
                  <span>Temp: <span className="text-slate-900">{patient.temperature} °F</span></span>
                  <span>Pain: <span className="text-slate-900">{patient.painLevel}/10</span></span>
                </div>

                <div>
                  <span className="block text-xs uppercase font-bold tracking-wider text-slate-400 mb-1">Clinical AI Shorthand Summary</span>
                  <div className="text-sm text-slate-800 font-mono bg-slate-50 border border-slate-150 p-3 rounded-lg whitespace-pre-line">
                    {patient.doctorSummary}
                  </div>
                </div>

                <p className="text-xs text-slate-500 italic bg-slate-50/50 p-2 rounded border border-dashed border-slate-200">
                  <span className="font-bold font-sans not-italic text-slate-600">AI Analysis Logic:</span> {patient.aiReasoning}
                </p>
              </div>

              <div className="flex md:flex-col items-center justify-between md:justify-center border-t md:border-t-0 md:border-l border-slate-100 pt-3 md:pt-0 md:pl-6 gap-2 min-w-[120px]">
                <div className="text-center md:w-full">
                  <span className="block text-[10px] uppercase font-bold text-slate-400">Priority Queue</span>
                  <span className="text-3xl font-black text-slate-800 tracking-tighter block">#{patient.priorityQueue}</span>
                </div>
                <div className="flex items-center text-slate-400 text-xs font-medium space-x-1">
                  <Clock className="h-3 w-3" />
                  <span>Assessed</span>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}