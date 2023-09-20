import { Component } from '@angular/core';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.css']
})

interface User {
  xp: number;
  guild: string;
}

export class DashboardComponent {

  user: User = {
    xp: 100,
    guild: 'Adventurers'
  };



}
