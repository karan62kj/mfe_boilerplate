import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

function RenderRoutes(props: { isStandalone?: boolean }) {
  const { isStandalone = true } = props;
  // Color scheme matching the application theme
  const primaryColor = '#2b477d';
  const secondaryColor = '#617598';
  const accentColor = '#4a6ea8';

  return (
    <div
      style={{
        padding: '2rem',
        backgroundColor: '#f8fafc',
        minHeight: '100vh',
        color: primaryColor,
      }}
    >
      <div
        style={{
          backgroundColor: 'white',
          borderRadius: '12px',
          padding: '2rem',
          border: `2px solid ${secondaryColor}`,
          boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
        }}
      >
        <h1
          style={{
            color: primaryColor,
            fontSize: '2rem',
            fontWeight: 'bold',
            borderBottom: `3px solid ${accentColor}`,
            paddingBottom: '1rem',
            marginBottom: '2rem',
            display: 'flex',
            alignItems: 'center',
            gap: '0.5rem',
          }}
        >
          🔧 CAPD Submodule
        </h1>

        <div
          style={{
            display: 'grid',
            gap: '2rem',
            gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
          }}
        >
          {/* Feature Card 1 */}
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#e0f2fe',
              borderRadius: '8px',
              border: `2px solid ${accentColor}`,
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
              📊 Analytics Dashboard
            </h3>
            <p
              style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1rem',
              }}
            >
              Monitor CAPD performance metrics and generate detailed reports for clinical analysis.
            </p>
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                fontSize: '0.85rem',
                color: '#374151',
              }}
            >
              Status: <span style={{ color: '#10b981', fontWeight: '600' }}>✓ Active</span>
            </div>
          </div>

          {/* Feature Card 2 */}
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#f0f9ff',
              borderRadius: '8px',
              border: `2px solid ${secondaryColor}`,
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
              👥 Patient Management
            </h3>
            <p
              style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1rem',
              }}
            >
              Comprehensive patient data management with treatment tracking and outcome analysis.
            </p>
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                fontSize: '0.85rem',
                color: '#374151',
              }}
            >
              Patients: <span style={{ color: primaryColor, fontWeight: '600' }}>247 Active</span>
            </div>
          </div>

          {/* Feature Card 3 */}
          <div
            style={{
              padding: '1.5rem',
              backgroundColor: '#f3e8ff',
              borderRadius: '8px',
              border: `2px solid ${primaryColor}`,
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
              🔬 Clinical Tools
            </h3>
            <p
              style={{
                color: '#6b7280',
                fontSize: '0.95rem',
                lineHeight: '1.6',
                marginBottom: '1rem',
              }}
            >
              Advanced clinical decision support tools and treatment protocol management.
            </p>
            <div
              style={{
                padding: '0.75rem',
                backgroundColor: 'white',
                borderRadius: '6px',
                border: '1px solid #e5e7eb',
                fontSize: '0.85rem',
                color: '#374151',
              }}
            >
              Tools: <span style={{ color: primaryColor, fontWeight: '600' }}>12 Available</span>
            </div>
          </div>
        </div>

        <div
          style={{
            marginTop: '2rem',
            padding: '1rem',
            backgroundColor: '#e0f2fe',
            borderRadius: '8px',
            border: `2px solid ${accentColor}`,
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
            💡 This is a microfrontend submodule loaded {isStandalone ? 'as standalone' : 'within AMIA\'s navigation structure'}
          </p>
        </div>
      </div>

      <Routes>
        <Route path="/*" element={null} />
      </Routes>
    </div>
  );
}

interface CapdSubmoduleProps {
  isStandalone?: boolean;
}

function App(props: CapdSubmoduleProps) {
  console.log({ props });
  const { isStandalone = true } = props;

  if (isStandalone) {
    return (
      <BrowserRouter>
        <RenderRoutes isStandalone={true} />
      </BrowserRouter>
    );
  }
  return <RenderRoutes isStandalone={false} />;
}

export default App;
