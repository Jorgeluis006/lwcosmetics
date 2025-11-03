export default function Loading() {
  return (
    <div className="container">
      <div className="category-header">
        <div style={{ 
          height: '40px', 
          width: '300px', 
          background: '#f0f0f0', 
          borderRadius: '8px',
          animation: 'pulse 1.5s ease-in-out infinite',
          margin: '0 auto 10px'
        }}></div>
        <div style={{ 
          height: '20px', 
          width: '400px', 
          background: '#f0f0f0', 
          borderRadius: '8px',
          animation: 'pulse 1.5s ease-in-out infinite',
          margin: '0 auto'
        }}></div>
      </div>

      <div className="products-grid">
        {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
          <div key={i} className="product-card modern-card" style={{ minHeight: '400px' }}>
            <div style={{ 
              width: '100%', 
              height: '250px', 
              background: '#f0f0f0',
              borderRadius: '8px 8px 0 0',
              animation: 'pulse 1.5s ease-in-out infinite'
            }}></div>
            <div style={{ padding: '20px' }}>
              <div style={{ 
                height: '24px', 
                background: '#f0f0f0', 
                borderRadius: '4px',
                marginBottom: '10px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
              <div style={{ 
                height: '20px', 
                width: '60%',
                background: '#f0f0f0', 
                borderRadius: '4px',
                marginBottom: '10px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
              <div style={{ 
                height: '40px', 
                background: '#f0f0f0', 
                borderRadius: '4px',
                animation: 'pulse 1.5s ease-in-out infinite'
              }}></div>
            </div>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </div>
  );
}
