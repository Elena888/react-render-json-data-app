import React from 'react';
import ItemsList from './ItemsList'
import ApolloClient from 'apollo-boost';
import gql from 'graphql-tag';

class Continents extends React.Component {
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
            <div className="container">
                <div className="continents">
                    <h1>Continents</h1>
                    <ItemsList data={this.state.data} depth={Number(0)}/>
                </div>
            </div>
        );
    }
}

export default Continents;
