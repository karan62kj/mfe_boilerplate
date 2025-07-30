import { Link } from 'react-router-dom';
import { useOktaAuth } from '@okta/okta-react';
import { useSelector, useDispatch } from 'react-redux';
import { navbarItem } from '../../../constants';
import type { AppStore } from '../../../business/store/app.store';
import { oktaLogout } from '../../../business/slices/profileSlice';

export const Navbar = () => {
  const { oktaAuth } = useOktaAuth();
  const dispatch = useDispatch();
  const profile = useSelector((state: AppStore) => state.profile);
  
  const handleLogout = async () => {
    try {
      await oktaAuth.signOut();
      dispatch(oktaLogout());
    } catch (error) {
      console.error('Logout error:', error);
    }
  };
  const navBarBgColor = '#4a6ea8'; // Primary navbar background color
  const navBarItemBgColor = '#617598'; // Navigation item background
  const hoverBgColor = '#ffffff'; // White hover background
  const hoverTextColor = '#2b477d'; // Blue hover text
  const textColor = '#ffffff'; // White text

  const linkClasses = {
    display: 'flex',
    justifyContent: 'center',
    alignItems: 'center',
    fontWeight: '500',
    width: '100%',
    maxWidth: '175px',
    minWidth: '140px',
    borderRadius: '3px 3px 0 0',
    padding: '12px',
    marginTop: '16px',
    background: `linear-gradient(to bottom, #9cb0d3, ${navBarItemBgColor})`,
    color: textColor,
    textDecoration: 'none',
    flexGrow: 1,
    flexShrink: 1,
    transition: 'all 0.3s ease',
  };

  const hoverStyle = {
    background: `linear-gradient(to bottom, ${hoverBgColor}, #e5e7eb)`,
    color: hoverTextColor,
  };

  return (
    <>
      <nav
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          backgroundColor: navBarBgColor,
          color: textColor,
          fontSize: '14px',
          padding: '8px 16px',
        }}
      >
        <div style={{ display: 'flex', gap: '4px' }}>
          {navbarItem.map((item, index) => (
            <Link
              key={index}
              to={item.link}
              style={linkClasses}
              onMouseEnter={e => {
                Object.assign(e.currentTarget.style, hoverStyle);
              }}
              onMouseLeave={e => {
                Object.assign(e.currentTarget.style, {
                  background: `linear-gradient(to bottom, #9cb0d3, ${navBarItemBgColor})`,
                  color: textColor,
                });
              }}
            >
              {item.text}
            </Link>
          ))}
        </div>
        
        <div style={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: '1rem',
          fontSize: '13px'
        }}>
          {profile.user && (
            <span style={{ 
              color: textColor,
              opacity: 0.9,
              fontWeight: '500'
            }}>
              👤 {profile.user.name || profile.user.preferred_username || profile.user.email}
            </span>
          )}
          <button
            onClick={handleLogout}
            style={{
              background: 'rgba(255,255,255,0.1)',
              border: '1px solid rgba(255,255,255,0.3)',
              color: textColor,
              padding: '6px 12px',
              borderRadius: '4px',
              fontSize: '12px',
              cursor: 'pointer',
              transition: 'all 0.3s ease',
              fontWeight: '500'
            }}
            onMouseEnter={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.2)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.5)';
            }}
            onMouseLeave={(e) => {
              e.currentTarget.style.background = 'rgba(255,255,255,0.1)';
              e.currentTarget.style.borderColor = 'rgba(255,255,255,0.3)';
            }}
          >
            🚪 Logout
          </button>
        </div>
      </nav>
      <p style={{ color: '#617598', margin: '1rem 0' }}>---------------------------------------</p>
    </>
  );
};
