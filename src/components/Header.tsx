import React from 'react';

const Header: React.FC = () => {
  return (
    <div className="header">
      <div className="container">
        <div className="header-content">
          <img 
            src={`${process.env.PUBLIC_URL}/images/cbse_logo.jpg`} 
            alt="CBSE Logo" 
            className="cbse-logo" 
          />
          <div className="header-text">
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <h2>केन्द्रीय माध्यमिक शिक्षा बोर्ड</h2>
            {/* eslint-disable-next-line jsx-a11y/heading-has-content */}
            <h1>Central Board of Secondary Education</h1>
          </div>
        </div>
      </div>
      <div className="url-text">http://cbseresults.nic.in</div>
    </div>
  );
};

export default Header; 