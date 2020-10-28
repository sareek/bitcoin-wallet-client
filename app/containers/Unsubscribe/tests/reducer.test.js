import { fromJS } from 'immutable';
import unsubscribeReducer from '../reducer';

describe('unsubscribeReducer', () => {
  it('returns the initial state', () => {
    expect(unsubscribeReducer(undefined, {})).toEqual(fromJS({}));
  });
});
