import React from "react";
import JobTypeTabs from "./components/JobTypeTabs.jsx";

const JobType = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <JobTypeTabs />
        </div>
      </section>
    </>
  );
};

export default JobType;
