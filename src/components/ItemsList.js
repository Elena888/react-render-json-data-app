import React from 'react'

class ItemsList extends React.Component {

    closeChildren = (list) => {
        list.forEach(function(el) {
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
    };

    handleClick = (e) => {
        let ulList = e.target.parentElement.childNodes;

        if(ulList){
            this.closeChildren(ulList)
        }
    };

    handleClickLastLeaf = (e) => {
        let mainParentLi = e.target.closest('.depth-0');
        this.closeChildren(mainParentLi.childNodes)
    };

    render(){
        const {data, depth} = this.props;

        return(
            data.map((item) => {
                //Check item is Array
                let next = Object.values(item).find(item => Array.isArray(item));
                let name = item.name ? item.name : item.code;
                let type = item.__typename;

                return(
                    <ul key={name + '-' + type} className={depth > 0 ? 'display-none' : null}>
                        <li className={depth === 0 ? 'depth-0' : null}>
                            {/*If next return recursion*/}
                            {next ?
                                <React.Fragment>
                                    <span onClick={(e) => this.handleClick(e)}>{name}</span>
                                    <ItemsList data={next} depth={depth + 1}/>
                                </React.Fragment>
                                :
                                <span onClick={(e) => this.handleClickLastLeaf(e)}>{name}</span>
                            }
                        </li>
                    </ul>
                )
            })
        )
    }
}

export default ItemsList;