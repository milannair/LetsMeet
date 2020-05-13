import React from 'react';
import NotificationsScreen from "../screens/NotificationsScreen/index";
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <NotificationsScreen
        notifications={["Dummy notification 1", "Dummy notification 2"]}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
