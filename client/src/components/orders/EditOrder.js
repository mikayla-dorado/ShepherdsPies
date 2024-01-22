import { useEffect, useState } from "react"
import { useNavigate, useParams } from "react-router-dom"
import { getOrderById, updateOrder } from "../../managers/orderManager"
import { OrderForm } from "./OrderForm"
import { Button } from "reactstrap"

export const EditOrder = ({loggedInUser }) => {
  const [order, setOrder] = useState({})
  const [pizzas, setPizzas] = useState([])

  const { id } = useParams()
  
  useEffect(() => {
    getOrderById(id).then(obj => {
      setOrder(obj)
      setPizzas(obj.pizzas)
    })
    .catch(error => {
      console.error("Error fetching order by id:", error)
    })

  }, [id])

  const navigate = useNavigate()



  const handlePizzaChange = (index, property, value) => {
    setPizzas((prevPizzas) => {
      const updatedPizzas = [...prevPizzas]
      updatedPizzas[index][property] = parseInt(value)
      return updatedPizzas
    })
  }

  const handleUpdateOrderBtn = (e) => {
    e.preventDefault()

    const pizzasToUpdate = pizzas.map((p) => ({
      id: p.id,
      pizzaSizeId: p.pizzaSizeId,
      cheeseId: p.cheeseId,
      sauceId: p.sauceId,
      orderId: p.orderId,
      pizzaToppings: p.pizzaToppings,
    }));

    
    const orderToUpdate = {
      id: order.id,
      employeeId: order.employeeId,
      driverId: order.driverId,
      tip: order.tip,
      pizzas: pizzasToUpdate
    }
    console.log("Update Order button pressed", orderToUpdate)
    updateOrder(orderToUpdate).then(() => navigate(`/${id}`))
  }

  return (
    <>
      <div className="header-container">
        <h2>Edit Order</h2>
      </div>
      
      <OrderForm
        pizzas={pizzas}
        handlePizzaChange={handlePizzaChange}
        order={order}
        setOrder={setOrder}
        setPizzas= {setPizzas}
      />

      <div className="submit-btn-container">
        <Button type="submit" color="success" onClick={e => handleUpdateOrderBtn(e)}>Update Order</Button>
      </div>
    </>
  )
}