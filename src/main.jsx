import React from 'react'
import ReactDOM from 'react-dom/client'
import Home from './pages/Home'

// Import styles
import 'normalize.css';
import '../public/main.less';

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Home />
  </React.StrictMode>
)
