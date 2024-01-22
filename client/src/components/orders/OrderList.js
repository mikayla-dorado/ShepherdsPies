import { useEffect, useState } from "react"
import { useNavigate } from "react-router-dom"
import { deleteOrder, getOrders } from "../../managers/orderManager"
import { Button, Table } from "reactstrap"

export const OrderList = () => {
  const [orders, setOrders] = useState([])

  const navigate = useNavigate()

  const getAndSetOrders = () => {
    getOrders().then(arr => setOrders(arr))
  }

  useEffect(() => {
    getAndSetOrders()
  }, [])

  function formatDate(inputDate) {
    const date = new Date(inputDate);
    
    const options = {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: 'numeric',
      minute: 'numeric',
      hour12: true,
    };
  
    return new Intl.DateTimeFormat('en-US', options).format(date);
  }

  const handleDetailsBtn = (e, id) => {
    e.preventDefault()
    navigate(`${id}`)
  }

  const handleCreateNewOrderBtn = (e) => {
    e.preventDefault()
    navigate("neworder")
  }

  const handleDeleteOrderBtn = (e, id) => {
    e.preventDefault()

    deleteOrder(id).then(() => getAndSetOrders())
  }

  return (
    <>
      <header>
        <h2>Orders</h2>
        <Button color="success" onClick={e => handleCreateNewOrderBtn(e)}>Create New Order</Button>
      </header>
      <Table>
        <thead>
          <tr>
            <th>Date</th>
            <th>Employee</th>
            <th>Driver</th>
            <th>Total Price</th>
            <th></th>
          </tr>
        </thead>
        <tbody>
          {orders.map(o =>
          (
            <tr key={o.id}>
              <td>{formatDate(o.orderDate)}</td>
              <td>{o.employee?.firstName} {o.employee?.lastName}</td>
              {o.driverId ?
                <td>{o.driver.firstName} {o.driver.lastName}</td>
                :
                <td>--</td>
              }
              <td>{o.totalCost.toLocaleString('en-US', {
                style: 'currency',
                currency: 'USD',
                minimumFractionDigits: 2,
                maximumFractionDigits: 2,
              })}</td>
              <td className="btns-column">
                <Button color="success" onClick={e => handleDetailsBtn(e, o.id)}>Details</Button>
                <Button color="danger" onClick={e => handleDeleteOrderBtn(e, o.id)}>Delete Order</Button>
              </td>
            </tr>
          )
          )}
        </tbody>

      </Table>
    </>
  )
}