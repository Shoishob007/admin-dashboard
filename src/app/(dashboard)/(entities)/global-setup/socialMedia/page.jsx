import React from "react";
import SocialMediaTabs from "./components/SocialMediaTabs.jsx";

const SocialMedia = () => {
  return (
    <>
      <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
        <div>
          <SocialMediaTabs />
        </div>
      </section>
    </>
  );
};

export default SocialMedia;
