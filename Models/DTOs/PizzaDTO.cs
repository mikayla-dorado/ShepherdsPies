namespace ShepherdsPies.Models.DTOs;

public class PizzaDTO
{
  public int Id { get; set; }
  public int PizzaSizeId { get; set; }
  public PizzaSizeDTO PizzaSize { get; set; }
  public int CheeseId { get; set; }
  public CheeseDTO Cheese { get; set; }
  public int SauceId { get; set; }
  public SauceDTO Sauce { get; set; }
  public int OrderId { get; set; }
  public OrderDTO Order { get; set; }
  public List<PizzaToppingDTO> PizzaToppings { get; set; }
  public decimal Price
  {
    get
    {
      //total is pizza size + amount of toppings
      decimal pizzaTotal = PizzaSize.Price + (decimal)(PizzaToppings.Count * .5);
      return pizzaTotal;
    }
  }

}