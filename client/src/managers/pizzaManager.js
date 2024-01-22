export const getCheeses = () => {
    return fetch("/api/cheese").then(res => res.json())
  }
  
  export const getSauces = () => {
    return fetch("/api/sauce").then(res => res.json())
  }
  
  export const getToppings = () => {
    return fetch("/api/topping").then(res => res.json())
  }
  
  export const getPizzaSizes = () => {
    return fetch("/api/pizzasize").then(res => res.json())
  }