import ApolloClient from 'apollo-boost';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';

// initialize a GraphQL client
const client = new ApolloClient({
    uri: 'https://countries.trevorblades.com'
});

// write a GraphQL query that asks for names and codes for all countries
const GET_COUNTRIES = gql`
  {
      continents {
          name
          code
          countries {
              name
              code
              languages {
                code
                name
              }
          }
      }
  }
`;


class App extends Component{
    state = {
        country: 'US'
    };

    // set the selected country to the new input value
    onCountryChange = event => {
        this.setState({country: event.target.value});
    };

    render() {
        return (
            <Query query={GET_COUNTRIES} client={client}>
                {({loading, error, data}) => {
                    console.log(data)
                    if (loading) return <p>Loading...</p>;
                    if (error) return <p>{error.message}</p>;
                    return (
                       <h1>Hello</h1>
                    );
                }}
            </Query>
        );
    }
}

export default App;
