import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
    container: {
        flex: 1,
        flexDirection: 'column',
        justifyContent: 'flex-start',
        backgroundColor: '#f9f9f9',
    },
    navbar : {
        height: 80,
    },
    fab: {
        position: 'absolute',
        marginBottom: 100,
        marginRight: 16,
        right: 0,
        bottom: 0,
        backgroundColor: "#663399",
    }
});

export default styles