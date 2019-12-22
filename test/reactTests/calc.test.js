import 'isomorphic-fetch'
import React from 'react';
import renderer from 'react-test-renderer';
import { shallow, mount } from 'enzyme';

import OptionsCalculator from '../../src/calc.js';
import { it } from 'jest-circus';

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
  it('Fails', () => {
    expect(true).toBe(false);
  })
});
