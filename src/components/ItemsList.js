import React from 'react'
import { ItemConsumer } from "./ItemContext"

class ItemsList extends React.Component {
    static contextType = ItemConsumer;
    handleClick = (e) => {
        let ulList = e.target.parentElement.childNodes;

        if(ulList.length > 1){
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
        }else{
            console.log(ulList)
        }

    };

    render(){
        const {data, depth} = this.props;
        return(
            data.map((item) => {
                //Check item is Array and has children
                let next = Object.values(item).find(item => Array.isArray(item));
                let name = item.name ? item.name : item.code;
                let type = item.__typename;
                
                return(
                    <ul key={name + '-' + type} className={depth > 0 ? 'display-none' : null}>
                        <li>
                            <span onClick={(e) => this.handleClick(e)}>{name}</span>
                            {/*If next return recursion*/}
                            {next && <ItemsList data={next} depth={depth + 1}/>}
                        </li>
                    </ul>
                )
            })
        )
    }

};

export default ItemsList;