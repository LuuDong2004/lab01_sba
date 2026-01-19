import { createRoot } from 'react-dom/client'
import './index.css'
import 'bootstrap/dist/css/bootstrap.min.css';
import AuthProvider from './auth/authProvider.jsx';
import { BrowserRouter } from 'react-router-dom';
import { StrictMode } from 'react';
import App from './App.jsx';
createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <BrowserRouter>
        <App/>
      </BrowserRouter>
    </AuthProvider>
  </StrictMode>


)
