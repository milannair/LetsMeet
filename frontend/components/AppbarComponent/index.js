import React from 'react';
import {Appbar} from "react-native-paper";
import styles from "./styles";

/*
 * The component for the app bar, the horizontal bar that appears on the top of
 * most screens.
 */
function AppbarComponent({
  /* The title shown in the app bar */
  title = 'LetsMeet',

  /* Whether the back button should be shown in the app bar */
  showBack = false,

  /*
   * The action being run when the back button is pressed.
   * If 'showBack' is false then this prop can have arbitrary value.
   */
  backOnPress = () => {},

  /* The buttons shown at the end of the app bar */
  buttons = [
    (<Appbar.Action
      icon='dots-vertical'
      color={styles.menuButton.color}
      onPress={() => alert('Will eventually take you to the settings screen')}
    />),
  ],
}) {
  let backButton;
  if (showBack) {
    backButton = (
      <Appbar.BackAction
        color={styles.backButton.color}
        onPress={backOnPress}
      />
    );
  }

  return (
    <Appbar.Header style={styles.appbar}>
      {backButton}
      <Appbar.Content
        title={title}
      />
      {buttons}
    </Appbar.Header>
  );
}

export default AppbarComponent;
