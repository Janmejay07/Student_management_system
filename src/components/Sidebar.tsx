import React from 'react';
import { NavLink } from 'react-router-dom';
import { Users, LogOut } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export const Sidebar: React.FC = () => {
  const { logout } = useAuth();

  return (
    <div className="bg-gray-800 text-white w-64 min-h-screen p-4">
      <div className="text-2xl font-bold mb-8 text-center">
        Student Portal
      </div>
      <nav className="space-y-2">
        <NavLink
          to="/dashboard/students"
          className={({ isActive }) =>
            `flex items-center space-x-2 p-3 rounded-lg transition-colors ${
              isActive ? 'bg-gray-700' : 'hover:bg-gray-700'
            }`
          }
        >
          <Users size={20} />
          <span>Students</span>
        </NavLink>
        <button
          onClick={logout}
          className="w-full flex items-center space-x-2 p-3 rounded-lg hover:bg-gray-700 transition-colors"
        >
          <LogOut size={20} />
          <span>Logout</span>
        </button>
      </nav>
    </div>
  );
};