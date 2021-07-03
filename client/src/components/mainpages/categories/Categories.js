import axios from 'axios';
import { useContext, useState } from 'react';
import { toast } from 'react-toastify';
import { GlobalState } from '../../../GlobalState';
import {Form ,Button,Segment,Divider} from  'semantic-ui-react';
import './categories.css';

const Categories = () => {
  const state = useContext(GlobalState);
  const [categories] = state.categoriesAPI.categories;
  const [category, setCategory] = useState('');
  const [token] = state.token;
  const [callback, setCallback] = state.categoriesAPI.callback;
  const [edit,setEdit] = useState(false);
  const [id, setID] = useState('');
  const createCategory = async(e) => {
    e.preventDefault();
    try {
      if (edit) {
        const { data } = await axios.put(`/api/v1/category/${id}`, { name: category }, {
        headers: {Authorization: token}
        
        })
         toast(data.message, {
        position: "top-center",

      });
      } else {
      
      const { data } = await axios.post('/api/v1/category', { name: category }, {
        headers: { Authorization: token }
      });
      toast(data.message, {
        position: "top-center",

      });
      
      }
      setEdit(false);
      setCategory('');
      setCallback(!callback);
    } catch (error) {
      toast(error.message, {
      position: "top-center",
      });
    }
  }
  
  const editCategory = async (id, name) => {
  try {
    setID(id);
    setCategory(name);
    setEdit(true);
    
  }
  
  catch (error) {
    toast(error.message, {
      position: "top-center",
      });
  }
  }
  
  const deleteCategory = async (id) => {
  
    try {
      const { data } = await axios.delete(`/api/v1/category/${id}`, {
      headers: {Authorization: token}
      
      });
      toast(data.message, {
        position: "top-center",

      });
      setCallback(!callback);


      
    } catch (error) {
       toast(error.message, {
        position: "top-center",

      });
    }
  
  }
  return (
    <div className = "categories">
      <Form className = 'category__form'onSubmit={createCategory}>
        <Segment className = 'category__segment'inverted>
        <Form.Input
            label='Category'
            placeholder='Category'
            name='category'
            value={category}
            onChange={e=>setCategory(e.target.value)}
            fluid icon='tags'
            iconPosition='left'
            required
            
          />
          <Button className='btn' color='instagram' type='submit' disabled={!category}> {edit ? 'Update' : 'Create'}</Button>
        </Segment>
      </Form>
        <div className="categories__data">
          {categories.map(category => (

            <div className="categories__update" key ={category._id}>
              <h3>{category.name}</h3>
              
              <Segment className = 'segment'  size = 'large'>
                <Button color = 'instagram'className = 'btn' onClick={() => editCategory(category._id, category.name)}>Edit</Button>
              <Divider  hidden/>
              <Button className = 'btn'color="google plus" onClick = {() =>deleteCategory(category._id)}>Delete</Button>
              </Segment>
              
            </div>

))}
        
        </div>
      
      
    </div>
  )
}

export default Categories
