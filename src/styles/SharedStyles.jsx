export const sharedStyles = `
  /* Global styles to hide ALL scrollbars and prevent scrolling */
  html, body, #root, div {
    margin: 0;
    padding: 0;
    overflow: hidden !important;
    -ms-overflow-style: none !important;  /* IE and Edge */
    scrollbar-width: none !important;  /* Firefox */
  }

  /* Hide webkit scrollbars */
  *::-webkit-scrollbar {
    display: none !important;
    width: 0 !important;
    height: 0 !important;
  }

  /* Base styles */
  body {
    font-family: 'Montserrat', sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
  }

  /* Container styles */
  .page-container {
    display: flex;
    height: 100vh;
    width: 100vw;
    position: relative;
    background: linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%);
  }
`;

// Remove scrollableStyles since we're disabling all scrolling

