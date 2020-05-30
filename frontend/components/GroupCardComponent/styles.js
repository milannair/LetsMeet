import { StyleSheet} from 'react-native';

const styles = StyleSheet.create({
    container: {
      flex: 1,
      flexDirection: 'column',
      justifyContent: 'flex-start',
    },
    button: {
      backgroundColor: 'black',
      width: '50%'
    },
    card: {
        width: "100%",
        height: "100%",
        // paddingTop: "5%",
        borderBottomWidth: 1,
        borderBottomColor: "rgb(211,211,211)",
        borderTopStartRadius: 0,
        borderTopEndRadius: 0,
    },
  });

export default styles