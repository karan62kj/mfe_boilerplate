//@ts-nocheck
import { useEffect } from 'react';
import { Security } from '@okta/okta-react';
import { OktaAuth } from '@okta/okta-auth-js';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { oktaConfig } from '../../../config/oktaConfig';
import {
  oktaLoginSuccess,
  oktaLoginFailure,
  oktaLoginStart,
} from '../../../business/slices/profileSlice';

const oktaAuth = new OktaAuth(oktaConfig);

interface SecurityWrapperProps {
  children: React.ReactNode;
}

export const SecurityWrapper = ({ children }: SecurityWrapperProps) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const initializeAuth = async () => {
      try {
        dispatch(oktaLoginStart());

        // Handle auth state changes
        const handleAuthStateChange = async (state: any) => {
          console.log('Auth state change:', state);
          
          if (!state) {
            // Set not authenticated when no state
            dispatch(oktaLoginFailure('Not authenticated'));
            return;
          }

          try {
            if (state.isAuthenticated && state.idToken) {
              const user = state.idToken.claims;
              const accessToken = state.accessToken?.accessToken;
              const idToken = state.idToken.idToken;

              if (user && accessToken && idToken) {
                dispatch(
                  oktaLoginSuccess({
                    user,
                    accessToken,
                    idToken,
                  }),
                );
              }
            } else if (!state.isAuthenticated && !state.isPending) {
              // User is not authenticated and auth check is complete
              dispatch(oktaLoginFailure('Not authenticated'));
            } else if (state.error) {
              console.error('Auth state error:', state.error);
              dispatch(oktaLoginFailure(state.error.message || 'Authentication failed'));
            }
          } catch (error) {
            console.error('Error processing auth state:', error);
            dispatch(
              oktaLoginFailure(error instanceof Error ? error.message : 'Authentication failed'),
            );
          }
        };

        // Subscribe to auth state changes
        oktaAuth.authStateManager.subscribe(handleAuthStateChange);

        // Get and set initial auth state
        const initialAuthState = await oktaAuth.authStateManager.getAuthState();
        await handleAuthStateChange(initialAuthState);
      } catch (error) {
        console.error('Error initializing auth:', error);
        dispatch(
          oktaLoginFailure(
            error instanceof Error ? error.message : 'Authentication initialization failed',
          ),
        );
      }
    };

    initializeAuth();

    return () => {
      oktaAuth.authStateManager.unsubscribe();
    };
  }, [dispatch]);

  const restoreOriginalUri = async (_oktaAuth: any, originalUri?: string) => {
    const baseUrl = window.location.origin;
    const redirectPath = originalUri || '/';
    window.location.replace(`${baseUrl}${redirectPath}`);
  };

  return (
    <Security
      oktaAuth={oktaAuth}
      restoreOriginalUri={restoreOriginalUri}
      onAuthRequired={() => {
        navigate('/login');
      }}
    >
      {children}
    </Security>
  );
};
