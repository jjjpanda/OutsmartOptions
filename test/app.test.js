import 'isomorphic-fetch'
import React from 'react'
import OptionsCalculator from "../src/calc.js"
import renderer from 'react-test-renderer'

describe('Jest Test', () => {
    it('sums numbers', () => {
        expect(1 + 2).toEqual(3);
        expect(2 + 2).toEqual(4);
     });
     test('Calculator', () => {
        const component = renderer.create(
          <OptionsCalculator />,
        );
        let tree = component.toJSON();
        expect(tree).not.toBe("");
      });
});

