export interface League {
  idLeague?: string;
  strLeague: string;
  strSport: string;
  strLeagueAlternate: string;
}

export interface AllLeagues {
  leagues: League[];
}
