using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using najprojektik;
using najprojektik.Data;
using najprojektik.Models;
using System.Security.Claims;


[Route("[controller]")]
[ApiController]

public class GuildController : ControllerBase
{
    private readonly ApplicationDbContext _context;

    public GuildController(ApplicationDbContext context)
    {
        _context = context;
    }

    [HttpGet]
    public IEnumerable<Guilds> GetGuildInformation()
    {
        IEnumerable<Guilds> dbGuilds = _context.Guild;

        return dbGuilds.Select(dbGuilds => new Guilds
        {
            Id = dbGuilds.Id,
            Name = dbGuilds.Name,
            Description = dbGuilds.Description,
            MaxMembers = dbGuilds.MaxMembers,
            MembersCount = GetguildMembersCount(dbGuilds.Id)
        });
    }


    private int GetguildMembersCount(int guildId)
    {
        IQueryable<ApplicationUser> users = _context.Users.Include(applicationUser => applicationUser.Guilds).AsNoTracking();

        return users.Where(u => u.Guilds.Id == guildId).Count();
    }

}