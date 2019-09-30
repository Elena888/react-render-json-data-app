
import ApolloClient from 'apollo-boost';
import React, {Component} from 'react';
import ReactDOM from 'react-dom';
import Header from './components/Header'
import Continents from './components/Continents';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
//import {data} from "./test";
import './style.css'


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

class App extends React.Component {
    renderItems = (list) => {
        return list.map((el) => {
            let value, next;
            value = el.name ? el.name : el.code;

            let test = Object.values(el).find(el => Array.isArray(el));
            if (test) {
                next = this.renderItems(test)
            }
            return (
                <ul key={value + el.__typename}>
                    <li key={value}>
                        <span onClick={(e) => this.clickHandler(e)}>{value}</span>
                        {next}
                    </li>
                </ul>
            )
        });
    };
    clickHandler = (e) => {
        let ulList = e.target.parentElement.childNodes;
        if(ulList){
            ulList.forEach(function(el) {
                if(el.tagName.toLowerCase() === "ul") {
                    el.classList.toggle('display-none');
                    if(el.childNodes){
                        el.childNodes.forEach(function (elInner) {
                            elInner.querySelectorAll('ul').forEach(function (ul) {
                                ul.classList.add('display-none');
                            })
                        })
                    }
                }
            });
        }
    };

    componentDidMount(){
        this.handleLoad();
    }
    handleLoad = () => {
        console.log(document.querySelectorAll('.continents ul li ul'))
        document.querySelectorAll('.continents ul li ul').forEach(function(el){
            el.classList.add('display-none')
        })
    };

    render() {
        return (
            <div>
                <Header/>
                {/* <Continents/>**/}
                <Query query={GET_COUNTRIES} client={client}>
                    {({loading, error, data}) => {
                        if (loading) return <p>Loading...</p>;
                        if (error) return <p>{error.message}</p>;
                        if(data){
                            return (
                                <div className="continents">
                                    {this.renderItems(data.continents)}
                                </div>
                            );
                        }
                    }}

                </Query>
            </div>
        );
    }
}

export default App;
