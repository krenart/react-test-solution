import React, { Component } from "react";
import styles from "./card.module.css";
import { withRouter } from "react-router-dom";
import { FiShoppingCart } from "react-icons/fi";
import actions from "../duck/actions";
import { connect } from "react-redux";
import { getCurrencySymbol } from "./NavBar";
export function handleCurrencyIndex(currency) {
  switch (currency) {
    case "USD":
      return 0;
    case "GBP":
      return 1;
    case "AUD":
      return 2;
    case "JPY":
      return 3;
    case "RUB":
      return 4;
    default:
      return 0;
  }
}
class Card extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPDP: false,
      selectedAttribute: [],
      openAttributes: false,
    };

    this.handleToggleAttributes = this.handleToggleAttributes.bind(this);
  }
  handleToggleAttributes() {
    this.setState({ openAttributes: !this.state.openAttributes });
    this.setState({ selectedAttribute: [] });
  }

  render() {
    console.log("item of products", this.props.item);

    return (
      <>
        <div
          style={
            this.props.modal
              ? {
                  position: "relative",
                  zIndex: "-1",
                }
              : {}
          }
          className={styles.card}
          key={this.props.item}
        >
          <div
            className={
              this.props.item.inStock ? styles.img : styles.imgDisabled
            }
          >
            <img
              onClick={() => {
                if (this.props.item.inStock) {
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
          {!this.props.item.inStock && (
            <p className={styles.outOfStock}>OUT OF STOCK</p>
          )}
          <div
            onClick={() => {
              if (this.props.item.attributes.length === 0) {
                this.props.addToCart({
                  product: this.props.item,
                  amount: 1,
                  attributes: [],
                });
              } else this.handleToggleAttributes();
            }}
            className={
              this.props.item.inStock ? styles.icon : styles.iconHidden
            }
          >
            <FiShoppingCart style={{ marginTop: "13px", marginLeft: "-3px" }} />
          </div>
          <div>
            {this.state.openAttributes &&
              this.props.item.attributes.length !== 0 && (
                <div className={styles.attributesDialog}>
                  <p>Select attributes:</p>
                  {this.props.item.attributes.map((item, index) => {
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
                                  this.state.selectedAttribute[`${index}${i}`]
                                    ? styles.sizeBoxActiveSwatch
                                    : this.state.selectedAttribute[
                                        `${index}${i}`
                                      ]
                                    ? styles.sizeBoxActive
                                    : styles.sizeBox
                                }
                                onClick={() => {
                                  debugger;
                                  console.log("type", item.type);
                                  console.log("value", itm.value);
                                  let arr = this.state.selectedAttribute;
                                  Object.keys(arr).map((item) => {
                                    if (item.charAt(0) == index)
                                      delete arr[item];
                                  });

                                  arr[`${index}${i}`] = {
                                    name: item.name,
                                    item: itm.value,
                                  };
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
                  <p>
                    <button
                      className={styles.button}
                      onClick={() => {
                        if (
                          Object.keys(this.state.selectedAttribute).length === 0
                        )
                          alert("Select at least one attribute");
                        else {
                          let tempObject = {
                            product: this.props.item,
                            amount: 1,
                            attributes: Object.values(
                              this.state.selectedAttribute
                            ),
                          };
                          this.props.addToCart(tempObject);
                          this.handleToggleAttributes();
                        }
                      }}
                    >
                      <span>Add to cart</span>
                    </button>
                    <button
                      className={styles.buttonClose}
                      onClick={this.handleToggleAttributes}
                    >
                      <span>Close</span>
                    </button>
                  </p>
                </div>
              )}
          </div>
          <div className={styles.title}>{this.props.item.name}</div>
          <div className={styles.price}>
            {this.props.item.prices[
              handleCurrencyIndex(this.props.selectedCurrency)
            ].amount +
              " " +
              getCurrencySymbol(this.props.selectedCurrency)}
          </div>
        </div>
      </>
    );
  }
}
const mapStateToProps = (state) => ({
  selectedProduct: state.general.selectedProduct,
  selectedCurrency: state.general.selectedCurrency,
  modal: state.general.modal,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setSelectedProduct: (item) => dispatch(actions.setSelectedProduct(item)),
    addToCart: (item) => dispatch(actions.addToCart(item)),
  };
};
export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Card));
