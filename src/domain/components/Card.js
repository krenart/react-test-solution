import React, { Component } from "react";
import styles from "./card.module.css";
import { withRouter } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import actions from "../duck/actions";
import { connect } from "react-redux";
import {getCurrencySymbol} from "./NavBar";
export function handleCurrencyIndex(currency){
    switch(currency){
        case "USD": return 0
        case "GBP":  return 1
        case "AUD":  return 2
        case "JPY": return 3
        case "RUB": return 4
        default: return 0
    }
    
}
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPDP: false,
    };
  }

  render() {
    console.log("item of products", this.props.item);

    return (
      <>
        <div className={styles.card} key={this.props.item}
            >
          <div
            className={
              this.props.item.inStock ? styles.img : styles.imgDisabled
            }
          >
            <img onClick={()=>{
                if(this.props.item.inStock){
                    this.props.history.push(`/pdp/${this.props.item.name}`);
                    this.props.setSelectedProduct(this.props.item);
                  }
            }}
              style={{
                height: "338px",
                position: "absolute",
                zIndex: "0",
                width: "356px",
                objectFit: "contain",
              }}
              src={`${this.props.item.gallery[0]}`}
            />
          </div>
          {!this.props.item.inStock && <p className={styles.outOfStock}>OUT OF STOCK</p>}
          <div onClick={() => {
              let tempObject ={
                  product: this.props.item,
                  amount: 1
              }
              this.props.addToCart(tempObject);
            }} className={this.props.item.inStock?styles.icon : styles.iconHidden}>
            <FiShoppingCart style={{ marginTop: "13px", marginLeft: "-3px" }} />
          </div> 
          <div className={styles.title}>{this.props.item.name}</div>
          <div
            className={styles.price}
          >
            {this.props.item.prices[handleCurrencyIndex(this.props.selectedCurrency)].amount +
              " " + getCurrencySymbol(this.props.selectedCurrency)                }
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
    selectedProduct: state.general.selectedProduct,
    selectedCurrency: state.general.selectedCurrency,
})
const mapDispatchToProps = (dispatch) => {
    return {
        setSelectedProduct: (item) => dispatch(actions.setSelectedProduct(item)),
        addToCart: (item) => dispatch(actions.addToCart(item))
    }
}
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card));
