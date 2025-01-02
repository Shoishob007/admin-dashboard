import React from "react";
import DegreeLevelTabs from "./components/DegreeLevelTabs.jsx";

const DegreeLevel = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <DegreeLevelTabs />
        </div>
      </section>
    </>
  );
};

export default DegreeLevel;
