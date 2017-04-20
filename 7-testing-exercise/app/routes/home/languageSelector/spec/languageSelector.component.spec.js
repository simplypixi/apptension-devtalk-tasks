import React from 'react';
import { expect } from 'chai';
import { mount } from 'enzyme';
import LanguageSelector from '../languageSelector.component';

describe('languageSelector component', () => {
  const wrapper = mount(<LanguageSelector value="en" />);
  it('should mount a component', () => {
    expect(wrapper.component.state.mount).to.equal(true);
  });
  it('should set up value as props', () => {
    expect(wrapper.props().value).to.equal('en');
  });
  it('should allow update value via props changing', () => {
    wrapper.setProps({ value: 'de' });
    expect(wrapper.props().value).to.equal('de');
  });
});



