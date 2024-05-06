using DatabaseManagement.Services;
using eCommerceAPI.DBContext;
using eCommerceAPI.Models;
using eCommerceAPI.Services.ApplicationUserService;
using eCommerceAPI.Services.CartService;
using eCommerceAPI.Services.ProductService;
using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using System.Security.Claims;

public class Program
{
    public static async Task Main(string[] args)
    {
        var builder = WebApplication.CreateBuilder(args);

        // Add services to the container.

        builder.Services.AddControllers();
        // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
        builder.Services.AddEndpointsApiExplorer();
        builder.Services.AddSwaggerGen();
        //Enable CORS
        builder.Services.AddCors(c =>
        {
            c.AddPolicy("AllowOrigin", options => {
                options.WithOrigins("http://localhost:5173")
                    .AllowAnyMethod().AllowAnyHeader().AllowCredentials();
            });
        });
        builder.Services.AddScoped<IProductService, ProductService>();
        builder.Services.AddScoped<ICategoryService, CategoryService>();
        builder.Services.AddScoped<ICartService, CartService>();
        builder.Services.AddScoped<IApplicationUserService, ApplicationUserService>();

        builder.Services.AddAuthorization();

        builder.Services.AddDbContext<DbContext, EcommerceDBContext>((serviceProvider, options) =>
        {
            
            //var configuration = serviceProvider.GetRequiredService<IConfiguration>();
            var dbHost = Environment.GetEnvironmentVariable("DB_HOST");
            var dbName = Environment.GetEnvironmentVariable("DB_NAME");
            var dbUserId = Environment.GetEnvironmentVariable("DB_USER_ID");
            var dbPassword = Environment.GetEnvironmentVariable("DB_SA_PASSWORD");
            var connectionString = $"Server={dbHost};Database={dbName};User Id={dbUserId};Password={dbPassword};TrustServerCertificate=True";

            //options.UseSqlServer(configuration.GetConnectionString("DesktopConnection"));
            options.UseSqlServer(connectionString);
        });
        
        builder.Services.AddIdentityApiEndpoints<ApplicationUser>
            (options => {
                options.SignIn.RequireConfirmedAccount = false;
            })
            .AddRoles<IdentityRole>()
            .AddEntityFrameworkStores<EcommerceDBContext>();
        
        var app = builder.Build();
        //Enable Cors
        app.UseCors("AllowOrigin");
        // Configure the HTTP request pipeline.
        if (app.Environment.IsDevelopment())
        {
            app.UseSwagger();
            app.UseSwaggerUI();
        }
        app.ApplyMigrations();
        app.UseAuthentication();

        app.UseAuthorization();

        app.MapIdentityApi<ApplicationUser>();
        app.MapPost("/logout", async (SignInManager<ApplicationUser> signInManager) =>
        {
            await signInManager.SignOutAsync();
            return Results.Ok();
        }).RequireAuthorization();

        app.MapGet("/pingauth", (ClaimsPrincipal user) =>
        {
            var email = user.FindFirstValue(ClaimTypes.Email); //get the user's email from the claim
            var role = user.FindFirstValue(ClaimTypes.Role);
            var firstName = user.FindFirstValue("FirstName");
            var lastName = user.FindFirstValue("LastName");
            var address = user.FindFirstValue("Address");
            var city = user.FindFirstValue("City");
            var zipCode = user.FindFirstValue("ZipCode");
            return Results.Json(new { 
                Email = email, 
                Role = role, 
                FirstName = firstName,
                LastName = lastName,
                Address = address,
                City = city,
                ZipCode = zipCode,
            }); // return as a plain text response
        }).RequireAuthorization();

        //app.UseHttpsRedirection();

        app.MapControllers();

        //seeding default role data
        using (var scope = app.Services.CreateScope())
        {
            var roleManager = scope.ServiceProvider.GetRequiredService<RoleManager<IdentityRole>>();
            var roles = new[] { "Admin", "Member" };

            foreach (var role in roles)
            {
                if (!await roleManager.RoleExistsAsync(role))
                {
                    await roleManager.CreateAsync(new IdentityRole(role));
                }
            }
        }
        //seeding default admin account data
        using (var scope = app.Services.CreateScope())
        {
            var userManager = scope.ServiceProvider.GetRequiredService<UserManager<ApplicationUser>>();

            string email = Environment.GetEnvironmentVariable("ADMIN_USERNAME");
            string password = Environment.GetEnvironmentVariable("ADMIN_PASSWORD");

            if (await userManager.FindByEmailAsync(email) == null)
            {
                var user = new ApplicationUser();
                user.UserName = email;
                user.Email = email;
                user.EmailConfirmed = true;

                await userManager.CreateAsync(user, password);
                await userManager.AddToRoleAsync(user, "Admin");
            }

        }

        app.Run();

    }
}
