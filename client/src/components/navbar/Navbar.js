import { useContext } from "react";
import { GlobalState } from "../../GlobalState";
import './navbar.css';
import axios from 'axios';
import { Link } from 'react-router-dom';
import {  Icon} from 'semantic-ui-react';


const Navbar = () => {
  const state = useContext(GlobalState);
  const [isLogged] = state.userAPI.isLogged;
  const [isAdmin] = state.userAPI.isAdmin;
  const [cart] = state.userAPI.cart;
  
const logoutUser = async () => {
await axios.get('/api/v1/logout')
sessionStorage.removeItem('firstLogin');
window.location.href = '/';
}
  
  const adminRouter = () =>{
        return(
            <>
            <li><Link className="header__links" to="/create_product">
              <Icon name='write' />
              Create Product
            
            </Link>
            </li>
            <li><Link className="header__links" to="/category">
              <Icon name='tag' />
              Categories
            </Link>
            </li>
            </>
        )
    }

    const userRouter = () =>{
        return(
            <>
            <li><Link to="/history" className="header__links">
              <Icon name='history' />
              {isAdmin ? 'Orders': 'My Orders'}
            </Link>
            </li>
            <li><Link to="/" onClick={logoutUser} className="header__links">
              <Icon name='sign-out' />
              Logout
            </Link>
            </li>
            </>
        )
    }
  return (
    <div className="navbar">
      <div className="navbar__left">
        <h1>
          <Link to='/' className="header__links">{isAdmin ? <>
     <Icon name = 'user secret'/>  
          Admin
          </>
            :
            <>
              <Icon name='shopping basket' />
              eShop
            
            </>}</Link>
        </h1>
      </div>
      <div className="navbar__right">
      <ul >
                <li><Link to="/" className="header__links">{isAdmin ?  <>
     <Icon name = 'shopping basket'/>  
          Products
          </>
            :
            <>
              <Icon name='shopping basket' />
              Shop
            
            </>}</Link></li>

                {isAdmin && adminRouter()}

                {
            isLogged ? userRouter() : <li ><Link to="/login" className="header__links">
              <Icon name='sign-in' />
              Login
            </Link>
            </li>
                }


            </ul>
      
      
      </div>
       {
        isAdmin ? '' :
          <div  className = 'cart__information'>
            <span>{cart.length}</span>
            
            <Link to="/cart" className="header__links">
            
              <Icon name='shopping cart' />
              Cart
              </Link>
                </div>
            }
    </div>
  )
}

export default Navbar
