import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
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
    height: 50,
  },
  button: {
    justifyContent: 'center',
    width: '50%',
    height: 50,
    margin: 10,
  },
  buttonText: {
    fontSize: 18,
  },
  buttonContainer: {
    flexDirection: 'row',
    justifyContent: 'center',
    width: '85%'
  },
});

export default styles;
