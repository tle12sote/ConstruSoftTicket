using ConstruSoftTicket.Application.Interfaces;
using ConstruSoftTicket.Infrastructure.Repositories;
using ConstruSoftTicket.Infrastructure.Data;
using ConstruSoftTicket.Application.Services;
using Microsoft.EntityFrameworkCore;

// 🔐 JWT
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.IdentityModel.Tokens;
using System.Text;

var builder = WebApplication.CreateBuilder(args);

// =======================
// 🔧 SERVICIOS
// =======================

builder.Services.AddControllers();
builder.Services.AddEndpointsApiExplorer();
builder.Services.AddSwaggerGen();

// CONEXIÓN A BD
builder.Services.AddDbContext<AppDbContext>(options =>
    options.UseNpgsql(builder.Configuration.GetConnectionString("DefaultConnection")));

// INYECCIÓN DE DEPENDENCIAS
builder.Services.AddScoped<IUserRepository, UserRepository>();
builder.Services.AddScoped<IAuthService, AuthService>();
builder.Services.AddScoped<ITicketService, TicketService>();
builder.Services.AddScoped<ITicketRepository, TicketRepository>();

// 🌐 CORS
builder.Services.AddCors(options =>
{
    options.AddPolicy("AllowAll",
        policy => policy.AllowAnyOrigin()
                        .AllowAnyMethod()
                        .AllowAnyHeader());
});

// =======================
// 🔐 JWT CONFIG
// =======================

var key = builder.Configuration["Jwt:Key"] ?? "ConstruSoftClaveSegura1234567890123456";

builder.Services.AddAuthentication("Bearer")
    .AddJwtBearer("Bearer", options =>
    {
        options.TokenValidationParameters = new TokenValidationParameters
        {
            ValidateIssuer = false,
            ValidateAudience = false,
            ValidateLifetime = true,
            ValidateIssuerSigningKey = true,
            IssuerSigningKey = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(key)
            )
        };
    });

var app = builder.Build();

// =======================
// 🔧 PIPELINE
// =======================

app.UseHttpsRedirection();

app.UseCors("AllowAll");

// 🔐 IMPORTANTE ORDEN
app.UseAuthentication();
app.UseAuthorization();

// SWAGGER
if (app.Environment.IsDevelopment())
{
    app.UseSwagger();
    app.UseSwaggerUI();
}

app.MapControllers();

app.Run();