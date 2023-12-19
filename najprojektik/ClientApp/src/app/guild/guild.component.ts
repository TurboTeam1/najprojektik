import { Component, Inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';




@Injectable({
  providedIn: 'root'
})


@Component({
  standalone: true,
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule],
})


export class GuildComponent {

  name = new FormControl('');
  Name: string = "no data";
  Description: string = "no data";
  MaxMembers: number = 0;
  MembersCount: number = 0;
  guildForm = new FormGroup({
  guildName: new FormControl(''),
  guildDescription: new FormControl(''),
  membersCount: new FormControl(''),

  });

  public GuildData: GuildDto[] = [];

  constructor(
    http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,
  )



  {
    http.get<GuildDto[]>(baseUrl + 'guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }
  onSubmit() {
    // TODO: Use EventEmitter with form value
    console.warn(this.guildForm.value);
  }
  // http.get<
}






interface GuildDto {
  name: string;
  id: number;
  description: string;
  maxMembers: number;
  membersCount: number;
  userId?: number;
}
