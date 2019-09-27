import React, {Component} from 'react'

class Node extends Component{
    render(){
        let childnodes = null;

        if(this.props.children) {
            childnodes = this.props.children.map(function (childnode) {
                let test = Object.values(childnode).find(el => Array.isArray(el));
                return (
                    <Node key={childnode.code} node={childnode} children={test}/>
                );
            });
        }

        return (
            <li>
                <span>{this.props.node.name !== null ? this.props.node.name : this.props.node.code}</span>
                { childnodes ?
                    <ul className="display-none">{childnodes}</ul>
                    : null }
            </li>
        );
    }
}

export default Node;