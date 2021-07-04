import { useContext, useEffect, useState } from "react"
import { useParams } from "react-router-dom";
import { GlobalState } from "../../../GlobalState"
import { Table, Image } from "semantic-ui-react";
const OrderDetails = () => {
  const state = useContext(GlobalState);
  const [history] = state.userAPI.history;
  const [orderDetails, setOrderDetails] = useState([]);
// console.log('orderDetails', orderDetails)
  const params = useParams();
  
  useEffect(() => {
  
    history.forEach(item => {
    
      
      if(item._id === params.id) setOrderDetails(item);
    })
  
  }, [params.id, history])
  
  // console.log(orderDetails)
  
  if (orderDetails.length === 0) return null;
  
  
  return (
    <div className="order__details">
      <h2 >Address</h2>
      <Table  inverted  className='order__table'>
      <Table.Header>
          <Table.Row >
            <Table.HeaderCell>Name</Table.HeaderCell>
            <Table.HeaderCell >Address</Table.HeaderCell>
            <Table.HeaderCell>State</Table.HeaderCell>
            <Table.HeaderCell>City</Table.HeaderCell>
            <Table.HeaderCell>Pincode</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>

          {orderDetails.address.map(item => (


          
          <Table.Row key={orderDetails._id}>
              <Table.Cell>{orderDetails.name  }</Table.Cell>
              <Table.Cell>{item.addressLine  }</Table.Cell>
              <Table.Cell>{item.State  }</Table.Cell>
              <Table.Cell>{item.city  }</Table.Cell>
              <Table.Cell>{item.pincode  }</Table.Cell>
          </Table.Row>
))}
        </Table.Body>
      </Table>
      
      <h2>Products</h2>
      <Table inverted >
        
       <Table.Header>
          <Table.Row>
            <Table.HeaderCell>Image</Table.HeaderCell>
            <Table.HeaderCell>Product</Table.HeaderCell>
            <Table.HeaderCell>Quantity</Table.HeaderCell>
            <Table.HeaderCell>Price</Table.HeaderCell>
            <Table.HeaderCell>Product ID</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        
        <Table.Body>
          {orderDetails.cart.map(item => (
            <Table.Row key={item._id}>
             <Table.Cell >
            <Image size = "small" className = 'orderDetails__image' src = {item.images.url} />
            </Table.Cell>
             <Table.Cell>
            {item.title}
            </Table.Cell>
             <Table.Cell>
            {item.quantity}
            </Table.Cell>
             <Table.Cell>
           ₹ {item.price}
            </Table.Cell>
             <Table.Cell>
            {item.product_id}
            </Table.Cell>

            
            </Table.Row>
           
))}
        
        </Table.Body>
      
      </Table>
      
    </div>
  )
}

export default OrderDetails
