import React from 'react'
import EntityTabs from "./components/EntityTabs.jsx";

const GlobalSetup = () => {
    return (
        <div>
          <section className="bg-white dark:bg-gray-900 mt-4 rounded-lg shadow-lg">
            <>
              <EntityTabs />
            </>
          </section>
        </div>
      );
}

export default GlobalSetup
