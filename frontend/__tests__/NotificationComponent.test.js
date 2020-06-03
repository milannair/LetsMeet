import React from 'react';
import NotificationComponent from '../components/NotificationComponent/index';
import renderer from 'react-test-renderer';

it('renders correctly', () => {
  const tree = renderer
    .create(
      <NotificationComponent
        text={"Test notification"}
        positiveAction={() => console.log("+")}
        negativeAction={() => console.log("-")}
      />
    )
    .toJSON();
  expect(tree).toMatchSnapshot();
});
