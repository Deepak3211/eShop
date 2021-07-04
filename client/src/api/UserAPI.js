import axios from "axios";
import { useEffect, useState } from "react";
import { toast } from "react-toastify";

const UserAPI = (token) => {
  const [isLogged,setIsLogged] = useState(false);
  const [isAdmin, setIsAdmin] = useState(false);
  const [cart, setCart] = useState([]);
  const [history, setHistory] = useState([]);
  
  
  
  
  useEffect(() => {
    if (token) {
      const getUser = async () => {
        try {

          const { data } = await axios.get('/api/v1/getUserInfo', {
            headers: {Authorization: token}
          });


          // console.log(data)
          setIsLogged(true,data.name,data.email);
         data.role === 1 ? setIsAdmin(true) : setIsAdmin(false);
         setCart(data.cart);

          
        } catch (err) {
          toast.error(err.message);
        }
      }
      getUser();
    }
    
  }, [token]);
 
  
  
  
  
  
 const addCart = async (product) => {
  if (!isLogged) return toast('Please Login first to buy this product', {
   position: "top-center",
autoClose: 2000,
  });
  
  const check = cart.every(item => {
   return item._id !== product._id
  
  })
  if (check) {
   setCart([...cart, { ...product, quantity: 1 }]);
   await axios.patch('/api/v1/addcart', { cart: [...cart, { ...product, quantity: 1 }] }, {
   headers: {Authorization: token}
   
   
   })

  }
  else {
   toast('This product has been added to the cart 😃', {
 position: "top-center",
autoClose: 2000,
   });
  }
   

 }
  
  

  return {
   isLogged: [isLogged, setIsLogged],
   isAdmin: [isAdmin, setIsAdmin],
   cart: [cart, setCart],
   addCart: addCart,
    history: [history, setHistory],
    
  }
}

export default UserAPI
