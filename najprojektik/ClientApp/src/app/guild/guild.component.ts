import { Component, Inject, Injectable} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class UserService {

  constructor(private http: HttpClient) { }

  updateNumber(userId: number, number: number) {
    return this.http.put<void>('users' + userId, { number });
  }

  updateGuildInformationNumber(guildId: number, userId: number, number: number) {
    return this.http.put<void>('guilds' + guildId + '/join', { userId, number });
  }
}

@Component({
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css'],


})


export class GuildComponent {


  public GuildData: GuildDto[] = [];
  panelOpenState = false;

  constructor(
    http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,

    private userService: UserService) {
    http.get<GuildDto[]>(baseUrl + 'guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }

  async onJoinClick(guildId: number, userId: number) {
    await this.userService.updateGuildInformationNumber(guildId, userId, 1);


    this.router.navigate(['/guild-detail', guildId]);
  }
}

interface GuildDto {
  name: string;
  id: number;
  description: string;
  maxMembers: number;
  membersCount: number;

}
