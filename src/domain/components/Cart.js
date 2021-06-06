import React, { Component } from "react";
import Container from "./Container";
import NavBar from "./NavBar";
import Card from "./Card";
import PDP from "./PDP";
import styles from "./cart.module.css";
import { connect } from "react-redux";
import actions from "../duck/actions";
import { getCurrencySymbol } from "./NavBar";
import { handleCurrencyIndex } from "./Card";
import Layout from "./Layout";
class Cart extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPDP: false,
      arraySizePerItem: [],
    };
  }
  handleAdd(index) {
    debugger;
    let arr = this.state.arraySizePerItem;
    if (this.state.arraySizePerItem[index] == undefined)
      this.setState({
        arraySizePerItem: [
          ...this.state.arraySizePerItem,
          (this.state.arraySizePerItem[index] = 1),
        ],
      });
    else {
      arr[index]++;

      this.setState({ arraySizePerItem: arr });
    }
  }
  handleRemove(index) {
    let arr = this.state.arraySizePerItem;
    if (
      this.state.arraySizePerItem[index] &&
      this.state.arraySizePerItem[index] !== 0
    ) {
      arr[index]--;
      this.setState({ arraySizePerItem: arr });
    }
  }
  render() {
    const returningValue = (
      <>
        <p
          className={this.props.mini ? styles.mainTitleMini : styles.mainTitle}
        >
          {this.props.mini ? "My bag " : "Cart"}
          {this.props.mini ? (
            <span
              style={{
                fontWeight: "normal",
                display: "inline",
                textTransform: "lowercase",
              }}
            >
               {this.props.cartSize} item(s)
            </span>
          ) : ""
            }
        </p>
        {this.props.cart.length === 0 && <h2>No items in cart</h2>}
        {this.props.cart.map((item, index) => {
          return (
            <div
              style={
                this.props.mini
                  ? { width: "325px", marginBottom: "25px" }
                  : { width: "1097px", marginBottom: "30px" }
              }
            >
              {console.log("sizePerItem", this.state.arraySizePerItem)}
              <p
                className={
                  this.props.mini
                    ? styles.horizontalLineMini
                    : styles.horizontalLine
                }
              />
              <p
                className={this.props.mini ? styles.title1Mini : styles.title1}
              >
                {item.product.name}
              </p>
              <p
                className={this.props.mini ? styles.title2Mini : styles.title2}
              >
                {item.product.name}
              </p>
              <p className={this.props.mini ? styles.priceMini : styles.price}>
                {getCurrencySymbol(this.props.selectedCurrency)}{" "}
                {
                  item.product.prices[
                    handleCurrencyIndex(this.props.selectedCurrency)
                  ].amount
                }
              </p>
              <div
                className={this.props.mini ? styles.boxesMini : styles.boxes}
              >
                {item.product.attributes.length > 0 &&
                  item.product.attributes[0].items.map((itm, i) => {
                    console.log("attrivute", itm);
                    return (
                      <div
                        className={
                          this.props.mini ? styles.sizeBoxMini : styles.sizeBox
                        }
                      >
                        <span
                          className={
                            this.props.mini
                              ? styles.sizeBoxTextMini
                              : styles.sizeBoxText
                          }
                        >
                          {itm.displayValue}
                        </span>
                      </div>
                    );
                  })}
              </div>
              <div
                className={
                  this.props.mini ? styles.rightDivMini : styles.rightDiv
                }
              >
                <div style={{ display: "inline-block", marginTop: "10px" }}>
                  <div
                    className={
                      this.props.mini ? styles.plusBoxMini : styles.plusBox
                    }
                    onClick={() => {
                      this.props.addToCart({
                        product: item.product,
                        amount: 1,
                      });
                    }}
                  >
                    +
                  </div>
                  <div
                    className={
                      this.props.mini ? styles.amountBoxMini : styles.amountBox
                    }
                  >
                    {item.amount}
                    {console.log("amount", item.amount)}
                  </div>
                  <div
                    className={
                      this.props.mini ? styles.minusBoxMini : styles.minusBox
                    }
                    onClick={() => {
                      this.props.removeFromCart({
                        product: item.product,
                        amount: item.amount,
                      });
                    }}
                  >
                    -
                  </div>
                </div>
                <div
                  className={
                    this.props.mini ? styles.smallImgMini : styles.smallImg
                  }
                >
                  <img src={item.product.gallery[0]} />
                </div>
                {console.log(this.props.cart, "cart")}
              </div>
             
            </div>
          );
        })}
        {console.log("total", this.props.total)}
         <p className={this.props.mini ? styles.totalMini : styles.total}>Total <span style={{float:"right"}}>
           {this.props.total[handleCurrencyIndex(this.props.selectedCurrency)].toFixed(2)} {getCurrencySymbol(this.props.selectedCurrency)}</span></p>
         <button 
                    onClick={()=>{
                    }}className={this.props.mini ? styles.buttonMini : styles.button}>
                    <span className={styles.buttonText}>View Bag</span>
                  </button>
                  <button 
                    onClick={()=>{
                    }}className={this.props.mini ? styles.buttonMini1 : styles.button1}>
                    <span className={styles.buttonText}>Check out</span>
                  </button>
      </>
    );
    return this.props.mini ? returningValue : <Layout>{returningValue}</Layout>;
  }
}
const mapStateToProps = (state) => ({
  cart: state.general.cart,
  selectedCurrency: state.general.selectedCurrency,
  cartSize: state.general.cartSize,
  total: state.general.total
});
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedProduct: (item) => dispatch(actions.setSelectedProduct(item)),
    addToCart: (item) => dispatch(actions.addToCart(item)),
    removeFromCart: (item) => dispatch(actions.removeFromCart(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(Cart);
