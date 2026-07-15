import React, { useState } from 'react';
import { triageAPI } from '../services/api';
import SeverityBadge from '../components/SeverityBadge';
import { ActivitySquare, Send, CheckCircle } from 'lucide-react';

export default function NurseIntake() {
  const [formData, setFormData] = useState({
    name: '', age: '', gender: 'Male',
    bloodPressure: '', heartRate: '', oxygenLevel: '', temperature: '',
    symptoms: '', duration: '', painLevel: 5, medicalHistory: '', allergies: ''
  });

  const [loading, setLoading] = useState(false);
  const [result, setResult] = useState(null);
  const [error, setError] = useState(null);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    try {
      const aiData = await triageAPI.submitTriage(formData);
      setResult(aiData);
    } catch (err) {
      setError(err.message || "Something went wrong during generation.");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="py-6 max-w-4xl mx-auto">
      <div className="bg-white shadow-sm border border-slate-200 rounded-xl p-6">
        <div className="flex items-center space-x-2 border-b border-slate-100 pb-4 mb-6">
          <ActivitySquare className="h-6 w-6 text-blue-600" />
          <h2 className="text-xl font-bold text-slate-800">Emergency Patient Assessment Intake</h2>
        </div>

        {error && <div className="mb-4 p-4 bg-red-50 text-red-700 border border-red-200 rounded-lg">{error}</div>}

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Full Name</label>
              <input type="text" name="name" required value={formData.name} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Age</label>
              <input type="number" name="age" required value={formData.age} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Gender</label>
              <select name="gender" value={formData.gender} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 bg-slate-50 focus:bg-white focus:ring-2 focus:ring-blue-500 outline-none transition">
                <option value="Male">Male</option>
                <option value="Female">Female</option>
                <option value="Other">Other</option>
              </select>
            </div>
          </div>

          <div className="bg-slate-50 p-4 rounded-xl border border-slate-200 grid grid-cols-2 md:grid-cols-4 gap-4">
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Blood Pressure</label>
              <input type="text" name="bloodPressure" placeholder="120/80" required value={formData.bloodPressure} onChange={handleInputChange} className="w-full border border-slate-300 bg-white rounded-md p-2 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Pulse Rate (BPM)</label>
              <input type="number" name="heartRate" placeholder="72" required value={formData.heartRate} onChange={handleInputChange} className="w-full border border-slate-300 bg-white rounded-md p-2 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Oxygen SpO2 (%)</label>
              <input type="number" name="oxygenLevel" placeholder="98" required value={formData.oxygenLevel} onChange={handleInputChange} className="w-full border border-slate-300 bg-white rounded-md p-2 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase text-slate-500 mb-1">Temp (°F)</label>
              <input type="number" step="0.1" name="temperature" placeholder="98.6" required value={formData.temperature} onChange={handleInputChange} className="w-full border border-slate-300 bg-white rounded-md p-2 outline-none text-sm" />
            </div>
          </div>

          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Presenting Symptoms</label>
            <textarea name="symptoms" rows="3" required placeholder="Describe pain, location, triggers in clear plain sentences..." value={formData.symptoms} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none focus:ring-2 focus:ring-blue-500 transition"></textarea>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Symptom Duration</label>
              <input type="text" name="duration" placeholder="e.g., 2 hours, 3 days" required value={formData.duration} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Pain Severity Scale (1 - 10): <span className="font-bold text-blue-600">{formData.painLevel}</span></label>
              <input type="range" name="painLevel" min="1" max="10" value={formData.painLevel} onChange={handleInputChange} className="w-full h-2 bg-slate-200 rounded-lg appearance-none cursor-pointer mt-3" />
            </div>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Relevant Medical History</label>
              <input type="text" name="medicalHistory" placeholder="Hypertension, Asthma, None etc." value={formData.medicalHistory} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none text-sm" />
            </div>
            <div>
              <label className="block text-sm font-semibold text-slate-700 mb-1">Known Allergies</label>
              <input type="text" name="allergies" placeholder="Penicillin, Peanuts, None etc." value={formData.allergies} onChange={handleInputChange} className="w-full border border-slate-300 rounded-lg p-2.5 outline-none text-sm" />
            </div>
          </div>

          <button type="submit" disabled={loading} className="w-full bg-blue-600 hover:bg-blue-700 active:bg-blue-800 text-white font-bold py-3 px-4 rounded-lg shadow transition duration-200 flex items-center justify-center space-x-2 disabled:opacity-50 disabled:cursor-not-allowed">
            {loading ? (
              <span className="flex items-center space-x-2">
                <svg className="animate-spin h-5 w-5 text-white" fill="none" viewBox="0 0 24 24"><circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle><path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path></svg>
                <span>Analyzing Clinical Data with AI...</span>
              </span>
            ) : (
              <>
                <Send className="h-4 w-4" />
                <span>Submit to AI Triage</span>
              </>
            )}
          </button>
        </form>
      </div>

      {result && (
        <div className="fixed inset-0 bg-slate-900/60 backdrop-blur-sm flex items-center justify-center p-4 z-50">
          <div className="bg-white rounded-2xl shadow-xl max-w-2xl w-full border border-slate-100 max-h-[90vh] overflow-y-auto transform transition-all scale-100 animate-in fade-in zoom-in-95 duration-200">
            <div className="p-6 border-b border-slate-100 flex justify-between items-center bg-slate-50 rounded-t-2xl">
              <div className="flex items-center space-x-2">
                <CheckCircle className="text-green-600 h-5 w-5" />
                <h3 className="font-bold text-lg text-slate-800">AI Critical Response Analysis</h3>
              </div>
              <span className="text-xs font-bold bg-slate-200 text-slate-600 px-2 py-1 rounded">
                AI Confidence: {result.confidenceScore}%
              </span>
            </div>
            
            <div className="p-6 space-y-4">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-2 p-3 bg-slate-50 border border-slate-200 rounded-lg">
                <div>
                  <span className="block text-xs uppercase text-slate-500 font-bold">Assigned Severity</span>
                  <div className="mt-1"><SeverityBadge level={result.severity} /></div>
                </div>
                <div>
                  <span className="block text-xs uppercase text-slate-500 font-bold">Recommended Department</span>
                  <span className="text-base font-bold text-slate-800">{result.recommendedDepartment}</span>
                </div>
                <div>
                  <span className="block text-xs uppercase text-slate-500 font-bold">Queue Priority No.</span>
                  <span className="text-lg font-black text-blue-600">#{result.priorityQueue}</span>
                </div>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Clinical AI Explanation</h4>
                <p className="text-sm text-slate-600 bg-blue-50/50 border border-blue-100 p-3 rounded-lg leading-relaxed">{result.aiReasoning}</p>
              </div>

              <div>
                <h4 className="text-sm font-bold text-slate-700 uppercase tracking-wide mb-1">Doctor-Ready Translation Shorthand</h4>
                <div className="text-sm font-mono text-slate-800 bg-slate-900 text-slate-100 p-4 rounded-lg overflow-x-auto border border-slate-800 whitespace-pre-line">
                  {result.doctorSummary}
                </div>
              </div>
            </div>

            <div className="p-4 border-t border-slate-100 flex justify-end">
              <button onClick={() => setResult(null)} className="bg-slate-800 hover:bg-slate-900 text-white font-semibold py-2 px-6 rounded-lg text-sm transition">
                Commit to ER Dashboard Queue
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}