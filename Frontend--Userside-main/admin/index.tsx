import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';

const renderApp = () => {
  const rootElement = document.getElementById('root');
  if (!rootElement) {
    // This error should now be prevented by the DOMContentLoaded check.
    throw new Error("Could not find root element to mount to");
  }

  const root = ReactDOM.createRoot(rootElement);
  root.render(
    <React.StrictMode>
      <App />
    </React.StrictMode>
  );
};

// Wait for the initial HTML document to be completely loaded and parsed,
// without waiting for stylesheets, images, and subframes to finish loading.
if (document.readyState === 'loading') {
  document.addEventListener('DOMContentLoaded', renderApp);
} else {
  // DOMContentLoaded has already fired
  renderApp();
}
