import React, {useEffect} from "react";
import { Route } from 'react-router-dom';
import {connect} from 'react-redux';

import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';

import CollectionsOverviewContainer from '../../components/collections-overview/collections-overview.container';
import CollectionPageContainer from '../collection/CollectionPage.container';

const ShopPage = ({match, fetchCollectionsStartAsync}) => {
  
  useEffect(()=>{
    fetchCollectionsStartAsync();
  },[])

  return(
  <div className="shop-page">
    <Route exact path={`${match.path}`} component={CollectionsOverviewContainer} />
    <Route path={`${match.path}/:collectionId`} component={CollectionPageContainer} />
  </div>
)};

const mapDispatchToProps = dispatch => ({
  fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
})

export default connect(null, mapDispatchToProps)(ShopPage);










// import React, {useState, useEffect} from "react";
// import { Route } from 'react-router-dom';
// import {connect} from 'react-redux';
// import {createStructuredSelector} from 'reselect';

// // import CollectionPreview from "../../components/collection-preview/collection-preview";
// import CollectionsOverview from '../../components/collections-overview/collections-overview.component';
// import CollectionPage from '../collection/CollectionPage';
// // import {firestore, convertCollectionSnapShotToMap} from '../../firebase/firebase.util';
// import {fetchCollectionsStartAsync} from '../../redux/shop/shop.actions';
// import {selectIsCollectionFetching, selectCollectionsLoaded} from '../../redux/shop/shop.selector'
// import WithSpinner from '../../components/with-spinner/with-spinner.component';

// const CollectionsOverviewWithSpinner = WithSpinner(CollectionsOverview);
// const CollectionPageWithSpinner = WithSpinner(CollectionPage);

// const ShopPage = ({match, fetchCollectionsStartAsync, isCollectionFetching, isCollectionsLoaded}) => {
//   // const [isLoading, setIsLoading] = useState(true);
  
//   useEffect(()=>{

//     fetchCollectionsStartAsync();
//     // let unsubscribeFromSnapShot = null;

//     // const collectionRef = firestore.collection('collection');

//     // collectionRef.get().then(snapShot => {
//     //   //the data is on an actual object inside of this snapshot
//     //   const collectionsMap = convertCollectionSnapShotToMap(snapShot);
//     //   // console.log('mapped collections: ', collectionsMap);
//     //   updateCollection(collectionsMap);
//     //   setIsLoading(false);

//     // }).catch(err => console.log(err.message));

//     // return () => {
//     //   // unsubscribeFromSnapshot();
//     // }

//   },[])

//   return(
//   <div className="shop-page">
//     {/* {collections &&
//       collections.map(({ id, ...otherCollectionProps }) => (
//         <CollectionPreview key={id} {...otherCollectionProps} />
//       ))} */}
//     <Route exact path={`${match.path}`} render={(props)=>(
//       <CollectionsOverviewWithSpinner isLoading={isCollectionFetching} {...props} />
//     )} />
//     <Route path={`${match.path}/:collectionId`} render={(props)=>(
//       <CollectionPageWithSpinner isLoading={isCollectionFetching} {...props} />
//     )} />
//     {/* <Route exact path={`${match.path}`} component={CollectionsOverview} />
//     <Route path={`${match.path}/:collectionId`} component={CollectionPage} /> */}
//   </div>
// )};

// const mapStateToProps = createStructuredSelector({
//   isCollectionFetching: selectIsCollectionFetching,
//   isCollectionsLoaded: selectCollectionsLoaded
// })

// const mapDispatchToProps = dispatch => ({
//   fetchCollectionsStartAsync: () => dispatch(fetchCollectionsStartAsync())
// })

// export default connect(mapStateToProps, mapDispatchToProps)(ShopPage);
