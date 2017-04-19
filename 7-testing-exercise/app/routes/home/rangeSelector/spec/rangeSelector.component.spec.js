import React from 'react';
import { Map } from 'immutable';
import { expect } from 'chai';
import { mount } from 'enzyme';
import { IntlProvider } from 'react-intl';
import InputRange from 'react-input-range';
import RangeSelector from '../RangeSelector.component';


describe('<AverageValue />', () => {
  it('should render one <InputRange /> components', () => {
    const wrapper = mount(<IntlProvider locale="en"><RangeSelector rangeValues={Map({min: 0, max: 600})} setRangeValues={null} /></IntlProvider>);

    expect(wrapper.find(InputRange)).to.have.length(1);
  });
});