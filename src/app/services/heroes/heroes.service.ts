import {Injectable} from '@angular/core';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Hero} from '../../state/heroes/heroes.state.model';

@Injectable({
  providedIn: 'root'
})
export class HeroesService {
  private heroesUrl = 'api/heroes';  // URL to web api
  httpOptions = {
    headers: new HttpHeaders({ 'Content-Type': 'application/json' })
  };

  constructor(
    private http: HttpClient,
  ) {}

  getHeroesList(): Observable<Hero[]> {
    return this.http.get<Hero[]>(this.heroesUrl);
  }
  getHero(id: number): Observable<Hero> {
    /** GET hero by id. Will 404 if id not found */
    const url = `${this.heroesUrl}/${id}`;
    return this.http.get<Hero>(url);
  }
  /** POST: add a new hero to the server */
  addHero(hero: Hero): Observable<Hero> {
    return this.http.post<Hero>(this.heroesUrl, hero, this.httpOptions);
  }
  /** POST: add a new hero to the server */
  updateHero(hero: Hero): Observable<Hero> {
    return this.http.put<Hero>(this.heroesUrl, hero, this.httpOptions);
  }
  deleteHero(hero: Hero): Observable<Hero> {
    const id = typeof hero === 'number' ? hero : hero.id;
    const url = `${this.heroesUrl}/${id}`;
    return this.http.delete<Hero>(url, this.httpOptions);
  }
}
