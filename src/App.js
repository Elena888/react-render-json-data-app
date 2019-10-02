import React from 'react';
import Header from './components/Header'
import Continents from './components/Continents'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';
import './style.css'

//import {data} from './testData' //use data[0].continents

class App extends React.Component {
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
