
using System.Text;
using ComplaintPortal.Business.Classes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Helper;
using ComplaintPortal.DataAccess.Repository.Classes;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.EFCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.Extensions.Options;
using Microsoft.IdentityModel.Tokens;

namespace ComplaintPortal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            builder.Services.AddControllers();
            // Learn more about configuring Swagger/OpenAPI at https://aka.ms/aspnetcore/swashbuckle
            builder.Services.AddEndpointsApiExplorer();
            builder.Services.AddSwaggerGen();

            #region Register Dependencies

            //Configure Entity Framework and MySQL database context
            builder.Services.AddDbContext<AppDbContext>(options =>
            options.UseMySql(
    builder.Configuration.GetConnectionString("DefaultConnection"),
    ServerVersion.AutoDetect(builder.Configuration.GetConnectionString("DefaultConnection"))
)

           );

            // JWT Authentication Configuration
            builder.Services.AddSingleton<JwtConfig>();
            builder.Services.AddAuthentication(options =>
            {
                options.DefaultAuthenticateScheme = JwtBearerDefaults.AuthenticationScheme;
                options.DefaultChallengeScheme = JwtBearerDefaults.AuthenticationScheme;
            })
            .AddJwtBearer(options =>
            {
                options.TokenValidationParameters = new TokenValidationParameters
                {
                    ValidateIssuer = true,
                    ValidateAudience = true,
                    ValidateLifetime = true,
                    ValidIssuer = builder.Configuration["JwtSettings:Issuer"],
                    ValidAudience = builder.Configuration["JwtSettings:Audience"],
                    IssuerSigningKey = new SymmetricSecurityKey(
                        Encoding.UTF8.GetBytes(builder.Configuration["JwtSettings:SecretKey"])
                    )
                };

                //  Read token from cookie instead of header
                options.Events = new JwtBearerEvents
                {
                    OnMessageReceived = context =>
                    {
                        var accessToken = context.Request.Cookies["token"]; // or whatever cookie name you're using
                        if (!string.IsNullOrEmpty(accessToken))
                        {
                            context.Token = accessToken;
                        }
                        return Task.CompletedTask;
                    }
                };
            });


            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ICityService, CityService>();
            builder.Services.AddScoped<ICityRepository, CityRepository>();
            builder.Services.AddScoped<IDistrictRepository, DistrictRepository>();
            builder.Services.AddScoped<IDistrictService, DistrictService>();

            builder.Services.AddScoped<IStateRepository, StateRepository>();
            builder.Services.AddScoped<IStateService, StateService>();

            builder.Services.AddScoped<IWardRepository, WardRepository>();
            builder.Services.AddScoped<IWardService, WardService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IComplaintRepository, ComplaintRepository>();
            builder.Services.AddScoped<IComplaintService, ComplaintService>();




            #endregion

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }

            app.UseHttpsRedirection();

            app.UseAuthorization();


            app.MapControllers();

            app.Run();
        }
    }
}
