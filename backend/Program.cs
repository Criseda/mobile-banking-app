var builder = WebApplication.CreateBuilder(args);

// Add services to the container.
// We'll keep these for later when we want to document our API.
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseHttpsRedirection();

// Our new, simple health check endpoint.
// .WithName(...) is good practice for OpenAPI documentation.
app.MapGet("/health", () => "API is healthy!")
    .WithName("GetHealthCheck")
    .WithOpenApi();

app.Run();
