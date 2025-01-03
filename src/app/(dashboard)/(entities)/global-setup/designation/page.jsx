import React from "react";
import DesignationTabs from "./components/DesignationTabs.jsx";

const Designation = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <DesignationTabs />
        </div>
      </section>
    </>
  );
};

export default Designation;
