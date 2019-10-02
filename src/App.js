import React from 'react';
import Header from './components/Header'
import Continents from './components/Continents'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import './style.css'

//import {data} from './testData' //use data[0].continents

class App extends React.Component {
    state = {
        data: [],
        show: true
    };

    componentDidMount(){
        new ApolloClient({
            uri: 'https://countries.trevorblades.com'
        }).query({
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
                <Continents/>
            </div>
        );
    }
}

export default App;
