import React from 'react';
import renderer from 'react-test-renderer';
import AppbarComponent from "../components/AppbarComponent";
import {Appbar, Button} from "react-native-paper";

it('renders correctly with default arguments', () => {
  const tree = renderer
    .create(<AppbarComponent />)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders correctly with custom title', () => {
  const tree = renderer
    .create(<AppbarComponent title={'My App'}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders app bar with back button correctly', () => {
  const tree = renderer
    .create(<AppbarComponent showBack={true}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders app bar with back action set', () => {
  const tree = renderer
    .create(<AppbarComponent
      showBack={true}
      backOnPress={() => console.log('there\'s no turning back')}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders app bar with no buttons correctly', () => {
  const tree = renderer
    .create(<AppbarComponent buttons={[]}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders app bar with a "Done" button correctly', () => {
  const tree = renderer
    .create(<AppbarComponent buttons={[
      <Button color='white' onPress={() => console.log('hello, world')}>
        Done
      </Button>
    ]}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders app bar with multiple button correctly', () => {
  const tree = renderer
    .create(<AppbarComponent buttons={[
      (<Button color='white' onPress={() => console.log('hello, world')}>
        Done
      </Button>),
      (<Appbar.Action
        icon='dots-vertical'
        color='white'
        onPress={() => alert('Will eventually take you to the settings screen')}
      />)
    ]}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});

it('renders a fully customized app bar correctly', () => {
  const tree = renderer
    .create(<AppbarComponent
      title={'My App'}
      showBack={true}
      backOnPress={() => console.log('there\'s no turning back')}
      buttons={[
        <Button color='white' onPress={() => console.log('hello, world')}>
          Done
        </Button>
      ]}/>)
    .toJSON();
  expect(tree).toMatchSnapshot();
});
