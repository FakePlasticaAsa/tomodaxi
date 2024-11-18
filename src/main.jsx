import React from 'react';
import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client'; // Import only from 'react-dom/client'
import './index.css';
import App from './App.jsx';

const root = createRoot(document.getElementById('root')); // Create the root container
root.render(
  <StrictMode>
    <App />
  </StrictMode>
);
