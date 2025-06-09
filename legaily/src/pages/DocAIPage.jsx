// src/pages/DocAIPage.jsx
import React from 'react';
import DocAIApp from './DocAI/src/App'; // Adjust path based on where you moved App.js from client

const DocAIPage = () => {
  return (
    <div style={{ height: '100vh' }}>
      <DocAIApp />
    </div>
  );
};

export default DocAIPage;
