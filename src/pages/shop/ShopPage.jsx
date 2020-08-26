import React, {useState, useEffect} from "react";
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

// import CollectionPreview from "../../components/collection-preview/collection-preview";
import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
import CollectionPage from '../collection/CollectionPage';
import {firestore, convertCollectionSnapShotToMap} from '../../firebase/firebase.util';
import {updateCollection} from '../../redux/shop/shop.actions';

const ShopPage = ({match, updateCollection}) => {
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(()=>{
    let unsubscribeFromSnapShot = null;

    const collectionRef = firestore.collection('collection');

    collectionRef.get().then(snapShot => {
      //the data is on an actual object inside of this snapshot
      const collectionsMap = convertCollectionSnapShotToMap(snapShot);
      // console.log('mapped collections: ', collectionsMap);
      updateCollection(collectionsMap);
      setIsLoading(false);

    }).catch(err => console.log(err.message));

    return () => {
      // unsubscribeFromSnapshot();
    }

  },[])

  return(
  <div className="shop-page">
    {/* {collections &&
      collections.map(({ id, ...otherCollectionProps }) => (
        <CollectionPreview key={id} {...otherCollectionProps} />
      ))} */}
    {!isLoading && <Route exact path={`${match.path}`} component={CollectionsOverview} />}
    {!isLoading && <Route path={`${match.path}/:collectionId`} component={CollectionPage} />}
  </div>
)};

const mapDispatchToProps = dispatch => ({
  updateCollection: collectionsMap => dispatch(updateCollection(collectionsMap))
})

export default connect(null, mapDispatchToProps)(ShopPage);
