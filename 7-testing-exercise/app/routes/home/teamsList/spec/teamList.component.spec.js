import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { fromJS } from 'immutable';
import { FormattedMessage } from 'react-intl';
import TeamsList from '../teamsList.component';
import Team from '../../team/team.component';

describe('<TeamsList/>', () => {
  it('should render <FormattedMessage /> components', () => {
    const items = fromJS([{ item: {}, key: 1 }]);
    const wrapper = shallow(<TeamsList items={items} />);

    expect(wrapper.find(FormattedMessage)).to.have.length(1);
  });

  it('should render <Team /> components', () => {
    const items = fromJS([{ item: {}, key: 1 }, { item: {}, key: 2 }]);
    const wrapper = shallow(<TeamsList items={items} />);

    expect(wrapper.find(Team)).to.have.length(2);
  });
});
