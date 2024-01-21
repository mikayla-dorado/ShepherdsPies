using System.ComponentModel.DataAnnotations.Schema;

namespace ShepherdsPies.Models.DTOs;

public class OrderDTO
{
  public int Id { get; set; }
  public DateTime OrderDate { get; set; }
  public int EmployeeId { get; set; }
  public int? DriverId { get; set; }
  [ForeignKey ("EmployeeId")]
  public UserProfileDTO Employee { get; set; }
  [ForeignKey ("DriverId")]
  public UserProfileDTO? Driver { get; set; }
  public decimal? Tip { get; set; }
  public List<PizzaDTO> Pizzas { get; set; }
  public decimal TotalCost
  {
    get
    {
      // TODO total is pizza price + tip + delivery
      decimal pizzaTotal = Pizzas.Sum(p => p.Price);
      decimal tipAmount = Tip ?? 0;
      decimal deliveryFee = DriverId.HasValue ? 5.0M : 0;
      decimal orderTotal = pizzaTotal + tipAmount + deliveryFee;
      return orderTotal;
    }
  }
}