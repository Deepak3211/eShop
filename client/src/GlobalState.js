import axios from "axios";
import { createContext, useEffect, useState } from "react";
import ProductsAPI from "./api/ProductsAPI";
import UserAPI from './api/UserAPI';
import CategoriesAPI from './api/CategoriesAPI';

export const GlobalState = createContext();

export const DataProvider = ({ children }) => {
  const [token, setToken] = useState(false);

  const refreshToken = async () => {

      const firstLogin = localStorage.getItem('firstLogin');
      if (firstLogin) {
        
        const {data} = await axios.get('/api/v1/refresh_token')
        // console.log(data)
        setToken(data.accessToken);
      }
      
    
  }
  useEffect(() => {
    setTimeout(() => {
    refreshToken()
    }, 10 * 60 * 1000)
  refreshToken()
    
},[])

  const state = {
    token: [token, setToken],
    productsAPI: ProductsAPI(),
    userAPI: UserAPI(token),
    categoriesAPI: CategoriesAPI(),
  }

  return (
    <GlobalState.Provider value = {state}>
      {children}
    </GlobalState.Provider>
  )
}