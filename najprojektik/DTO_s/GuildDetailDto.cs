namespace najprojektik.DTO_s
{
    public class GuildDetailDto
    {
        public int Id { get; set; }

        public string? Name { get; set; }

        public string? Description { get; set; }

        public int MaxMembers { get; set; }

        public int MembersCount { get; set; }
        public IEnumerable<UserDto> Users { get; set; }

    }

}
