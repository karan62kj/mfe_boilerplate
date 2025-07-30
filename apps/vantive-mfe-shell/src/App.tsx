//@ts-nocheck
import { Suspense, lazy } from 'react';
import { useSelector } from 'react-redux';
import { Routes, Route, Navigate } from 'react-router-dom';

import './App.css';
import { Navbar } from './presentation/components/navbar/Navbar';
import type { AppStore } from './business/store/app.store';
import { Login } from './presentation/components/login/Login';
import { LoginCallback } from './presentation/components/auth/LoginCallback';
import { ProtectedRoute } from './presentation/components/auth/ProtectedRoute';

const DashboardApp = lazy(() => import('vantive-sharesource-remote-dashboard/Dashboard'));
const AmiaApp = lazy(() => import('vantive-sharesource-remote-amia/Amia'));
const ClariaApp = lazy(() => import('vantive-sharesource-remote-claria/Claria'));
const CapdApp = lazy(() => import('vantive-sharesource-remote-capd/Capd'));

function App() {
  const profile = useSelector((state: AppStore) => state.profile);

  // Show loading while auth state is initializing
  if (profile.loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignItems: 'center',
          height: '100vh',
          background: 'linear-gradient(135deg, #4a6ea8 0%, #617598 50%, #2b477d 100%)',
          color: 'white',
        }}
      >
        <div style={{ textAlign: 'center' }}>
          <div
            style={{
              width: '60px',
              height: '60px',
              border: '4px solid rgba(255,255,255,0.3)',
              borderTop: '4px solid white',
              borderRadius: '50%',
              animation: 'spin 1s linear infinite',
              margin: '0 auto 2rem',
            }}
          ></div>
          <h2>Initializing Vantive ShareSource</h2>
        </div>
      </div>
    );
  }

  return (
    <Routes>
      {/* Public Routes */}
      <Route path="/login" element={<Login />} />
      <Route path="/callback" element={<LoginCallback />} />

      {/* Protected Routes */}
      <Route
        path="/*"
        element={
          <ProtectedRoute>
            <Navbar />
            <Suspense
              fallback={
                <div
                  style={{
                    display: 'flex',
                    justifyContent: 'center',
                    alignItems: 'center',
                    height: '50vh',
                    color: '#2b477d',
                  }}
                >
                  <div style={{ textAlign: 'center' }}>
                    <div
                      style={{
                        width: '40px',
                        height: '40px',
                        border: '3px solid #e5e7eb',
                        borderTop: '3px solid #2b477d',
                        borderRadius: '50%',
                        animation: 'spin 1s linear infinite',
                        margin: '0 auto 1rem',
                      }}
                    ></div>
                    <p>Loading application...</p>
                  </div>
                </div>
              }
            >
              <Routes>
                <Route path="/dashboard/*" element={<DashboardApp isStandalone={false} />} />
                <Route path="/amia/*" element={<AmiaApp isStandalone={false} />} />
                <Route path="/claria/*" element={<ClariaApp isStandalone={false} />} />
                <Route path="/capd/*" element={<CapdApp isStandalone={false} />} />
                <Route path="*" element={<Navigate to="/amia" replace />} />
              </Routes>
            </Suspense>
          </ProtectedRoute>
        }
      />
    </Routes>
  );
}

export default App;
