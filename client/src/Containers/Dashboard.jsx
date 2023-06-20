import React from "react";
import { DBLeftSection, DBRightSection } from "../components";

const Dashboard = () => {
  return (
    <div className="flex items-center w-screen h-screen bg-primary">
      <DBLeftSection />
      <DBRightSection />
    </div>
  );
};

export default Dashboard;
