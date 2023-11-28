import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string ) {
  }
  getInfoAboutGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<GuildDto>(this.baseUrl + 'guild/getGuildById', {params: queryParams});    
  }
  joinGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.put<any>(this.baseUrl + 'users/joinGuild', null, { params: queryParams })
  }
  leaveGuild() {
    this.http.put<any>(this.baseUrl + 'users/leaveGuild', {}).subscribe()
  }
  getUsersInCertainGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);

    return this.http.get<DTO[]>(this.baseUrl + 'users/getUsersInGuild', { params: queryParams })
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
