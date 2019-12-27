import {Component, OnInit} from '@angular/core';
import {Hero} from '../store/heroes/heroes.state.model';
import {Select, Store} from '@ngxs/store';
import {HeroesState} from '../store/heroes/heroes.state';
import {GetHeroesList} from '../store/heroes/heroes.actions';
import {Observable} from 'rxjs';

@Component({
  selector: 'app-heroes',
  templateUrl: './heroes.component.html',
  styleUrls: ['./heroes.component.scss']
})
export class HeroesComponent implements OnInit {
  @Select(HeroesState.heroes) heroes: Observable<Hero[]>;

  constructor(private store: Store) {
    this.store.dispatch(new GetHeroesList());
  }

  // add(name: string): void {
  //   name = name.trim();
  //   if (!name) { return; }
  //   this.heroService.addHero({ name } as Hero)
  //     .subscribe(hero => {
  //       this.heroes.push(hero);
  //     });
  // }
  delete(hero: Hero): void {
    // this.heroes = this.heroes.filter(h => h !== hero);
    this.store.dispatch(new DeleteHero(hero));
  }

  ngOnInit() {}
}
