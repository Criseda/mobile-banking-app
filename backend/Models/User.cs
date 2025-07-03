using System.ComponentModel.DataAnnotations;

public class User
{
    [Key]
    public Guid Id { get; set; } // Our internal Primary Key

    [Required]
    public required string OryKratosId { get; set; } // The ID from Ory Kratos

    public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

    // Navigation property for related accounts
    public ICollection<Account> Accounts { get; set; } = new List<Account>();
}