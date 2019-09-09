import React from 'react';
import { shallow } from 'enzyme';
import { SolarPanelsCrud } from '../../../src/features/home/SolarPanelsCrud';

describe('home/SolarPanelsCrud', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <SolarPanelsCrud {...props} />
    );

    expect(
      renderedComponent.find('.home-solar-panels-crud').length
    ).toBe(1);
  });
});
