import React from 'react';
import ReactDOM from 'react-dom/client';
import './main.scss';
import { BrowserRouter as Router } from 'react-router-dom';
import { Provider } from 'react-redux';
import { appStore } from './store/store';
import { App } from './components/app/app';

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <Router>
      <Provider store={appStore}>
        <App />
      </Provider>
    </Router>
  </React.StrictMode>
);
