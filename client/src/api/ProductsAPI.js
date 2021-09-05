import { useEffect, useState } from "react";
import axios from "axios";
const ProductsAPI = () => {
  const [products, setProducts] = useState([]);
  const [callback, setCallback] = useState(false);
  const [category, setCategory] = useState('');
  const [sort, setSort] = useState('');
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState('');
  const [result, setResult] = useState(0);
  
  useEffect(() => {
  const getProducts = async () => {
    const { data} = await axios.get(`/api/v1/products?limit=${page*10}&${category}&${sort}&title[regex]=${search}`);
    // console.log('getProducts', data);
    setProducts(data.products);
    setResult(data.result);
  }
  
    getProducts();
  },[callback,category,sort, search,page])
  return {
    products: [products, setProducts],
    callback: [callback, setCallback],
    category: [category, setCategory],
    sort: [sort, setSort],
    page: [page, setPage],
    search: [search, setSearch],
    result: [result, setResult]
  }
}

export default ProductsAPI
