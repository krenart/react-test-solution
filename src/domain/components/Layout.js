import React, {Component} from "react";
import Container from "./Container";
import NavBar from "./NavBar";

class Layout extends Component {
    constructor(props) {
        super(props);
        this.state ={
        }
    }
    render() {
        return (
            <>
            <NavBar />
            <Container>
                {this.props.children}
            
            </Container>
            </>
        )
    }
}

export default Layout;