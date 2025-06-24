using Microsoft.EntityFrameworkCore.Metadata;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace ComplaintPortal.Entities.Migrations
{
    /// <inheritdoc />
    public partial class InitialMigration : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AlterDatabase()
                .Annotation("MySql:CharSet", "utf8mb4");

            #region Already created table
            //migrationBuilder.CreateTable(
            //    name: "complaintstatus",
            //    columns: table => new
            //    {
            //        StatusID = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        Status = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.StatusID);
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateTable(
            //    name: "complainttype",
            //    columns: table => new
            //    {
            //        ComplaintTypeID = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        ComplaintType = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Description = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.ComplaintTypeID);
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateTable(
            //    name: "roles",
            //    columns: table => new
            //    {
            //        RoleId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        Role = table.Column<string>(type: "varchar(30)", maxLength: 30, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        createdBy = table.Column<string>(type: "char(7)", fixedLength: true, maxLength: 7, nullable: true, defaultValueSql: "'SYSTEM'", collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        createdDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
            //        modifiedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.ComputedColumn),
            //        activeState = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.RoleId);
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateTable(
            //    name: "states",
            //    columns: table => new
            //    {
            //        StateId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        State = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CreatedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ModifiedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ActiveStatus = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.StateId);
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateTable(
            //    name: "users",
            //    columns: table => new
            //    {
            //        UserId = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        FirstName = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        MiddleName = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        LastName = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Email = table.Column<string>(type: "varchar(100)", maxLength: 100, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Phone = table.Column<string>(type: "varchar(10)", maxLength: 10, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Address = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Pincode = table.Column<string>(type: "varchar(7)", maxLength: 7, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        State = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        District = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        City = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        IsRegistered = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'"),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP"),
            //        ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: true, defaultValueSql: "CURRENT_TIMESTAMP")
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.ComputedColumn),
            //        ActiveState = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'"),
            //        ModifiedBy = table.Column<string>(type: "varchar(20)", maxLength: 20, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        RoleId = table.Column<int>(type: "int", nullable: true),
            //        Password = table.Column<string>(type: "varchar(200)", maxLength: 200, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.UserId);
            //        table.ForeignKey(
            //            name: "users_ibfk_1",
            //            column: x => x.RoleId,
            //            principalTable: "roles",
            //            principalColumn: "RoleId");
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateTable(
            //    name: "districts",
            //    columns: table => new
            //    {
            //        DistrictID = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        District = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        StateID = table.Column<int>(type: "int", nullable: true),
            //        CreatedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ModifiedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ActiveStatus = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.DistrictID);
            //        table.ForeignKey(
            //            name: "districts_ibfk_1",
            //            column: x => x.StateID,
            //            principalTable: "states",
            //            principalColumn: "StateId");
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci"); 
            #endregion

            #region Already added no need to create
            //migrationBuilder.CreateTable(
            //    name: "cities",
            //    columns: table => new
            //    {
            //        CityID = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        City = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        DistrictID = table.Column<int>(type: "int", nullable: true),
            //        StateID = table.Column<int>(type: "int", nullable: true),
            //        CreatedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ModifiedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ActiveStatus = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.CityID);
            //        table.ForeignKey(
            //            name: "cities_ibfk_1",
            //            column: x => x.DistrictID,
            //            principalTable: "districts",
            //            principalColumn: "DistrictID");
            //        table.ForeignKey(
            //            name: "cities_ibfk_2",
            //            column: x => x.StateID,
            //            principalTable: "states",
            //            principalColumn: "StateId");
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateTable(
            //    name: "wards",
            //    columns: table => new
            //    {
            //        WardID = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        City = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: false, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CityID = table.Column<int>(type: "int", nullable: true),
            //        AreaCovered = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CreatedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ModifiedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ActiveStatus = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.WardID);
            //        table.ForeignKey(
            //            name: "wards_ibfk_1",
            //            column: x => x.CityID,
            //            principalTable: "cities",
            //            principalColumn: "CityID");
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateTable(
            //    name: "complaints",
            //    columns: table => new
            //    {
            //        ComplaintID = table.Column<int>(type: "int", nullable: false)
            //            .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
            //        WardID = table.Column<int>(type: "int", nullable: true),
            //        GeoLat = table.Column<decimal>(type: "decimal(10,6)", precision: 10, scale: 6, nullable: true),
            //        GeoLong = table.Column<decimal>(type: "decimal(10,6)", precision: 10, scale: 6, nullable: true),
            //        Description = table.Column<string>(type: "text", nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Image1 = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Image2 = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        Image3 = table.Column<string>(type: "varchar(255)", maxLength: 255, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        ComplaintTypeID = table.Column<int>(type: "int", nullable: true),
            //        UserID = table.Column<int>(type: "int", nullable: true),
            //        Status = table.Column<int>(type: "int", nullable: true),
            //        CreatedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        CreatedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ModifiedBy = table.Column<string>(type: "varchar(50)", maxLength: 50, nullable: true, collation: "utf8mb4_0900_ai_ci")
            //            .Annotation("MySql:CharSet", "utf8mb4"),
            //        ModifiedDate = table.Column<DateTime>(type: "datetime", nullable: true),
            //        ActiveStatus = table.Column<bool>(type: "tinyint(1)", nullable: true, defaultValueSql: "'1'")
            //    },
            //    constraints: table =>
            //    {
            //        table.PrimaryKey("PRIMARY", x => x.ComplaintID);
            //        table.ForeignKey(
            //            name: "complaints_ibfk_1",
            //            column: x => x.WardID,
            //            principalTable: "wards",
            //            principalColumn: "WardID");
            //        table.ForeignKey(
            //            name: "complaints_ibfk_2",
            //            column: x => x.ComplaintTypeID,
            //            principalTable: "complainttype",
            //            principalColumn: "ComplaintTypeID");
            //        table.ForeignKey(
            //            name: "complaints_ibfk_3",
            //            column: x => x.UserID,
            //            principalTable: "users",
            //            principalColumn: "UserId");
            //        table.ForeignKey(
            //            name: "complaints_ibfk_4",
            //            column: x => x.Status,
            //            principalTable: "complaintstatus",
            //            principalColumn: "StatusID");
            //    })
            //    .Annotation("MySql:CharSet", "utf8mb4")
            //    .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");

            //migrationBuilder.CreateIndex(
            //    name: "DistrictID",
            //    table: "cities",
            //    column: "DistrictID");

            //migrationBuilder.CreateIndex(
            //    name: "StateID",
            //    table: "cities",
            //    column: "StateID");

            //migrationBuilder.CreateIndex(
            //    name: "ComplaintTypeID",
            //    table: "complaints",
            //    column: "ComplaintTypeID");

            //migrationBuilder.CreateIndex(
            //    name: "Status",
            //    table: "complaints",
            //    column: "Status");

            //migrationBuilder.CreateIndex(
            //    name: "UserID",
            //    table: "complaints",
            //    column: "UserID");

            //migrationBuilder.CreateIndex(
            //    name: "WardID",
            //    table: "complaints",
            //    column: "WardID");

            //migrationBuilder.CreateIndex(
            //    name: "StateID1",
            //    table: "districts",
            //    column: "StateID"); 
            //migrationBuilder.CreateIndex(
            //    name: "RoleId",
            //    table: "users",
            //    column: "RoleId");

            //migrationBuilder.CreateIndex(
            //    name: "CityID",
            //    table: "wards",
            //    column: "CityID");
            #endregion
            
            migrationBuilder.CreateTable(
                name: "RefreshTokens",
                columns: table => new
                {
                    Id = table.Column<int>(type: "int", nullable: false)
                        .Annotation("MySql:ValueGenerationStrategy", MySqlValueGenerationStrategy.IdentityColumn),
                    Token = table.Column<string>(type: "varchar(256)", maxLength: 256, nullable: false, collation: "utf8mb4_0900_ai_ci")
                        .Annotation("MySql:CharSet", "utf8mb4"),
                    UserId = table.Column<int>(type: "int", nullable: false),
                    Expires = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Created = table.Column<DateTime>(type: "datetime(6)", nullable: false),
                    Revoked = table.Column<DateTime>(type: "datetime(6)", nullable: true)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_RefreshTokens", x => x.Id);
                    table.ForeignKey(
                        name: "FK_RefreshToken_User_UserId",
                        column: x => x.UserId,
                        principalTable: "users",
                        principalColumn: "UserId",
                        onDelete: ReferentialAction.Cascade);
                })
                .Annotation("MySql:CharSet", "utf8mb4")
                .Annotation("Relational:Collation", "utf8mb4_0900_ai_ci");


            migrationBuilder.CreateIndex(
                name: "IX_RefreshTokens_UserId",
                table: "RefreshTokens",
                column: "UserId");

        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "RefreshTokens");

            #region should only drop above created table
            //migrationBuilder.DropTable(
            //    name: "complaints");


            //migrationBuilder.DropTable(
            //    name: "wards");

            //migrationBuilder.DropTable(
            //    name: "complainttype");

            //migrationBuilder.DropTable(
            //    name: "complaintstatus");

            //migrationBuilder.DropTable(
            //    name: "users");

            //migrationBuilder.DropTable(
            //    name: "cities");

            //migrationBuilder.DropTable(
            //    name: "roles");

            //migrationBuilder.DropTable(
            //    name: "districts");

            //migrationBuilder.DropTable(
            //    name: "states"); 
            #endregion
        }
    }
}
