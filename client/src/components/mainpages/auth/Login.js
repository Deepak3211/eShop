import { useState} from 'react';
import {Form ,Button,Segment,Divider, Loader} from  'semantic-ui-react';
import { Link } from 'react-router-dom';
import './auth.css';
import { toast } from 'react-toastify';
import axios from 'axios';
const Login = () => {
  const [user,setUser] = useState({

   email: '',
    password: '',

  })
  const {email,password} = user;
const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  

  const handleChange = (e) => {
    setUser({...user,[e.target.name]: e.target.value})
  }



  const handleSubmit =  async (e) => {
    e.preventDefault();
    try {
      setLoading(true)
      await axios.post('/api/v1/login', { ...user });

      localStorage.setItem('firstLogin', true);
      window.location.href = '/';
      toast('Successfully Login', {
        position: "top-center",
      })
      setLoading(false);
    } catch (err) {
      console.log(err)
      setLoading(false);

      toast.error(err.response.data.message, {
        position: "top-center",
      })
    }
      
     
  }
  return (
    <div className="formData">
      <Form className = 'form' onSubmit={handleSubmit}>

<Segment>
  <h1>Login</h1>
 
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
          <Divider hidden />
          <Button className = 'btn'  color='black'
           type = 'submit'
          disabled = { !email || !password}>{
            loading ? <Loader active inline='centered'/> : 'Login'
          }
        
      </Button>

</Segment>
      <div className = 'link'>
        <p>Don't have an account ?</p>
        <Link to = '/register'>Register</Link>
      </div>
      </Form>
    </div>
  )
}

export default Login
