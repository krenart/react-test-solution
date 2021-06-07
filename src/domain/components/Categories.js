import React, { Component } from "react";
import Card from "./Card";
import { GET_CATEGORIES } from "../GraphQL/Queries";
import { graphql } from "@apollo/client/react/hoc";
import Layout from "./Layout";
import { connect } from "react-redux";

class Categories extends Component {
  constructor(props) {
    super(props);
    this.state = {
      openPDP: false,
    };
  }
  render() {
    let products =
      this.props.data &&
      this.props.data.category &&
      this.props.data.category.products
        ? this.props.data.category.products
        : undefined;
    return (
      <Layout>
        <p style={{ fontSize: "30px", textTransform: "capitalize" }}>
          {this.props.categoryFilter}
        </p>

        {products &&
          products.map((itm) => {
            if (
              this.props.categoryFilter === "clothes" ||
              this.props.categoryFilter === "tech"
            ) {
              if (itm.category === this.props.categoryFilter)
                return <Card key={itm.name} item={itm} />;
            } else return <Card key={itm.name} item={itm} />;
          })}
      </Layout>
    );
  }
}
const mapStateToProps = (state) => ({
  categoryFilter: state.general.categoryFilter,
});

export default connect(mapStateToProps)(graphql(GET_CATEGORIES)(Categories));
