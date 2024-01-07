import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string) {
  }
  getInfoAboutGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<GuildDetailDto>(this.baseUrl + 'guild/getGuildById', { params: queryParams });
  }
  joinGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.put<GuildDetailDto>(this.baseUrl + 'users/joinGuild', null, { params: queryParams })
  }
  leaveGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.put<GuildDetailDto>(this.baseUrl + 'users/leaveGuild', null, { params: queryParams })
  }
  createGuildForum(Data:GuildFormDto) { 

    return this.http.post<GuildFormDto>(this.baseUrl + 'guild/createGuild', Data );
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
interface GuildFormDto {
  guildName: string; 
  guildDescription: string; 
  membersCount: string;
}
