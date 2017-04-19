import { expect } from 'chai';
import { fromJS } from 'immutable';

import { selectLocationState } from '../router.selectors';

describe('when selectLocationState is called', () => {
  const sampleRoute = { key: 'value' };

  const sampleState = fromJS({
    route: sampleRoute,
  });

  it('should return states route', () => {
    expect(selectLocationState()(sampleState)).to.deep.equal(sampleRoute);
  });
});

