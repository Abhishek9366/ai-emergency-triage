import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Activity, ShieldAlert, Users } from 'lucide-react';

export default function Navbar() {
  const location = useLocation();

  return (
    <nav className="bg-white border-b border-slate-200 sticky top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
          
          {/* Logo Brand Section */}
          <div className="flex items-center space-x-2">
            <Activity className="h-6 w-6 text-blue-600 animate-pulse" />
            <span className="font-bold text-xl text-slate-800 tracking-tight">PulseTriage AI</span>
          </div>

          {/* Hackathon Role Toggles */}
          <div className="flex space-x-2">
            <Link 
              to="/" 
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${location.pathname === '/' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <ShieldAlert className="h-4 w-4" />
              <span>Nurse Intake</span>
            </Link>
            
            <Link 
              to="/dashboard" 
              className={`flex items-center space-x-1 px-4 py-2 rounded-lg font-medium text-sm transition-all ${location.pathname === '/dashboard' ? 'bg-blue-600 text-white shadow-sm' : 'text-slate-600 hover:bg-slate-100'}`}
            >
              <Users className="h-4 w-4" />
              <span>Doctor Dashboard</span>
            </Link>
          </div>

        </div>
      </div>
    </nav>
  );
}