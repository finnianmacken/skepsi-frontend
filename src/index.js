import React from 'react';
import ReactDOM from 'react-dom';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';
import "semantic-ui-css/semantic.min.css";

// REACT ROUTER
import { BrowserRouter } from "react-router-dom";

// AUTH0
import Auth0ProviderWithHistory from 'components/Providers/Auth0ProviderWithHistory/Auth0ProviderWithHistory.js';

// REDUX
import store from './redux/store.js'
import { Provider } from 'react-redux';

ReactDOM.render(
  <React.StrictMode>
    <Provider store={store}>
      <BrowserRouter>
        <Auth0ProviderWithHistory>
              <App />
        </Auth0ProviderWithHistory>
      </BrowserRouter>
    </Provider>
  </React.StrictMode>,
  document.getElementById('root')
);

// If you want to start measuring performance in your app, pass a function
// to log results (for example: reportWebVitals(console.log))
// or send to an analytics endpoint. Learn more: https://bit.ly/CRA-vitals
reportWebVitals();
