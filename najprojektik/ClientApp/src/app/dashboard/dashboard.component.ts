import { HttpClient } from '@angular/common/http';
import { Component, Inject } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})



export class DashboardComponent {
  public userinfo: UserDto;

  constructor(http: HttpClient, @Inject('BASE_URL') baseUrl: string) {
    http.get<&UserDto>(baseUrl + 'users').subscribe(result => {
      this.userinfo = result;
    }, error => console.error(error));
  }

}


interface UserDto {
  xp: number;
  guild : string;
}
