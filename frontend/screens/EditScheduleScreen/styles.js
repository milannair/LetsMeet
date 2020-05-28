import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'column',
    backgroundColor: 'white'
  },
  topContainer: {
    flexDirection: 'row',
    justifyContent: 'space-evenly',
    alignItems: 'center',
    marginTop: 15,
    marginBottom: 15
  },
  bottomContainer: {
    flex: 1
  }
});

export default styles