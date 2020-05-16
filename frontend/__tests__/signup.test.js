import React from 'react';
import Signup from '../screens/SignupScreen/index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(<Signup />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
