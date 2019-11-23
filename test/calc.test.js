import 'isomorphic-fetch'
import React from 'react'
import { shallow } from 'enzyme';
import OptionsCalculator from "../src/calc.js"
import renderer from 'react-test-renderer'

import {configure} from 'enzyme';
import Adapter from "enzyme-adapter-react-16"

configure ({ adapter: new Adapter() })

describe('Calculator Test', () => {
     it('Calculator Render', () => {
      shallow(<OptionsCalculator />);
     })
     test('Calculator', () => {
        const component = renderer.create(
          <OptionsCalculator />,
        );
        let tree = component.toJSON();
        expect(tree).not.toBe("");
      });
});

