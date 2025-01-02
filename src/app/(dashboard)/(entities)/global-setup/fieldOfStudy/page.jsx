import React from "react";
import FieldOfStudyTabs from "./components/FieldOfStudyTabs.jsx";

const FieldOfStudy = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <FieldOfStudyTabs />
        </div>
      </section>
    </>
  );
};

export default FieldOfStudy;
