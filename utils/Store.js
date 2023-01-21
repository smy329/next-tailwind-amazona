import { createContext, useReducer } from 'react';
import Cookies from 'js-cookie';

export const Store = createContext();

const initialState = {
  // searching 'cart' key in Cookies
  // if exist use Json.parse to covert the cart(insode cookies) into JS object as it remains as string
  // if don't exist, cart is empty
  cart: Cookies.get('cart')
    ? JSON.parse(Cookies.get('cart'))
    : { cartItems: [] },
};

function reducer(state, action) {
  switch (action.type) {
    case 'CART_ADD_ITEM': {
      // store the items into 'newItem' which was clicked to add cart
      //with action.payload we will get product & quantity from  dispatch of addToCartHandler()
      const newItem = action.payload;

      // now from cartItems find item which slug is same as newItem slug
      // if found any item, store into existItem
      const existItem = state.cart.cartItems.find(
        (item) => item.slug === newItem.slug
      );

      // if you find anything on existItem, start mapping cartItems
      // During mapping if you find item name & existItem name are same, replace the item with newItem. Otherwise keep the cartItems as they are
      const cartItems = existItem
        ? state.cart.cartItems.map((item) =>
            item.name === existItem.name ? newItem : item
          )
        : //if you dont find anything on existItem, deconstruct the cartItems and concatenate them with the newItems. This way push the newItem at the end of the cartItem
          [...state.cart.cartItems, newItem];

      // set cookies as cart key.
      // save the cart values that conatins the new cartItems as string. Cause objects cannot be saved in cookies. objects converted through JSON.stringify
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));

      //return the previous state with '...state' , only update the cart object
      //keep the previous values with '...state.cart' , only update the cartItems array
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_REMOVE_ITEM': {
      //start filtering cartItems inside cart
      const cartItems = state.cart.cartItems.filter(
        //keep the item if item.slug !== selecetd item slug
        (item) => item.slug !== action.payload.slug
      );

      // set cookies as cart key.
      // save the cart values that conatins the new cartItems as string. Cause objects cannot be saved in cookies. objects converted through JSON.stringify
      Cookies.set('cart', JSON.stringify({ ...state.cart, cartItems }));

      //return the previous state with '...state' , only update the cart object
      //keep the previous values with '...state.cart' , only update the cartItems array
      return { ...state, cart: { ...state.cart, cartItems } };
    }

    case 'CART_RESET': {
      return {
        ...state,
        cart: {
          cartItems: [],
          shippingAddress: { location: {} },
          paymentMethod: '',
        },
      };
    }
    default:
      return state;
  }
}

// this component pass the state & dispatch as property to the children. So we can have access to state. And state contains cart and cartItems
export function StoreProvider({ children }) {
  // we are getting state, dispatch from useReducer
  const [state, dispatch] = useReducer(reducer, initialState);

  // value is storing state & dispatch in a single object
  const value = { state, dispatch };

  //this is returning value(means states & dispatch) which will be available thoughout the children of StoreProvider
  return <Store.Provider value={value}>{children}</Store.Provider>;
}
