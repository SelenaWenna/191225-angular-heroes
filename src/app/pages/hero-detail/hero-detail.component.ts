import {Component, OnInit} from '@angular/core';
import {Hero} from '../../state/heroes/heroes.state.model';
import {ActivatedRoute} from '@angular/router';
import {Location} from '@angular/common';
import {Store} from '@ngxs/store';
import {GetHero, UpdateHero} from '../../state/heroes/heroes.actions';
import {HeroesState} from '../../state/heroes/heroes.state';

@Component({
  selector: 'app-hero-detail',
  templateUrl: './hero-detail.component.html',
  styleUrls: ['./hero-detail.component.scss']
})
export class HeroDetailComponent implements OnInit {
  hero: Hero;

  constructor(
    private route: ActivatedRoute,
    private location: Location,
    private store: Store
  ) {
    const id = +this.route.snapshot.paramMap.get('id');
    this.getHero(id);
    this.store.select(HeroesState.hero(id))
      .subscribe(res => { this.hero = res; });
  }

  public getHero(id: number) {
    this.store.dispatch(new GetHero(id));
  }
  save(): void {
    this.hero.name = this.hero.name.trim();
    if (!this.hero.name) { return; }
    this.store.dispatch(new UpdateHero(this.hero))
      .subscribe(() => this.goBack());
  }
  goBack(): void {
    this.location.back();
  }
  ngOnInit() {}

}
