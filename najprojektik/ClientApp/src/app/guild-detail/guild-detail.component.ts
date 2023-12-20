import { HttpClient } from '@angular/common/http';
import { Component, Inject, OnInit, signal, } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GuildService } from '../guild.service';
import { inject } from '@angular/core/testing';
import { getBaseUrl } from '../../main';




@Component({
  selector: 'app-guild-detail',
  templateUrl: './guild-detail.component.html',
  styleUrls: ['./guild-detail.component.css']
})
export class GuildDetailComponent implements OnInit {

  guildIdFromRoute: number = 0;
  guildDetailInfo = signal<GuildDetailDto>(undefined);

  constructor(
    private route: ActivatedRoute,
    private guildService: GuildService,
  ) {
  }
  ngOnInit(): void {
    const RouteParams = this.route.snapshot.paramMap;
    this.guildIdFromRoute = Number(RouteParams.get('id'));
    console.log(RouteParams)
    this.guildService.getInfoAboutGuild(this.guildIdFromRoute).subscribe(guildDetail => { this.guildDetailInfo.set(guildDetail); });
  }
  OnJoin() {
    this.guildService.joinGuild(this.guildIdFromRoute).subscribe(guildDetail => { this.guildDetailInfo.set(guildDetail); });
  }
  OnLeave() {
    this.guildService.leaveGuild(this.guildIdFromRoute).subscribe(guildDetail => { this.guildDetailInfo.set(guildDetail); });
  

  }
}

interface UserDto {
  userName: string;
  xp: number;
  email: string;
  guild: string;
}

interface GuildDetailDto {
  name: string;
  id: number;
  description: string;
  maxMembers: number;
  membersCount: number;
  users: UserDto[];
}
