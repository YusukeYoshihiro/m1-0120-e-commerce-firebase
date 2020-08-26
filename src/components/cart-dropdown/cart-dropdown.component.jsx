import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";
import { withRouter } from "react-router-dom";

import "./cart-dropdown.styles.scss";

import CartItem from "../cart-item/cart-item.component";
import { selectCartItems } from "../../redux/cart/cart.selector";
import { toggleCartHidden } from "../../redux/cart/cart.actions";

import {
  CartDropdownContainer,
  CartDropdownButton,
  EmptyMessageContainer,
  CartItemsContainer,
} from "./cart-dropdown.styles";

const CartDropdown = ({ cartItems, history, dispatch }) => {
  console.log("dispatch: ", dispatch);
  return (
    <CartDropdownContainer>
      <CartItemsContainer>
        {cartItems.length ? (
          cartItems.map((cartItem) => (
            <CartItem key={cartItem.id} item={cartItem} />
          ))
        ) : (
          <EmptyMessageContainer>Your cart is empty</EmptyMessageContainer>
        )}
      </CartItemsContainer>
      <CartDropdownButton
        onClick={() => {
          history.push("/checkout");
          dispatch(toggleCartHidden());
        }}
      >
        GO TO CHECKOUT
      </CartDropdownButton>
    </CartDropdownContainer>
    // <div className="cart-dropdown">
    //     <div className="cart-items">
    //         {
    //             cartItems.length ?
    //             cartItems.map(cartItem => (
    //                 <CartItem key={cartItem.id} item={cartItem} />
    //             ))
    //             :
    //             <span className="empty-message">Your cart is empty</span>
    //         }
    //     </div>
    //     <CustomButton
    //         onClick={
    //             ()=> {
    //                 history.push('/checkout');
    //                 //toggleCartHidden
    //                 dispatch(toggleCartHidden());
    //             }
    //         }
    //     >GO TO CHECKOUT</CustomButton>
    // </div>
  );
};

// const mapStateToProps = (state) => ({
//     cartItems: state.cart.cartItems
// })

//essentially, the same code as above, only destructured
// const mapStateToProps = ({ cart: {cartItems} }) => ({
//     cartItems
// })

const mapStateToProps = createStructuredSelector({
  cartItems: selectCartItems,
});

export default withRouter(connect(mapStateToProps)(CartDropdown));
