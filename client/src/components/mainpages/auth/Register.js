import { useState} from 'react';
import {Form ,Button,Segment, Divider, Loader} from  'semantic-ui-react';
import { Link } from 'react-router-dom';
import './auth.css';
import axios from 'axios';
import { toast } from 'react-toastify';

const Register = () => {

const [user,setUser] = useState({
name: '',
   email: '',
    password: '',

  })
  const {name,email,password} = user;
const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [check, setCheck] = useState(false);
  const handleChange = (e) => {
    setUser({...user,[e.target.name]: e.target.value})
  }
  const handleCheck = (e) => {
    setCheck( !check)
  }


  const handleSubmit = async (e) => {
    e.preventDefault();
      try {
      setLoading(true)
      await axios.post('/api/v1/register', { ...user });
      sessionStorage.setItem('firstLogin', true);
        window.location.href = '/';
      toast('Successfully Login', {
        position: "top-center",
      })
      setLoading(false);
      } catch (err) {
      setLoading(false);
        // console.log(err)
        
      toast.error(err.response.data.message, {
        position: "top-center",
      })
    }
     
  }
  return (
    <div className="formData">
      <Form  onSubmit={handleSubmit}>

<Segment>
  <h1>Register</h1>
 <Form.Input
            label='Name'
            placeholder='Name'
            name='name'
            value={name}
            onChange={handleChange}
            fluid icon='user'
            iconPosition='left'
            required
            
          />
          <Form.Input
            label='Email'
            placeholder='Email'
            name='email'
            value={email}
            onChange={handleChange}
            fluid icon='envelope'
            iconPosition='left'
            type='email'
            required
          
          />
          <Form.Input
            label='Password'
            placeholder='Password'
            name='password'
            value={password}
            onChange={handleChange}
            fluid icon={{
              name: 'eye',
              circular: true,
              link: true,
              onClick :()=> setShowPassword(!showPassword)

              
            }}
            iconPosition='left'
            type= {showPassword ? 'text' : 'password'}
            required
          />
          <Form.Checkbox label='I agree to the Terms and Conditions' onChange={handleCheck} checked={check} />
          <Divider hidden />
          <Button  className = 'btn' color='black'
           type = 'submit'
            disabled={!name || !email || !password || !check }>{
              
            loading ? <Loader active inline='centered'  /> : 'Register'
          }
        
      </Button>

</Segment>
      <div className = 'link'>
        <p>Already have an account ?</p>
        <Link to = '/login'>Login</Link>
      </div>
      </Form>
    </div>
  )
}

export default Register
