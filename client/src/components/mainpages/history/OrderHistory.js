import { useContext, useEffect } from "react";
import { GlobalState } from "../../../GlobalState";
import { Table } from 'semantic-ui-react';
import { Link } from 'react-router-dom';
import './history.css';
import axios from "axios";
const OrderHistory = () => {
  const state = useContext(GlobalState);
  const [history, setHistory] = state.userAPI.history;
  const [isAdmin] = state.userAPI.isAdmin;
  const [token] = state.token;
  
  useEffect(() => {
    if (token) {
      const getHistory = async () => {
        if (isAdmin) {
          const {data} = await axios.get('/api/v1/payments', {
        headers: {Authorization: token}
        })
        // console.log('history', data);
        setHistory(data);
        } else {
          
        const {data} = await axios.get('/api/v1/history', {
        headers: {Authorization: token}
        })
        // console.log('history', data);
        setHistory(data);
        }
      }
      getHistory();
    
    }
  
  }, [token,setHistory,isAdmin]);
  
  return (
    <div className='order__history'>
      <h2>History</h2>
      {isAdmin ? (<h3>Total Orders : {history.length}</h3>
      ) :
        
        (
      <h3 >Previous Orders &nbsp;:&nbsp; {history.length} </h3>
)}
      <Table color = 'black' inverted  className='order__table'>
      <Table.Header>
          <Table.Row>
            <Table.HeaderCell>PaymentID</Table.HeaderCell>
            <Table.HeaderCell>OrderID</Table.HeaderCell>
            <Table.HeaderCell>Date Of Purchase</Table.HeaderCell>
            <Table.HeaderCell>View Details</Table.HeaderCell>
          </Table.Row>
        </Table.Header>
        <Table.Body>
          {history.map(item => (

          <Table.Row key={item._id}>
              <Table.Cell>{item.paymentId  }</Table.Cell>
              <Table.Cell>{item.order_id  }</Table.Cell>
              <Table.Cell>{new Date(item.createdAt).toLocaleDateString()}</Table.Cell>
            <Table.Cell><Link className = 'history__links' to = {`/history/${item._id}`}>View</Link></Table.Cell>
          </Table.Row>
))}
        </Table.Body>
      </Table>
      
    </div>
  )
}

export default OrderHistory
