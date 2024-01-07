using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using najprojektik;
using najprojektik.Data;
using najprojektik.Models;
using System.Security.Claims;
using najprojektik.DTO_s;


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
    public GuildDetailDto GetGuildById(int id)
    {
        Guilds guild = _context.Guild.Where(guild => guild.Id == id).FirstOrDefault();

        if (guild != null)
        {
            return new GuildDetailDto
            {
                Id = guild.Id,
                Name = guild.Name,
                Description = guild.Description,
                MaxMembers = guild.MaxMembers,
                MembersCount = GetguildMembersCount(guild.Id),
                Users = MapUserToDto(guild.Id)
            };
        }
        else
        {
            return null;
        }
    }
    public IEnumerable<UserDto> MapUserToDto(int id)
    {
        return _context.Users
            .Include(user => user.Guilds)
            .Where(user => user.Guilds.Id == id)
            .Select(user => new UserDto
            {
                Guild = user.Guilds.Name,
                UserName = user.UserName,
                Email = user.Email,
                Xp = user.Xp
            });
    }


    [HttpPost]
    [Route("createGuild")]
    public createGuildInfo createGuildForm(createGuildInfo guild)
    {
        var guildCreate = new Guilds()
        {
            Description = guild.guildDescription,
            Name = guild.guildName,
            MaxMembers = guild.membersCount
        };
        _context.Add(guildCreate);
        _context.SaveChanges();
        return guild;
    } 
    
}



