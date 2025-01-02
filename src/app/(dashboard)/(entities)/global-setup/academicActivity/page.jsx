import React from "react";
import AcademicActivityTabs from "./components/AcademicActivityTabs.jsx";

const AcademicActivity = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <AcademicActivityTabs />
        </div>
      </section>
    </>
  );
};

export default AcademicActivity;
