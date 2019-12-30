/**
 * client state model
 */
// import {LoadableEntityStateModel} from '@shared/base/state/loadable-entity.model';

export class HeroesStateModel {
    // clientsMap: Map<string, ClientItemPayloadInterface>;
  heroes: Hero[];
}

/**
 * interface for client item
 */
export interface Hero {
  id: number;
  name: string;
}
