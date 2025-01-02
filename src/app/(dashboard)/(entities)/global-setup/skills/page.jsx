import React from "react";
import SkillTabs from "./components/SkillTabs";

const Skills = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <SkillTabs />
        </div>
      </section>
    </>
  );
};

export default Skills;
