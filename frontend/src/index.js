import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import { GoogleOAuthProvider } from '@react-oauth/google';

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <GoogleOAuthProvider clientId="801223498807-rgrsat3usg204brr417ghlrjq5go408d.apps.googleusercontent.com">
    <App />
    </GoogleOAuthProvider>
  </React.StrictMode>
);


