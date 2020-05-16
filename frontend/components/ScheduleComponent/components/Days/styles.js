import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 7,
    flexDirection: 'row',
    // borderWidth: 1,
    // borderColor: 'black'
  },
  dayContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  day: {
    fontSize: 14,
    fontWeight: '800',
  }
});

export default styles;