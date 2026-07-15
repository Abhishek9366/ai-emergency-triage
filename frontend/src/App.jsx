import React from 'react';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navbar from './components/Navbar';
import NurseIntake from './pages/NurseIntake';
import DoctorDashboard from './pages/DoctorDashboard';

export default function App() {
  return (
    <BrowserRouter>
      <div className="min-h-screen bg-slate-50 font-sans selection:bg-blue-100 text-slate-900 antialiased">
        <Navbar />
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <Routes>
            <Route path="/" element={<NurseIntake />} />
            <Route path="/dashboard" element={<DoctorDashboard />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}