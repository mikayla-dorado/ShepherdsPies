using System.ComponentModel.DataAnnotations;

namespace ShepherdsPies.Models.DTOs;

public class PizzaSizeDTO
{
  public int Id { get; set; }
  public string Size { get; set; }
  public decimal Price { get; set; }
}