import React from "react";
import { connect } from "react-redux";

// import './checkout-item.styles.scss';
import {
  CheckoutItemContainer,
  ImageContainer,
  TextContainer,
  QuantityContainer,
  RemoveButtonContainer,
} from "./checkout-item.styles";

import {
  addItem,
  removeItem,
  clearItemFromCart,
} from "../../redux/cart/cart.actions";

const CheckoutItem = ({ cartItem, addItem, removeItem, clearItem }) => {
  const { imageUrl, name, quantity, price } = cartItem;
  return (
    <CheckoutItemContainer>
      <ImageContainer>
        <img src={imageUrl} alt="item" />
      </ImageContainer>
      <TextContainer>{name}</TextContainer>
      <QuantityContainer>
        <div onClick={() => removeItem(cartItem)}>&#10094;</div>
        <span>{quantity}</span>
        <div onClick={() => addItem(cartItem)}>&#10095;</div>
      </QuantityContainer>
      <TextContainer>{price}</TextContainer>
      <RemoveButtonContainer onClick={() => clearItem(cartItem)}>
        &#10005;
      </RemoveButtonContainer>
    </CheckoutItemContainer>
    // <div className="checkout-item">
    //     <div className="image-container">
    //         <img src={imageUrl} alt="item" />
    //     </div>
    //     <span className="name">{name}</span>
    //     <span className="quantity">
    //         <div className="arrow" onClick={()=> removeItem(cartItem)}>&#10094;</div>
    //         <span className="value">{quantity}</span>
    //         <div className="arrow" onClick={()=> addItem(cartItem)}>&#10095;</div>
    //     </span>
    //     <span className="price">{price}</span>
    //     <span className="remove-button" onClick={()=> clearItem(cartItem)}>&#10005;</span>
    // </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
  removeItem: (item) => dispatch(removeItem(item)),
  clearItem: (item) => dispatch(clearItemFromCart(item)),
});

export default connect(null, mapDispatchToProps)(CheckoutItem);
