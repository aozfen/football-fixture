import { ADD_FIXTURE  } from './types';


export const addFixture = payload => {
  return {
    type: ADD_FIXTURE,
    payload
  }
}
