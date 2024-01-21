using System.ComponentModel.DataAnnotations;

namespace ShepherdsPies.Models;

public class PizzaSize
{
  public int Id { get; set; }
  public string Size { get; set; }
  public decimal Price { get; set; }
}