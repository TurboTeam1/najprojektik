import { HttpClient, HttpParams } from '@angular/common/http';
import { Inject, Injectable } from '@angular/core';


@Injectable({
  providedIn: 'root'
})
export class GuildService {

  constructor(private http: HttpClient, @Inject('BASE_URL') private baseUrl: string ) {
  }
  GetInfoAboutGuild(id: number) {
    let queryParams = new HttpParams();
    queryParams = queryParams.append("id", id);
    return this.http.get<GuildDto>(this.baseUrl + 'guild/getGuildById', {params: queryParams});
      
  }
}
interface GuildDto {
  name: string;
  id: number;
  description: string;
  maxMembers: number;
  membersCount: number;

}

