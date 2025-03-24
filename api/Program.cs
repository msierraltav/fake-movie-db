using api.Models;
using Microsoft.EntityFrameworkCore;

var builder = WebApplication.CreateBuilder(args);

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

app.UseAuthorization();

app.MapControllers();

app.Run();
