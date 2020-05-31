import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'flex-start',
  },
  text: {
    textAlign: 'left',
    fontSize: 25,
    paddingHorizontal: 20,
    paddingVertical: 10,
    backgroundColor: 'white',
  },
  fab: {
    position: 'absolute',
    marginBottom: 16,
    marginRight: 16,
    right: 0,
    bottom: 0,
    backgroundColor: '#663399',
  },
  item: {
    backgroundColor: 'white',
  }
});

export default styles;
