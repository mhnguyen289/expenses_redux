import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import configureStore from '../configureStore';
import Root from './Root';
import { Router } from 'react-router';

describe('Root', () => {
  it('should provide store to components', () => {
    const store = configureStore();
    const renderer = TestUtils.createRenderer();
    renderer.render(<Root store={store}/>);
    const actual = renderer.getRenderOutput();
    const expected = '<Provider store=';
    expect(actual).toMatch(/expected/);
  })
})
