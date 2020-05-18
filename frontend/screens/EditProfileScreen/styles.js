import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'flex-start',
    alignItems: 'stretch',
  },
  textInput: {
    backgroundColor: 'white',
    width: '90%',
    flexDirection: 'column',
    justifyContent: 'flex-start',
    marginTop: 20,
    alignSelf: 'center',
  },
  button: {
    marginTop: 25,
    marginHorizontal: '25%',
    padding: 5,
  },
});

export default styles;
