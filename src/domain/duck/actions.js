import constants from "./constants";

const setSelectedProduct = (item) => {
    return {
        type: constants.SET_SELECTED_PRODUCT,
        payload: item,
    };
};

const setCurrency = (item) => {
    return {
        type: constants.SET_CURRENCY,
        payload: item,
    };
};
const addToCart = (item) => {
    return {
        type: constants.ADD_TO_CART,
        payload: item,
    };
};

const removeFromCart = (item) => {
    return {
        type: constants.REMOVE_FROM_CART,
        payload: item,
    };
};
const setCategoryFilter = (item ) => {
    return {
        type: constants.SET_CATEGORY_FILTER,
        payload: item,
    }
}

export default {
    setSelectedProduct,
    setCurrency,
    addToCart,
    removeFromCart,
    setCategoryFilter
}