using Microsoft.EntityFrameworkCore;
using LAuraApi;

var builder = WebApplication.CreateBuilder(args);

// CORS Ayarı (React frontend erişimi için)
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowReactApp",
        policy => policy.WithOrigins("http://localhost:5173")
                        .AllowAnyHeader()
                        .AllowAnyMethod());
});

// Veritabanı Bağlantısı (SQL Server)
builder.Services.AddDbContext<RestaurantContext>(options =>
    options.UseSqlServer(builder.Configuration.GetConnectionString("DefaultConnection")));

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

var app = builder.Build();

if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.UseCors("AllowReactApp");
app.UseHttpsRedirection();
app.UseAuthorization();
app.MapControllers();

app.Run();