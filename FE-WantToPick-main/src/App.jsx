import React from 'react';
import Router from './routes/routes';
import { AuthProvider } from './hooks/AuthProvider'; // AuthProvider 경로

function App() {
  return (
    <AuthProvider>
      <Router />
    </AuthProvider>
  );
}

export default App;
