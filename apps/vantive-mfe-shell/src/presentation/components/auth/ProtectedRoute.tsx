// @ts-nocheck
import { useSelector } from 'react-redux';
import { ReactNode } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import type { AppStore } from '../../../business/store/app.store';

interface ProtectedRouteProps {
  children: ReactNode;
}

export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
  const location = useLocation();
  const profile = useSelector((state: AppStore) => state.profile);

  // Show loading while authentication is being determined
  if (profile.loading) {
    return (
      <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        height: '100vh',
        background: 'linear-gradient(135deg, #4a6ea8 0%, #617598 50%, #2b477d 100%)',
        color: 'white'
      }}>
        <div style={{ textAlign: 'center' }}>
          <div style={{
            width: '60px',
            height: '60px',
            border: '4px solid rgba(255,255,255,0.3)',
            borderTop: '4px solid white',
            borderRadius: '50%',
            animation: 'spin 1s linear infinite',
            margin: '0 auto 2rem'
          }}></div>
          <h2>Checking Authentication...</h2>
        </div>
        <style>
          {`
            @keyframes spin {
              0% { transform: rotate(0deg); }
              100% { transform: rotate(360deg); }
            }
          `}
        </style>
      </div>
    );
  }

  // If not authenticated, redirect to our custom login page
  if (!profile.isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // If authenticated, render the protected content
  return <>{children}</>;
};
