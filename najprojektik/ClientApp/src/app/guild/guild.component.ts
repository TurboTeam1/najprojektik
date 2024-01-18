import { Component, Inject, Injectable, signal, Pipe, PipeTransform} from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Router,RouterModule, ActivatedRoute } from '@angular/router';
import { FormGroup, FormControl, ReactiveFormsModule, Validators, FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { GuildService } from '../guild.service';
import { Subject, takeUntil } from 'rxjs';
import { SearchFilterPipe } from 'src/app/search-filter.pipe';



@Injectable({
  providedIn: 'root'
})

@Component({
  standalone: true,
  selector: 'app-guild',
  templateUrl: './guild.component.html',
  styleUrls: ['./guild.component.css'],
  imports: [ReactiveFormsModule, CommonModule, RouterModule, FormsModule],
  providers: [SearchFilterPipe]

  
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

  items: GuildDto[] = [];
  searchTerm: string = '';
  filteredItems: GuildDto[] = [];

  constructor(
    private route: ActivatedRoute,
    http: HttpClient,
    private router: Router,
    @Inject('BASE_URL') baseUrl: string,
    private guildService: GuildService,
    private searchFilterPipe: SearchFilterPipe,
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
     }).pipe(takeUntil(this.destroy$)).subscribe(guildDetail => { this.newGuild.set(guildDetail); });
    }
    else {
      console.warn();
    }
  }

  //onSearchChange(event: GuildDto) {
  //  this.searchTerm = event.target.value;
  //  this.filteredItems = this.searchFilterPipe.transform(this.items, this.searchTerm);
  ///}
  }



export interface GuildDto {
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
