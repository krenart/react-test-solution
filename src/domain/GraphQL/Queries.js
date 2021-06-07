import { gql } from "@apollo/client";

export const GET_CURRENCIES = gql`
  query {
    currencies
  }
`;
export const GET_CATEGORIES = gql`
  query {
    category {
      products {
        name
        description
        gallery
        inStock
        category
        attributes {
          id
          name
          type
          items {
            id
            displayValue
            value
          }
        }
        prices {
          currency
          amount
        }
      }
    }
  }
`;
