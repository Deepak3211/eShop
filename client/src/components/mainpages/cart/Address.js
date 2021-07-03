import {Form ,Segment, Divider} from  'semantic-ui-react';

const Address = ({address1,handleChange}) => {
  const {phone,pincode, addressLine, city, State} = address1
 
  return (
    <div className="address">
      <Form className = 'form' >

<Segment>
  <h1>Shipping Address</h1>
 
          <Form.Input
            label='Phone'
            placeholder='Phone'
            name='phone'
            value={phone}
            onChange={handleChange}
            iconPosition='left'
            required
            type='number'
            icon = 'phone'
          
          />
          <Form.Input
            label='Pincode'
            placeholder='Pincode'
            name='pincode'
            value={pincode}
            onChange={handleChange}
            iconPosition='left'
            required
            icon ='map marker alternate'
          
          />
          <Form.Input
            label='Address'
            placeholder='Address'
            name='addressLine'
            value={addressLine}
            onChange={handleChange}
            iconPosition='left'
            required
            icon = 'home'
          
          />
          <Form.Input
            label='City'
            placeholder='City'
            name='city'
            value={city}
            onChange={handleChange}
            required
            iconPosition='left'
            icon='building'
            
            
          />
          <Form.Input
            label='State'
            placeholder='State'
            name='State'
            value={State}
            onChange={handleChange}
            required
            iconPosition='left'
            icon='industry'
            
          />
          <Divider hidden />
          

</Segment>
</Form>
       </div>
  )
}

export default Address
