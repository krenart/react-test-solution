import React, {Component} from "react";
import Container from "./Container";
import NavBar from "./NavBar";
import {connect} from "react-redux";

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
            <div style={
                this.props.modal?{
                position: "static",
                width:"100%",
                height:"100%",
                minHeight:"900px",
                background: "rgba(57, 55, 72, 0.22)"
            }:{}}>
            <Container>
                {this.props.children}
            
            </Container>
            </div>
            </>
        )
    }
}

const mapStateToProps =(state)=> ({
    modal: state.general.modal,
})

export default connect(mapStateToProps)(Layout);