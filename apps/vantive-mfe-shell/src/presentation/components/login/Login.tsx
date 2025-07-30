//@ts-nocheck
import { useState } from 'react';
import { AppV1Button } from '@mfe/shared-ui';
import { useDispatch, useSelector } from 'react-redux';
import { useOktaAuth } from '@okta/okta-react';
import { useLocation, useNavigate } from 'react-router-dom';
import {
  oktaLoginStart,
  oktaLoginFailure,
  oktaLoginSuccess,
} from '../../../business/slices/profileSlice';
import type { AppStore } from '../../../business/store/app.store';
import './Login.css';

export const Login = () => {
  const dispatch = useDispatch();
  const { oktaAuth } = useOktaAuth();
  const location = useLocation();
  const navigate = useNavigate();
  const { loading, error, isAuthenticated } = useSelector((state: AppStore) => state.profile);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [localError, setLocalError] = useState('');

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLocalError('');
    dispatch(oktaLoginStart());

    try {
      const transaction = await oktaAuth.signInWithCredentials({
        username: email,
        password: password,
      });

      if (transaction.status === 'SUCCESS') {
        const tokens = await oktaAuth.token.getWithoutPrompt({
          sessionToken: transaction.sessionToken,
          scopes: ['openid', 'profile', 'email'],
        });

        await oktaAuth.tokenManager.setTokens(tokens.tokens);

        dispatch(
          oktaLoginSuccess({
            user: tokens.tokens.idToken.claims,
            accessToken: tokens.tokens.accessToken.accessToken,
            idToken: tokens.tokens.idToken.idToken,
          }),
        );

        const from = location.state?.from?.pathname || '/';
        navigate(from, { replace: true });
      }
    } catch (err: any) {
      console.error('Login error:', err);
      const errorMessage = err.message || 'Invalid credentials';
      setLocalError(errorMessage);
      dispatch(oktaLoginFailure(errorMessage));
    }
  };

  if (isAuthenticated) {
    const from = location.state?.from?.pathname || '/';
    navigate(from, { replace: true });
    return null;
  }

  return (
    <div className="login">
      <div className="login-container">
        <div className="login-header">
          <h1 className="login-title">Vantive ShareSource</h1>
          <p className="login-subtitle">Secure Healthcare Platform</p>
        </div>

        <div className="app-card">
          <div className="app-card-body">
            {(error || localError) && (
              <div
                style={{
                  padding: '12px',
                  marginBottom: '1rem',
                  backgroundColor: '#fee2e2',
                  border: '1px solid #f87171',
                  borderRadius: '8px',
                  color: '#dc2626',
                  fontSize: '0.9rem',
                }}
              >
                <strong>Error:</strong> {localError || error}
              </div>
            )}

            <form onSubmit={handleLogin}>
              <div className="form-component">
                <label
                  htmlFor="email"
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}
                >
                  Email Address
                </label>
                <input
                  id="email"
                  type="email"
                  value={email}
                  onChange={e => setEmail(e.target.value)}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: loading ? '#f9fafb' : 'white',
                    color: '#111827',
                  }}
                  placeholder="Enter your email"
                />
              </div>

              <div className="form-component">
                <label
                  htmlFor="password"
                  style={{
                    display: 'block',
                    fontSize: '0.9rem',
                    fontWeight: '500',
                    color: '#374151',
                    marginBottom: '0.5rem',
                  }}
                >
                  Password
                </label>
                <input
                  id="password"
                  type="password"
                  value={password}
                  onChange={e => setPassword(e.target.value)}
                  required
                  disabled={loading}
                  style={{
                    width: '100%',
                    padding: '12px',
                    border: '1px solid #d1d5db',
                    borderRadius: '8px',
                    fontSize: '1rem',
                    backgroundColor: loading ? '#f9fafb' : 'white',
                    color: '#111827',
                  }}
                  placeholder="Enter your password"
                />
              </div>

              <div className="form-component">
                <AppV1Button
                  type="submit"
                  disabled={loading || !email || !password}
                  style={{
                    width: '100%',
                    padding: '14px 24px',
                    fontSize: '1rem',
                    fontWeight: '600',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    gap: '0.5rem',
                    opacity: loading || !email || !password ? 0.7 : 1,
                    cursor: loading || !email || !password ? 'not-allowed' : 'pointer',
                  }}
                >
                  {loading ? (
                    <>
                      <div
                        style={{
                          width: '16px',
                          height: '16px',
                          border: '2px solid transparent',
                          borderTop: '2px solid currentColor',
                          borderRadius: '50%',
                          animation: 'spin 1s linear infinite',
                        }}
                      ></div>
                      Signing In...
                    </>
                  ) : (
                    'Login'
                  )}
                </AppV1Button>
              </div>
            </form>

            <div
              style={{
                marginTop: '1.5rem',
                textAlign: 'center',
                fontSize: '0.85rem',
                color: '#9ca3af',
              }}
            >
              <p>By signing in, you agree to our terms of service and privacy policy.</p>
            </div>
          </div>
        </div>

        <div className="login-footer">
          <p>© 2024 Vantive ShareSource. All rights reserved.</p>
        </div>
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
