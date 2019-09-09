import React from 'react';
import { shallow } from 'enzyme';
import { DynamicCharts } from '../../../src/features/home/DynamicCharts';

describe('home/DynamicCharts', () => {
  it('renders node with correct class name', () => {
    const props = {
      home: {},
      actions: {},
    };
    const renderedComponent = shallow(
      <DynamicCharts {...props} />
    );

    expect(
      renderedComponent.find('.home-dynamic-charts').length
    ).toBe(1);
  });
});
