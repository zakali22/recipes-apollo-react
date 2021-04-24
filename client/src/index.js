import React from 'react';
import ReactDOM from 'react-dom';
import App from './components/App';
import ApolloClient from "apollo-boost"
import {ApolloProvider} from "react-apollo"
import {BrowserRouter as Router} from "react-router-dom"

const client = new ApolloClient({
  uri: 'https://recipes-apollo-react-app.herokuapp.com/graphql',
  fetchOptions: {
    credentials: "include"
  },
  request: (operation) => {
    const token = localStorage.getItem('token');
    operation.setContext({
      headers: {
        authorization: token
      }
    });
  },
  onError: ({networkError}) => {
    if(networkError){
      console.log(networkError)
      if(networkError.statusCode === 401) localStorage.removeItem("token")
    }
  }
})

ReactDOM.render(
  <Router>
    <ApolloProvider client={client}>
      <App />
    </ApolloProvider>
  </Router>,
  document.getElementById('root')
);

