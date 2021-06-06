import React, {Component} from "react";
import Container from "./components/Container";
import NavBar from "./components/NavBar";
import Card from "./components/Card";
import PDP from "./components/PDP";
class MainPage extends Component {
    constructor(props) {
        super(props);
        this.state ={
        openPDP: false,
        }
    }
    render() {
        
        let items = [1,2,3,4,5]
        return (
            <>
            <NavBar />
            <Container>
            
            <p style={{fontSize: "30px"}}>Category name</p>
            
            {items.map(itm => {
                return <Card key={itm} item={itm}/>
            })}

            
            </Container>
            {/* <PDP /> */}
            {this.openPDP && <PDP />}
            </>
        )
    }
}

export default MainPage;