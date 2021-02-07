import { compose, combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import fixtureReducer from './reducers/fixture.reducer';

/*
 buradaki fixture devtoolsda gördüğün uygulamada eriştiğin state'dir
*/
const rootReducer = combineReducers({
  fixture: fixtureReducer
});
const middleware = [thunk];

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose;
const configureStore = () => {
  return createStore(rootReducer, composeEnhancers(applyMiddleware(...middleware)));
} 


export default configureStore;