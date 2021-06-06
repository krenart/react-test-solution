import React, {Component} from "react";

class Container extends Component {

    render() {
        return (<div style={{marginRight:"117px", marginLeft:"117px", paddingTop: "40px"}}>{this.props.children}</div>)
    }
}

export default Container;