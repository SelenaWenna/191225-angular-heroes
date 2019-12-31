/**
 * action for getting client list from backend
 */
// import {ClientSaveReqInterface} from '@privateApp/main.module/state/clients/clients.state.model';
import {Hero} from './heroes.state.model';

export class GetHeroesList {
    static readonly type = '[Heroes] Get List';
}

/**
 * action for getting hero from backend
 */
export class GetHero {
    static readonly type = '[Heroes] Get hero';

    constructor(public payload) {
    }
}
/**
 * action for creating hero from backend
 */
export class CreateHero {
  static readonly type = '[Heroes] Create hero';

  constructor(public payload: Hero) {
  }
}

/**
 * action for deleting hero from backend
 */
export class UpdateHero {
    static readonly type = '[Heroes] Update hero';

    constructor(public payload: Hero) {
    }
}

/**
 * action for deleting hero from backend
 */
export class DeleteHero {
  static readonly type = '[Heroes] Delete hero';

  constructor(public payload: Hero) {
  }
}
