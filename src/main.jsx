import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App.jsx';
import { Auth0Provider } from "@auth0/auth0-react";

import { AutoCompleteProvider } from './context/AutoCompleteContext.jsx';

import './bootstrap.min.css';
import './index.css';
import { FavoritesProvider } from './context/FavoritesContext.jsx';
import { WeatherProvider } from './context/WeatherContext.jsx';

const domain = import.meta.env.VITE_AUTH0_DOMAIN;
const clientId = import.meta.env.VITE_AUTH0_CLIENT_ID;

ReactDOM.createRoot(document.getElementById('root')).render(
  <React.StrictMode>
    <Auth0Provider
      domain={domain}
      clientId={clientId}
      redirectUri={window.location.origin}
    >
      <WeatherProvider>
        <AutoCompleteProvider>
          <FavoritesProvider>
            <App />
          </FavoritesProvider>
        </AutoCompleteProvider>
      </WeatherProvider>
    </Auth0Provider>
  </React.StrictMode>,
);
