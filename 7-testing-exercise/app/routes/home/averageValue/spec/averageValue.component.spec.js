import React from 'react';
import { expect } from 'chai';
import { shallow } from 'enzyme';
import { FormattedMessage } from 'react-intl';
import AverageValue from '../averageValue.component';
import messages from '../averageValue.messages';

describe('<AverageValue />', () => {
  it('should render one <FormattedMessage /> components', () => {
    const wrapper = shallow(<AverageValue arithmeticAverage={100000} />);

    expect(wrapper.find(FormattedMessage)).to.have.length(1);
  });

  it('should render provide proper data to <FormattedMessage />', () => {
    const wrapper = shallow(<AverageValue arithmeticAverage={1} />);
    const props = wrapper.find(FormattedMessage).props();

    expect(props.values.value).to.equals(1);
    expect(props.id).to.equals(messages.info.id);
    expect(props.defaultMessage).to.equals(messages.info.defaultMessage);
  });
});
