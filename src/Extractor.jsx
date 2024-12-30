import React, { useState } from 'react';

function Extractor() {
  const [file, setFile] = useState(null);
  const [extractedContent, setExtractedContent] = useState(null);
  const [downloadLink, setDownloadLink] = useState(null);
  const [error, setError] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    if (selectedFile) {
      setFile(selectedFile);
    }
  };

  const handleExtractContent = async () => {
    if (!file) {
      setError("No file provided. Please upload a PDF.");
      return;
    }

    // Clear any previous error or content
    setError(null);
    setExtractedContent(null);
    setDownloadLink(null);

    const formData = new FormData();
    formData.append('file', file);

    try {
      // Define the API endpoint
      const response = await fetch('https://file-extractor-api.onrender.com/extract', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        const errorData = await response.json();
        setError(`Error: ${errorData.error || 'Unknown error'}`);
        return;
      }

      const data = await response.json();
      const content = data.content || 'No content extracted.';

      setExtractedContent(content);

      // Generate the Word file content and link it for download
      const blob = new Blob([content], { type: 'application/vnd.openxmlformats-officedocument.wordprocessingml.document' });
      const wordFile = new File([blob], "extracted_content.docx", { type: "application/vnd.openxmlformats-officedocument.wordprocessingml.document" });

      const link = URL.createObjectURL(wordFile);
      setDownloadLink(link);

    } catch (err) {
      setError(`An error occurred: ${err.message}`);
    }
  };

  const styles = {
    container: {
      fontFamily: 'Arial, sans-serif',
      maxWidth: '600px',
      margin: '20px auto',
      padding: '20px',
      boxShadow: '0 4px 8px rgba(0, 0, 0, 0.2)',
      borderRadius: '10px',
      backgroundColor: '#f9f9f9',
    },
    heading: {
      textAlign: 'center',
      color: '#333',
    },
    input: {
      margin: '10px 0',
      padding: '10px',
      width: '100%',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    button: {
      padding: '10px 20px',
      marginTop: '10px',
      backgroundColor: '#007BFF',
      color: 'white',
      border: 'none',
      borderRadius: '5px',
      cursor: 'pointer',
    },
    error: {
      color: 'red',
      marginTop: '10px',
    },
    textArea: {
      width: '100%',
      height: '150px',
      marginTop: '10px',
      padding: '10px',
      border: '1px solid #ccc',
      borderRadius: '5px',
    },
    link: {
      display: 'block',
      marginTop: '10px',
      color: '#007BFF',
      textDecoration: 'none',
    },
    footer: {
      textAlign: 'center',
      marginTop: '20px',
      fontSize: '12px',
      color: '#666',
    },
  };

  return (
    <div style={styles.container}>
      <h1 style={styles.heading}>Content Extractor</h1>
      <p>Upload a PDF or Image file to extract its text content. Optionally, download the content as a Word document.</p>

      <input type="file" accept=".pdf, .jpg, .png, .jpeg" onChange={handleFileChange} style={styles.input} />
      <button onClick={handleExtractContent} style={styles.button}>Extract Content</button>

      {error && <p style={styles.error}>{error}</p>}

      {extractedContent && (
        <div>
          <h3>Extracted Content:</h3>
          <textarea value={extractedContent} readOnly style={styles.textArea}></textarea>
        </div>
      )}

      {downloadLink && (
        <div>
          <a href={downloadLink} download="extracted_content.docx" style={styles.link}>Download Word File</a>
        </div>
      )}

      <div style={styles.footer}>
        <p>&copy; 2024 Content Extractor App</p>
      </div>
    </div>
  );
}

export default Extractor;
