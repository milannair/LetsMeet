import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  backButton: {
    position: 'absolute',
    left: 5,
    top: 5,
  },
  container: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    alignItems: 'center',
  },
  text: {
    textAlign: 'center',
    fontSize: 25,
  },
  textField: {
    width: '90%',
  },
  button: {
    justifyContent: 'center',
    width: '90%',
    height: 64,
  },
  buttonText: {
    fontSize: 25,
  },
});

export default styles;
