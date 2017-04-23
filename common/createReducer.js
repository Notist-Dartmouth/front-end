import { combineReducers } from 'redux';
import user from './reducers/user';

const initialState = {
  host: '',
  protocol: '',
};

const sourceRequest = (state = initialState, action) => state;

// Only combine reducers needed for initial render, others will be
// added async
export default function createReducer(asyncReducers) {
  return combineReducers({
    user,
    sourceRequest,
    ...asyncReducers,
  });
}
