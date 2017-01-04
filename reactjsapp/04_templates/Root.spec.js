import React from 'react';
import expect from 'expect';
import TestUtils from 'react-addons-test-utils';
import expectJSX from 'expect-jsx';
expect.extend(expectJSX);
import configureStore from '../configureStore';
import Root from './Root';

describe('Root', () => {
  it('should provide store to components', () => {
    const store = configureStore();
    const renderer = TestUtils.createRenderer();
    renderer.render(<Root store={store} />);
    const actual = renderer.getRenderOutput();
    expect(actual).toMatch(/<Provider store=/);
  });
});
