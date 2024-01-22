using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;
using ShepherdsPies.Models.DTOs;

[ApiController]
[Route("api/[controller]")]

public class PizzaSizeController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public PizzaSizeController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
      return Ok(_dbContext.PizzaSizes.Select(ps => new PizzaSizeDTO
      {
        Id = ps.Id,
        Size = ps.Size,
        Price = ps.Price
      }));
    }
}