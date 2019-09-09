import React from 'react';
import { shallow } from 'enzyme';
import { Navigations } from '../../../src/features/home';

it('renders node with correct class name', () => {
  const renderedComponent = shallow(<Navigations />);
  expect(renderedComponent.find('.home-navigations').length).toBe(1);
});
