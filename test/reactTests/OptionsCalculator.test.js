import 'isomorphic-fetch';
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import OptionsCalculator from '../../src/OptionsCalculator';

describe('Calculator Test', () => {
  it('Calculator Render', () => {
    shallow(<OptionsCalculator />);
  });
  test('Calculator', () => {
    const component = renderer.create(
      <OptionsCalculator />,
    );
    const tree = component.toJSON();
    expect(tree).not.toBe('');
  });
});
