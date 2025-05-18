using System;
using System.Collections.Generic;
using ComplaintPortal.Entities.Models;
using Microsoft.EntityFrameworkCore;
using Pomelo.EntityFrameworkCore.MySql.Scaffolding.Internal;

namespace ComplaintPortal.Entities.EFCore;

public partial class AppDbContext : DbContext
{
    public AppDbContext()
    {
    }

    public AppDbContext(DbContextOptions<AppDbContext> options)
        : base(options)
    {
    }

    public virtual DbSet<city> cities { get; set; }

    public virtual DbSet<complaint> complaints { get; set; }

    public virtual DbSet<complaintstatus> complaintstatuses { get; set; }

    public virtual DbSet<complainttype> complainttypes { get; set; }

    public virtual DbSet<district> districts { get; set; }

    public virtual DbSet<role> roles { get; set; }

    public virtual DbSet<state> states { get; set; }

    public virtual DbSet<user> users { get; set; }

    public virtual DbSet<ward> wards { get; set; }

    protected override void OnConfiguring(DbContextOptionsBuilder optionsBuilder)
#warning To protect potentially sensitive information in your connection string, you should move it out of source code. You can avoid scaffolding the connection string by using the Name= syntax to read it from configuration - see https://go.microsoft.com/fwlink/?linkid=2131148. For more guidance on storing connection strings, see https://go.microsoft.com/fwlink/?LinkId=723263.
        => optionsBuilder.UseMySql("server=localhost;port=3306;user=root;password=12345;database=Municipal_Complaint", ServerVersion.Parse("8.0.41-mysql"));

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        modelBuilder
            .UseCollation("utf8mb4_0900_ai_ci")
            .HasCharSet("utf8mb4");

        modelBuilder.Entity<city>(entity =>
        {
            entity.HasKey(e => e.CityID).HasName("PRIMARY");

            entity.HasIndex(e => e.DistrictID, "DistrictID");

            entity.HasIndex(e => e.StateID, "StateID");

            entity.Property(e => e.ActiveStatus).HasDefaultValueSql("'1'");
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedBy).HasMaxLength(50);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

            entity.HasOne(d => d.District).WithMany(p => p.cities)
                .HasForeignKey(d => d.DistrictID)
                .HasConstraintName("cities_ibfk_1");

            entity.HasOne(d => d.State).WithMany(p => p.cities)
                .HasForeignKey(d => d.StateID)
                .HasConstraintName("cities_ibfk_2");
        });

        modelBuilder.Entity<complaint>(entity =>
        {
            entity.HasKey(e => e.ComplaintID).HasName("PRIMARY");

            entity.HasIndex(e => e.ComplaintTypeID, "ComplaintTypeID");

            entity.HasIndex(e => e.Status, "Status");

            entity.HasIndex(e => e.UserID, "UserID");

            entity.HasIndex(e => e.WardID, "WardID");

            entity.Property(e => e.ActiveStatus).HasDefaultValueSql("'1'");
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.Description).HasColumnType("text");
            entity.Property(e => e.GeoLat).HasPrecision(10, 6);
            entity.Property(e => e.GeoLong).HasPrecision(10, 6);
            entity.Property(e => e.Image1).HasMaxLength(255);
            entity.Property(e => e.Image2).HasMaxLength(255);
            entity.Property(e => e.Image3).HasMaxLength(255);
            entity.Property(e => e.ModifiedBy).HasMaxLength(50);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

            entity.HasOne(d => d.ComplaintType).WithMany(p => p.complaints)
                .HasForeignKey(d => d.ComplaintTypeID)
                .HasConstraintName("complaints_ibfk_2");

            entity.HasOne(d => d.StatusNavigation).WithMany(p => p.complaints)
                .HasForeignKey(d => d.Status)
                .HasConstraintName("complaints_ibfk_4");

            entity.HasOne(d => d.User).WithMany(p => p.complaints)
                .HasForeignKey(d => d.UserID)
                .HasConstraintName("complaints_ibfk_3");

            entity.HasOne(d => d.Ward).WithMany(p => p.complaints)
                .HasForeignKey(d => d.WardID)
                .HasConstraintName("complaints_ibfk_1");
        });

        modelBuilder.Entity<complaintstatus>(entity =>
        {
            entity.HasKey(e => e.StatusID).HasName("PRIMARY");

            entity.ToTable("complaintstatus");

            entity.Property(e => e.Status).HasMaxLength(50);
        });

        modelBuilder.Entity<complainttype>(entity =>
        {
            entity.HasKey(e => e.ComplaintTypeID).HasName("PRIMARY");

            entity.ToTable("complainttype");

            entity.Property(e => e.ComplaintType).HasMaxLength(50);
            entity.Property(e => e.Description).HasColumnType("text");
        });

        modelBuilder.Entity<district>(entity =>
        {
            entity.HasKey(e => e.DistrictID).HasName("PRIMARY");

            entity.HasIndex(e => e.StateID, "StateID");

            entity.Property(e => e.ActiveStatus).HasDefaultValueSql("'1'");
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.District).HasMaxLength(50);
            entity.Property(e => e.ModifiedBy).HasMaxLength(50);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

            entity.HasOne(d => d.State).WithMany(p => p.districts)
                .HasForeignKey(d => d.StateID)
                .HasConstraintName("districts_ibfk_1");
        });

        modelBuilder.Entity<role>(entity =>
        {
            entity.HasKey(e => e.RoleId).HasName("PRIMARY");

            entity.Property(e => e.Role).HasMaxLength(30);
            entity.Property(e => e.activeState).HasDefaultValueSql("'1'");
            entity.Property(e => e.createdBy)
                .HasMaxLength(7)
                .HasDefaultValueSql("'SYSTEM'")
                .IsFixedLength();
            entity.Property(e => e.createdDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.modifiedDate)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
        });

        modelBuilder.Entity<state>(entity =>
        {
            entity.HasKey(e => e.StateId).HasName("PRIMARY");

            entity.Property(e => e.ActiveStatus).HasDefaultValueSql("'1'");
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedBy).HasMaxLength(50);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");
            entity.Property(e => e.State).HasMaxLength(100);
        });

        modelBuilder.Entity<user>(entity =>
        {
            entity.HasKey(e => e.UserId).HasName("PRIMARY");

            entity.HasIndex(e => e.RoleId, "RoleId");

            entity.Property(e => e.ActiveState).HasDefaultValueSql("'1'");
            entity.Property(e => e.Address).HasMaxLength(50);
            entity.Property(e => e.City).HasMaxLength(20);
            entity.Property(e => e.CreatedDate)
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.District).HasMaxLength(20);
            entity.Property(e => e.Email).HasMaxLength(100);
            entity.Property(e => e.FirstName).HasMaxLength(10);
            entity.Property(e => e.IsRegistered).HasDefaultValueSql("'1'");
            entity.Property(e => e.LastName).HasMaxLength(10);
            entity.Property(e => e.MiddleName).HasMaxLength(10);
            entity.Property(e => e.ModifiedBy).HasMaxLength(20);
            entity.Property(e => e.ModifiedDate)
                .ValueGeneratedOnAddOrUpdate()
                .HasDefaultValueSql("CURRENT_TIMESTAMP")
                .HasColumnType("datetime");
            entity.Property(e => e.Password).HasMaxLength(200);
            entity.Property(e => e.Phone).HasMaxLength(10);
            entity.Property(e => e.Pincode).HasMaxLength(7);
            entity.Property(e => e.State).HasMaxLength(50);

            entity.HasOne(d => d.Role).WithMany(p => p.users)
                .HasForeignKey(d => d.RoleId)
                .HasConstraintName("users_ibfk_1");
        });

        modelBuilder.Entity<ward>(entity =>
        {
            entity.HasKey(e => e.WardID).HasName("PRIMARY");

            entity.HasIndex(e => e.CityID, "CityID");

            entity.Property(e => e.ActiveStatus).HasDefaultValueSql("'1'");
            entity.Property(e => e.AreaCovered).HasMaxLength(255);
            entity.Property(e => e.City).HasMaxLength(50);
            entity.Property(e => e.CreatedBy).HasMaxLength(50);
            entity.Property(e => e.CreatedDate).HasColumnType("datetime");
            entity.Property(e => e.ModifiedBy).HasMaxLength(50);
            entity.Property(e => e.ModifiedDate).HasColumnType("datetime");

            entity.HasOne(d => d.CityNavigation).WithMany(p => p.wards)
                .HasForeignKey(d => d.CityID)
                .HasConstraintName("wards_ibfk_1");
        });

        OnModelCreatingPartial(modelBuilder);
    }

    partial void OnModelCreatingPartial(ModelBuilder modelBuilder);
}
