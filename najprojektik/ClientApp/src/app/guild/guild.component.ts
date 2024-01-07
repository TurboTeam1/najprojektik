import { Component, Inject, Injectable, signal} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuildService } from '../guild.service';
import { Subject, takeUntil } from 'rxjs';




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
  guildForm: FormGroup;

  private destroy$ = new Subject<void>();
  public GuildData: GuildDto[];
  newGuild = signal<GuildFormDto>(undefined);

  constructor(
    private route: ActivatedRoute,
    http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private guildService: GuildService,
  ) 
  {
    this.guildForm = new FormGroup({
      guildName: new FormControl('', Validators.required),
      guildDescription: new FormControl('', Validators.required),
      membersCount: new FormControl('', Validators.required),
    });

    http.get<GuildDto[]>(baseUrl + 'guild').subscribe(result => {
      this.GuildData = result;

    }, error => console.error(error));
  }
  onSubmit() {
  // TODO: Use EventEmitter with form value
   if (this.guildForm.valid) {
     this.guildService.createGuildForum({
       guildName: this.guildForm.controls['guildName'].value,
       guildDescription: this.guildForm.controls['guildDescription'].value,
       membersCount: this.guildForm.controls['membersCount'].value
     }).pipe(takeUntil(this.destroy$)).subscribe();
    }
    else {
      console.warn();
    }
    }
  }



interface GuildDto {
  name: string;
  id: number;
  description: string;
  maxMembers: number;
  membersCount: number;
  userId?: number;
}
interface GuildFormDto {
  guildName: string;
  guildDescription: string;
  membersCount: string;
}
