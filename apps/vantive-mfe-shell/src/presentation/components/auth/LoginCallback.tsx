//@ts-nocheck
import { useEffect } from 'react';
import { useOktaAuth } from '@okta/okta-react';
import { useDispatch } from 'react-redux';
import { oktaLoginSuccess, oktaLoginFailure } from '../../../business/slices/profileSlice';

export const LoginCallback = () => {
  const { oktaAuth, authState } = useOktaAuth();
  const dispatch = useDispatch();

  useEffect(() => {
    if (!authState) {
      return;
    }

    if (authState.isAuthenticated) {
      // Get user info and tokens
      const user = authState.idToken?.claims;
      const accessToken = authState.accessToken?.accessToken;
      const idToken = authState.idToken?.idToken;

      if (user && accessToken && idToken) {
        dispatch(
          oktaLoginSuccess({
            user,
            accessToken,
            idToken,
          }),
        );
      }
    } else if (authState.error) {
      dispatch(oktaLoginFailure(authState.error.message || 'Authentication failed'));
    }
  }, [authState, dispatch]);

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
        <h2 style={{ margin: '0 0 1rem 0', fontSize: '1.5rem' }}>Processing Login...</h2>
        <p style={{ opacity: 0.9, fontSize: '1rem' }}>
          Please wait while we complete your authentication
        </p>
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
};
