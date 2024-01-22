import { Button } from "reactstrap"
import { OrderForm } from "./OrderForm"
import { useState } from "react"
import { createOrder } from "../../managers/orderManager"
import { useNavigate } from "react-router-dom"


export const CreateOrder = ({ loggedInUser }) => {
  const navigate = useNavigate()
  const [order, setOrder] = useState({
    employeeId: loggedInUser.id,
    driverId: null,
    tip: null,
    pizzas: []
  })
  const [pizzas, setPizzas] = useState([
    {
      pizzaSizeId: 0,
      cheeseId: 0,
      sauceId: 0,
      pizzaToppings: []
    }
  ])

  const handlePizzaChange = (index, property, value) => {
    setPizzas((prevPizzas) => {
      const updatedPizzas = [...prevPizzas]
      updatedPizzas[index][property] = parseInt(value)
      return updatedPizzas
    })
  }

  const handleSubmitOrderBtn = (e) => {
    e.preventDefault()

    const orderToSubmit = {
      employeeId: loggedInUser.id,
      driverId: order.driverId,
      tip: order.tip,
      pizzas: pizzas
    }

    console.log(orderToSubmit)
    createOrder(orderToSubmit).then(() => navigate("/"))
  }



  return (
    <>
      <div className="header-container">
        <h2>Order a Pizza</h2>
      </div>
      
      <OrderForm 
        pizzas={pizzas}
        handlePizzaChange={handlePizzaChange}
        order={order}
        setOrder={setOrder}
        setPizzas= {setPizzas}
      />

      <div className="submit-btn-container">
        <Button type="submit" color="success" onClick={e => handleSubmitOrderBtn(e)}>Submit Order</Button>
      </div>
    </>
  )
}