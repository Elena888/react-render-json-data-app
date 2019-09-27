import React from 'react'
import Node from './Node'
import {data} from "../test";

class Continents extends React.Component {

    render() {
        let nodes = data.map(function(item) {
            return (
                <Node key="continents" node={item.continents} children={item.continents} />
            );
        });

        return (
            <div className="container">
                <ul className="continents">
                    {nodes}
                </ul>
            </div>

        );
    }
}

export default Continents;