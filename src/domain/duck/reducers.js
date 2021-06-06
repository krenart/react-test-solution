import constants from "./constants";

const defaultState = {
  selectedProduct: undefined,
  selectedCurrency: "USD",
  cart: [],
  cartSize: 0,
  categoryFilter: undefined,
  total: [0, 0, 0, 0, 0],
  modal: false,
};

export default function reducer(currentState = defaultState, action) {
  switch (action.type) {
    case constants.SET_SELECTED_PRODUCT:
      return {
        ...currentState,
        selectedProduct: action.payload,
      };

    case constants.SET_CURRENCY:
      return {
        ...currentState,
        selectedCurrency: action.payload,
      };

    case constants.ADD_TO_CART:
      let tempArr = currentState.cart;
      let isNew = true;
      currentState.cart.map((item, index) => {
        debugger;
        if (item.product.name === action.payload.product.name) {
          tempArr[index].amount++;
          isNew = false;
        }
      });
      let tempTotal = currentState.total;
      currentState.total.map((item, index) => {
        tempTotal[index] = item + action.payload.product.prices[index].amount;
      });
      return isNew
        ? {
            ...currentState,
            cart: [action.payload, ...currentState.cart],
            cartSize: currentState.cartSize + 1,
            total: tempTotal,
          }
        : {
            ...currentState,
            cart: [...tempArr],
            cartSize: currentState.cartSize + 1,
            total: tempTotal,
          };

    case constants.REMOVE_FROM_CART:
      let tmpTotal = currentState.total;
      currentState.total.map((item, index) => {
        tmpTotal[index] = item - action.payload.product.prices[index].amount;
      });
      return action.payload.amount > 1
        ? {
            ...currentState,
            cart: currentState.cart.map((item, index) => {
              if (item.product.name === action.payload.product.name)
                return {
                  product: item.product,
                  amount: item.amount - 1,
                };
              else return item;
            }),
            cartSize: currentState.cartSize - 1,
            total: tmpTotal,
          }
        : {
            ...currentState,
            cart: currentState.cart.filter(
              (item) => item.product.name !== action.payload.product.name
            ),
            cartSize: currentState.cartSize - 1,
            total: tmpTotal,
          };
    case constants.SET_CATEGORY_FILTER:
      return {
        ...currentState,
        categoryFilter: action.payload,
      };

    case constants.TOGGLE_MODAL:
      return {
        ...currentState,
        modal: action.payload,
      };
    default:
      return currentState;
  }
}
