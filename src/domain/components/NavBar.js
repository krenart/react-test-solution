import React, { Component } from "react";
import Container from "./Container";
import { FiShoppingCart } from "react-icons/fi";
import { AiOutlineDown, AiOutlineUp } from "react-icons/ai";
import styles from "./navBar.module.css";
import { gql } from "@apollo/client";
import { GET_CURRENCIES } from "../GraphQL/Queries";
import { graphql } from "@apollo/client/react/hoc";
import actions from "../duck/actions";
import { connect } from "react-redux";
import Cart from "./Cart";
import { withRouter } from "react-router-dom";

export function getCurrencySymbol(value) {
  switch (value) {
    case "USD":
      return "$";
    case "GBP":
      return "£";
    case "RUB":
      return "₽";
    case "AUD":
      return "A$";
    case "JPY":
      return "¥";
    default:
      return "$";
  }
}
class NavBar extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openDropdown: false,
      dropdownValue: this.props.currency? getCurrencySymbol(this.props.currency): "$",
      openMiniCart: false,
      activeMenuItem: "all",
    };
    this.toggleDropdown = this.toggleDropdown.bind(this);
    this.handleDropdownValue = this.handleDropdownValue.bind(this);
    this.toggleMiniCart =this.toggleMiniCart.bind(this);
  }
  handleActiveMenuItem (item) {
    this.setState({activeMenuItem: item});
    this.props.setCategoryFilter(item);
    
    this.props.history.push(`/plp/${item}`);
  }
  toggleDropdown() {
    this.setState({ openDropdown: !this.state.openDropdown });
  }
  handleDropdownValue(value) {
    let symbol = getCurrencySymbol(value)
    this.setState({ dropdownValue: symbol });
    this.setState({ openDropdown: false });
    this.props.setCurrency(value);
  }
  toggleMiniCart() {
    this.setState({ openMiniCart: !this.state.openMiniCart });
  }

  render() {
    console.log(this.props);
    console.log(this.state.openMiniCart);
    return (
      <Container>
        <div className={styles.navBar}>
          <span 
            onClick={()=>this.handleActiveMenuItem("all")}
            className={this.state.activeMenuItem==="all"? styles.menuItemActive: styles.menuItem}
          >
            ALL
          </span>
          <span onClick={()=>this.handleActiveMenuItem("clothes")} 
          className={this.state.activeMenuItem==="clothes"? styles.menuItemActive: styles.menuItem}>
            CLOTHES
          </span>
          <span onClick={()=>this.handleActiveMenuItem("tech")} 
          className={this.state.activeMenuItem==="tech"? styles.menuItemActive: styles.menuItem}>
            TECH
          </span>

          <span style={{ float: "right" , marginRight:"217px"}}>
            <span
              className={styles.dropdownValue}
              onClick={this.toggleDropdown}
            >
              {this.state.dropdownValue}
              <span className={styles.dropdownValueIcon}>
                {this.state.openDropdown?<AiOutlineUp/> :<AiOutlineDown  />}
              </span>
            </span>
            {this.state.openDropdown && (
              <div className={styles.dropdown}>
                {this.props.data.currencies.map((item, i) => {
                  return (
                    <div
                      className={styles.dropdownItem}
                      onClick={() => {
                        this.handleDropdownValue(item);
                      }}
                    >
                      {getCurrencySymbol(item)} {item}
                    </div>
                  );
                })}
              </div>
            )}
            <span onClick={this.toggleMiniCart} >
              <span >
                <FiShoppingCart style={{marginTop:"12px", fontSize: "18px"}}/>
              </span>
             {this.props.size>0 && <span className={styles.cartSize} >
                {this.props.size}
              </span>}
            </span>
            {this.state.openMiniCart && (
              <div className={styles.miniCart} >
                <Cart mini={true} />
              </div>
              
            )}
          </span>
        </div>
      </Container>
    );
  }
}
const mapStateToProps = (state) => ({
  currency: state.general.selectedCurrency,
  size: state.general.cartSize,
});
const mapDispatchToProps = (dispatch) => {
  return {
    setCurrency: (item) => dispatch(actions.setCurrency(item)),
    setCategoryFilter: (item) => dispatch(actions.setCategoryFilter(item)),
  };
};
export default connect(
  mapStateToProps,
  mapDispatchToProps
)(graphql(GET_CURRENCIES)(withRouter(NavBar)));
