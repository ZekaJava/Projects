import { Component } from '@angular/core';
import { LeagueListComponent } from "./components/league-list/league-list.component";
import { SeasonBadgeComponent } from './components/season-badge/season-badge/season-badge.component';

@Component({
  selector: 'app-root',
  imports: [LeagueListComponent, SeasonBadgeComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss'
})
export class AppComponent {
  title = 'SportLeagues';
}
