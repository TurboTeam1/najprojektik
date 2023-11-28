import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildService } from '../guild.service';
import { inject } from '@angular/core/testing';
import { getBaseUrl } from '../../main';


@Component({
  selector: 'app-guild-detail',
  templateUrl: './guild-detail.component.html',
  styleUrls: ['./guild-detail.component.css']
})
export class GuildDetailComponent implements OnInit{

 mojgec: number = 0;
 guild: GuildDto | undefined;
 guildUsers: DTO[];

  constructor(
    private route: ActivatedRoute,
    http: HttpClient,
    private guildService: GuildService,
    @Inject('BASE_URL') baseUrl: string

  ) {
    this.guild = {} as GuildDto;

  }
  ngOnInit(): void {
    const RouteParams = this.route.snapshot.paramMap;
    this.mojgec = Number(RouteParams.get('id'));
    console.log(RouteParams)
    this.guildService.getInfoAboutGuild(this.mojgec).subscribe(guild => { this.guild = guild ;

    this.guildService.getUsersInCertainGuild(this.mojgec).subscribe(result => { this.guildUsers = result;
    }, error => console.error(error));
    });
  }
  OnJoin() {
    this.guildService.joinGuild(this.mojgec).subscribe();
    location.reload();
  }
  OnLeave() {
    this.guildService.leaveGuild();
    location.reload();
  }
}

interface GuildDto {
  name: string;
  id: number;
  description: string;
  maxMembers: number;
  membersCount: number;

}
interface DTO {
  userName: string;
  xp: number;
  email: string;
  guild: string;
}
