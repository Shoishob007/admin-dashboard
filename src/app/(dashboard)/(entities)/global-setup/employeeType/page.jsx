import React from "react";
import EmployeeTypeTabs from "./components/EmployeeTypeTabs.jsx";

const EmployeeType = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <EmployeeTypeTabs />
        </div>
      </section>
    </>
  );
};

export default EmployeeType;
