import React, {Component} from 'react'

class Node extends Component{
    clickHandler = (e) => {
        console.log(e.target)
    };
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
                <span onClick={(e) => this.clickHandler(e)}>{this.props.node.name !== null ? this.props.node.name : this.props.node.code}</span>
                { childnodes ?
                    <ul className="display-none">{childnodes}</ul>
                    : null }
            </li>
        );
    }
}

export default Node;