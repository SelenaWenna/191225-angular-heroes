import {Component, OnInit} from '@angular/core';
import {Hero} from '../../state/heroes/heroes.state.model';
import {GetHeroesList} from '../../state/heroes/heroes.actions';
import {HeroesState} from '../../state/heroes/heroes.state';
import {Store} from '@ngxs/store';

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrls: ['./dashboard.component.scss']
})
export class DashboardComponent implements OnInit {
  heroes: Hero[];

  constructor(
    private store: Store
  ) {
    this.store.dispatch(new GetHeroesList());
    this.store.select(HeroesState.heroes)
      .subscribe(res => { this.heroes = res; });
  }

  ngOnInit() {}
}
