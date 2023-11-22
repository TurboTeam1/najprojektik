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
    public IEnumerable<GuildDto> GetGuildInformation()
    {
        IEnumerable<Guilds> dbGuilds = _context.Guild;

        return dbGuilds.Select(dbGuilds => new GuildDto
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
    [HttpGet]
    [Route("getGuildById")]
    public GuildDto GetGuildById(int id)
    {
        Guilds guild = _context.Guild.Where(guild => guild.Id == id).FirstOrDefault();

        if (guild != null)
        {
            return new GuildDto
            {
                Id = guild.Id,
                Name = guild.Name,
                Description = guild.Description,
                MaxMembers = guild.MaxMembers,
                MembersCount = GetguildMembersCount(guild.Id)
            };
        }
        else
        {
            return null;
        }
    }
}

