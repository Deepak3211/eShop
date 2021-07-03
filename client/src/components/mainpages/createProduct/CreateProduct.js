import { useContext, useEffect, useRef, useState } from 'react';
import { GlobalState } from '../../../GlobalState';
import {  Form, Segment, Divider, Button } from 'semantic-ui-react';
import './createproduct.css';
import { useHistory, useParams } from 'react-router-dom';
import { toast } from 'react-toastify';
import axios from 'axios';
import ImageUpload from './ImageUpload';
const initialState = {
  product_id: '',
  title: '',
  price: 0,
  description: '',
  category: '',
  _id: '',
  

}

const CreateProduct = () => {
  const state = useContext(GlobalState);
  const [product, setProduct] = useState(initialState);
  const [categories] = state.categoriesAPI.categories;
  const [images, setImages] = useState(false);
  const [loading, setLoading] = useState(false);
  const [edit, setEdit] = useState(false);
  
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  const [callback, setCallback] = state.productsAPI.callback
  const history = useHistory();
  const params = useParams();
  const inputRef = useRef();
  
  const [products] = state.productsAPI.products;
  console.log('image',images)
  console.log('products',products)
  console.log('product',product)
  
  
  useEffect(() => {
  
    if (params.id) {
      setEdit(true);
      products.forEach(product => {
        if (product._id === params.id) {
        
          setProduct(product);
          setImages(product.images);
        }
      })
    }
    else {
      setEdit(false);
      setProduct(initialState);
      setImages(false);
      
    }
  }, [params.id, products]);
  
  console.log('images', images)
  
  const handleUpload = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast('You are not a admin', {
      position: "top-center",
      })
      const file = e.target.files[0];
      if(!file) return toast('File does not exist', {
      position: "top-center",
      })
      if(file.size > 1024 * 1024) return toast('File size is too large', {
      position: "top-center",
      })
      if(file.type !== 'image/jpeg' && file.type !== 'image/png') return toast('File Format is incorrect', {
      position: "top-center",
      })
      
      let formData = new FormData()
      formData.append('file', file)
      setLoading(true);
      
      const {data} = await axios.post('/api/v1/upload', formData, {
      headers: {Authorization: token, 'Content-Type': 'multipart/form-data'}
      })
      setLoading(false)
      setImages(data)
      console.log('data', data)
    } catch (error) {
      console.log(error.response.data.message)
    }
  
  }
  
  const handleChange = (e) => {
  setProduct({...product,[e.target.name]: e.target.value})
  
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (!isAdmin) return toast('You are not an admin');
      if (!images) return toast('No Image Upload');
      if (edit) {
      const {data} = await axios.put(`/api/v1/products/${product._id}`, { ...product, images }, {
          headers: { Authorization: token }
          
        })
         toast(data.message, {
      position: "top-center",
      })
      }
      else {
     const {data}  = await axios.post('/api/v1/products', { ...product, images }, {
        headers: { Authorization: token}
        })
      
      toast(data.message, {
      position: "top-center",
      })
      }
      setCallback(!callback);
      history.push('/');
    } catch (error) {
      toast(error.response.data.message)
    }
  
  }
  
  
  const handleDelete = async () => {
    try {
      if (!isAdmin) return toast('You are not an admin', {
        position: "top-center",
      });
      setLoading(true);
    const {data }  = await axios.post('/api/v1/destroy', { public_id: images.public_id }, {
        headers: { Authorization: token}
      
      
      })
      toast(data.message, {
      position: "top-center"
      })
      setLoading(false);
      setImages(false);
      
    
  } catch (error) {
      toast(error.response.data.message, {
      position: "top-center",
      })
  }
  
  }
  return (
    <div className = "create__products">
        <ImageUpload handleUpload={handleUpload} images={images} inputRef = {inputRef} loading = {loading} handleDelete = {handleDelete}/>
      <div className="create__productList">
       <Form className = 'category__form' onSubmit={handleSubmit}>
        <Segment className = 'category__segment'inverted>
        <Form.Input
            label='Product ID'
            placeholder='Product ID'
            name='product_id'
            fluid icon='tags'
            iconPosition='left'
            required
              value={product.product_id}
              onChange={handleChange}
            disabled={edit}
          />
        <Form.Input
            label='Title'
            placeholder='Title'
            name='title'
            fluid icon='write'
            iconPosition='left'
              required
              value={product.title}
              onChange={handleChange
              }
            
          />
        <Form.Input
            label='Price'
            placeholder='Price'
            name='price'
            fluid icon='money'
            iconPosition='left'
            required
              type='number'
              value={product.price}
              onChange={handleChange}
              
              
            
          />
        <Form.Input
            label='Description'
            placeholder='Description'
            name='description'
            fluid icon='clipboard list'
            iconPosition='left'
              required
              value={product.description}
              onChange={handleChange}
              
            />
       
            
            <Divider hidden />
            <select name = 'category' className = 'select__categories' value={product.category} onChange={handleChange}>

              
              <option value="">Please select a category</option>
              {categories.map(category => (
               <option className = 'options' value ={category._id} key={category._id} >{category.name}</option>
              ))}
             
            </select>
            
              
            <Divider hidden />
            <Button className='btn' color='instagram' type='submit' disabled={!product.product_id}>{ edit ? 'Edit' : 'Create' }</Button>
        </Segment>
      </Form>
      </div>
    </div>
  )
}

export default CreateProduct
