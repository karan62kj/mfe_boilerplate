import { Routes, Route, BrowserRouter, Link, useNavigate } from 'react-router-dom';
import './App.css';
import { lazy, Suspense } from 'react';

const MainContent = lazy(() => import('./components/MainContent').then(module => ({ default: module.MainContent })));
const SubPage = lazy(() => import('./components/SubPage').then(module => ({ default: module.SubPage })));
const CapdSubmodule = lazy(() => import('vantive-sharesource-remote-capd-submodule/CapdSubmodule'));

function RenderRoutes(props: { isStandalone?: boolean }) {
  const { isStandalone = true } = props;
  const navigate = isStandalone ? null : useNavigate();
  
  const basePath = isStandalone ? "" : "/amia";
  
  // Color scheme from the navbar CSS
  const navBarItemBgColor = '#617598';
  const hoverBgColor = '#ffffff';
  const hoverTextColor = '#2b477d';
  const textColor = '#ffffff';
  
  const sidenavItemStyle = {
    color: textColor,
    textDecoration: 'none',
    padding: '12px 16px',
    backgroundColor: navBarItemBgColor,
    borderRadius: '4px',
    display: 'block',
    transition: 'all 0.3s ease',
    border: '1px solid rgba(0,0,0,0.1)'
  };
  
  return (
    <div style={{ display: 'flex', height: '100vh' }}>
      <div style={{
        width: '250px',
        backgroundColor: '#4a6ea8', // Primary navbar background color
        color: textColor,
        padding: '1rem',
        display: 'flex',
        flexDirection: 'column',
        gap: '1rem',
        borderRight: '2px solid #2b477d'
      }}>
        <h3 style={{ 
          color: textColor, 
          fontWeight: 'bold', 
          borderBottom: '2px solid #2b477d', 
          paddingBottom: '0.5rem',
          marginBottom: '1rem'
        }}>
          AMIA Navigation
        </h3>
        <Link 
          to={`${basePath}/`} 
          style={sidenavItemStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBgColor;
            e.currentTarget.style.color = hoverTextColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = navBarItemBgColor;
            e.currentTarget.style.color = textColor;
          }}
        >
          Main Content
        </Link>
        <Link 
          to="/capd" 
          style={sidenavItemStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBgColor;
            e.currentTarget.style.color = hoverTextColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = navBarItemBgColor;
            e.currentTarget.style.color = textColor;
          }}
          onClick={(e) => {
            if (!isStandalone && navigate) {
              e.preventDefault();
              navigate('/capd');
            }
          }}
        >
          Go to CAPD
        </Link>
        <Link 
          to={`${basePath}/sub-page`} 
          style={sidenavItemStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBgColor;
            e.currentTarget.style.color = hoverTextColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = navBarItemBgColor;
            e.currentTarget.style.color = textColor;
          }}
        >
          Sub Page
        </Link>
        <Link 
          to={`${basePath}/capd-submodule`} 
          style={sidenavItemStyle}
          onMouseEnter={(e) => {
            e.currentTarget.style.backgroundColor = hoverBgColor;
            e.currentTarget.style.color = hoverTextColor;
          }}
          onMouseLeave={(e) => {
            e.currentTarget.style.backgroundColor = navBarItemBgColor;
            e.currentTarget.style.color = textColor;
          }}
        >
          CAPD Submodule
        </Link>
      </div>
      <div style={{ 
        flex: 1, 
        padding: '2rem', 
        backgroundColor: '#f8fafc',
        color: '#2b477d'
      }}>
        <Suspense fallback={<div style={{ color: '#2b477d', fontSize: '18px' }}>Loading...</div>}>
          <Routes>
            <Route path="/" element={<MainContent />} />
            <Route path="/sub-page" element={<SubPage />} />
            <Route path="/capd-submodule/*" element={<CapdSubmodule isStandalone={false} />} />
          </Routes>
        </Suspense>
      </div>
    </div>
  );
}

interface AmiaProps {
  isStandalone?: boolean;
}

function App(props: AmiaProps) {
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

export default App
