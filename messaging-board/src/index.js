import React from 'react';
import ReactDOM from 'react-dom/client';
import App, {client} from './App';
import {ApolloProvider} from 'react-apollo'

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <ApolloProvider client={client}>
  <App />
  </ApolloProvider>
);

