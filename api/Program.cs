using api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

// accept origin from localhost.
// for production, you should use a real domain name here.
builder.Services.AddCors(options =>
{
    string front_url = Environment.GetEnvironmentVariable("FRONTEND_URL") ?? "";

    options.AddDefaultPolicy(policy =>
    {
        policy.WithOrigins(front_url)
              .AllowAnyMethod()
              .AllowAnyHeader();
    });
});

// Add services to the container.

builder.Services.AddControllers();
// Learn more about configuring OpenAPI at https://aka.ms/aspnet/openapi
builder.Services.AddOpenApi();

// get connection string from env variables
var connectionString = Environment.GetEnvironmentVariable("ConnectionStrings__FakeMovieDB");

builder.Services.AddDbContext<FakeDbContext>(options => options.UseSqlServer(
    connectionString
));

var app = builder.Build();

using (var scope = app.Services.CreateScope()){
    var context = scope.ServiceProvider.GetRequiredService<FakeDbContext>();
    context.Database.Migrate();
}

// Configure the HTTP request pipeline.
if (app.Environment.IsDevelopment())
{

    app.MapOpenApi();
}

app.UseHttpsRedirection();

app.UseCors();

app.UseAuthorization();

app.MapControllers();

app.Run();
