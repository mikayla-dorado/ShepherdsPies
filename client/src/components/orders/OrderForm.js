import { useEffect, useState } from "react"
import { getCheeses, getPizzaSizes, getSauces, getToppings } from "../../managers/pizzaManager"
import { Button, Form, FormGroup } from "reactstrap"
import { getUserProfiles } from "../../managers/userProfileManager"

export const OrderForm = ({
  pizzas,
  handlePizzaChange,
  order,
  setOrder,
  setPizzas
}) => {

  const [sizes, setSizes] = useState([])
  const [cheeses, setCheeses] = useState([])
  const [sauces, setSauces] = useState([])
  const [toppings, setToppings] = useState([])
  const [isDelivery, setIsDelivery] = useState(false)
  const [drivers, setDrivers] = useState([])

  useEffect(() => {
    getCheeses().then(arr => setCheeses(arr))
    getSauces().then(arr => setSauces(arr))
    getToppings().then(arr => setToppings(arr))
    getPizzaSizes().then(arr => setSizes(arr))
    getUserProfiles().then(arr => setDrivers(arr))
  }, [])

  useEffect(() => {
    setIsDelivery(!!order.driverId)
    if (isDelivery) {
      setIsDelivery(true)
    }
  }, [order, isDelivery])


  //handles a checkbox toggle for delivery
  //when checkbox is toggled, it updates the order state by setting the 'driverId' to null
  //if 'isDelivery' is 'true' & then it toggles the value of 'isDelivery'
  const handleDeliveryCheckbox = () => {
    setOrder((prevOrder) => {
      return {
        //this represents the previous stte of the 'order'
        ...prevOrder,
        //returns new state object, spreading the properties of 'prevOrder' & updating 'diverId' based on the value of 'isDelivery'
        driverId: isDelivery ? null : prevOrder.driverId,
      };
    });
    setIsDelivery(!isDelivery)
  }


  const handleTipChange = (event) => {
    const tipValue = parseInt(event.target.value)
    setOrder((prevOrder) => ({ ...prevOrder, tip: tipValue }))
  }


  const handleRemovePizzaBtn = (index) => {
    //uses fileter to create a new array that excludes the pizza item at the specified index
    //the filter callback function takes 2 parameters(`_, i`)
    //`_` is a placeholder for the current item, and `i` is the index of the current item
    //the condition `i !== index` ensures the only items w an index different from the specified `index` are included in the new array
    setPizzas((prevPizzas) => prevPizzas.filter((_, i) => i !== index))
  }


  //index represents the index of the pizza in the 'pizzas' array that needs to be updated
  const handleToppingChange = (index, toppingId, isChecked) => {
    setPizzas((prevPizzas) => {
      //creates a copy of the current state array of pizzas using the spread operator
      const updatedPizzas = [...prevPizzas]
      //then retrieves the array of selected toppings for the pizza at the specified index
      const selectedToppings = updatedPizzas[index].pizzaToppings

      if (isChecked) {
        //if checked, adds new topping to the 'selectedToppings' array, containing the toppingId and id of the pizza
        selectedToppings.push({ toppingId: toppingId, pizzaId: updatedPizzas[index].id })
      } else {
        //if false, it finds the index of the topping w the specified toppingId in 'selectedToppings' and removes it from the array using splice
        const indexToRemove = selectedToppings.findIndex(topping => topping.toppingId === toppingId)
        if (indexToRemove !== -1) {
          selectedToppings.splice(indexToRemove, 1)
        }
      }

      //then updates the pizzaToppings property of the pizza at the specifie `index` w the modified `selectedToppings` array
      updatedPizzas[index] = {
        ...updatedPizzas[index],
        pizzaToppings: [...selectedToppings]
      }
      //returns updated array
      return updatedPizzas
    })
  }


  const handleAddPizzaBtn = (e) => {
    setPizzas((prevPizzas) => [
      ...prevPizzas,
      {
        pizzaSizeId: null,
        cheeseId: null,
        sauceId: null,
        pizzaToppings: []
      }
    ])
  }


  return (
    <>
      <div className="delivery-container">
        {isDelivery && (
          <select onChange={event => setOrder(prevOrder => ({ ...prevOrder, driverId: parseInt(event.target.value) }))} value={order.driverId || ""}>
            <option>Select a driver</option>
            {drivers.map(driver => (
              <option key={driver.id} value={driver.id}>{driver?.firstName} {driver?.lastName}</option>
            ))}
          </select>
        )}
        <label>
          <input
            type="checkbox"
            checked={isDelivery}
            onChange={handleDeliveryCheckbox}
          />
          Delivery
        </label>
      </div>

      {pizzas.map((pizza, index) => (
        <div key={index} className="form-container">
          <Form>
            <FormGroup>
              <h6>Size</h6>
              <select onChange={event => handlePizzaChange(index, 'pizzaSizeId', event.target.value)} value={pizza.pizzaSizeId}>
                <option value='0'>Select a size</option>
                {sizes.map(size => (
                  <option key={size.id} value={size.id}>{size?.size}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <h6>Cheese</h6>
              <select onChange={event => handlePizzaChange(index, 'cheeseId', event.target.value)} value={pizza.cheeseId}>
                <option value='0'>Select a cheese</option>
                {cheeses.map(cheese => (
                  <option key={cheese.id} value={cheese.id}>{cheese?.name}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <h6>Sauce</h6>
              <select onChange={event => handlePizzaChange(index, 'sauceId', event.target.value)} value={pizza.sauceId}>
                <option value='0'>Select a sauce</option>
                {sauces.map(sauce => (
                  <option key={sauce.id} value={sauce.id}>{sauce?.name}</option>
                ))}
              </select>
            </FormGroup>
            <FormGroup>
              <h6>Toppings</h6>
              <div className="toppings-container">
                {toppings.map(topping => (
                  <label key={topping.id}>
                    <input
                      type="checkbox"
                      checked={pizza.pizzaToppings.some((toppingObj) => toppingObj.toppingId === topping.id)}
                      onChange={e => handleToppingChange(index, topping.id, e.target.checked)}
                    />
                    {topping?.name}
                  </label>
                ))}
              </div>
            </FormGroup>

            <Button className="remove-btn" color="danger" onClick={() => handleRemovePizzaBtn(index)}>
              Remove
            </Button>

          </Form>
        </div>
      ))}
      <Button color="danger" onClick={handleAddPizzaBtn}>
        +Add another pizza
      </Button>
      <div className="tip-container">
        Tip Amount:
        <input type="number" step="0.01" onChange={handleTipChange} value={order.tip || ""} />
      </div>

    </>
  )
}
