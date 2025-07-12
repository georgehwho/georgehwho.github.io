import React, { useState } from 'react';
import "./App.css";
import PDFViewer from './PDFViewer';

function App() {
  const [currentPage, setCurrentPage] = useState('home');

  return (
    <div className="App">
      <nav className="App-nav">
        <button 
          className={currentPage === 'home' ? 'active' : ''} 
          onClick={() => setCurrentPage('home')}
        >
          Home
        </button>
        <button 
          className={currentPage === 'pdfs' ? 'active' : ''} 
          onClick={() => setCurrentPage('pdfs')}
        >
          PDFs
        </button>
      </nav>
      
      {currentPage === 'home' ? (
        <header className="App-header">
          <h1>HI I'M GEORGE</h1>
          <h2>IF YOU ARE READING THIS</h2>
          <h2>I LOVE YOU</h2>
        </header>
      ) : (
        <PDFViewer />
      )}
    </div>
  );
}

export default App;
