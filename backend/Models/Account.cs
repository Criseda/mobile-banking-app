using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;

public class Account
{
    [Key]
    public Guid Id { get; set; }

    [Required]
    public Guid UserId { get; set; } // Foreign key to our User table
    public User User { get; set; } = null!;

    [Required]
    public required string IBAN { get; set; } = string.Empty;

    [Required]
    public required string AccountType { get; set; } = string.Empty; // e.g., "Current", "Savings"

    [Required]
    public required string Currency { get; set; } = string.Empty; // e.g., "RON", "EUR"

    [Required]
    [Column(TypeName = "decimal(18, 2)")] // Crucial for financial data
    public decimal Balance { get; set; }

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
}