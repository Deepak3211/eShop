import axios from "axios";
import { useEffect, useState } from "react"

const CategoriesAPI = () => {
  const [categories, setCategories] = useState([]);
  const [callback, setCallback] = useState(false);
  
  useEffect(() => {
  
    const getCategories = async () => {
    
      const { data } = await axios.get('/api/v1/category');
      // console.log('category', data);
      setCategories(data);
    }
    getCategories();
  },[callback])
  
  return {
    categories: [categories, setCategories],
    callback: [callback, setCallback],
  }
}

export default CategoriesAPI
