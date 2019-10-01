import React from 'react';
import Header from './components/Header'
import ItemsList from './components/ItemsList'
import { ItemProvider } from './components/ItemContext'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import './style.css'


class App extends React.Component {
    state = {
        data: [],
        selectedItems: {}
    };

    item = {test: 'Lena'};

    componentDidMount(){
        const client = new ApolloClient({
            uri: 'https://countries.trevorblades.com'
        });
        client
            .query({
                query: gql`
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
            `
            }).then(result => {
               this.setState({
                   data: result.data.continents
               })
            });
    }

    render() {

        return (
            <div>
                <Header/>
                <div className="container">
                    <div className="continents">
                        <h1>Continents</h1>
                        <ItemProvider value={this.item}>
                            <ItemsList
                                data={this.state.data}
                                depth={Number(0)}
                            />
                        </ItemProvider>
                    </div>
                </div>
            </div>
        );
    }
}

export default App;
