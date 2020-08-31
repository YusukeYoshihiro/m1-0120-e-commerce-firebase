import React from 'react';
// import { Link } from 'react-router-dom';
import Logo from '../../assets/logo.png';
import {connect} from 'react-redux';
import {createStructuredSelector} from 'reselect'

// import './header.styles.scss';
import {HeaderContainer, LogoContainer, OptionContainer, OptionLink} from './header.styles';

import {auth} from '../../firebase/firebase.util';
import CartIcon from '../cart-icon/cart-icon.component';
import CartDropdown from '../cart-dropdown/cart-dropdown.component';
import {selectCartHidden} from '../../redux/cart/cart.selector';
import {selectCurrentUser} from '../../redux/user/user.selector'

const Header = ({currentUser, hidden}) => (
  <HeaderContainer>
    <LogoContainer to='/'>
      <img src={Logo} alt='logo'  className='logo' />
    </LogoContainer>
    <OptionContainer>
      <OptionLink to='/shop'>
        SHOP
      </OptionLink>
      <OptionLink to='/shop'>
        CONTACT
      </OptionLink>
      {
        currentUser ?
        <OptionLink as="div" onClick={()=> auth.signOut()}> SIGN OUT </OptionLink>
        :
        <OptionLink to='/signin'>SIGN IN</OptionLink>
      }
      <CartIcon />
    </OptionContainer>
    {
      hidden ? null : <CartDropdown />
    }
  </HeaderContainer>
  // <div className='header'>
  //   <Link className='logo-container' to='/'>
  //     <img src={Logo} alt='logo'  className='logo' />
  //   </Link>
  //   <div className='options'>
  //     <Link className='option' to='/shop'>
  //       SHOP
  //     </Link>
  //     <Link className='option' to='/shop'>
  //       CONTACT
  //     </Link>
  //     {
  //       currentUser ?
  //       <div className="option" onClick={()=> auth.signOut()}> SIGN OUT </div>
  //       :
  //       <Link className="option" to='/signin'>SIGN IN</Link>
  //     }
  //     <CartIcon />
  //   </div>
  //   {
  //     hidden ? null : <CartDropdown />
  //   }
  // </div>
);

// const mapStateToProps = state => ({
//   //because we used combinedReducer, that's why we are accessing the 'user' property before the currentUser
//   //state.<userReducer>.currentUser
//   currentUser: state.user.currentUser,
//   hidden: state.cart.hidden
// });

//instead of passing it as a function, we just pass it like so, where we are using the properties that we want
//to point to the correct selector and then createStructuredSelector will automatically pass our top level
//state that we get as our mapstatetoprops into each subsequent selector
const mapStateToProps = createStructuredSelector({
  currentUser: selectCurrentUser,
  hidden: selectCartHidden
});

export default connect(mapStateToProps)(Header);
