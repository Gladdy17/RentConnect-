import React from "react";
import { Outlet } from "react-router-dom"; // ✅ Import Outlet
import Header from "./Header";
import Sidenav from "./Sidenav";

function TenantDashboard({ User, setLoggedIn }) {
  return (
    <>
      <Header User={User} setLoggedIn={setLoggedIn} />
      <div className="tenant_dashboard_container">
        <Outlet /> {/* ✅ Renders nested views inside dashboard layout */}
      </div>
      <Sidenav User={User} />
    </>
  );
}

export default TenantDashboard;