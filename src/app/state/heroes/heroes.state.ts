import {Action, createSelector, Selector, State, StateContext} from '@ngxs/store';
import {HeroesStateModel, Hero} from './heroes.state.model';
// import {LoadingStateEnum} from '@shared/enums/loadingState.enum';
import {
    // CreateHero,
    // GetHero,
    GetHeroesList,
    // UpdateHero
} from './heroes.actions';
// import {LoadableEntityState} from '@shared/base/state/loadable-entity.state';
import {HeroesService} from '../../services/heroes/heroes.service';
import {catchError, tap} from 'rxjs/operators';
import {of} from 'rxjs';


@State<HeroesStateModel>({
    name: 'clients',
    defaults: {
        // clientsMap: new Map<string, ClientItemPayloadInterface>(),
        // loadingState: LoadingStateEnum.None
      heroes: []
    }
})
export class HeroesState {

    /**
     * selector for getting agent by id
     * @param id - agent id
     */
    static hero(id: string) {
        return createSelector(
            [HeroesState],
            (state: HeroesStateModel) => {
                return state.heroes;
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
    constructor(private readonly heroesService: HeroesService) {
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

    // /**
    //  * method for getting clientList
    //  * @param patchState - method for patching state
    //  */
    // @Action(GetClient)
    // getClient({patchState, getState}: StateContext<ClientsStateModel>, {payload}: GetClient) {
    //     patchState({loadingState: LoadingStateEnum.Loading});
    //     return this.clientSvc.getClient(payload).pipe(tap((result) => {
    //             const {clientsMap} = getState();
    //             const client = clientsMap.get(payload);
    //             if (client) {
    //                 clientsMap.set(payload, {...client, ...result});
    //             }
    //             patchState({loadingState: LoadingStateEnum.Loaded, clientsMap});
    //         }),
    //         catchError(err => {
    //             console.error(err);
    //             patchState({loadingState: LoadingStateEnum.Error});
    //             return of();
    //         }));
    // }
    //
    // /**
    //  * method for creating client
    //  * @param patchState - method for patching state
    //  */
    // @Action(CreateClient)
    // createClient({patchState, getState}: StateContext<ClientsStateModel>, {payload}: CreateClient) {
    //     patchState({loadingState: LoadingStateEnum.Loading});
    //     return this.clientSvc.saveClient(payload).pipe(tap((result) => {
    //             console.log(result);
    //             const {
    //                 passport_name, passport_middlename, passport_lastname,
    //                 email, personal_phone
    //             } = payload;
    //             const {clientsMap} = getState();
    //
    //             clientsMap.set(result.id,
    //                 {
    //                     id: result.id,
    //                     passport_name,
    //                     passport_middlename,
    //                     passport_lastname,
    //                     orders_count: 0,
    //                     e_mail: email,
    //                     personal_phone,
    //                     region: null
    //                 }
    //             );
    //             patchState({
    //                 loadingState: LoadingStateEnum.Loaded,
    //                 clientsMap: new Map<string, ClientItemPayloadInterface>(clientsMap)
    //             });
    //         }),
    //         catchError(err => {
    //             console.error(err);
    //             return of();
    //         }));
    // }
    //
    // /**
    //  * method for creating client
    //  * @param patchState - method for patching state
    //  */
    // @Action(UpdateClient)
    // updateClient({patchState, getState}: StateContext<ClientsStateModel>, {payload}: UpdateClient) {
    //     patchState({loadingState: LoadingStateEnum.Loading});
    //     const {data, clientId} = payload;
    //     return this.clientSvc.saveClient(data, clientId).pipe(tap((result) => {
    //             const {
    //                 passport_name,
    //                 passport_middlename,
    //                 passport_lastname,
    //                 email,
    //                 personal_phone
    //             } = payload.data;
    //             const {clientsMap} = getState();
    //             let client = clientsMap.get(payload.clientId);
    //             client = {...client, e_mail: email, personal_phone, passport_lastname, passport_middlename, passport_name};
    //             clientsMap.set(payload.clientId, client);
    //             console.log(clientsMap, payload);
    //             patchState({
    //                 loadingState: LoadingStateEnum.Loaded,
    //                 clientsMap: new Map<string, ClientItemPayloadInterface>(clientsMap)
    //             });
    //         }),
    //         catchError(err => {
    //             console.error(err);
    //             return of();
    //         }));
    // }
}
