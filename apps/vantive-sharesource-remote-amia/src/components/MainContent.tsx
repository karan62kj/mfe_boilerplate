export const MainContent = () => {
    const primaryColor = '#2b477d';
    const secondaryColor = '#617598';
    
    return (
        <div style={{ color: primaryColor }}>
            <h1 style={{ 
                color: primaryColor, 
                fontSize: '2.5rem', 
                fontWeight: 'bold',
                borderBottom: `3px solid ${secondaryColor}`,
                paddingBottom: '1rem',
                marginBottom: '2rem'
            }}>
                AMIA Main Content
            </h1>
            <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                marginBottom: '2rem',
                color: '#374151'
            }}>
                This is the main content page of the AMIA remote application.
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
                    Features:
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
                        📊 Patient data management
                    </li>
                    <li style={{ 
                        padding: '0.5rem 0', 
                        borderBottom: '1px solid #e5e7eb',
                        fontSize: '1rem'
                    }}>
                        🔄 Clinical workflows
                    </li>
                    <li style={{ 
                        padding: '0.5rem 0',
                        fontSize: '1rem'
                    }}>
                        🔗 Integration with external systems
                    </li>
                </ul>
            </div>
        </div>
    );
}