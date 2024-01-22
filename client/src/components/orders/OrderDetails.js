import { useEffect, useState } from "react"
import { getOrderById } from "../../managers/orderManager"
import { useNavigate, useParams } from "react-router-dom"
import { Button } from "reactstrap"

export const OrderDetails = () => {
  const [order, setOrder] = useState({})

  const { id } = useParams()
  const navigate = useNavigate()

  useEffect(() => {
    getOrderById(id).then(obj => setOrder(obj))
  }, [id])

  const formatCurrency = (amount) => {
    return amount?.toLocaleString('en-US', {
      style: 'currency',
      currency: 'USD',
      minimumFractionDigits: 2,
      maximumFractionDigits: 2,
    });
  };

  const handleEditOrderBtn = (e) => {
    e.preventDefault()
    navigate("editorder")
  }


  return (
    <>
      <header>
        <h2>Order Details</h2>
        <Button color="success" onClick={e => handleEditOrderBtn(e)}>Edit Order</Button>
      </header>
      <div className="pizzas-container">
        {order.pizzas?.map((p, index) => (
          <div className="pizza-container" key={p.id}>
            <h4>{`Pizza #${index + 1}`}</h4>
            <div><b>Size: </b>{p.pizzaSize.size}</div>
            <div><b>Cheese:</b> {p.cheese?.name}</div>
            <div><b>Sauce: </b>{p.sauce?.name}</div>
            <div><b>Toppings:</b>
              {p.pizzaToppings.map(pt => (
                <div key={pt.id}>{pt.topping?.name}</div>
              ))}
            </div>
            <div><b>Cost:</b> {formatCurrency(p.price)}</div>
          </div>

        ))}
      </div>
      <div>
        <b>Tip: </b>
        {order.tip ? (
          <span>
            {formatCurrency(order.tip)}
          </span>
        ) : (
          <div>0</div>
        )}
      </div>
      <div><b>TOTAL:</b> {formatCurrency(order.totalCost)}</div>
    </>
  )
}