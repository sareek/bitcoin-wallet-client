import { fromJS } from 'immutable';
import userConfirmationReducer from '../reducer';

describe('userConfirmationReducer', () => {
  it('returns the initial state', () => {
    expect(userConfirmationReducer(undefined, {})).toEqual(fromJS({}));
  });
});
