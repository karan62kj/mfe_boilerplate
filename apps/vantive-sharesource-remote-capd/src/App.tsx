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
        CAPD Remote Application
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
              CAPD Main Dashboard
            </h2>
            <p style={{ 
              fontSize: '1.1rem', 
              lineHeight: '1.6',
              marginBottom: '2rem',
              color: '#374151'
            }}>
              Welcome to the CAPD (Continuous Ambulatory Peritoneal Dialysis) remote micro-frontend.
            </p>
            <div style={{ 
              marginTop: '2rem', 
              padding: '1.5rem', 
              backgroundColor: '#e0f2fe', 
              borderRadius: '8px',
              border: `2px solid ${primaryColor}`,
              boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)'
            }}>
              <h3 style={{ 
                color: primaryColor,
                fontSize: '1.5rem',
                marginBottom: '1rem',
                fontWeight: '600'
              }}>
                🎉 Navigation Success!
              </h3>
              <p style={{ 
                color: primaryColor, 
                fontWeight: 'bold',
                fontSize: '1.1rem',
                margin: 0
              }}>
                You successfully navigated here from the AMIA remote's sidenav!
              </p>
            </div>
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
                  🏥 Peritoneal dialysis management
                </li>
                <li style={{ 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '1rem'
                }}>
                  📊 Patient monitoring systems
                </li>
                <li style={{ 
                  padding: '0.5rem 0', 
                  borderBottom: '1px solid #e5e7eb',
                  fontSize: '1rem'
                }}>
                  📅 Treatment scheduling
                </li>
                <li style={{ 
                  padding: '0.5rem 0',
                  fontSize: '1rem'
                }}>
                  📈 Clinical data analysis
                </li>
              </ul>
            </div>
          </div>
        } />
      </Routes>
    </div>
  );
}

interface CapdProps {
  isStandalone?: boolean;
}

function App(props: CapdProps) {
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
