import { useState } from 'react';
import './App.css';
import Extractor from './Extractor';

function App() {
  return (
    <div style={styles.background}>
      <Extractor />
    </div>
  );
}

const styles = {
  background: {
    minHeight: '100vh',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    background: 'linear-gradient(135deg, #4facfe, #00f2fe)', // Gradient background
    backgroundRepeat: 'no-repeat',
    backgroundAttachment: 'fixed',
    backgroundSize: 'cover',
  },
};

export default App;
