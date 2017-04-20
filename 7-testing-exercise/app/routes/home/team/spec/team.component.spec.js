import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { mount } from 'enzyme';
import { fromJS } from 'immutable';


import Team from '../team.component';

describe.only('Team', () => {
  const teamData = fromJS({
    crestUrl: 'testUrl',
    name: 'testName',
    squadMarketValue: 'testValue',
  });
  
  it('should render team name', () => {
    const wrapper = shallow(<Team data={teamData} />);
    expect(wrapper.find('.team-name').node.props.children[0]).to.equal('testName');
  });
  it('should render team value', () => {
    const wrapper = shallow(<Team data={teamData} />);
    expect(wrapper.find('.team-value').node.props.children).to.equal('testValue');
  });
});
