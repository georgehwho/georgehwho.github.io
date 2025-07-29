import React, { useState, useEffect } from 'react';
import './PDFViewer.css';

const PDFViewer = () => {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    // Define the PDFs that exist in the public/pdfs folder
    const availablePdfs = [
      {
        name: "Intermediate High Unit Two",
        filename: "Intermediate+High+Unit+Two-__.pdf"
      },
      {
        name: "Potter's Oracle (Kerkeslager 1998)",
        filename: "Potter's Oracle (Kerkeslager 1998).pdf"
      },
      {
        name: "Math Test",
        filename: "math_test.pdf"
      },
      {
        name: "Old Inferno Final",
        filename: "old inferno final.pdf"
      }
    ];
    
    setPdfs(availablePdfs);
  }, []);

  const openPDF = (filename) => {
    setSelectedPDF(filename);
  };

  const closePDF = () => {
    setSelectedPDF(null);
  };

  return (
    <div className="pdf-viewer">
      {!selectedPDF ? (
        <div className="pdf-list">
          <h2>Available PDFs</h2>
          <div className="pdf-grid">
            {pdfs.map((pdf, index) => (
              <div key={index} className="pdf-card" onClick={() => openPDF(pdf.filename)}>
                <div className="pdf-icon">📄</div>
                <h3>{pdf.name}</h3>
                <button className="view-btn">View PDF</button>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <div className="pdf-display">
          <div className="pdf-header">
            <button className="back-btn" onClick={closePDF}>
              ← Back to PDFs
            </button>
            <h3>Viewing: {pdfs.find(p => p.filename === selectedPDF)?.name}</h3>
          </div>
          <div className="pdf-container">
            <iframe
              src={`${process.env.PUBLIC_URL}/pdfs/${encodeURIComponent(selectedPDF)}`}
              width="100%"
              height="800px"
              title="PDF Viewer"
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default PDFViewer;