import React from "react";
import { connect } from "react-redux";

// import "./collection-item.styles.scss";
import {
  CollectionItemContainer,
  CollectionFooterContainer,
  AddButton,
  BackgroundImage,
  NameContainer,
  PriceContainer,
} from "./collection-item.styles";

// import CustomButton from "../custom-button/custom-button.component";
import { addItem } from "../../redux/cart/cart.actions";

const CollectionItem = ({ item, addItem }) => {
  const { name, price, imageUrl } = item;

  return (
    <CollectionItemContainer>
      <BackgroundImage className="image" imageUrl={imageUrl} />
      <CollectionFooterContainer>
        <NameContainer>{name}</NameContainer>
        <PriceContainer>{price}</PriceContainer>
      </CollectionFooterContainer>
      <AddButton onClick={() => addItem(item)} inverted>
        Add to cart
      </AddButton>
    </CollectionItemContainer>
    // <div className="collection-item">
    //   <div
    //     className="image"
    //     style={{
    //       backgroundImage: `url(${imageUrl})`,
    //     }}
    //   />
    //   <div className="collection-footer">
    //     <span className="name">{name}</span>
    //     <span className="price">{price}</span>
    //   </div>
    //   <CustomButton onClick={() => addItem(item)}>Add to Cart</CustomButton>
    // </div>
  );
};

const mapDispatchToProps = (dispatch) => ({
  addItem: (item) => dispatch(addItem(item)),
});

export default connect(null, mapDispatchToProps)(CollectionItem);
