import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    marginTop: 10,
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
    marginVertical: 5,
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
