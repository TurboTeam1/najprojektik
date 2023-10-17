namespace najprojektik.Models
{
    public class Guilds
    {
        public int Id { get; set; } = default!;
        public string Name { get; set; } = null!;
        public string Description { get; set; } = null!;
    public int MaxMembers { get; set; }
    }
}
