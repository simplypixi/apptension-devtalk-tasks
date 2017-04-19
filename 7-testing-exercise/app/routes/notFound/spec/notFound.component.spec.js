import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import Helmet from 'react-helmet';

import NotFound from '../notFound.component';

describe('NotFound', () => {
  it('should render <Helmet/> component', () => {
    const wrapper = shallow(<NotFound />);
    expect(wrapper.find(Helmet)).to.have.length(1);
  });
});
