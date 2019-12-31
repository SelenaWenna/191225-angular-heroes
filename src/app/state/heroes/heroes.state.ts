import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {HeroesStateModel, Hero} from './heroes.state.model';
// import {LoadingStateEnum} from '@shared/enums/loadingState.enum';
import {
  CreateHero,
  GetHero,
  GetHeroesList,
  UpdateHero,
  DeleteHero
} from './heroes.actions';
// import {LoadableEntityState} from '@shared/base/state/loadable-entity.state';
import {HeroesService} from '../../services/heroes/heroes.service';
import {MessagesService} from '../../services/messages/messages.service';
import {catchError, tap} from 'rxjs/operators';
import {Observable, of} from 'rxjs';


@State<HeroesStateModel>({
    name: 'heroes',
    defaults: {
        // clientsMap: new Map<string, ClientItemPayloadInterface>(),
        // loadingState: LoadingStateEnum.None
      heroes: []
    }
})
export class HeroesState {

    /**
     * selector for getting hero by id
     * @param id - hero id
     */
    static hero(id: number) {
      return createSelector(
        [HeroesState.heroes],
        (state: Hero[]) => {
          return state.find(hero => hero.id === id);
        }
      );
    }

    /**
     * Selector for heroes list
     * @param state -current state
     */
    @Selector()
    public static heroes(state: HeroesStateModel) {
      return state.heroes;
        // return Array.from(state.clientsMap.values());
    }

    // /**
    //  * Selector for loading state
    //  * @param state -current state
    //  */
    // @Selector()
    // public static loadingState(state: ClientsStateModel) {
    //     return state.loadingState;
    // }
    //
    constructor(
      private readonly heroesService: HeroesService,
      private messagesService: MessagesService
    ) {
        // super();
    }

  /**
   * method for getting heroesList
   * @param patchState - method for patching state
   */
    @Action(GetHeroesList)
    getClientList({patchState, getState}: StateContext<HeroesStateModel>) {
        // patchState({loadingState: LoadingStateEnum.Loading});
        return this.heroesService.getHeroesList().pipe(
          tap((result: Hero[]) => {
                // const mapReady = result.map((client) => ([client.id, {...client}]));
                // @ts-ignore
                patchState({
                  // loadingState: LoadingStateEnum.Loaded,
                  // clientsMap: new Map(mapReady)
                  heroes: result
                });
          }),
          catchError(err => {
            console.error(err);
            // patchState({loadingState: LoadingStateEnum.Error});
            return of();
          })
        );
    }

    /**
     * method for getting hero
     * @param patchState - method for patching state
     */
    @Action(GetHero)
    getHero({patchState, getState}: StateContext<HeroesStateModel>, {payload}: GetHero) {
        // patchState({loadingState: LoadingStateEnum.Loading});
        return this.heroesService.getHero(payload).pipe(
          tap((result) => {
            const {heroes} = getState();
            // console.log(result, payload, heroes);
            // const hero = heroes.find(h => h.id === id);
            if (result) {
              const heroesList = heroes.find(h => h.id === payload) ? heroes : [...heroes, result];
              // clientsMap.set(payload, {...client, ...result});
              patchState({
                // loadingState: LoadingStateEnum.Loaded,
                heroes: heroesList
              });
            }
          }),
          catchError(err => {
            console.error(err);
            // patchState({loadingState: LoadingStateEnum.Error});
            return of();
          }));
    }

    /**
     * method for creating hero
     * @param patchState - method for patching state
     */
    @Action(CreateHero)
    createHero({patchState, getState}: StateContext<HeroesStateModel>, {payload}: CreateHero) {
        // patchState({loadingState: LoadingStateEnum.Loading});
        return this.heroesService.addHero(payload).pipe(
          tap((result) => {
                console.log(result);
                // const {
                //     id, name
                // } = payload;
                const {heroes} = getState();

                patchState({
                    // loadingState: LoadingStateEnum.Loaded,
                    // clientsMap: new Map<string, ClientItemPayloadInterface>(clientsMap)
                  heroes: [
                    ...heroes,
                    result
                  ]
                });
            }),
            catchError(err => {
                console.error(err);
                return of();
            }));
    }

  /**
   * method for creating hero
   * @param patchState - method for patching state
   */
  @Action(UpdateHero)
  updateHero({patchState, getState}: StateContext<HeroesStateModel>, {payload}: UpdateHero) {
    // patchState({loadingState: LoadingStateEnum.Loading});
    return this.heroesService.updateHero(payload).pipe(
      tap((result) => {
        console.log(result);
        const {
            id, name
        } = payload;
        const {heroes} = getState();
        const updatedHero = heroes.find(h => h.id === id);
        updatedHero.name = name;
        patchState({
          // loadingState: LoadingStateEnum.Loaded,
          // clientsMap: new Map<string, ClientItemPayloadInterface>(clientsMap)
          heroes
        });
      }),
      catchError(err => {
        console.error(err);
        return of();
      }));
  }

    /**
     * method for deleting hero
     * @param patchState - method for patching state
     */
    @Action(DeleteHero)
    deleteHero({patchState, getState}: StateContext<HeroesStateModel>, {payload}: DeleteHero) {
        // patchState({loadingState: LoadingStateEnum.Loading});
        // const {id, name} = payload.payload;
        return this.heroesService.deleteHero(payload).pipe(
          tap((result) => {
            const {heroes} = getState();
            const {id} = payload;
            console.log(heroes, payload, heroes.filter(h => h.id !== id));
            patchState({
              // loadingState: LoadingStateEnum.Loaded,
              // clientsMap: new Map<string, ClientItemPayloadInterface>(clientsMap)
              heroes: heroes.filter(h => h.id !== payload.id)
            });
          }),
          catchError(err => {
            console.error(err);
            return of();
          }));
    }
}
