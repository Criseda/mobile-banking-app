using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// --- DBContext Configuration ---
var connectionString = builder.Configuration.GetConnectionString("DefaultConnection");
builder.Services.AddDbContext<BankingDbContext>(options =>
    options.UseMySql(connectionString, new MySqlServerVersion(new Version(10, 11, 0))));

builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// --- Apply Migrations & Test Endpoint ---
using (var scope = app.Services.CreateScope())
{
    var dbContext = scope.ServiceProvider.GetRequiredService<BankingDbContext>();
    
    // Add retry logic for database connection
    var maxRetries = 10;
    var delay = TimeSpan.FromSeconds(5);
    
    for (int i = 0; i < maxRetries; i++)
    {
        try
        {
            await dbContext.Database.MigrateAsync();
            Console.WriteLine("Database migration completed successfully.");
            break;
        }
        catch (Exception ex) when (i < maxRetries - 1)
        {
            Console.WriteLine($"Migration attempt {i + 1} failed: {ex.Message}. Retrying in {delay.TotalSeconds} seconds...");
            await Task.Delay(delay);
        }
    }
}

// Temporary endpoint to verify the database connection
app.MapGet("/db-test", async (BankingDbContext db) => {
    try
    {
        var userCount = await db.Users.CountAsync();
        return Results.Ok($"Successfully connected to the database. User count: {userCount}");
    }
    catch (Exception ex)
    {
        return Results.Problem($"Database connection failed: {ex.Message}");
    }
});

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapGet("/health", () => "API is healthy!")
    .WithName("GetHealthCheck")
    .WithOpenApi();

app.Run();