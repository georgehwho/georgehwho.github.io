import React, { useState, useEffect } from 'react';
import './PDFViewer.css';

const PDFViewer = () => {
  const [selectedPDF, setSelectedPDF] = useState(null);
  const [pdfs, setPdfs] = useState([]);

  useEffect(() => {
    const loadPDFs = async () => {
      try {
        const response = await fetch(`${process.env.PUBLIC_URL}/pdfs/`);
        if (response.ok) {
          const html = await response.text();
          const parser = new DOMParser();
          const doc = parser.parseFromString(html, 'text/html');
          const links = Array.from(doc.querySelectorAll('a[href$=".pdf"]'));
          
          const pdfObjects = links.map(link => {
            const filename = link.getAttribute('href');
            return {
              name: decodeURIComponent(filename).replace(/\+/g, ' ').replace('.pdf', ''),
              filename: filename
            };
          });
          
          setPdfs(pdfObjects);
        } else {
          const fallbackPdfs = [
            "Intermediate+High+Unit+Two-__.pdf",
            "Potter's Oracle (Kerkeslager 1998).pdf", 
            "math_test.pdf",
            "old inferno final.pdf"
          ].map(filename => ({
            name: filename.replace(/\+/g, ' ').replace('.pdf', ''),
            filename: filename
          }));
          
          setPdfs(fallbackPdfs);
        }
      } catch (error) {
        console.error('Error loading PDFs:', error);
        const fallbackPdfs = [
          "Intermediate+High+Unit+Two-__.pdf",
          "Potter's Oracle (Kerkeslager 1998).pdf",
          "math_test.pdf", 
          "old inferno final.pdf"
        ].map(filename => ({
          name: filename.replace(/\+/g, ' ').replace('.pdf', ''),
          filename: filename
        }));
        
        setPdfs(fallbackPdfs);
      }
    };

    loadPDFs();
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
              src={`${process.env.PUBLIC_URL}/pdfs/${selectedPDF}`}
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