import React from "react";
import { Outlet, Navigate } from "react-router-dom";
import { Sidebar } from "../components/Sidebar";
import { useAuth } from "../context/AuthContext";

export const DashboardLayout: React.FC = () => {
  const { isAuthenticated } = useAuth(); // ✅ Ensure this returns correctly

  if (isAuthenticated === undefined) {
    return <div>Loading...</div>; // ✅ Prevents undefined access issues
  }

  if (!isAuthenticated) {
    return <Navigate to="/" replace />;
  }

  return (
    <div className="flex min-h-screen">
      <Sidebar />
      <main className="flex-1 bg-gray-100">
        <Outlet />
      </main>
    </div>
  );
};
