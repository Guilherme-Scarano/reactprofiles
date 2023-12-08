// LoadingSpinner.js
import React from 'react';
import { FaSpinner } from 'react-icons/fa';
import '../styles/LoadingSpinner.css';

const LoadingSpinner = () => {
  return (
    <div className="loading-spinner-container">
      <FaSpinner className="loading-spinner" size={50} color="#4070f4" />
      <p>Carregando...</p>
    </div>
  );
};

export default LoadingSpinner;
