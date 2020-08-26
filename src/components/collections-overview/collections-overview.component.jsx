import React from "react";
import { connect } from "react-redux";
import { createStructuredSelector } from "reselect";

// import './collections-overview.styles.scss';
import { CollectionsOverviewContainer } from "./collections-overview.styles";

import CollectionPreview from "../collection-preview/collection-preview.component";
import { selectCollectionForPreview } from "../../redux/shop/shop.selector";

const CollectionsOverview = ({ collections }) => (
  <CollectionsOverviewContainer>
    {collections.map(({ id, ...otherCollectionProps }) => (
      <CollectionPreview key={id} {...otherCollectionProps} />
    ))}
  </CollectionsOverviewContainer>
  // <div className="collections-overview">
  //     {collections && collections.map(({ id, ...otherCollectionProps }) => (
  //       <CollectionPreview key={id} {...otherCollectionProps} />
  //     ))}
  // </div>
);

const mapStateToProps = createStructuredSelector({
  collections: selectCollectionForPreview,
});

export default connect(mapStateToProps)(CollectionsOverview);
