import { Component, OnInit } from '@angular/core';
import { MatCardModule } from '@angular/material/card';
import { LeagueService } from '../../../services/league.service';
import { SeasonBadge } from '../../../entities/season';

@Component({
  selector: 'app-season-badge',
  imports: [MatCardModule],
  templateUrl: './season-badge.component.html',
  styleUrl: './season-badge.component.scss',
})
export class SeasonBadgeComponent implements OnInit {
  seasonBadgesObj: { flag: boolean; seasons: SeasonBadge[] } = {
    flag: false,
    seasons: [],
  };
  isClicked: boolean = false;
  seasonBadgesArr: SeasonBadge[] = [];
  firstSeason: SeasonBadge = {
    strSeason: '',
    strBadge: '',
  };

  constructor(private leagueService: LeagueService) {}

  ngOnInit() {
    this.leagueService.seasonSource.subscribe((seasonBadgesObj) => {
      this.seasonBadgesObj = seasonBadgesObj;
      this.isClicked = seasonBadgesObj.flag;
      this.seasonBadgesArr = [...seasonBadgesObj.seasons];
      this.firstSeason = this.seasonBadgesArr[0];
    });
  }
}
