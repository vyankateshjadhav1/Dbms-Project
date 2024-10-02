import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './App.jsx';
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import { ClerkProvider } from '@clerk/clerk-react';
const { VITE_CLERK_PUBLISHABLE_KEY } = import.meta.env;

const publishableKey = VITE_CLERK_PUBLISHABLE_KEY;
console.log(publishableKey);

createRoot(document.getElementById('root')).render(
  <BrowserRouter>
    <ClerkProvider publishableKey={publishableKey}>
      <App />

    </ClerkProvider>
  </ BrowserRouter>

);

