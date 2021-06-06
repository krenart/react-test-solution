import React, { Component } from "react";
import { getCurrencySymbol } from "./NavBar";
import Layout from "./Layout";
import styles from "./pdp.module.css";
import Container from "./Container";
import { connect } from "react-redux";
import { handleCurrencyIndex } from "./Card";
import actions from "../duck/actions";

class PDP extends Component {
  constructor(props) {
    super(props);
    this.state = {
      imgIndex: 0,
      selectedAttribute: [],
    };
  }
  handleShowImage(index) {
    this.setState({ imgIndex: index });
  }
  render() {
    console.log("pdp props", this.props);
    console.log("pdp state", this.state);
    return (
      <>
        <Layout>
          {this.props.product && (
            <div className={styles.body}>
              <div style={{ display: "inline-block", position: "absolute" }}>
                {this.props.product.gallery.map((img, idx) => {
                  return (
                    <div
                      className={styles.smallBox}
                      onClick={() => {
                        this.handleShowImage(idx);
                      }}
                    >
                      <img src={img} />
                    </div>
                  );
                })}
              </div>
              <div className={styles.content}>
                <div className={styles.bigBox}>
                  <img src={this.props.product.gallery[this.state.imgIndex]} />
                </div>
                <div className={styles.detailsBox}>
                  {/* <div style={{display:"inline-block", marginLeft:"800px"}}> */}
                  <p className={styles.title1}>{this.props.product.name}</p>
                  <p className={styles.title2}>{this.props.product.name}</p>
                  {this.props.product.attributes.map((item, index) => {
                    return (
                      <>
                        <p className={styles.sizeText}>{item.name}</p>
                        <div style={{ display: "flex", marginTop: "-10px" }}>
                          {item.items.map((itm, i) => {
                            return (
                              <div
                                style={
                                  item.type === "swatch"
                                    ? { backgroundColor: `${itm.value}` }
                                    : null
                                }
                                className={
                                  item.type === "swatch" &&
                                  this.state.selectedAttribute[
                                    `${index}${i}`
                                  ] 
                                    ? styles.sizeBoxActiveSwatch
                                    : this.state.selectedAttribute[
                                        `${index}${i}`
                                      ] 
                                    ? styles.sizeBoxActive
                                    : styles.sizeBox
                                }
                                onClick={() => {
                                  console.log("type", item.type);
                                  console.log("value", itm.value);
                                  let arr = this.state.selectedAttribute;
                                  Object.keys(arr).map((item) => {
                                    if (item.charAt(0) == index)
                                      arr[item] = false;
                                  });

                                  arr[`${index}${i}`] = itm;
                                  console.log("after filter", arr);
                                  this.setState({ selectedAttribute: arr });
                                }}
                              >
                                {item.type !== "swatch" && (
                                  <span
                                    className={
                                      this.state.selectedAttribute[
                                        `${index}${i}`
                                      ] 
                                        ? styles.sizeBoxTextActive
                                        : styles.sizeBoxText
                                    }
                                  >
                                    {itm.displayValue}
                                  </span>
                                )}
                              </div>
                            );
                          })}
                        </div>
                      </>
                    );
                  })}

                  <p className={styles.priceText}>Price:</p>
                  <p className={styles.priceNumber}>
                    {getCurrencySymbol(this.props.currency) +
                      " " +
                      this.props.product.prices[
                        handleCurrencyIndex(this.props.currency)
                      ].amount}
                  </p>
                  <button
                    onClick={() => {
                      if (
                        Object.keys(this.state.selectedAttribute).length === 0
                      )
                        alert("you should select at leas one attribute");
                      else
                        this.props.addToCart({
                          product: this.props.product,
                          amount: 1,
                        });
                    }}
                    className={styles.button}
                  >
                    <span className={styles.buttonText}>Add to Cart</span>
                  </button>

                  <p
                    dangerouslySetInnerHTML={{
                      __html: this.props.product.description,
                    }}
                    className={styles.descriptionText}
                  ></p>
                </div>
              </div>
            </div>
          )}
        </Layout>
      </>
    );
  }
}

const mapStateToProps = (state) => ({
  product: state.general.selectedProduct,
  currency: state.general.selectedCurrency,
});
const mapDispatchToProps = (dispatch) => {
  return {
    addToCart: (item) => dispatch(actions.addToCart(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(PDP);
