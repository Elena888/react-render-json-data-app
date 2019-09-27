import ApolloClient from 'apollo-boost';
import React, {Component} from 'react';
import Header from './components/Header'
import Continents from './components/Continents';
import gql from 'graphql-tag';
import {Query} from 'react-apollo';
import {data} from "./test";
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

/*class ListItem extends React.Component {
    //Add this
    constructor (){
        super(...arguments);
        this.state = { showChild:false};
    }

    handleCollapse(){
        console.log('Open/Close: ' + this.props.item.display_name);
        //Add this
        this.setState({showChild:!this.state.showChild});
        return false;
    }

    handleFilter(){
        console.log('Filter id: ' + this.props.item.id);
        return false;
    }

    render(){
        let children;
        if(this.state.showChild) {
            children = (<List list={this.props.item.children} />);
        }

        return (
            <div>
                <a rel="{this.props.item.id}" onClick={this.handleCollapse.bind(this)}>
                    {this.props.item.display_name}
                </a>
                <input value="" type="checkbox" onClick={this.handleFilter.bind(this)} />
                //Add this
                {children}
            </div>
        )
    };
}*/


class App extends React.Component {

    renderItems = (list) => {
        const display = list.map(el => {
            let value, next;
            value = el.name;

            let test = Object.values(el).find(el => Array.isArray(el));
            console.log(test)
            if(test){
                next = this.renderItems(test)
            }
            return(
                <li>
                    {value}
                    {next}
                </li>

            )
        });
        return(
            <ul>
                {display}
            </ul>
        )
    };

    render() {

        return (
            <div>
               {/* <Header/>
                <Continents/>*/}

                {this.renderItems(data)}
               
            </div>
        );
    }
}

export default App;
