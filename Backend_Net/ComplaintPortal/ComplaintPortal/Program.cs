
using ComplaintPortal.Business.Classes;
using ComplaintPortal.Business.Contracts;
using ComplaintPortal.DataAccess.Helper;
using ComplaintPortal.DataAccess.Repository.Classes;
using ComplaintPortal.DataAccess.Repository.Contracts;
using ComplaintPortal.Entities.EFCore;
using Microsoft.AspNetCore.Authentication.JwtBearer;
using Microsoft.EntityFrameworkCore;
using Microsoft.IdentityModel.Tokens;
using System.Text;

namespace ComplaintPortal
{
    public class Program
    {
        public static void Main(string[] args)
        {
            var builder = WebApplication.CreateBuilder(args);

            // Add services to the container.

            //builder.Services.AddControllers(); //and removed camel case serialization below and added controller
            // Add services to the container.
            builder.Services.AddControllers()
                .AddJsonOptions(options =>
                {
                    // This line disables the default camelCase naming policy,
                    // so properties will be serialized with their original PascalCase names.
                    options.JsonSerializerOptions.PropertyNamingPolicy = null;
                });

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

            builder.Services.AddCors((options) =>
            {
                options.AddPolicy("policy1", (policy =>
                {
                    policy.WithOrigins("http://localhost:5173")
                    .AllowAnyMethod()
                    .AllowAnyHeader()
                    .AllowCredentials();
                }));
            });

            // JWT Authentication Configuration
            builder.Services.AddSingleton<JwtConfig>();
            builder.Services.AddSingleton(builder.Configuration.GetSection("JwtSettings").Get<JwtSettings>()!);
            
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
                    ),
                    ClockSkew = TimeSpan.Zero //  Removes the default 5 minute "grace period" for token expiry

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
                    },
                    OnAuthenticationFailed = context =>
                    {
                       //if the token is expired, this event will be triggered
                        Console.WriteLine($"Authentication failed: {context.Exception.Message}");
                        return Task.CompletedTask;
                    },
                    OnTokenValidated = context =>
                    {
                        // we can check if user is still active in DB
                        return Task.CompletedTask;
                    }
                };
            });


            builder.Services.AddScoped<ICityRepository, CityRepository>();
            builder.Services.AddScoped<IDistrictRepository, DistrictRepository>();
            builder.Services.AddScoped<IStateRepository, StateRepository>();
            builder.Services.AddScoped<IWardRepository, WardRepository>();
            builder.Services.AddScoped<IComplaintRepository, ComplaintRepository>();
            builder.Services.AddScoped<IComplaintTypeRepository, ComplaintTypeRepository>();
            builder.Services.AddScoped<IComplaintStatusRepository, ComplaintStatusRepository>();
            builder.Services.AddScoped<IRoleRepository, RoleRepository>();
            
            builder.Services.AddScoped<IUserRepository, UserRepository>();
            builder.Services.AddScoped<IRefreshTokenRepository, RefreshTokenRepository>();

            builder.Services.AddScoped<IAuthService, AuthService>();
            builder.Services.AddScoped<ICityService, CityService>();
            builder.Services.AddScoped<IDistrictService, DistrictService>();
            builder.Services.AddScoped<IStateService, StateService>();
            builder.Services.AddScoped<IWardService, WardService>();
            builder.Services.AddScoped<IUserService, UserService>();
            builder.Services.AddScoped<IComplaintService, ComplaintService>();
            builder.Services.AddScoped<IRoleService, RoleService>();

            builder.Services.AddScoped<IUserClaimsService, UserClaimsService>();
            builder.Services.AddScoped<IRefreshTokenService, RefreshTokenService>();




            builder.Services.AddHttpContextAccessor(); //if we want to access user from http context instead of custom IUserService
            #endregion

            var app = builder.Build();

            // Configure the HTTP request pipeline.
            if (app.Environment.IsDevelopment())
            {
                app.UseSwagger();
                app.UseSwaggerUI();
            }
            app.UseStaticFiles();

            //app.UseHttpsRedirection(); //commented for making use of http 

            app.UseCors("policy1");

            app.UseAuthentication();
            app.UseAuthorization();

            app.MapControllers();

            app.Run();
        }
    }
}
