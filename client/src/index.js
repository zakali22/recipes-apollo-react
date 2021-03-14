import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import {BrowserRouter as Router} from "react-router-dom"

const client = new ApolloClient({
  uri: 'http://localhost:4000/graphql'
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

