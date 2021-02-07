import { ADD_FIXTURE  } from '../actions/types';

const fixtureReducer = (state = [], action) => {
  switch(action.type) {
    case ADD_FIXTURE:
     return action.payload;

    default:
      return state;
  }
}

export default fixtureReducer;