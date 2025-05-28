import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';
import { AllLeagues } from '../entities/league';
import { HttpClient } from '@angular/common/http';
import { AllSeasons, SeasonBadge } from '../entities/season';

@Injectable({
  providedIn: 'root'
})
export class LeagueService {

  private leaguesUrl = 'https://www.thesportsdb.com/api/v1/json/3/all_leagues.php';
  private seasonBadgeUrl = 'https://www.thesportsdb.com/api/v1/json/3/search_all_seasons.php?badge=1&id=4344';

  seasonBadgeObj: {flag: boolean, seasons: SeasonBadge[]} = {flag: false, seasons: []}

  seasonSource: BehaviorSubject<{flag: boolean, seasons: SeasonBadge[]}> = new BehaviorSubject(this.seasonBadgeObj);

  constructor(private http: HttpClient) { }

  getLeagues(): Observable<AllLeagues> {
    return this.http.get<AllLeagues>(this.leaguesUrl)
  }

  getSeasonBadges(): Observable<AllSeasons> {
    return this.http.get<AllSeasons>(this.seasonBadgeUrl)
  }
}
