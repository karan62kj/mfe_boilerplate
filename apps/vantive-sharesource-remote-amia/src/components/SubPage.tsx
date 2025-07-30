export const SubPage = () => {
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
                AMIA Sub Page
            </h1>
            <p style={{ 
                fontSize: '1.1rem', 
                lineHeight: '1.6',
                marginBottom: '2rem',
                color: '#374151'
            }}>
                This is a secondary page within the AMIA remote application.
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
                    Additional Information:
                </h3>
                <p style={{ 
                    fontSize: '1rem', 
                    lineHeight: '1.6',
                    color: '#374151'
                }}>
                    This page demonstrates the routing capabilities within the AMIA micro-frontend.
                    The sidebar navigation allows you to navigate between different sections of the application
                    while maintaining the overall application state and context.
                </p>
            </div>
        </div>
    );
}