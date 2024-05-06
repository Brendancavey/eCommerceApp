using Microsoft.AspNetCore.Builder;
using eCommerceAPI.DBContext;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.DependencyInjection;

namespace DatabaseManagement.Services;

public static class MigrationExtensions
{
	public static void ApplyMigrations(this IApplicationBuilder app)
	{
		using IServiceScope scope = app.ApplicationServices.CreateScope();
		
		using EcommerceDBContext dbContext = scope.ServiceProvider.GetRequiredService<EcommerceDBContext>();

		dbContext.Database.Migrate();

	}
}



