import React, {useEffect} from 'react';
import { Switch, Route, Redirect } from 'react-router-dom';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect';

import './App.css';

import HomePage from './pages/homepage/HomePage';
import ShopPage from './pages/shop/ShopPage';
import SignInAndSignUpPage from './pages/sign-in-and-sign-up/SignInAndSignUpPage';
import CheckoutPage from './pages/checkout/CheckoutPage';
import Header from './components/header/header.component';
import { auth, createUserProfileDocument } from './firebase/firebase.util';
// import { auth, createUserProfileDocument, addCollectionAndDocuments } from './firebase/firebase.util';
import { setCurrentUser } from './redux/user/user.action';
import {selectCurrentUser} from './redux/user/user.selector'
import {selectCollectionForPreview} from './redux/shop/shop.selector';

function App({setCurrentUser, currentUser, collectionArray}) {
  // const [currentUser, setCurrentUser] = useState(null);

  useEffect(() => {
    let unsubscribeFromAuth = null;

    unsubscribeFromAuth = auth.onAuthStateChanged(async userAuth => {
      // createUserProfileDocument(userAuth);
      // setCurrentUser(userAuth);

      if(userAuth){
        //get back userRef if database has updated
        const userRef = await createUserProfileDocument(userAuth);

        userRef.onSnapshot(snapShot => {
          setCurrentUser({
            id: snapShot.id,
            ...snapShot.data()
          });
        })
      }else{
        setCurrentUser(userAuth);
        //create a function call to inject shop data into firestore (temp)
        // addCollectionAndDocuments('collection',collectionArray.map(({title, items}) => ({title, items})))
      }
    });

    //componentDidUnmount
    //clean up function
    return () => {
      //unsubscribe
      unsubscribeFromAuth();
    }
  }, []);

  return (
    <div>
      <Header />
      <Switch>
        <Route exact path='/' component={HomePage} />
        <Route path='/shop' component={ShopPage} />
        <Route exact path='/checkout' component={CheckoutPage} />
        <Route exact path='/signin' render={() => currentUser ? (<Redirect to="/" />) : (<SignInAndSignUpPage />)} />
      </Switch>
    </div>
  );
}

//get state from redux store
// const mapStateToProps = (state) => ({
//   currentUser: state.user.currentUser
// })

const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  collectionArray: selectCollectionForPreview
});

const mapDispatchtoProps = dispatch => ({
  setCurrentUser: user => dispatch(setCurrentUser(user))
  // functionName: (x) => {functionName(x)}
});

export default connect(mapStateToProps,mapDispatchtoProps)(App);
