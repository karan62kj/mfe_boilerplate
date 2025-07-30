// @ts-nocheck
import { useSelector } from 'react-redux';
import { appStore } from 'vantive-mfe-shell/appStore';
import { AppV1Button } from '@mfe/shared-ui';

export const DashboardList = () => {
  console.log('Inside remote dashboard app');
  const stateData = useSelector((state: any) => state);
  console.log({ stateData });
  console.log('Parent state data:');
  const parentState = appStore.getState();
  console.log(parentState);

  const handleTestAction = () => {
    import('vantive-mfe-shell/profileSlice').then(({ fetchProfileStart }) => {
      console.log('Dispatching fetchProfileStart test action');
      // Trigger parent slice with test data
      appStore.dispatch(fetchProfileStart({ id: Math.floor(Math.random() * 100) }));
    });
  };

  const handleClearAuth = () => {
    import('vantive-mfe-shell/profileSlice').then(({ clearAuthError }) => {
      console.log('Clearing auth error');
      appStore.dispatch(clearAuthError());
    });
  };

  // Color scheme matching the application theme
  const primaryColor = '#2b477d';
  const secondaryColor = '#617598';
  const accentColor = '#4a6ea8';

  // Get current auth state from parent
  const authState = parentState?.profile || {};
  const isAuthenticated = authState.isAuthenticated || false;
  const currentUser = authState.user || null;
  const authError = authState.error || null;
  const isLoading = authState.loading || false;

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        color: primaryColor,
      }}
    >
      <h1
        style={{
          color: primaryColor,
          fontSize: '2.5rem',
          fontWeight: 'bold',
          borderBottom: `3px solid ${secondaryColor}`,
          paddingBottom: '1rem',
          marginBottom: '2rem',
          display: 'flex',
          alignItems: 'center',
          gap: '1rem',
        }}
      >
        📊 Dashboard Overview
        {isAuthenticated && (
          <span
            style={{
              fontSize: '1rem',
              backgroundColor: '#10b981',
              color: 'white',
              padding: '0.5rem 1rem',
              borderRadius: '20px',
              fontWeight: '500',
            }}
          >
            ✓ Authenticated
          </span>
        )}
      </h1>

      {/* Current User Info */}
      {isAuthenticated && currentUser && (
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: `2px solid ${accentColor}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            marginBottom: '2rem',
          }}
        >
          <h3
            style={{
              color: primaryColor,
              fontSize: '1.3rem',
              marginBottom: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            👤 Current User Information
          </h3>
          <div style={{ display: 'flex', flexWrap: 'wrap', gap: '1rem' }}>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <strong>Name:</strong> {currentUser.name || 'N/A'}
            </div>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <strong>Email:</strong> {currentUser.email || 'N/A'}
            </div>
            <div style={{ flex: '1', minWidth: '200px' }}>
              <strong>Username:</strong> {currentUser.preferred_username || 'N/A'}
            </div>
          </div>
        </div>
      )}

      {/* Error Display */}
      {authError && (
        <div
          style={{
            padding: '1rem',
            backgroundColor: '#fee2e2',
            border: '2px solid #f87171',
            borderRadius: '8px',
            marginBottom: '2rem',
            color: '#dc2626',
          }}
        >
          <strong>Authentication Error:</strong> {authError}
        </div>
      )}

      <div
        style={{
          display: 'grid',
          gap: '2rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(400px, 1fr))',
          marginBottom: '2rem',
        }}
      >
        {/* Authentication State Card */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: `2px solid ${secondaryColor}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3
            style={{
              color: primaryColor,
              fontSize: '1.3rem',
              marginBottom: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            🔐 Authentication State
          </h3>
          <div style={{ fontSize: '0.95rem', lineHeight: '1.6' }}>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Status:</strong>
              <span
                style={{
                  color: isAuthenticated ? '#10b981' : '#dc2626',
                  marginLeft: '0.5rem',
                }}
              >
                {isAuthenticated ? '✓ Authenticated' : '✗ Not Authenticated'}
              </span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Loading:</strong>
              <span style={{ marginLeft: '0.5rem' }}>{isLoading ? '⏳ Yes' : '✓ No'}</span>
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Last Requested ID:</strong> {authState.lastRequestedId || 'None'}
            </div>
            <div style={{ marginBottom: '0.5rem' }}>
              <strong>Has Access Token:</strong> {authState.accessToken ? '✓ Yes' : '✗ No'}
            </div>
          </div>
        </div>

        {/* Shell State Card */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: `2px solid ${secondaryColor}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3
            style={{
              color: primaryColor,
              fontSize: '1.3rem',
              marginBottom: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            🏢 Complete Shell State
          </h3>
          <div
            style={{
              backgroundColor: '#f9fafb',
              padding: '1rem',
              borderRadius: '8px',
              border: '1px solid #e5e7eb',
              fontFamily: 'monospace',
              fontSize: '0.8rem',
              color: '#374151',
              maxHeight: '300px',
              overflow: 'auto',
            }}
          >
            <pre>{JSON.stringify(parentState, null, 2)}</pre>
          </div>
        </div>
      </div>

      {/* Action Cards */}
      <div
        style={{
          display: 'grid',
          gap: '1.5rem',
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
        }}
      >
        {/* Redux Communication Test */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: `2px solid ${secondaryColor}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
            textAlign: 'center',
          }}
        >
          <h3
            style={{
              color: primaryColor,
              fontSize: '1.2rem',
              marginBottom: '1rem',
              fontWeight: '600',
            }}
          >
            🔄 Redux Communication Test
          </h3>
          <p
            style={{
              color: '#6b7280',
              marginBottom: '1.5rem',
              fontSize: '0.9rem',
              lineHeight: '1.5',
            }}
          >
            Test micro-frontend communication by dispatching actions to the shell's Redux store.
          </p>
          <AppV1Button
            onClick={handleTestAction}
            style={{
              padding: '10px 20px',
              fontSize: '0.9rem',
              fontWeight: '600',
              borderRadius: '8px',
              background: `linear-gradient(to bottom, #9cb0d3, ${secondaryColor})`,
              border: 'none',
              color: 'white',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              width: '100%',
            }}
          >
            🚀 Test Profile Action
          </AppV1Button>
        </div>

        {/* Clear Error Action */}
        {authError && (
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '12px',
              border: `2px solid #f87171`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
              textAlign: 'center',
            }}
          >
            <h3
              style={{
                color: '#dc2626',
                fontSize: '1.2rem',
                marginBottom: '1rem',
                fontWeight: '600',
              }}
            >
              🧹 Clear Authentication Error
            </h3>
            <p
              style={{
                color: '#6b7280',
                marginBottom: '1.5rem',
                fontSize: '0.9rem',
                lineHeight: '1.5',
              }}
            >
              Clear the current authentication error from the store.
            </p>
            <AppV1Button
              onClick={handleClearAuth}
              style={{
                padding: '10px 20px',
                fontSize: '0.9rem',
                fontWeight: '600',
                borderRadius: '8px',
                background: 'linear-gradient(to bottom, #fca5a5, #dc2626)',
                border: 'none',
                color: 'white',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                width: '100%',
              }}
            >
              🗑️ Clear Error
            </AppV1Button>
          </div>
        )}

        {/* System Status */}
        <div
          style={{
            padding: '1.5rem',
            backgroundColor: 'white',
            borderRadius: '12px',
            border: `2px solid ${accentColor}`,
            boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
          }}
        >
          <h3
            style={{
              color: primaryColor,
              fontSize: '1.2rem',
              marginBottom: '1rem',
              fontWeight: '600',
              display: 'flex',
              alignItems: 'center',
              gap: '0.5rem',
            }}
          >
            📊 System Status
          </h3>
          <div style={{ fontSize: '0.9rem', lineHeight: '1.6' }}>
            <div
              style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}
            >
              <span>MFE Dashboard:</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>✓ Active</span>
            </div>
            <div
              style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}
            >
              <span>Shell Connection:</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>✓ Connected</span>
            </div>
            <div
              style={{ marginBottom: '0.5rem', display: 'flex', justifyContent: 'space-between' }}
            >
              <span>Auth State:</span>
              <span
                style={{
                  color: isAuthenticated ? '#10b981' : '#dc2626',
                  fontWeight: '600',
                }}
              >
                {isAuthenticated ? '✓ Valid' : '✗ Invalid'}
              </span>
            </div>
            <div style={{ display: 'flex', justifyContent: 'space-between' }}>
              <span>Store Sync:</span>
              <span style={{ color: '#10b981', fontWeight: '600' }}>✓ Synced</span>
            </div>
          </div>
        </div>
      </div>

      {/* Info Footer */}
      <div
        style={{
          marginTop: '2rem',
          padding: '1rem',
          backgroundColor: '#e0f2fe',
          borderRadius: '8px',
          border: `2px solid ${primaryColor}`,
          textAlign: 'center',
        }}
      >
        <p
          style={{
            color: primaryColor,
            margin: 0,
            fontSize: '0.9rem',
            fontWeight: '500',
          }}
        >
          ℹ️ This dashboard demonstrates micro-frontend architecture with shared state management
        </p>
      </div>
    </div>
  );
};
