import { Routes, Route, BrowserRouter } from 'react-router-dom';
import './App.css';

function RenderRoutes() {
  const primaryColor = '#2b477d';
  const secondaryColor = '#617598';
  
  return (
    <div style={{ 
      padding: '2rem',
      backgroundColor: '#f8fafc',
      minHeight: '100vh',
      color: primaryColor
    }}>
      <h1 style={{ 
        color: primaryColor, 
        fontSize: '2.5rem', 
        fontWeight: 'bold',
        borderBottom: `3px solid ${secondaryColor}`,
        paddingBottom: '1rem',
        marginBottom: '2rem'
      }}>
        Claria Remote Application
      </h1>
      <Routes>
        <Route path="/" element={
          <div>
            <h2 style={{ 
              color: primaryColor, 
              fontSize: '2rem',
              marginBottom: '1rem',
              fontWeight: '600'
            }}>
              Claria Main Dashboard
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.6',
              marginBottom: '2rem',
              color: '#374151'
            }}>
              Welcome to the Claria remote micro-frontend.
            </p>
            <div style={{ 
              marginTop: '2rem',
              padding: '1.5rem',
              backgroundColor: 'white',
              borderRadius: '8px',
              border: `2px solid ${secondaryColor}`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                color: primaryColor, 
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                Key Features:
              </h3>
              <ul style={{ 
                listStyle: 'none', 
                padding: 0,
                color: '#374151'
              }}>
                <li style={{ 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '1rem'
                }}>
                  🧪 Laboratory information system
                </li>
                <li style={{ 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '1rem'
                }}>
                  📋 Test result management
                </li>
                <li style={{ 
                  padding: '0.5rem 0',
                  fontSize: '1rem'
                }}>
                  ✅ Quality control workflows
                </li>
              </ul>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

interface ClariaProps {
  isStandalone?: boolean;
}

function App(props: ClariaProps) {
  const { isStandalone = true } = props;
  
  if (isStandalone) {
    return (
      <BrowserRouter>
        <RenderRoutes />
      </BrowserRouter>
    );
  }
  return <RenderRoutes />;
}

export default App
