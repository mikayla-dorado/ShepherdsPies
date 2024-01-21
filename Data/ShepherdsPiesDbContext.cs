using Microsoft.EntityFrameworkCore;
using Microsoft.AspNetCore.Identity.EntityFrameworkCore;
using ShepherdsPies.Models;
using Microsoft.AspNetCore.Identity;

namespace ShepherdsPies.Data;
public class ShepherdsPiesDbContext : IdentityDbContext<IdentityUser>
{
    private readonly IConfiguration _configuration;
    public DbSet<UserProfile> UserProfiles { get; set; }
    public DbSet<Cheese> Cheeses { get; set; }
    public DbSet<Order> Orders { get; set; }
    public DbSet<Pizza> Pizzas { get; set; }
    public DbSet<PizzaSize> PizzaSizes { get; set; }
    public DbSet<PizzaTopping> PizzaToppings { get; set; }
    public DbSet<Sauce> Sauces { get; set; }
    public DbSet<Topping> Toppings { get; set; }
    
    


    public ShepherdsPiesDbContext(DbContextOptions<ShepherdsPiesDbContext> context, IConfiguration config) : base(context)
    {
        _configuration = config;
    }

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        modelBuilder.Entity<IdentityRole>().HasData(new IdentityRole
        {
            Id = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            Name = "Admin",
            NormalizedName = "admin"
        });

        modelBuilder.Entity<IdentityUser>().HasData(new IdentityUser
        {
            Id = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            UserName = "Administrator",
            Email = "admina@strator.comx",
            PasswordHash = new PasswordHasher<IdentityUser>().HashPassword(null, _configuration["AdminPassword"])
        });

        modelBuilder.Entity<IdentityUserRole<string>>().HasData(new IdentityUserRole<string>
        {
            RoleId = "c3aaeb97-d2ba-4a53-a521-4eea61e59b35",
            UserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f"
        });
        modelBuilder.Entity<UserProfile>().HasData(new UserProfile
        {
            Id = 1,
            IdentityUserId = "dbc40bc6-0829-4ac5-a3ed-180f5e916a5f",
            FirstName = "Joe",
            LastName = "Shepherd",
            Address = "101 Main Street",
        });

        modelBuilder.Entity<Cheese>().HasData(new Cheese[]
        {
            new Cheese {Id = 1, Name = "Buffalo Mozzarella"},
            new Cheese {Id = 2, Name = "Four Cheese"},
            new Cheese {Id = 3, Name = "Vegan"},
            new Cheese {Id = 4, Name = "None (cheeseless)"}
        });

        modelBuilder.Entity<Sauce>().HasData(new Sauce[]
        {
            new Sauce {Id = 1, Name = "Marinara"},
            new Sauce {Id = 2, Name = "Arrabbiata"},
            new Sauce {Id = 3, Name = "Garlic White"},
            new Sauce {Id = 4, Name = "None (sauceless pizza)"}
        });

        modelBuilder.Entity<Topping>().HasData(new Topping[]
        {
            new Topping {Id = 1, Name = "Sausage"},
            new Topping {Id = 2, Name = "Pepperoni"},
            new Topping {Id = 3, Name = "Mushroom"},
            new Topping {Id = 4, Name = "Onion"},
            new Topping {Id = 5, Name = "Green pepper"},
            new Topping {Id = 6, Name = "Black olive"},
            new Topping {Id = 7, Name = "Basil"},
            new Topping {Id = 8, Name = "Extra cheese"},
        });

        modelBuilder.Entity<PizzaSize>().HasData(new PizzaSize[]
        {
            new PizzaSize {Id = 1, Size ="Small (10\")", Price = 10.0M},
            new PizzaSize {Id = 2, Size ="Medium (14\")", Price = 12.0M},
            new PizzaSize {Id = 3, Size ="Large (18\")", Price = 15.0M}
        });

        modelBuilder.Entity<Pizza>().HasData(new Pizza[]
        {
            new Pizza {Id = 1, PizzaSizeId = 3, CheeseId = 1, SauceId = 1, OrderId = 1},
            new Pizza {Id = 2, PizzaSizeId = 2, CheeseId = 2, SauceId = 2, OrderId = 1},
            new Pizza {Id = 3, PizzaSizeId = 1, CheeseId = 3, SauceId = 1, OrderId = 2}
        });

        modelBuilder.Entity<PizzaTopping>().HasData(new PizzaTopping[]
        {
            new PizzaTopping {Id = 1, PizzaId = 1, ToppingId = 1},
            new PizzaTopping {Id = 2, PizzaId = 1, ToppingId = 5},
            new PizzaTopping {Id = 3, PizzaId = 1, ToppingId = 4},
            new PizzaTopping {Id = 4, PizzaId = 2, ToppingId = 2},
            new PizzaTopping {Id = 5, PizzaId = 3, ToppingId = 3},
            new PizzaTopping {Id = 6, PizzaId = 3, ToppingId = 7}
        });

        modelBuilder.Entity<Order>().HasData(new Order[]
        {
            new Order {Id = 1, EmployeeId = 1, DriverId = 1, Tip = 5.0M, OrderDate = new DateTime(2024, 1, 11, 18, 0, 0)},
            new Order {Id = 2, EmployeeId = 1, OrderDate = new DateTime(2024, 1, 11, 19, 0, 0)},
            new Order {Id = 3, EmployeeId = 1, DriverId = 1, Tip = 6.0M, OrderDate = new DateTime(2024, 1, 22, 12, 0, 0)}
        });
        
    }
}