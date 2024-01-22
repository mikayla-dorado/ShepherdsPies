using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using ShepherdsPies.Data;
using ShepherdsPies.Models;
using ShepherdsPies.Models.DTOs;

[ApiController]
[Route("api/[controller]")]

public class SauceController : ControllerBase
{
    private ShepherdsPiesDbContext _dbContext;

    public SauceController(ShepherdsPiesDbContext context)
    {
        _dbContext = context;
    }

    [HttpGet]
    [Authorize]
    public IActionResult Get()
    {
      return Ok(_dbContext.Sauces.Select(s => new SauceDTO
      {
        Id = s.Id,
        Name = s.Name
      }));
    }
}