// pages/ChatbotPage.js
import React, { useEffect } from 'react';

export default function ChatbotPage() {
  useEffect(() => {
    document.body.style.margin = '0';
    document.body.style.overflow = 'hidden'; // Prevent scrolling
    document.documentElement.style.margin = '0';
    document.body.style.backgroundColor = '#fff8f0';
    document.documentElement.style.backgroundColor = '#fff8f0';

    // Hide scrollbars globally
    const style = document.createElement('style');
    style.innerHTML = `
      html, body {
        overflow: hidden !important;
      }
      /* Hide scrollbars for all browsers */
      ::-webkit-scrollbar { display: none; }
      body { -ms-overflow-style: none; scrollbar-width: none; }
    `;
    document.head.appendChild(style);

    return () => {
      document.body.style.overflow = '';
      document.head.removeChild(style);
    };
  }, []);

  return (
    <div
      style={{
        minHeight: '70vh',
        width: '70vw',
        backgroundColor: '#ffffff',
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        boxSizing: 'border-box',
        overflow: 'hidden', // Prevent scrolling
      }}
    >
      <div
        style={{
          width: '100%',
          maxWidth: '900px',
          height: '80vh',
          backgroundColor: 'white',
          borderRadius: '25px',
          boxShadow: '0 8px 40px rgba(255,140,0,0.18)',
          border: '2.5px solid #ff8c00',
          overflow: 'hidden',
          display: 'flex',
          flexDirection: 'column',
          position: 'relative',
        }}
      >
        <div
          style={{
            background: '#ff7a1a',
            color: 'white',
            padding: '18px',
            textAlign: 'center',
            fontSize: '22px',
            fontWeight: 600,
            borderTopLeftRadius: '22px',
            borderTopRightRadius: '22px',
            boxShadow: '0 2px 10px rgba(255,140,0,0.13)',
            letterSpacing: '0.5px',
          }}
        >
          🧑‍⚖️ Legal AI Assistant
        </div>
        <div style={{
          flex: 1,
          backgroundColor: 'white',
          position: 'relative',
          overflow: 'hidden',
        }}>
          <iframe
            src="http://localhost:8501"
            title="Chatbot"
            style={{
              width: '100%',
              height: '100%',
              border: 'none',
              backgroundColor: 'white',
              overflow: 'hidden',
            }}
            scrolling="no"
          />
        </div>
      </div>
    </div>
  );
}
