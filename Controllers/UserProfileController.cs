using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using ShepherdsPies.Data;
using ShepherdsPies.Models.DTOs;

[ApiController]
[Route("api/[controller]")]

public class UserProfileController : ControllerBase
{
  private ShepherdsPiesDbContext _dbContext;

  public UserProfileController(ShepherdsPiesDbContext context)
  {
    _dbContext = context;
  }

  [HttpGet]
  [Authorize]
  public IActionResult Get()
  {
    return Ok(_dbContext.UserProfiles
      .Include(up => up.IdentityUser)
      .Select(up => new UserProfileDTO
      {
        Id = up.Id,
        FirstName = up.FirstName,
        LastName = up.LastName,
        Address = up.Address,
        Email = up.IdentityUser.Email,
        UserName = up.IdentityUser.UserName,
        IdentityUserId = up.IdentityUserId,
        Roles = _dbContext.UserRoles
          .Where(ur => ur.UserId == up.IdentityUserId)
          .Select(ur => _dbContext.Roles.SingleOrDefault(r => r.Id == ur.RoleId).Name)
          .ToList()
      }));
  }
}