using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;
using ShepherdsPies.Models.DTOs;

[ApiController]
[Route("api/[controller]")]

public class ToppingController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public ToppingController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
      return Ok(_dbContext.Toppings.Select(t => new ToppingDTO
      {
        Id = t.Id,
        Name = t.Name
      }));
    }
}