using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;
using ShepherdsPies.Models.DTOs;

[ApiController]
[Route("api/[controller]")]

public class CheeseController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public CheeseController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
      return Ok(_dbContext.Cheeses.Select(c => new CheeseDTO
      {
        Id = c.Id,
        Name = c.Name
      }));
    }
}