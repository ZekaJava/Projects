import { AfterViewInit, Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { League } from '../../entities/league';
import { LeagueService } from '../../services/league.service';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectChange, MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { SeasonBadge } from '../../entities/season';

@Component({
  selector: 'app-league-list',
  imports: [
    MatTableModule,
    MatPaginatorModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
  ],
  templateUrl: './league-list.component.html',
  standalone: true,
  styleUrl: './league-list.component.scss',
})
export class LeagueListComponent implements OnInit, AfterViewInit {
  displayedColumns: string[] = ['league', 'sport', 'leagueAlternate'];
  dataSource = new MatTableDataSource<League>();

  @ViewChild(MatPaginator) paginator: MatPaginator = new MatPaginator();

  sports: string[] = [];
  selectedSport: string = '';
  tableCellIsClicked: boolean = false;
  seasons: SeasonBadge[] = [];

  constructor(private leagueService: LeagueService) {}

  ngOnInit() {
    this.leagueService.getLeagues().subscribe((res) => {
      this.dataSource.data = res.leagues;
      this.dataSource.data.forEach((league) => {
        this.sports = [...new Set(['All', ...this.sports, league.strSport])];
      });
    });
  }

  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.filterPredicate = (data, filter: string): boolean => {
      return data.strLeague.toLowerCase().includes(filter);
    };
  }

  onSearch(event: Event) {
    const searchValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = searchValue.trim().toLowerCase();
  }

  onChange(event: MatSelectChange) {
    this.selectedSport = event.value;
    this.dataSource.filterPredicate = (data, filter: string) => {
      if (this.selectedSport === 'All') {
        return true;
      }
      return data.strSport === filter;
    };
    this.dataSource.filter = this.selectedSport;
  }

  resetFilters(input: { value: string }) {
    this.dataSource.filter = '';
    input.value = '';
    this.selectedSport = '';
  }

  onCellClick(element: any, column: string) {
    this.leagueService.getSeasonBadges().subscribe((res) => {
      this.tableCellIsClicked = true;
      this.seasons = res.seasons;
      const seasonObj = {
        flag: this.tableCellIsClicked,
        seasons: this.seasons,
      };
      this.leagueService.seasonSource.next(seasonObj);
    });
  }
}
