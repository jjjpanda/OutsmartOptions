import 'isomorphic-fetch';

import React from 'react';
import { shallow, configure } from 'enzyme';
import renderer from 'react-test-renderer';

import Adapter from 'enzyme-adapter-react-16';
import OptionsCalculator from '../../src/calc.js';

configure({ adapter: new Adapter() });

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
