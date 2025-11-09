import React from 'react';

const Apply = () => (
  <div style={{ padding: '40px' }}>
    <h2>Rental Application</h2>
    <p>
      Interested in one of our properties? Complete our online application form to get started.
    </p>
    <button
      onClick={() => window.open('https://www.performancepropertymanagement.com/apply-now', '_blank')}
    >
      Apply Now
    </button>
  </div>
);

export default Apply;